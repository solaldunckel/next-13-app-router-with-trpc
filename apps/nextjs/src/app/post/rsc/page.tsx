import { trpcRsc } from "../../../trpc/rsc/trpc";
import DeletePost from "../delete-post";
import Post from "../post";

export const metadata = {
  title: "RSC Messages",
};

export default async function Page() {
  const posts = await trpcRsc.post.all.fetch();

  if (posts.length === 0) {
    return <p className="font-thin text-sm">No posts found...</p>;
  }

  return (
    <ul className="flex gap-2 flex-col">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}

export const revalidate = 0;
export const runtime = "edge";
