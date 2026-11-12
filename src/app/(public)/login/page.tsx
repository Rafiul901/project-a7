import LoginForm from "@/components/shared/login-form";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login | SwiftDrop",
  description: "Sign in to your SwiftDrop account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-muted-foreground">
            Sign in to manage your deliveries.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}