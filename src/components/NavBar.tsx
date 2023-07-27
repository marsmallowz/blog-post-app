import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex gap-5 font-medium text-xl pt-10 pb-5 px-5 bg-gray-200">
      <Link href={"/"}>Blogs</Link>
      <Link href={"/users"}>Users</Link>
    </div>
  );
}
