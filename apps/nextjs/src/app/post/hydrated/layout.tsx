import CreatePost from "../create-post";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="font-bold text-2xl">Hydrated Messages</h1>
        <p className="text-xs font-thin">1) Fetched on the server</p>
        <p className="text-xs font-thin">
          2) The state is hydrated by react-query/trpc on the client
        </p>
      </div>

      <div className="mb-8">
        <CreatePost />
      </div>

      {children}
    </>
  );
}
