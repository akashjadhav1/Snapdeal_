"use client";

import { Button, Image, Spinner } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useProductList from "@/hooks/useProductsList";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/features/userData/userDataThunks";
import { useEffect } from "react";

const Cart = () => {
  const { status, cart } = useSelector((state) => state.userData);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();

  const isUserDataLoading = status !== "fulfilled";
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProductList(
    cart && Array.isArray(cart) ? cart.map((item) => item.id) : []
  );

  const handleGoBack = () => router.back();

  if (isLoading || isUserDataLoading) {
    return (
      <div className="flex min-w-full h-screen justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-w-full h-screen justify-center items-center">
        <p>{error.message}</p>
      </div>
    );
  }

  // Calculate subtotal
  const subtotal = products
    ? products
        .filter((product) => product)
        .reduce((acc, curr) => {
          const cartItem = cart.find((item) => item && item.id === curr.id);
          if (curr && curr.price && cartItem && cartItem.quantity) {
            return acc + curr.price * cartItem.quantity;
          } else {
            return acc;
          }
        }, 0)
    : 0;

  // Calculate taxes (18% of subtotal)
  const taxAmount = subtotal * 0.18;

  // Calculate total (subtotal + taxes)
  const total = subtotal + taxAmount;

  // Functions to handle cart operations
  const handleCartOperation = (id, operation) => {
    if (operation === "remove") {
      dispatch(removeFromCart(id));
    } else if (operation === "increment") {
      dispatch(incrementQuantity(id));
    } else if (operation === "decrement") {
      dispatch(decrementQuantity(id));
    }
  };

  // Function to handle shipping
  const handleShipping = () => {
    if (isAuthenticated) {
      console.log("Shipping");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="dark container mx-auto px-8 py-8 border shadow-xl mt-5 rounded-xl">
      <div className="mb-5">
        <Button radius="md" color="secondary" onClick={handleGoBack}>
          <FaArrowLeft className="text-md" />
          Go back
        </Button>
      </div>

      <div className="">
        <h1 className="text-3xl">Review your order</h1>
      </div>

      {products.filter((product) => product).length === 0 ? (
        <div className="flex min-w-full pt-10 justify-center items-center">
          <p>Your cart is empty</p>
        </div>
      ) : (
        products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="flex justify-between items-center mt-10"
            >
              <div className="flex">
                <Image
                  src={product.image}
                  alt={product.title}
                  classNames={{
                    wrapper: "flex object-contain h-24 w-24 bg-white",
                    img: "object-contain w-full h-full",
                  }}
                />
                <div className="mx-10 p-2 text-lg">
                  <p className="">{product.title}</p>
                  <div className="flex">
                    <p className="text-gray-400">
                      Color: <span className="text-white">Black</span>
                    </p>
                    <p className="text-gray-400 mx-3">
                      Size: <span className="text-white">42</span>
                    </p>
                  </div>
                  <p>
                    Rs. {product.price}{" "}
                    <span className="text-gray-400">X {cartItem.quantity}</span>
                  </p>
                  <div className="flex items-center justify-between max-w-12 text-md">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="text"
                      onClick={() =>
                        handleCartOperation(product.id, "decrement")
                      }
                      className="bg-gray-200 rounded-full"
                    >
                      -
                    </Button>
                    <span className="mx-2">{cartItem.quantity}</span>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="text"
                      onClick={() =>
                        handleCartOperation(product.id, "increment")
                      }
                      className="bg-gray-200 rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="flex items-center justify-center w-10 h-10"
                  onClick={() => handleCartOperation(product.id, "remove")}
                >
                  &#10006;
                </button>
              </div>
            </div>
          );
        })
      )}

      <hr className="mt-10" />

      <div className="mt-5">
        <div className="flex justify-between mt-2">
          <p>Subtotal</p>
          <p>Rs. {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Tax (18%)</p>
          <p>Rs. {taxAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Total</p>
          <p>Rs. {total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          color="primary"
          size="lg"
          variant="bordered"
          onClick={handleShipping}
        >
          Continue to Shipping
        </Button>
      </div>
    </div>
  );
};

export default Cart;
