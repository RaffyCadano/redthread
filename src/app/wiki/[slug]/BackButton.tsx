"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1.5 text-rt-muted hover:text-rt-white transition-colors text-sm"
    >
      <ArrowLeft size={14} />
      Back
    </button>
  );
}
