"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import useProductList from "@/hooks/useProductsList";
import { useSelector } from "react-redux";

export default function Shortlist() {
  const shortlist = useSelector((state) => state.userData.shortlist);
  const { data, isLoading, isError, error } = useProductList(shortlist);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-5 mt-8">
        {new Array(20).fill().map((_, index) => (
          <Card key={index} className="max-w-[400px] w-full" radius="lg">
            <CardHeader
              as={Skeleton}
              className="flex items-center justify-center h-48 mx-4 max-w-[90%] mt-4 rounded-lg"
            />
            <CardBody className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <Skeleton className="w-1/2 rounded-lg">
                  <div className="h-6 bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-1/4 rounded-lg">
                  <div className="h-6 bg-default-200"></div>
                </Skeleton>
              </div>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-4 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </CardBody>
            <CardFooter>
              <Button
                as={Skeleton}
                size="small"
                className="bg-blue-700 text-white hover:bg-blue-800 w-full"
              ></Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-full mx-5 mt-8">
      {data.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}