"use client";

import React from "react";
import useCategories from "@/hooks/useCategories";
import { Accordion, AccordionItem, Skeleton, Slider } from "@nextui-org/react";
import Link from "next/link";

export default function FiltersMenu({ filters, setFilters }) {
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading)
    return (
      <div className="w-72 p-4 m-8 mb-auto bg-white shadow-xl rounded">
        <span className="text-xs mb-2 p-2">TOP CATEGORIES</span>
        {new Array(2).fill().map((_, index) => (
          <div key={index} className="p-2">
            <Skeleton className="w-full h-12" />
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
    <div className="flex w-1/4 m-8 bg-white rounded-xl p-4">
      <Accordion variant="light" isCompact>
        <AccordionItem
          title="Category"
          classNames={{
            title: "text-lg",
          }}
        >
          <Accordion variant="light" isCompact>
            {categories.map((category, index) => (
              <AccordionItem
                key={index}
                title={category.name}
                classNames={{
                  title: "text-md",
                }}
              >
                {" "}
                <div className="flex flex-col gap-2 text-sm">
                  {category.items &&
                    category.items.length > 0 &&
                    category.items.map((subCategory, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/products/${category.slug}/${subCategory.slug}`}
                        className="hover:bg-gray-300"
                      >
                        {subCategory.name}
                      </Link>
                    ))}{" "}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionItem>
        <AccordionItem
          title="Price"
          classNames={{
            title: "text-lg",
          }}
        >
          <Slider
            label="Price Range"
            step={50}
            minValue={0}
            maxValue={100000}
            defaultValue={[0, 100000]}
            value={[
              parseInt(filters.minPrice || "0"),
              parseInt(filters.maxPrice || "100000"),
            ]}
            onChange={(value) => {
              setFilters({
                ...filters,
                minPrice: value[0].toString(),
                maxPrice: value[1].toString(),
              });
            }}
            formatOptions={{ style: "currency", currency: "INR" }}
            className="max-w-md"
          />
        </AccordionItem>
      </Accordion>
    </div>
  );
}
