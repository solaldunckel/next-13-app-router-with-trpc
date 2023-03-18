"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { trpcClient } from "../../trpc/client/trpc-client";

export default function DeletePost({ id }: { id: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deletePost = trpcClient.post.delete.useMutation({
    onSuccess: (data) => {
      startTransition(() => {
        router.refresh();
      });
    },
  });

  // Create inline loading UI
  const isMutating = deletePost.isLoading || isPending;

  return (
    <button
      disabled={isMutating}
      type="submit"
      className="absolute right-0 top-0 p-1 font-bold hover:opacity-70 text-red-500"
      onClick={() => deletePost.mutate({ id })}
    >
      {"X"}
    </button>
  );
}
