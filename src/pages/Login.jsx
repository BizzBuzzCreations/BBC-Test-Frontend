import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] w-[450px] rounded-xl shadow-md p-10">
        <h2 className="text-3xl font-semibold text-center text-[#1f2f3f] mb-8">
          Login for your test
        </h2>

        <form onSubmit={handleNext} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 bg-[#f3f3f3] focus:outline-none"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 bg-[#f3f3f3] focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#1f2f3f] text-white py-3 rounded-md hover:opacity-90 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
