"use client";

import { useUserModalContext } from "@/context/UserModalProvider";
import { User } from "@/model/user";

export default function UserDeleteBtn({ user }: { user: User }) {
  const { setMode, setUser } = useUserModalContext();
  return (
    <button
      onClick={() => {
        setMode("DELETE");
        setUser(user);
      }}
      className="text-xs sm:text-base p-1 sm:p-2 border bg-gray-100 hover:bg-gray-200"
    >
      Delete
    </button>
  );
}
