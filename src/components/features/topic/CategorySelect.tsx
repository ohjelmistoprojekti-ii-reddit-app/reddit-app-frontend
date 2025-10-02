"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "@/lib/api/getCategories";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function CategorySelect({ selected }: { selected: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    (async () => {
      try {
        const list = await getCategories();
        setCategories(list);
      } catch {
        setCategories([]);
      }
    })();
  }, []);


  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("category", value); else params.delete("category");
    startTransition(() => router.push(`/?${params.toString()}`));
  };


  return (
    <Select value={selected} onValueChange={onChange} disabled={isPending || categories.length === 0}>
      <SelectTrigger className="w-64"><SelectValue placeholder="Выберите категорию" /></SelectTrigger>
      <SelectContent>
        {categories.length === 0 ? (
          <SelectItem value={selected} disabled>
            Categories are not available
          </SelectItem>
        ) : (
          categories.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))
      )}
      </SelectContent>
    </Select>
  );
}