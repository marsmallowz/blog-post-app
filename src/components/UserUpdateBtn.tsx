"use client";

import { useUserModalContext } from "@/context/UserModalProvider";
import { User } from "@/model/user";

export default function UserUpdateBtn({ user }: { user: User }) {
  const { setMode, setUser } = useUserModalContext();
  return (
    <button
      onClick={() => {
        setMode("UPDATE");
        setUser(user);
      }}
      className="text-xs sm:text-base p-1 sm:p-2 text-white bg-slate-400 hover:bg-slate-500"
    >
      Update
    </button>
  );
}
