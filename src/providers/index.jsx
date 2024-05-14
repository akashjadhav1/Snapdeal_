"use client";

import { NextUIProvider } from "@nextui-org/react";
import ReduxProvider from "./redux/ReduxProvider";
import QueryProvider from "./query/QueryProvider";

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <QueryProvider>
        <ReduxProvider>{children}</ReduxProvider>
      </QueryProvider>
    </NextUIProvider>
  );
}
