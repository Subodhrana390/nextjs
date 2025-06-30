import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "My App",
  description: "With header and sidebar",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider signInUrl="/auth/login" signUpUrl="/auth/register">
      <html lang="en">
        <body className="">
          {children}
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
