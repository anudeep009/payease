import React, { useState } from "react";
import Input from "./ui/Input.tsx";
import Button from "./ui/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: typeof errors = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    };

    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/signup`,{
        firstname : formData.firstName,
        lastname : formData.lastName,
        username : formData.username,
        password : formData.password
      });
      if(response.status == 201){
        toast.success("Signup Successful please sign in");
        navigate("/signin");
      }
      } catch (error : any) {
        console.error(error);
        toast.error(error.response?.data?.message || "An error occurred during sign up");
      }
    }
  };

  return (
    <div className="min-h-[600px]">
      <form
      className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <Input
        id="firstName"
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
        value={formData.firstName}
        onChange={handleChange}
        errorMessage={errors.firstName}
        className="mb-2"
      />
      <Input
        id="lastName"
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        value={formData.lastName}
        onChange={handleChange}
        errorMessage={errors.lastName}
        className="mb-2"
      />
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
      <Link to={"/signin"} >
      <h4 className="text-gray-500 text-sm m-2 hover:underline">
        already a user? Sign in!
      </h4>
      </Link>
      {
        loading ? (
          <Button disabled variant="primary" fullWidth>
          Signing up...
        </Button>
        ) : (
          <Button type="submit" variant="primary" fullWidth>
            Sign up
          </Button>
        )
      }
    </form>
    </div>
  );
};

export default Signup;
