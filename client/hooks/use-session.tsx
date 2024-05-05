"use client";

import { useState, useEffect } from "react";

export const useSession = (): string | null => {
  const [jwt, setJWT] = useState<string | null>(() =>
    sessionStorage.getItem("notion_jwt")
  );

  useEffect(() => {
    const storedJWT = sessionStorage.getItem("notion_jwt");
    setJWT(storedJWT);
  }, []);

  return jwt;
};
