"use client";

import React from "react";
import { Button, Image, Spinner } from "@nextui-org/react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { renderStars } from "@/utils/renderStars";
import useproduct from "@/hooks/useProduct";
import { addToCart } from "@/features/userData/userDataThunks";
import { useDispatch, useSelector } from "react-redux";
import ShortListHeart from "@/components/ShortListHeart";

function ProductOverview({ params }) {
  const id = params.id;
  const { data: product, isLoading, isError, error } = useproduct(id);
  const cart = useSelector((state) => state.userData.cart);
  const isAddedToCart =
    !isLoading && !isError && cart.some((item) => item.id === product.id);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product.id));
  };

  if (isLoading) {
    return (
      <div className="flex min-w-full h-screen justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="light h-screen mx-auto px-8 py-8 border shadow-lg mt-5">
      <div className="flex">
        <div className="flex items-center justify-center w-1/2 border border-gray-200 rounded-xl">
          <div className="relative w-[600px] h-[600px]">
            <Image
              src={product.image}
              alt={product.title}
              isZoomed
              classNames={{
                wrapper: "flex object-contain h-full w-full bg-white",
                img: "object-contain w-full h-full",
              }}
            />
          </div>
        </div>
        <div className="p-8 w-1/2">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <div className="flex items-center font-bold text-lg mt-4">
            Rating
            <span className="flex mx-4 text-[gold]">
              {renderStars(Math.round(product.rating.rate))}
            </span>
          </div>
          <div className="mt-2">
            <h1 className="font-bold text-xl">Rs. {product.price}</h1>
          </div>
          <div className="mt-5 w-3/4">
            <p>{product.description}</p>
          </div>
          <div className="flex mt-5 p-1 space-x-2">
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-900 rounded-full"></div>
          </div>
          <div className="mt-5 flex">
            <Button
              color="primary"
              size="lg"
              fullWidth
              className="flex items-center"
              isDisabled={isAddedToCart}
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="mr-2" />
              {isAddedToCart ? "Added" : "Add to Cart"}
            </Button>
            <div
              className={`flex mx-2 justify-center items-center rounded-xl h-12 w-12 border border-gray-400 text-4xl bg-white`}
            >
              <ShortListHeart productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductOverview;
