"use client";

import { useSession } from "@/hooks/use-session";
import { redirect } from "next/navigation";
import React from "react";

export const ValidateSession = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = useSession();

  if (!session) redirect("/");

  return <>{children}</>;
};
