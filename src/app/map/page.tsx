"use client"

import WorldSvg from "../../../assets/world.svg"
import { useRouter } from "next/navigation"
import { CLICKABLE_COUNTRIES } from "@/lib/constants/clickableCountries"

export default function WorldMap() {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGPathElement
    if (target.tagName === "path") {
      const country = CLICKABLE_COUNTRIES.find(c => c.id === target.id)
      console.log(country)
      if(country) {
        console.log(`Clicked! id: ${target.id}, name: ${country.subredditName}`)
        router.push(`/map/dialog?country=${country.subredditName}`)
      }
      
    }
      
  }

  return (
    <div className="world-map flex items-center justify-center w-full h-auto p-10">
        <WorldSvg 
            className="w-full h-auto"
            onClick={handleClick}
        />
    </div>
  );
}