import "../styles/globals.css";
import { ClientProviders } from "./client-providers";
import Header from "./header";
import UserPanel from "./user-panel";

export const metadata = {
  title: {
    template: "%s | Next.js 13 App Router Playground",
    default: "Next.js 13 App Router Playground",
  },
  description:
    "A Next.js 13 App Router Playground on the edge with tRPC, Clerk, Kysely, Planetscale and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex-col bg-gray-900 text-white flex justify-center items-center">
        <ClientProviders>
          <Header />
          <UserPanel />
          <div className="bg-black/20 p-4 rounded flex items-center flex-col w-[450px] sm:w-[600px]">
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
