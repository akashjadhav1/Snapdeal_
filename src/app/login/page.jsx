"use client";

import { login, loginWithGoogle } from "@/features/user/userSlice";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-4">
      <Input type="email" label="Email" onChange={handleChange} />
      <Input type="password" label="Password" onChange={handleChange} />
      <Button onClick={handleLogin}>Sign In</Button>
      <Button onClick={handleGoogleLogin}>Login With Google</Button>
    </div>
  );
}
