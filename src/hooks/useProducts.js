import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

async function fetchProducts(filters) {
  try {
    const response = await axios.get("/api/products", { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
}

export default function useProducts() {
  const [filters, setFilters] = useState({});

  const queryInfo = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 3600000, // 1 hour
  });

  return {
    filters,
    setFilters,
    ...queryInfo,
  };
}
