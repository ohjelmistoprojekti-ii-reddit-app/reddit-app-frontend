"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSubreddits } from "@/lib/api/getSubreddits";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function SubredditSelect({ selected }: { selected: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subreddits, setSubreddits] = useState<string[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const list = await getSubreddits();
        if (!cancelled) {
          if (Array.isArray(list) && list.length > 0) {
            setSubreddits(list);
            setLoadError(null);
          } else {
            setSubreddits([]);
            setLoadError("Subreddits are not available");
          }
        }
      } catch {
        if (!cancelled) {
          setSubreddits([]);
          setLoadError("Failed to load subreddits. Try again later.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("subreddit", value);
    else params.delete("subreddit");

    startTransition(() => router.push(`/?${params.toString()}`));
  };

  const disabled = isPending || subreddits.length === 0;

  return (
    <Select value={selected} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select subreddit" />
      </SelectTrigger>
      <SelectContent>
        {subreddits.length === 0 ? (
          <SelectItem value={selected} disabled>
            {loadError ?? "Subreddits are not available"}
          </SelectItem>
        ) : (
          subreddits.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
