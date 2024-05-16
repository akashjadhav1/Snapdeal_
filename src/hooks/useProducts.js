import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import axios from "axios";
import { useRef, useEffect } from "react";

async function fetchProducts({ pageParam = 1, filters }) {
  try {
    const response = await axios.get("/api/products", {
      params: { ...filters, page: pageParam },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
}

export default function useProducts(filters = {}) {
  const intersectionRef = useRef(null);

  const { data, fetchNextPage, isFetching, isError, error } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, filters }),
    staleTime: 3600000,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const { ref: lastProductRef, entry } = useIntersection({
    root: intersectionRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  return {
    lastProductRef,
    data,
    isFetching,
    isError,
    error,
  };
}
