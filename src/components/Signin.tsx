import React, { useState } from "react";
import Input from "./ui/Input.tsx";
import Button from "./ui/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loading , setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: typeof errors = {
      username: "",
      password: "",
    };

    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/signin`,{
        username : formData.username,
        password : formData.password,
      })
      if(response.status == 200){
        localStorage.setItem("token",response.data?.token);
        localStorage.setItem("username",response.data?.username);
        localStorage.setItem("userid",response.data?.userid);
        toast.success("signin successful")
        navigate("/home");
      }
      } catch (error : any) {
        console.error(error);
        toast.error(error.response?.data?.message || "An error occurred during sign in");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[600px]">
      <form
      className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-bold mb-4">Sign In</h1>
      <Input
        id="username"
        name="username"
        label="Username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        errorMessage={errors.username}
        className="mb-2"
      />
      <Input
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        errorMessage={errors.password}
        className="mb-2"
      />
      <Link to={"/"} >
      <h4 className="text-gray-500 text-sm m-2 hover:underline">
        Not a user? Sign up!
      </h4>
      </Link>
      {
        loading ? (
          <Button disabled variant="primary" fullWidth>
            Signing in...
          </Button>
        ) : (
          <Button type="submit" variant="primary" fullWidth>
            Sign In
          </Button>
        )
      }
    </form>
    </div>
  );
};

export default Signin;