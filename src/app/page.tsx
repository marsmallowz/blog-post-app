import PaginationBlogs from "@/components/PaginationBlogs";
import { Blog } from "@/model/blog";
import Link from "next/link";

async function getBlogs(page: number) {
  const res = await fetch(
    `https://gorest.co.in/public/v2/posts?page=${page}&per_page=10`,
    {
      // next: { revalidate: 10 },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const result = await res.json();
  return {
    blogs: result,
    totalPages: parseInt(res.headers.get("x-pagination-pages") || "5"),
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const { blogs, totalPages } = await getBlogs(searchParams.page);
  return (
    <div>
      <div className="font-bold text-2xl">List Blogs</div>
      {blogs.length ? (
        <div className="flex flex-col gap-2 divide-y-2">
          {blogs.map((blog: Blog) => {
            return (
              <div key={blog.id} className="py-2">
                <div>#{blog.id}</div>
                <Link href={`/blog/${blog.id}`} className="font-bold">
                  {blog.title}
                </Link>
                <div className="text-sm">{blog.body}</div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <PaginationBlogs totalPages={totalPages} />
    </div>
  );
}
