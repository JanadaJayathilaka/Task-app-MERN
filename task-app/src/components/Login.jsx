import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { INPUTWRAPPER, fields, INITIAL_FORM } from "../assets/dummy";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const INITIAL_FORM = { email: "", password: "" };

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const navigate = useNavigate();
  const url = "http://localhost:3000/";
  return (
    <div className="max-w-md bg-white w-full shadow-lg border border-purple-100 rounded-xl p-8">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <Login className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">
          Sign in to continue to TaskFlow
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ name, type, placeholder, icon: Icon, isPassword }) => (
          <div key={name} className={INPUTWRAPPER}>
            <Icon className="w-5 h-5 text-purple-500" />
          </div>
        ))}
      </form>
    </div>
  );
};

export default Login;
