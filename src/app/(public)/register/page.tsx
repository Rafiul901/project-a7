import RegisterForm from "@/components/shared/register-form";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Register | SwiftDrop",
  description: "Create your SwiftDrop customer account.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Create Your Account
          </h1>

          <p className="mt-2 text-muted-foreground">
            Join SwiftDrop and manage your deliveries.
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}