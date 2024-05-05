"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          sessionStorage.removeItem("notion_jwt");
          return router.push("/");
        }}
      >
        SignOut
      </Button>
    </div>
  );
}

export default page;
