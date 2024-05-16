"use client";

import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, signup } from "@/features/user/userSlice";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";

function Signup() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [formData, setFormData] = useState({
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  if (isAuthenticated) {
    router.back();
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    dispatch(signup(formData));
  };

  const handleGoogleSignup = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image
        src={Logo}
        alt="Snapdeal"
        priority={true}
        className="absolute left-8 top-8"
      />
      <div className="bg-white rounded-2xl flex w-full min-h-screen items-center">
        <div className="flex w-1/3 min-h-screen bg-[#E40046] text-white items-center">
          <div className="mx-auto my-auto items-center">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">
              If you already have an account, please sign in.
            </p>
            <Button
              as={Link}
              href="/login"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#E40046]"
            >
              Sign In
            </Button>
          </div>
        </div>

        <div className="w-2/3 p-5">
          <div className="py-10 bg-white flex flex-col items-center">
            <h2 className="text-3xl font-bold text-[#E40046] inline-block mb-2">
              Create a new account
            </h2>
            <div className="border-2 w-12 border-green-500 mb-2"></div>
            <Button
              onClick={handleGoogleSignup}
              className="flex bg-white justify-center my-2 border shadow-lg rounded-lg p-2 cursor-pointer items-center"
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </Button>
            <p className="text-gray-500 my-2">or use your email account</p>
            <div className="flex flex-col items-center gap-2">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                startContent={<FaRegEnvelope className="text-gray-400 mr-2" />}
                className="bg-gray-100 outline-none text-sm"
                errorMessage="Invalid email"
                isInvalid={
                  formData.email !== undefined &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                }
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                startContent={<MdLockOutline className="text-gray-400 mr-2" />}
                className="bg-gray-100 outline-none text-sm"
                errorMessage="Password must be at least 8 characters long"
                isInvalid={
                  formData.password !== undefined &&
                  formData.password.length < 8
                }
              />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirmPassword}
                startContent={<MdLockOutline className="text-gray-400 mr-2" />}
                className="bg-gray-100 outline-none text-sm"
                errorMessage="Passwords do not match"
                isInvalid={
                  formData.confirmPassword !== undefined &&
                  formData.confirmPassword !== formData.password
                }
              />
              <Button
                onClick={handleSignup}
                className="border-2 mt-2 bg-[#E40046] rounded-full px-12 py-2 inline-block font-semibold "
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
