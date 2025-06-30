"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn path="/auth/login" routing="path" signUpUrl="/auth/register" />
    </div>
  );
}
