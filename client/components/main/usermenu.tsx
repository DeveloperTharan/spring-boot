"use client";

import React, { useState, useEffect } from "react";
import { useTransition } from "react";

import { jwtDecode } from "jwt-decode";
import { SignOut } from "@/action/auth";
import { getCookie } from "react-use-cookie";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "../ui/spinner";
import { Skeleton } from "../ui/skeleton";

import { CiSettings } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegCircleUser, FaRegUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const [isPending, startTransition] = useTransition();
  const [userInfo, setUserInfo] = useState<null | any>(null);
  const [error, setError] = useState<null | any>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const sessionJwt = getCookie("_notion_jwt");
        const decodedToken = jwtDecode(sessionJwt) as any;
        setUserInfo(decodedToken);
      } catch (error: any) {
        setError(error as any);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <Skeleton className="w-full h-8 rounded-lg" />;
  }

  const handleLogout = () => {
    startTransition(() => {
      SignOut().then(() => router.push("/"));
    });
  };

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-2 rounded-md">
        <FaRegCircleUser className="h-6 w-6 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground">
          {userInfo?.fullName!}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align={"start"} className="w-80">
        <DropdownMenuLabel>{userInfo?.sub!}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-3">
          <FaRegUser /> {userInfo?.fullName!}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-x-3">
          <CiSettings /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-3"
          onClick={handleLogout}
          disabled={isPending}
        >
          {isPending ? (
            <Spinner size={"lg"} />
          ) : (
            <>
              <AiOutlineLogout /> Log Out
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
