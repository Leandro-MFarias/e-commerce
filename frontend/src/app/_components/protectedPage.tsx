"use client";

import { useUser } from "@/hooks/user-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function ProtectedPage({ children }: { children: ReactNode }) {
  const { data: user, isLoading, isError } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  if (isError) {
    router.push("/login");
    return null;
  }

  if (!user) {
    return null;
  }

  if (user.role !== "ADMIN") {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
