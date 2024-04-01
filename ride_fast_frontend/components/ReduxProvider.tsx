"use client";
import store from "@/utils/store/store";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
}

export default ReduxProvider;
