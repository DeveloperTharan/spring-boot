import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Footer } from "@/components/landing/footer";
import { NavBar } from "@/components/landing/navbar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Your connected workspace for wiki, docs & projects | Notion",
  description: "Your connected workspace for wiki, docs & projects | Notion",
};

export default function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = cookies().get("_notion_jwt");
  if (session) return redirect("/workspace");

  return (
    <div className="w-full h-auto min-h-full">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
