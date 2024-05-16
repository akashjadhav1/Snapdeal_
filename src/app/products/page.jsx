"use client";

import FiltersMenu from "@/components/FiltersMenu";
import Products from "@/components/Products";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DefaultProducts() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  return (
    <div className="flex mx-auto bg-[whitesmoke] min-h-screen">
      <FiltersMenu filters={filters} setFilters={setFilters} />
      <Products filters={filters} />
    </div>
  );
}
