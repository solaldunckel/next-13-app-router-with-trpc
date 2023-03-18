import CreatePost from "../create-post";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="font-bold text-2xl">Server Rendered Messages</h1>
        <p className="text-xs font-thin">1) Fetched on the server</p>
        <p className="text-xs font-thin">2) Html is sent to the browser</p>
      </div>

      <div className="mb-8">
        <CreatePost />
      </div>

      {children}
    </>
  );
}
