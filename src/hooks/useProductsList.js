import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProductList(ids) {
  try {
    const response = await axios.get(
      "/api/products/group?ids=" + ids.join(",")
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
}

export default function useProductList(ids) {
  return useQuery({
    queryKey: ["productList", ids],
    queryFn: () => fetchProductList(ids),
    staleTime: 3600000,
  });
}
