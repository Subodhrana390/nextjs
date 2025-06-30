"use client";
import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <SignUp
        path="/auth/register"
        routing="path"
        signInUrl="/auth/login"
        redirectUrl="/dashboard"
      />
    </div>
  );
}
