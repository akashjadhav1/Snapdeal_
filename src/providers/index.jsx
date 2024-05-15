"use client";

import { NextUIProvider } from "@nextui-org/react";
import ReduxProvider from "./redux/ReduxProvider";
import QueryProvider from "./query/QueryProvider";
import ToastProvider from "./toast/ToastProvider";

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <QueryProvider>
        <ReduxProvider>
          <ToastProvider>{children}</ToastProvider>
        </ReduxProvider>
      </QueryProvider>
    </NextUIProvider>
  );
}
