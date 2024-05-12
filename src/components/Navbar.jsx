"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";

export default function NavbarComponent() {
  const user = useSelector((state) => state.user);

  return (
    <Navbar className="bg-[#E40046]">
      <NavbarBrand className="min-w-36 max-w-36">
        <Link href="/">
          <Image src={Logo} alt="Snapdeal" priority={true} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex w-full gap-0 mx-12" justify="center">
        <NavbarItem className="min-w-full">
          <Input
            classNames={{
              base: "w-full h-10",
              mainWrapper: "h-full",
              input: "text-small p-4",
              inputWrapper:
                "h-full font-normal text-default-500 bg-white rounded-none",
            }}
            placeholder="Search for products and brands"
            size="sm"
            type="search"
          />
        </NavbarItem>
        <NavbarItem>
          <Button className="rounded-none bg-[#333333] text-white p-4 max-w-1/4">
            <IoSearchSharp className="text-white text-lg" />
            Search
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex">
        <NavbarItem>
          <Button className="rounded-none bg-transparent text-white p-4 min-w-30">
            Cart
            <IoCartOutline className="text-white text-xl" />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        {user.isAuthenticated || user.status !== "fulfilled" ? (
          <AvatarDropdown />
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </NavbarContent>
    </Navbar>
  );
}
