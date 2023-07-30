"use client";

import { User } from "@/model/user";
import React, { useContext, useState } from "react";

type ModalMode = "CREATE" | "UPDATE" | "DELETE";

interface UserModalContextType {
  mode: ModalMode | null;
  setMode: React.Dispatch<React.SetStateAction<ModalMode | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Context = React.createContext<UserModalContextType | undefined>(
  undefined
);

export const useUserModalContext = (): UserModalContextType => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useUserModalContext must be used within a UserModalProvider"
    );
  }

  return context;
};

export const UserModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<ModalMode | null>(null);
  const value: UserModalContextType = {
    user,
    setUser,
    mode,
    setMode,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
