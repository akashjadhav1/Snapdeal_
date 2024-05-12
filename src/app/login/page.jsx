"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const handleLogin = () => {
    console.log("Sign In");
  };

  const handleGoogleLogin = () => {
    console.log("Login With Google");
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
