"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="flex gap-5 font-medium text-xl pt-10 pb-5 px-3 sm:px-5 bg-gray-200 ">
      <Link
        href={"/"}
        className={pathname !== "/" ? "text-gray-500" : "text-black"}
      >
        Blogs
      </Link>
      <Link
        href={"/users"}
        className={pathname !== "/users" ? "text-gray-500" : "text-black"}
      >
        Users
      </Link>
    </div>
  );
}
