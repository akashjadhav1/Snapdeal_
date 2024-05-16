import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProduct(id) {
  try {
    const response = await axios.get("/api/products/" + id);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
}

export default function useproduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    staleTime: 3600000,
  });
}
