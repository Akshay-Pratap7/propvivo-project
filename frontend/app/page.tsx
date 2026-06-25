'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "../context/SessionContext";

export default function Home() {
  const { isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p className="text-zinc-600 dark:text-zinc-400">Redirecting...</p>
    </div>
  );
}
