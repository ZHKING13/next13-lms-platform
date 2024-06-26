"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const isCoursePage = pathname?.includes("/dashboard/courses");
  const isSearchPage = pathname === "/dashboard/search";

  return (
      <>
          {/* {isSearchPage && (
              <div className="hidden md:block">
                  <SearchInput />
              </div>
          )} */}
          <div className="flex gap-x-2 ml-auto">
              {isTeacherPage || isCoursePage ? (
                  <Link href="/dashboard">
                      <Button size="sm" variant="ghost">
                          <LogOut className="h-4 w-4 mr-2" />
                          Retour
                      </Button>
                  </Link>
              ) : isTeacher(userId) ? (
                  <Link href="/dashboard/teacher/courses">
                      <Button size="sm" variant="ghost">
                          Mode Admin
                      </Button>
                  </Link>
              ) : null}
              <UserButton afterSignOutUrl="/" />
          </div>
      </>
  );
}