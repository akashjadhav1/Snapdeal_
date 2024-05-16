"use client";

import React, { useEffect, useState } from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

export default function Products() {
  const [shortlist, setShortlist] = useState([]);
  const { lastProductRef, data, isFetching, isError, error } = useProducts();

  const handleClick = (id) => {
    console.log("Navigate to product page with id:", id);
  };

  const handleShortlistToggle = (id) => {
    setShortlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5 mt-8">
      {data.pages.map((page, pageIndex) =>
        page.products.map((product, productIndex) => {
          const isLastProduct =
            pageIndex === data.pages.length - 1 &&
            productIndex === page.products.length - 1;

          return (
            <ProductCard
              key={product.id}
              product={product}
              isLastProduct={isLastProduct}
              lastProductRef={lastProductRef}
              handleClick={handleClick}
              handleShortlistToggle={handleShortlistToggle}
              shortlist={shortlist}
            />
          );
        })
      )}
    </div>
  );
}
