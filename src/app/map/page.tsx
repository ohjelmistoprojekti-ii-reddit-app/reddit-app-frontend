"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import WorldSvg from "../../../assets/world.svg";
import "@/styles/map.css";
import { getCountrySubreddits, type CountrySubreddit } from "@/lib/api/getCountrySubreddits";
import { getPostsByCountry } from "@/lib/api/getPostsByCountry";
import type { CountryTopPost } from "@/types/map.types";
import CountryStatsModal from "@/components/features/map/CountryStatsModal";
import { isAuthenticated } from "@/lib/utils/authUtils";

type Region = "all" | "europe" | "asia" | "africa" | "north_america" | "south_america";

const REGION_COUNTRIES: Record<Exclude<Region, "all">, string[]> = {
  europe: ["FI", "SE", "NO", "DK", "IS", "GB", "IE", "FR", "ES", "PT", "IT", "DE", "PL", "NL", "BE", "AT", "CH", "CZ", "GR", "RO", "BG", "HU", "SK", "HR", "SI", "RS", "BA", "ME", "MK", "AL", "EE", "LV", "LT", "BY", "UA", "MD", "TR"],
  asia: ["CN", "JP", "KR", "IN", "TH", "VN", "MY", "SG", "ID", "PH", "KH", "LA", "MM", "BD", "PK", "AF", "NP", "LK", "MN", "KZ", "UZ", "TM", "KG", "TJ", "RU"],
  africa: ["EG", "ZA", "NG", "KE", "ET", "TZ", "UG", "DZ", "MA", "TN", "LY", "SD", "SS", "SO", "GH", "CI", "CM", "AO", "MZ", "MW", "ZM", "ZW", "BW", "NA", "MG", "SN", "ML", "NE", "TD", "CF", "CD", "GA", "CG"],
  north_america: ["US", "CA", "MX", "GT", "HN", "SV", "NI", "CR", "PA", "CU", "DO", "HT", "JM", "BS", "BZ"],
  south_america: ["BR", "AR", "CL", "CO", "PE", "VE", "EC", "BO", "PY", "UY", "GY", "SR", "GF"]
};

// ViewBox coordinates for zooming into each region (fixed cropped areas)
// Format: [x, y, width, height] - exactly as shown in screenshots
const REGION_VIEWBOX: Record<Region, string> = {
  all: "0 0 2000 857",              // Full world view
  europe: "750 80 550 420",         // Europe zoom (Screenshot 1)
  asia: "1150 80 800 700",          // Asia & Oceania zoom (Screenshot 2)
  africa: "850 320 500 480",        // Africa zoom (Screenshot 3)
  north_america: "50 50 700 550",   // North America zoom (Screenshot 4)
  south_america: "350 400 500 450"  // South America zoom (Screenshot 5)
};

export default function MapPage() {
  const [countries, setCountries] = useState<CountrySubreddit[]>([]);
  const [selected, setSelected] = useState<CountrySubreddit | null>(null);
  const [posts, setPosts] = useState<CountryTopPost[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region>("all");
  const router = useRouter();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const availableIds = useMemo(() => new Set(countries.map(c => c.id)), [countries]);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      const data = await getCountrySubreddits();
      setCountries(data);
    })();
  }, []);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    
    // Apply zoom by changing viewBox to show only selected region
    svgEl.setAttribute('viewBox', REGION_VIEWBOX[selectedRegion]);
    
    // Set data-region attribute for CSS styling
    svgEl.setAttribute('data-region', selectedRegion);
    
    const allPaths = Array.from(svgEl.querySelectorAll("path"));
    
    for (const p of allPaths) {
      if (!p.id) continue;
      
      // Remove all region classes first
      p.classList.remove("is-available", "region-dimmed");
      
      // Check if country is available
      const isAvailable = availableIds.has(p.id);
      
      if (selectedRegion === "all") {
        if (isAvailable) p.classList.add("is-available");
      } else {
        const regionCountries = REGION_COUNTRIES[selectedRegion];
        const isInRegion = regionCountries.includes(p.id);
        
        if (isAvailable && isInRegion) {
          p.classList.add("is-available");
        } else if (!isInRegion) {
          p.classList.add("region-dimmed");
        }
      }
    }
  }, [availableIds, selectedRegion]);

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
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      {/* Page Title */}
      <div className="w-full bg-gradient-to-r from-orange-500 to-amber-400 py-6 md:py-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white text-center tracking-tight">
            Reddit Map
          </h1>
          <p className="text-white/90 text-center mt-2 text-sm md:text-base">
            Explore trending topics from subreddits around the world
          </p>
        </div>
      </div>

      {/* Region Filter */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-sm font-medium text-gray-700 mr-2 hidden sm:inline">
              Filter by region:
            </span>
            <button
              onClick={() => setSelectedRegion("all")}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedRegion === "all"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🌍 All Regions
            </button>
            <button
              onClick={() => setSelectedRegion("europe")}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedRegion === "europe"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🇪🇺 Europe
            </button>
            <button
              onClick={() => setSelectedRegion("asia")}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedRegion === "asia"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🌏 Asia & Oceania
            </button>
            <button
              onClick={() => setSelectedRegion("africa")}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedRegion === "africa"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🌍 Africa
            </button>
            <button
              onClick={() => setSelectedRegion("north_america")}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedRegion === "north_america"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🌎 North America
            </button>
            <button
              onClick={() => setSelectedRegion("south_america")}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedRegion === "south_america"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🌎 South America
            </button>
          </div>
        </div>
      </div>

      {/* Map Container with Zoom and Scrolling */}
      <div className="flex-1 w-full overflow-hidden">
        <div 
          ref={containerRef}
          className="map-zoom-container w-full h-full overflow-auto"
        >
          <div className="map-zoom-wrapper">
            <WorldSvg
              ref={svgRef}
              className="world-svg-zoom"
              onClick={handleClick}
              aria-label="Interactive world map showing Reddit activity by country"
              role="img"
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full bg-gray-50 border-t border-gray-200 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-blue-300 border border-gray-400"></div>
              <span className="text-gray-700">Available data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-gray-300 border border-gray-400"></div>
              <span className="text-gray-700">No data</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 italic">💡 Click on highlighted countries to view trends</span>
            </div>
          </div>
        </div>
      </div>

      <CountryStatsModal
        open={open}
        onClose={() => setOpen(false)}
        countryName={selected?.subreddit ?? ""}
        posts={posts}
      />
    </div>
  );
}