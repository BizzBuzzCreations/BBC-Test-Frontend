
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://8mbq32t9-8080.inc1.devtunnels.ms/api/auth/signup",
        {
          ...formData,
        },
        { withCredentials: true }
      );

      const data = res?.data;

      if (data?.success) {
        toast.success(data?.message, {
          position: "top-right",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        toast.error(data?.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
      });
    }
  };

  const logout = async () => {
    await axios.post(
      "https://8mbq32t9-8080.inc1.devtunnels.ms/api/auth/logout",
      {},
      { withCredentials: true }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        

        <h2 className="text-2xl font-bold text-center mb-6">
          Create your Account for BBC-Test
        </h2>

        <form onSubmit={handleNext} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-[#1f2f3f] text-white py-2 rounded-lg transition hover:opacity-90"
          >
            Next
          </button>

          <p className="text-center mt-3">
            If you have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;
