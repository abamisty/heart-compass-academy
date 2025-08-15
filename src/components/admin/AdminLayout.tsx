import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Home, LogOut } from "lucide-react";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Global Header */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-background border-b z-50 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-semibold text-lg">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <NavLink to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to App
              </NavLink>
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <div className="flex w-full pt-14">
          <AdminSidebar />
          <main className="flex-1 p-6 bg-muted/10">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}