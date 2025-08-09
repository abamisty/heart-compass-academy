import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  BookOpen,
  Settings,
  Shield,
  FileText,
  Database,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Wand2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const adminMenuItems = [
  {
    title: "Overview",
    url: "/admin",
    icon: TrendingUp,
    group: "Dashboard"
  },
  {
    title: "Analytics",
    url: "/admin/analytics", 
    icon: BarChart3,
    group: "Dashboard"
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    group: "Management"
  },
  {
    title: "Content",
    url: "/admin/content",
    icon: BookOpen,
    group: "Management"
  },
  {
    title: "Curriculum",
    url: "/admin/curriculum",
    icon: Database,
    group: "Management"
  },
  {
    title: "Course Generator",
    url: "/admin/course-generator",
    icon: Wand2,
    group: "Management"
  },
  {
    title: "Safety Monitor",
    url: "/admin/safety",
    icon: Shield,
    group: "Safety"
  },
  {
    title: "Content Moderation",
    url: "/admin/moderation",
    icon: AlertTriangle,
    group: "Safety"
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: FileText,
    group: "System"
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
    group: "System"
  },
];

const menuGroups = [
  { name: "Dashboard", items: adminMenuItems.filter(item => item.group === "Dashboard") },
  { name: "Management", items: adminMenuItems.filter(item => item.group === "Management") },
  { name: "Safety", items: adminMenuItems.filter(item => item.group === "Safety") },
  { name: "System", items: adminMenuItems.filter(item => item.group === "System") },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/admin") {
      return currentPath === "/admin";
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) =>
    isActive(path) ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <div className="p-4 border-b">
          <h2 className={`font-bold text-lg ${collapsed ? "hidden" : "block"}`}>
            Admin Dashboard
          </h2>
          {collapsed && (
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
          )}
        </div>

        {menuGroups.map((group) => (
          <SidebarGroup key={group.name}>
            <SidebarGroupLabel className={collapsed ? "hidden" : "block"}>
              {group.name}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/admin"}
                        className={getNavCls(item.url)}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span className="ml-2">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}