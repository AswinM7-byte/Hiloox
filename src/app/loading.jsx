"use client";
import { useEffect } from "react";
import { usePageLoading } from "@/components/LoadingProvider";
export default function Loading() {
  const begin = usePageLoading();
  useEffect(() => begin(), [begin]);
  return null;
}
