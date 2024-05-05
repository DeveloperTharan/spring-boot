import React from "react";
import { Metadata } from "next";
import { ValidateSession } from "@/components/validate-session";

/* import { SideBar } from "@/components/main/sidebar"; */

export const metadata: Metadata = {
  title: "Workspace | Notion",
  description: "Workspace | Notion",
};

export default async function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ValidateSession>
      <main className="w-full h-full flex">
        <div className="h-full sticky top-0 left-0 bg-secondary scrollbar-hide z-50">
          {/* <SideBar docs={docs} trash={trash} /> */}
        </div>
        <section className="flex-1 h-full overflow-y-auto z-10">
          {children}
        </section>
      </main>
    </ValidateSession>
  );
}
