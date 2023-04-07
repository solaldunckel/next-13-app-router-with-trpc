import DeletePost from "../delete-post";
import Post from "../post";

export const metadata = {
  title: "RSC Messages",
};

export default async function Page() {
  return (
    <>
      <ul className="flex gap-2 flex-col">
        <Post
          post={{
            author: "Guest",
            content: "Hello World",
            id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          }}
        />
      </ul>
    </>
  );
}

export const revalidate = 30;
export const runtime = "edge";
