"use client";

import useUserRouter from "@/hooks/useUserRouter";

export default function SearchForm() {
  const { pushQuery } = useUserRouter();

  return (
    <input
      type="search"
      name="search"
      placeholder="Search"
      onChange={(e) => {
        pushQuery({ search: e.target.value, page: 1 });
      }}
      className="p-2 border outline-none focus:gray-blue-500 focus:border-gray-500"
    />
  );
}
