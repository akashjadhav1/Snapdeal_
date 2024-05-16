"use client";

import React from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

export default function Products() {
  const { lastProductRef, data, isFetching, isError, error } = useProducts();

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-full mx-5 mt-8">
      {data.pages.map((page, pageIndex) =>
        page.products.map((product, productIndex) => {
          const isLastProduct =
            pageIndex === data.pages.length - 1 &&
            productIndex === page.products.length - 1;

          return (
            <div ref={isLastProduct ? lastProductRef : null} key={product.id}>
              <ProductCard product={product} />
            </div>
          );
        })
      )}
    </div>
  );
}
