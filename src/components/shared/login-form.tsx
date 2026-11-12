
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/use-auth";
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth.validation";

export default function LoginForm() {
  const { login, isLoggingIn } = useAuth();
const demoAccounts = [
  {
    label: "Customer Demo",
    email: process.env.NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_CUSTOMER_PASSWORD,
  },
  {
    label: "Delivery Agent Demo",
    email: process.env.NEXT_PUBLIC_DEMO_AGENT_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_AGENT_PASSWORD,
  },
  {
    label: "Admin Demo",
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD,
  },
];
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your account credentials to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Signing in..." : "Sign In"}
          </Button>

          <div className="space-y-2">
  <p className="text-center text-sm font-medium text-muted-foreground">
    Or try a demo account
  </p>

  {demoAccounts.map((account) => (
    <Button
      key={account.label}
      type="button"
      variant="outline"
      className="w-full"
      disabled={
        isLoggingIn || !account.email || !account.password
      }
      onClick={() =>
        login({
          email: account.email!,
          password: account.password!,
        })
      }
    >
      {account.label}
    </Button>
  ))}
</div>

          <p className="text-center text-sm text-muted-foreground">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
