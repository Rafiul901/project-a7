import AuthGuard from "@/components/shared/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRole="ADMIN">{children}</AuthGuard>;
}