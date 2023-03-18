import { SignIn } from "@clerk/nextjs/app-beta";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return <SignIn />;
}

export const runtime = "edge";
