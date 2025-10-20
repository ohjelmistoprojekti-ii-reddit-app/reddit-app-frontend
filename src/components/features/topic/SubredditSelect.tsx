"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSubreddits } from "@/lib/api/getSubreddits";
import { SUBREDDIT_OPTIONS } from "@/lib/constants/subreddits";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function SubredditSelect({ selected }: { selected: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [options, setOptions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    (async () => {
      // Try to fetch subreddits from the backend
      // Fallback to hardcoded list if the fetch fails
      try {
        const subreddits = await getSubreddits();
        if (subreddits.length > 0) setOptions(subreddits); else setOptions([...SUBREDDIT_OPTIONS]);
      } catch {
        setOptions([...SUBREDDIT_OPTIONS]);
      }
    })();
  }, []);

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("subreddit", value); else params.delete("subreddit");

    params.delete("category");

    startTransition(() => router.push(`/?${params.toString()}`));
  };

  return (
    <Select value={selected} onValueChange={onChange} disabled={isPending || options.length === 0}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select subreddit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((s) => (
          <SelectItem key={s} value={s}>{s}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
