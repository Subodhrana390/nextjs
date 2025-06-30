import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const user = await currentUser();
  if (!user || user.publicMetadata?.role !== "admin") {
    redirect("/not-authorized");
  }

  return <>{children}</>;
}
