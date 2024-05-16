"use client";

import React from "react";
import useCategories from "@/hooks/useCategories";
import Link from "next/link";
import { Skeleton } from "@nextui-org/react";

export default function CategoryMenu() {
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading)
    return (
      <div className="w-72 p-4 m-8 mb-auto bg-white shadow-xl rounded">
        <span className="text-xs mb-2 p-2">TOP CATEGORIES</span>
        {new Array(8).fill().map((_, index) => (
          <div key={index} className="p-2">
            <Skeleton className="w-full h-6" />
          </div>
        ))}
      </div>
    );
  if (isError)
    return (
      <div className="w-72 p-4 bg-white shadow-xl rounded">
        <div className="text-center text-red-500">Error: {error.message}</div>
      </div>
    );

  return (
    <div className="hidden md:flex flex-col w-72 p-4 m-8 mb-auto bg-white shadow-xl rounded">
      <span className="text-xs mb-2 p-2">TOP CATEGORIES</span>
      {categories.map((category, index) => (
        <div key={index} className="text-sm p-2 hover:bg-gray-200">
          <Link href={`/products/${category.slug}`} className="h-6">
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
