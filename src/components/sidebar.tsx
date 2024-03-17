"use client";

import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image, { type StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import logo from "@/assets/images/logo.svg";
import {
  FolderIcon,
  GroupIcon,
  LightbulbIcon,
  LogOutIcon,
  Users2Icon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { logout } from "@/api/auth";

const SidebarItem = ({
  item,
  path,
  router,
  icon,
}: {
  item: string;
  path: string;
  router: AppRouterInstance;
  icon: React.JSX.Element;
}) => (
  // Webhook dummy commit
  <div
    className={`my-2 flex cursor-pointer items-center rounded-lg ${
      path === `/${item.toLowerCase()}` ? "bg-purple-200" : "hover:bg-gray-200"
    }`}
    onClick={() => router.push(`/${item.toLowerCase()}`)}
  >
    {icon}
  </div>
);

export default function Sidebar() {
  const router = useRouter();
  const path = usePathname();

  const handleLogout = async () => {
    void toast.promise(logout(), {
      loading: "Logging out...",
      success: "Logged out successfully!",
      error: "Something went wrong!",
    });
    void router.push("/");
  };

  return (
    <div className="fixed top-0 z-20 flex h-screen w-[60px] flex-col justify-between bg-background shadow-lg">
      <div className="mx-2 flex h-full flex-col py-6">
        <Link href="/home">
          <div className="my-2 flex cursor-pointer items-center whitespace-nowrap rounded-lg">
            <Image
              src={logo as StaticImageData}
              alt=""
              height={40}
              width={40}
              className="h-10 w-10 cursor-pointer"
            />
          </div>
        </Link>
        <div className="py-8">
          <SidebarItem
            item="Users"
            path={path}
            router={router}
            icon={
              <Users2Icon
                size={25}
                className="my-4 min-w-[45px]"
                color={
                  path === "/users"
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))"
                }
              />
            }
          />
          <SidebarItem
            item="Teams"
            path={path}
            router={router}
            icon={
              <GroupIcon
                size={25}
                className="my-4 min-w-[45px]"
                color={
                  path === "/teams"
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))"
                }
              />
            }
          />
          <SidebarItem
            item="Ideas"
            path={path}
            router={router}
            icon={
              <LightbulbIcon
                size={25}
                className="my-4 min-w-[45px]"
                color={
                  path === "/ideas"
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))"
                }
              />
            }
          />
          <SidebarItem
            item="Projects"
            path={path}
            router={router}
            icon={
              <FolderIcon
                size={25}
                className="my-4 min-w-[45px]"
                color={
                  path === "/projects"
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))"
                }
              />
            }
          />
        </div>
        <div className="mb-0 mt-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOutIcon size={25} color="hsl(var(--destructive))" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
