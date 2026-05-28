"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 text-xs text-rt-muted hover:text-rt-white transition-colors bg-rt-bg/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-rt-border hover:border-rt-red/40 cursor-pointer"
    >
      <ArrowLeft size={12} />
      Back
    </button>
  );
}
