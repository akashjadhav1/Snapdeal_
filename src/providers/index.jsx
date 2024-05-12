"use client";

import { NextUIProvider } from "@nextui-org/react";
import ReduxProvider from "./redux/ReduxProvider";

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </NextUIProvider>
  );
}
