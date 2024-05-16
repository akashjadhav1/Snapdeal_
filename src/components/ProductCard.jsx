import React from "react";
import Image from "next/image";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { renderStars } from "@/utils/renderStars";
import { useSelector } from "react-redux";

export default function ProductCard({
  product,
  handleClick,
  handleShortlistToggle,
}) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const shortlist = useSelector((state) => state.userData.shortlist);
  const isShortlisted = isAuthenticated && shortlist.includes(product.id);

  const handleCardClick = () => handleClick(product.id);
  const handleHeartClick = (e) => {
    e.stopPropagation();
    handleShortlistToggle(product.id);
  };

  return (
    <div
      className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden h-64">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute inset-0 w-full h-full"
        />
        <div
          className="absolute top-2 right-2 cursor-pointer text-2xl"
          onClick={handleHeartClick}
        >
          {isShortlisted ? (
            <GoHeartFill className="text-red-500" />
          ) : (
            <GoHeart className="text-gray-500" />
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full py-2 bg-blue-500 text-white text-center opacity-0 transition-opacity duration-300 hover:opacity-100">
          View Product
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-md text-black truncate ml-1">{product.title}</h3>
        <div className="flex text-[gold] text-xs">
          {renderStars(Math.round(product.rating.rate))}
        </div>
        <p className="text-lg mt-2 ml-1">Rs. {product.price}</p>
      </div>
    </div>
  );
}
