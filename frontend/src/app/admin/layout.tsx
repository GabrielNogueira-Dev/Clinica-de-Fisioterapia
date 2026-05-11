// app/(admin)/layout.tsx
import AdminSidebar from "./AdminSidebar";
import Users from "../admin/users/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <AdminSidebar />
     
      {/* CONTEÚDO */}
      <main className="flex-1 p-6 bg-[#FFFFFF]">
        {children}
      </main>

    </div>
  );
}