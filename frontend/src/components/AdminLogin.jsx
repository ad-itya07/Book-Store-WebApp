import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../redux/features/admin/adminApi";

const formSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [adminLogin, { isLoading, data, error }] = useAdminLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await adminLogin(data).unwrap();
      // console.log(response);

      const token = response.token;
      if (token) {
        localStorage.setItem("token", token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Token has been expired!, Please login again.");
          navigate("/");
        }, 3600 * 1000);
      }

      alert("Admin Login successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      setMessage("Please provide a valid username and password!");
      console.error(err);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="h-screen flex justify-center items-center bg-green-900">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md border rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type="username"
              name="username"
              id="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md"
            ></input>
            {errors.username && (
              <div className="text-red-500 mt-2">{errors.username.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md"
            ></input>
            {errors.password && (
              <div className="text-red-500 mt-2">{errors.password.message}</div>
            )}
          </div>

          {message && (
            <p className="text-red-500 test-xs italic mb-3">{message}</p>
          )}

          <div className="mb-4">
            <button
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none"
            >
              {isSubmitting ? <span>Logging in</span> : <span>Login</span>}
            </button>
          </div>
        </form>

        {/* <p className="align-baseline font-medium mt-4 text-sm">
          Don&apos;t Have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register Here
          </Link>
        </p> */}

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©{new Date().getFullYear()} Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
