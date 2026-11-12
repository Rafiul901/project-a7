import PublicHeader from "@/components/layouts/public-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen flex-1">
        {children}
      </main>
    </>
  );
}