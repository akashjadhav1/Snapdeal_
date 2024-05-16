import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { login, loginWithGoogle } from "@/features/user/userSlice";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LoginModal({ isOpen, onOpenChange }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    dispatch(login(formData));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold text-red-500 mt-4 mb-4">
                  Sign in to Account
                </h2>
              </ModalHeader>
              <ModalBody>
                <div className="border-2 w-12 border-red-500 mb-2"></div>
                <Button
                  className="flex justify-center items-center border bg-white shadow-lg rounded-md p-3 cursor-pointer mb-2"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle className="text-2xl" />
                  <p className="font-semibold ml-3">Sign in with Google</p>
                </Button>
                <p className="text-gray-500 mb-2">or use your email account</p>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm mb-2"
                  onChange={handleChange}
                  contentLeft={<FaRegEnvelope className="text-gray-400 mr-2" />}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm mb-2"
                  onChange={handleChange}
                  contentLeft={<MdLockOutline className="text-gray-400 mr-2" />}
                />
              </ModalBody>
              <Button color="primary" onPress={handleLogin} className="mx-auto">
                Sign In
              </Button>
              <ModalFooter>
                <span className="mx-auto">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    onClick={onClose}
                    className="text-blue-800"
                  >
                    Sign Up
                  </Link>
                </span>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
