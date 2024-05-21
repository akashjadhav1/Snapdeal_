"use client";

import React from "react";
import { renderStars } from "@/utils/renderStars";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import ShortListHeart from "./ShortListHeart";
import { addToCart } from "@/features/userData/userDataThunks";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const cart = useSelector((state) => state.userData.cart);
  const isAddedToCart = cart.some((item) => item.id === product.id);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleCardClick = () => router.push(`/product/${product.id}`);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product.id));
  };

  return (
    <Card
      className="max-w-[400px] cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <CardHeader className="relative flex items-center justify-center h-24 lg:h-64">
        <Image
          alt={product.title}
          src={product.image}
          classNames={{
            wrapper: "object-contain h-full bg-white",
            img: "object-contain w-full h-full",
          }}
        />
        <div className="absolute top-0 lg:top-4 right-4 m-2 cursor-pointer text-2xl z-10">
          <ShortListHeart productId={product.id} />
        </div>
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
          className="bg-blue-700 hover:bg-blue-800 text-white w-full"
          isDisabled={isAddedToCart}
          onClick={handleAddToCart}
        >
          {isAddedToCart ? "Added" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
