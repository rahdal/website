"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import type { SessionData } from "./auth";

export function useAuth() {
  const [session, setSession] = useState<SessionData | null>(null);
  const isAuthenticated = Boolean(session && session.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/session", { cache: "no-store" });
        setSession(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirectPath = window.location.pathname;
      redirect(`/sign-in?redirect=${encodeURIComponent(redirectPath)}`);
    }
  }, [isLoading, isAuthenticated]);

  return { isAuthenticated, isLoading };
}


