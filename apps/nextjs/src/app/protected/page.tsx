import { auth, currentUser } from "@clerk/nextjs/app-beta";
import { redirect } from "next/navigation";
import { trpcRsc } from "../../trpc/rsc/trpc";

export const metadata = {
  title: "Protected",
};

export default async function Protected() {
  const { userId } = auth();

  if (!userId) {
    redirect("/signin");
  }

  const msg = await trpcRsc.protected.message.fetch();

  return <div>{msg}</div>;
}

export const runtime = "edge";
