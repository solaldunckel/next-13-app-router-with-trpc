import Link from "next/link";

export default function Header() {
  return (
    <div className="flex gap-4 mb-8 text-sm bg-black/20 w-full justify-center items-center py-4">
      <Link
        href="/"
        className="border border-white/50 p-2 hover:opacity-80 py-1 rounded"
      >
        Home
      </Link>
      <Link
        href="/post/rsc"
        prefetch={false}
        className="border border-white/50 p-2 hover:opacity-80 py-1 rounded"
      >
        SSR
      </Link>
      <Link
        href="/post/hydrated"
        prefetch={false}
        className="border border-white/50 p-2 hover:opacity-80 py-1 rounded"
      >
        Hydration
      </Link>
      <Link
        href="/post/cached"
        prefetch={false}
        className="border border-white/50 p-2 hover:opacity-80 py-1 rounded"
      >
        Cached
      </Link>
    </div>
  );
}
