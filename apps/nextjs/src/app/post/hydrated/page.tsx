import { HydrateClient } from "../../../trpc/client/trpc-client";
import { trpcRsc } from "../../../trpc/rsc/trpc";
import { Posts } from "./posts";

export const metadata = {
  title: "Hydrated Messages",
};

export default async function Page() {
  const posts = await trpcRsc.post.all.fetch();

  if (posts.length === 0) {
    return <p className="font-thin text-sm">No posts found...</p>;
  }

  const dehydratedState = await trpcRsc.dehydrate();

  return (
    <HydrateClient state={dehydratedState}>
      <Posts />
    </HydrateClient>
  );
}

export const revalidate = 0;
export const runtime = "edge";
