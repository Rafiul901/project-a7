import AuthGuard from "@/components/shared/auth-guard";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRole="CUSTOMER">{children}</AuthGuard>;
}