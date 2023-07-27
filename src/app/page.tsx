import PaginationNumber from "@/components/PaginationNumber";
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

  // const [result] = useQuery({
  //   query: USER_BY_ID_QUERY,
  //   variables: { userId: 3944166 },
  // });

  // console.log(result);

  // const { data, fetching, error } = result;
  // console.log(fetching);

  // const { loading, error, data } = useQuery(USER_BY_ID_QUERY, {
  //   variables: { userId: 3944166 },
  // });
  // console.log("data");

  // console.log(data);
  // const user = data?.user;

  // if (!user) return <p>User not found</p>;

  // return (
  //   <div>
  //     <h1>User Details</h1>
  //     <p>ID: {user.id}</p>
  //     <p>Name: {user.name}</p>
  //     <p>Email: {user.email}</p>
  //     <p>Gender: {user.gender}</p>
  //     <p>Status: {user.status}</p>
  //     <ul>
  //       {user.posts.edges.map((edge: any) => {
  //         const post = edge.node;
  //         return (
  //           <li key={post.id}>
  //             <h3>{post.title}</h3>
  //             <p>{post.body}</p>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
  return (
    <div>
      <div className="font-bold text-2xl">List Blogs</div>
      {blogs.length ? (
        <div className="flex flex-col gap-2 divide-y-2">
          {blogs.map(
            (blog: {
              id: number;
              user_id: number;
              title: string;
              body: string;
            }) => {
              return (
                <div key={blog.id} className="py-2">
                  <div>#{blog.id}</div>
                  <Link href={`/blog/${blog.id}`} className="font-bold">
                    {blog.title}
                  </Link>
                  <div className="text-sm">{blog.body}</div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        ""
      )}
      <PaginationNumber totalPages={totalPages} />
    </div>
  );
}
