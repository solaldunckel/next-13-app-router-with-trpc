import type { FC } from "react";
import type { RouterOutputs } from "../../trpc/types";
import DeletePost from "./delete-post";

type PostProps = {
  post: RouterOutputs["post"]["all"][0];
};

const Post: FC<PostProps> = ({ post }) => {
  return (
    <div className="relative p-4 bg-slate-600/30 rounded">
      <li>{post.content}</li>
      <DeletePost id={post.id} />
      <li className="text-xs">by {post.author ?? "Guest"}</li>
      <li className="text-xs">{post.createdAt.toLocaleString()}</li>
    </div>
  );
};

export default Post;
