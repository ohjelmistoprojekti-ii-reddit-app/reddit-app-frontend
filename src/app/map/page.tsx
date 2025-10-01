"use client"

import WorldSvg from "../../../assets/world.svg"
import { useRouter } from "next/navigation"

const clickableCountries = [
  { id: "FI", name: "Finland", subredditName: "suomi" },
  { id: "SE", name: "Sweden", subredditName: "sweden" },
  { id: "IT", name: "Italy", subredditName: "italia" },
  { id: "MX", name: "Mexico", subredditName: "mexico" },
  { id: "ES", name: "Spain", subredditName: "spain" }
]


export default function WorldMap() {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGPathElement
    if (target.tagName === "path") {
      const country = clickableCountries.find(c => c.id === target.id)
      console.log(country)
      if(country) {
        console.log(`Clicked! id: ${target.id}, name: ${country.subredditName}`)
        router.push(`/map/dialog?country=${country.subredditName}`)
      }
      
    }
      
  }

  return (
    <div className="flex items-center justify-center w-full h-auto p-10">
        <WorldSvg 
            className="w-full h-auto"
            onClick={handleClick}
        />
    </div>
  );
}