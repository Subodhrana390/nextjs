import Layout from "@/components/Layout";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!user || user.publicMetadata?.role !== "user") {
    redirect("/not-authorized");
  }
  return (
    <>
      <SignedIn>
        <Layout>{children}</Layout>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn redirectUrl="/auth/login" />
      </SignedOut>
    </>
  );
}
