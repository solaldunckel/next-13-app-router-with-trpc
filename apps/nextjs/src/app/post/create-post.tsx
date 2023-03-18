"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { trpcClient } from "../../trpc/client/trpc-client";

export default function CreatePost() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const [mutationDuration, setMutationDuration] = useState(0);

  const createPost = trpcClient.post.create.useMutation({
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
    },
  });

  // Create inline loading UI
  const isMutating = createPost.isLoading || isPending;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startTime = new Date();

    await createPost.mutateAsync({
      content,
    });

    const duration = new Date().getTime() - startTime.getTime();
    setMutationDuration(duration);
    setContent("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className="text-black p-2 py-1 rounded"
          placeholder="Create message"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isMutating}
        />
        <button
          type="submit"
          className="text-2xl font-bold ml-2 disabled:opacity-50"
          disabled={isMutating}
        >
          {">"}
        </button>
      </form>
      {mutationDuration ? (
        <div className="text-xs text-gray-500 py-1">
          <div>Duration: {mutationDuration}ms</div>
        </div>
      ) : null}
    </>
  );
}
