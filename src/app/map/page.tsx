"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import WorldSvg from "../../../assets/world.svg";
import "@/styles/map.css";
import { getCountrySubreddits, type CountrySubreddit } from "@/lib/api/getCountrySubreddits";
import { getPostsByCountry } from "@/lib/api/getPostsByCountry";
import type { CountryTopPost } from "@/types/map.types";
import CountryStatsModal from "@/components/features/map/CountryStatsModal";

export default function MapPage() {
  const [countries, setCountries] = useState<CountrySubreddit[]>([]);
  const [selected, setSelected] = useState<CountrySubreddit | null>(null);
  const [posts, setPosts] = useState<CountryTopPost[]>([]);
  const [open, setOpen] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const availableIds = useMemo(() => new Set(countries.map(c => c.id)), [countries]);

  useEffect(() => {
    (async () => {
      const data = await getCountrySubreddits();
      setCountries(data);
    })();
  }, []);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const allPaths = Array.from(svgEl.querySelectorAll("path"));
    for (const p of allPaths) {
      if (!p.id) continue;
      if (availableIds.has(p.id)) p.classList.add("is-available");
      else p.classList.remove("is-available");
    }
  }, [availableIds]);

  const handleClick = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGPathElement;
    if (target.tagName !== "path" || !target.id) return;
    if (!availableIds.has(target.id)) return;

    const country = countries.find(c => c.id === target.id);
    if (!country) return;

    setSelected(country);
    const data = await getPostsByCountry(country.subreddit);
    setPosts(data);
    setOpen(true);
  };

  return (
    <>
      <div className="world-map flex items-center justify-center w-full h-auto p-10">
        <WorldSvg
          ref={svgRef}
          className="world-svg w-full h-auto"
          onClick={handleClick}
          aria-label="World map"
          role="img"
        />
      </div>

      <CountryStatsModal
        open={open}
        onClose={() => setOpen(false)}
        countryName={selected?.subreddit ?? ""}
        posts={posts}
      />
    </>
  );
}