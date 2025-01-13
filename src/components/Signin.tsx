import React, { useState } from "react";
import Input from "./ui/Input.tsx";
import Button from "./ui/Button.tsx";
import { Link } from "react-router-dom";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Signin data:", formData);
      alert("Signin successful!");
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
      <Button type="submit" variant="primary" fullWidth>
        Sign In
      </Button>
    </form>
    </div>
  );
};

export default Signin;
