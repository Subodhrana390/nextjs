import { auth, clerkClient } from "@clerk/nextjs/dist/types/server";

export async function POST(role) {
  const { userId } = auth();
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetaData: {
      role,
    },
  });
  return new Response("Role Assigned");
}
