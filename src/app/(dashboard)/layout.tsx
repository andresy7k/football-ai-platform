import { AuthGuard } from "@/app/auth/_components/AuthGuard";
import { AppShell } from "@/app/(dashboard)/_components/AppShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
