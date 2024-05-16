"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import LogoMobile from "@/assets/logo-mobile.png";
import Image from "next/image";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";
import LoginModal from "./LoginModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NavbarComponent() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector((state) => state.user);
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize searchQuery if path starts with /products
  React.useEffect(() => {
    if (typeof path === "string" && path.startsWith("/products")) {
      const query = searchParams.get("q");
      if (query) {
        setSearchQuery(query);
      }
    }
  }, [path, searchParams]);

  const handleSearch = () => {
    // Conditionally redirect based on pathname
    if (path !== "/products") {
      router.push("/products?q=" + searchQuery);
    } else {
      router.replace({
        pathname: router.pathname,
        query: searchParams.toString() + `&q=${searchQuery}`,
      });
    }
  };

  if (path === "/login" || path === "/signup") return null;

  return (
    <Navbar className="bg-[#E40046] overflow-x-auto">
      <NavbarBrand
        as={Link}
        href="/"
        className="min-w-16 min-h-16 md:min-w-36 md:max-w-36"
      >
        <Image
          src={Logo}
          alt="Snapdeal"
          priority={true}
          className="hidden md:flex"
        />
        <Image
          src={LogoMobile}
          alt="Snapdeal"
          priority={true}
          className="md:hidden"
        />
      </NavbarBrand>
      <NavbarContent className="flex w-full mx-12" justify="center">
        <NavbarItem className="flex min-w-full">
          <Input
            classNames={{
              base: "w-1/2 md:w-3/4 max-w-3/4 h-10",
              mainWrapper: "h-full",
              input: "text-small p-4",
              inputWrapper:
                "h-full font-normal text-default-500 bg-white rounded-none",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products and brands"
            size="sm"
            type="search"
          />
          <Button
            className="rounded-none bg-[#333333] w-1/4 text-white p-4"
            onClick={handleSearch}
          >
            <IoSearchSharp className="text-white text-lg flex-shrink-0" />
            Search
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Button className="hidden md:flex rounded-none bg-transparent text-white p-4 min-w-30">
          Cart
          <IoCartOutline className="text-white text-xl" />
        </Button>
        {user.isAuthenticated || user.status !== "fulfilled" ? (
          <AvatarDropdown />
        ) : (
          <>
            <Button onClick={onOpen}>Login</Button>
            <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
