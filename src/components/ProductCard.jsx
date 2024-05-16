"use client";

import React from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { renderStars } from "@/utils/renderStars";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import ShortListHeart from "./ShortListHeart";

export default function ProductCard({ product, handleClick }) {
  const cart = useSelector((state) => state.userData.cart);
  const isAddedToCart = cart.some((item) => item.id === product.id);

  const handleCardClick = () => handleClick(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Add to cart:", product.id);
  };

  return (
    <Card
      className="max-w-[400px] cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <CardHeader className="relative flex items-center justify-center h-64">
        <Image
          alt={product.title}
          src={product.image}
          classNames={{
            wrapper: "object-contain h-full bg-white",
            img: "object-contain w-full h-full",
          }}
        />
        <ShortListHeart productId={product.id} />
      </CardHeader>
      <CardBody className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <p className="text-md text-black w-1/2 truncate">{product.title}</p>
          <p className="text-md text-gray-700">Rs. {product.price}</p>
        </div>
        <div className="flex text-[gold] text-xs">
          {renderStars(Math.round(product.rating.rate))}
        </div>
      </CardBody>
      <CardFooter>
        <Button
          size="small"
          className="bg-blue-700 text-white hover:bg-blue-800 w-full"
          disabled={isAddedToCart}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
