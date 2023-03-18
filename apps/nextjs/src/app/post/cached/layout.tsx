import CreatePost from "../create-post";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="font-bold text-2xl">Cached Messages</h1>
        <p className="text-xs font-thin">revalidate every 30sec</p>
      </div>

      {children}
    </>
  );
}
