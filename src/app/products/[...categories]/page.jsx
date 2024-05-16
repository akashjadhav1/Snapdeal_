"use client";

import React, { useEffect, useState } from "react";
import Products from "@/components/Products";
import useCategories from "@/hooks/useCategories";
import { useSearchParams } from "next/navigation";
import FiltersMenu from "@/components/FiltersMenu";

export default function ProductsPage({ params }) {
  const searchParams = useSearchParams();
  const { data: categories, isLoading } = useCategories();
  const [filters, setFilters] = useState({
    q: searchParams.get("q") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    if (!isLoading && categories) {
      const category = categories.find(
        (cat) => cat.slug === params.categories[0]
      );
      const subcategory = category?.items.find(
        (subcat) => subcat.slug === params.categories[1]
      );
      setFilters((prev) => ({
        ...prev,
        category: category?.name || "",
        subcategory: subcategory?.name || "",
      }));
    }
  }, [categories, isLoading, params]);

  return (
    <div className="flex mx-auto bg-[whitesmoke] min-h-screen">
      <FiltersMenu filters={filters} setFilters={setFilters} />
      <Products filters={filters} />
    </div>
  );
}
