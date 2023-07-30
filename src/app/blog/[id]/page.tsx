"use client";
import { POST_QUERY } from "@/graphql/posts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { postId: params.id },
  });

  const post = data?.post;
  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Blog not found </div>;
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div
          onClick={() => {
            router.back();
          }}
          className="flex justify-center items-center text-gray-500 font-bold text-2xl hover:text-gray-600 cursor-pointer"
        >
          <FaChevronLeft />
        </div>

        <div className="font-bold text-xl text-gray-500">
          Blog Details #{post.id}
        </div>
      </div>
      <div className="font-semibold text-2xl mb-1">{post.title}</div>
      <div className="mb-4">{post.body}</div>
      <div className="font-semibold mb-0.5 text-gray-500">
        {post.comments.edges.length ? "Comments:" : "No comments yet."}
      </div>
      <div className="flex flex-col divide-y-2">
        {post.comments.edges.map(
          (edge: {
            node: {
              id: number;
              name: string;
              body: string;
            };
          }) => {
            const comment = edge.node;
            return (
              <div key={comment.id} className="flex flex-col py-2">
                <div className="italic font-medium">{comment.name}</div>
                <div className="text-gray-500">{comment.body}</div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
