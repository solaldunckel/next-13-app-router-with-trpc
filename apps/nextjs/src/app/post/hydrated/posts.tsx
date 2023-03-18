"use client";

import { trpcClient } from "../../../trpc/client/trpc-client";
import Post from "../post";

export function Posts() {
  const { data: posts } = trpcClient.post.all.useQuery();

  if (!posts || posts.length === 0) {
    return <div>No posts</div>;
  }

  return (
    <ul className="flex gap-2 flex-col">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
