"use client";

import { Menu, Bell } from "lucide-react";
import SidebarContent from "./SidebarContent";
import { SignedIn, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";

const Header = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true); // You can replace with actual notification state

  return (
    <header className="w-full h-16 border-b flex items-center justify-between px-4 md:px-6 bg-white dark:bg-gray-900 shadow-sm">
      {/* Mobile Sidebar Button */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-0">
            <SidebarContent closeSidebar={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* App Title */}
      <Link
        href="/"
        className="text-lg font-bold tracking-tight dark:text-white"
      >
        My App
      </Link>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Notifications with badge */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {hasNotifications && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </Button>

        {/* User menu if signed in */}
        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName} />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 dark:bg-gray-800">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="w-full">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem
                onClick={() =>
                  signOut(() => (window.location.href = "/auth/login"))
                }
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
