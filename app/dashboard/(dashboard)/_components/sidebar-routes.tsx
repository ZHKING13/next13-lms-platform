"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  // {
  //   icon: Compass,
  //   label: "Cours",
  //   href: "/dashboard/search",
  // },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Cours",
    href: "/dashboard/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Dashboard",
    href: "/dashboard/teacher/analytics",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/dashboard/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}