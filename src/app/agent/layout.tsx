import AuthGuard from "@/components/shared/auth-guard";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRole="DELIVERY_AGENT">
      {children}
    </AuthGuard>
  );
}