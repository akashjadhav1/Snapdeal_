"use client";

import useCategories from "@/hooks/useCategories";
import React from "react";

export default function CategoryMenu() {
  const { data: categories, isLoading, isError, error } = useCategories();

  return <div></div>;
}
