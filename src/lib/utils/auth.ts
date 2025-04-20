import { auth } from "@clerk/nextjs/server";

export async function getAuthData() {
  try {
    const { userId, sessionClaims } = await auth();
    return {
      userId,
      role: (sessionClaims?.metadata as { role?: string })?.role
    };
  } catch (error) {
    console.error("Error getting auth data:", error);
    return {
      userId: undefined,
      role: undefined
    };
  }
}