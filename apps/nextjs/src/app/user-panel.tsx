"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserPanel() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const onClick = async () => {
    await signOut();
    router.refresh();
  };

  if (!isLoaded) {
    return <div className="mb-8 font-thin text-xs">Loading...</div>;
  }

  return (
    <div className="rounded flex items-center flex-col mb-8">
      {user ? (
        <div className="bg-black/20 p-4 rounded flex flex-col items-start text-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="user_image"
              src={user.profileImageUrl}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-base h-full font-bold">
              {user.firstName} {user.lastName}
            </div>
          </div>
          <Link className=" text-blue-500 hover:opacity-80" href="/protected">
            Protected route
          </Link>
          <button className="text-blue-500 hover:opacity-80" onClick={onClick}>
            Sign out
          </button>
        </div>
      ) : (
        <Link
          className="border border-white/50 p-2 py-1 rounded hover:opacity-70 text-sm"
          href="/signin"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}
