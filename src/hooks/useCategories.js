import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchCategories() {
  try {
    const response = await axios.get("/api/categories");
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
}

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 3600000,
  });
}
