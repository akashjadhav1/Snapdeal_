import {
  addToShortlist,
  removeFromShortlist,
} from "@/features/userData/userDataThunks";
import { useRouter } from "next/navigation";
import React from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

function ShortListHeart({ productId }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const shortlist = useSelector((state) => state.userData.shortlist);
  const isShortlisted = isAuthenticated && shortlist.includes(productId);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (isAuthenticated) {
      dispatch(
        isShortlisted
          ? removeFromShortlist(productId)
          : addToShortlist(productId)
      );
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      className="absolute top-4 right-4 m-2 cursor-pointer text-2xl z-10"
      onClick={handleHeartClick}
    >
      {isShortlisted ? (
        <GoHeartFill className="text-red-500" />
      ) : (
        <GoHeart className="text-gray-500" />
      )}
    </div>
  );
}

export default ShortListHeart;
