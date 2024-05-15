"use client";

import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "@/features/user/userSlice";
import Link from "next/link";

function Login() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [formData, setFormData] = useState({
    email: undefined,
    password: undefined,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  if (isAuthenticated) {
    router.back();
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const handleLogin = () => {
    dispatch(login(formData));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white rounded-2xl flex w-full min-h-screen items-center">
        <div className="w-2/3 p-5">
          <div className="py-10 bg-white flex flex-col items-center">
            <h2 className="text-3xl font-bold text-[#E40046] inline-block mb-2">
              Sign in to Account
            </h2>
            <div className="border-2 w-12 border-[#E40046] mb-2"></div>
            <Button
              onClick={handleGoogleLogin}
              className="flex bg-white justify-center my-2 border shadow-lg rounded-lg p-2 cursor-pointer items-center"
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </Button>
            <p className="text-gray-500 my-2">or use your email account</p>
            <div className="flex flex-col items-center">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                stateContent={<FaRegEnvelope className="text-gray-400 mr-2" />}
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
              />
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                stateContent={<MdLockOutline className="text-gray-400 mr-2" />}
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                errorMessage="Password must be at least 8 characters long"
                isInvalid={
                  formData.password !== undefined &&
                  formData.password.length < 8
                }
              />

              <Button
                onClick={handleLogin}
                className="border-2 mt-2 bg-[#E40046] rounded-full px-12 py-2 inline-block font-semibold "
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        <div className="flex w-1/3 min-h-screen bg-[#E40046] text-white items-center">
          <div className="mx-auto my-auto items-center">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">
              Fill up personal information and start journey with us.
            </p>
            <Button
              as={Link}
              href="/signup"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#E40046]"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
