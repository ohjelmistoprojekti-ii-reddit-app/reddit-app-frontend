"use client"

import { useState } from "react"
import WorldSvg from "../../../assets/world.svg"
import MapDialog from "@/components/features/map/MapDialog"

const clickableCountries = ["FI", "SE", "IT", "MX", "ES"]

type countryDetails = {
  id: string
  name: string | null
}

export default function WorldMap() {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [country, setCountry] = useState<countryDetails>({ id: '', name: '' })

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGPathElement
    if (target.tagName === "path" && clickableCountries.includes(target.id)) {
      console.log(`Clicked! Id: ${target.id} Name: ${target.getAttribute("name")}`)
      setCountry({ 
        id: target.id, 
        name: target.getAttribute("name") 
      } as countryDetails)
      setDialogOpen(true)
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-auto p-10">
        <WorldSvg 
            className="w-full h-auto"
            onClick={handleClick}
    
        />
        <MapDialog
          details={country}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
    </div>
  );
}