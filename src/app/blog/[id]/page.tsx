"use client";

import { POST_QUERY } from "@/graphql/posts";
import { useQuery } from "@apollo/client";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { postId: params.id },
  });

  const post = data?.post;
  if (error) return <p>Error: {error.message}</p>;
  if (!post) return <p>Post not found </p>;
  return (
    <div className="">
      <div className="font-bold text-xl mb-2 text-gray-500">
        Post Details #{post.id}
      </div>
      <div className="font-semibold text-2xl mb-1">{post.title}</div>
      <div className="mb-5">{post.body}</div>
      <div className="font-semibold mb-0.5 text-gray-500">
        {post.comments.edges.length ? "Comments:" : "No comments yet."}
      </div>
      <div className="flex flex-col divide-y-2">
        {post.comments.edges.map((edge: any) => {
          const comment = edge.node;
          return (
            <div key={comment.id} className="flex flex-col py-2">
              <div className="italic font-medium">{comment.name}</div>
              <div className="text-gray-500">{comment.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
