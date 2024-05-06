import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SideBar } from "@/components/main/sidebar";
import { jwtDecode } from "jwt-decode";

export const metadata: Metadata = {
  title: "Workspace | Notion",
  description: "Workspace | Notion",
};

export default async function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = cookies().get("_notion_jwt");
  if (!session) return redirect("/");

  if (session) {
    const timestamp = jwtDecode(JSON.stringify(session)).exp;
    const date = new Date(timestamp! * 1000);

    if (date < new Date()) return redirect("/");
  }

  return (
    <main className="w-full h-full flex">
      <div className="h-full sticky top-0 left-0 bg-secondary scrollbar-hide z-50">
        <SideBar />
      </div>
      <section className="flex-1 h-full overflow-y-auto z-10">
        {children}
      </section>
    </main>
  );
}
