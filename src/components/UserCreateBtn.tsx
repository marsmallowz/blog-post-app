"use client";

import { useUserModalContext } from "@/context/UserModalProvider";
import React from "react";

export default function UserCreateBtn() {
  const { setMode, setUser } = useUserModalContext();

  return (
    <button
      onClick={() => {
        setMode("CREATE");
        setUser(null);
      }}
      className="text-white font-medium bg-gray-500 px-3 py-2 hover:bg-gray-600 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      Create User
    </button>
  );
}
