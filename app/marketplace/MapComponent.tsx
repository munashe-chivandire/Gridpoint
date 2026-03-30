"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import type { Property } from "./types"

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

interface MapComponentProps {
  properties: Property[]
  selectedId: number | null
  hoveredId: number | null
  onSelect: (id: number) => void
  onHover: (id: number | null) => void
  onBoundsChange?: (bounds: MapBounds) => void
}

export default function MapComponent({
  properties,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  onBoundsChange,
}: MapComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<Record<number, any>>({})
  const onBoundsChangeRef = useRef(onBoundsChange)
  onBoundsChangeRef.current = onBoundsChange

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const L = require("leaflet")

    // Fix default icon path issue
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    })

    const map = L.map(containerRef.current, {
      center: [-17.8292, 31.0522],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    })

    // Dark CartoDB tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "© OpenStreetMap contributors © CARTO",
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map)

    // Custom attribution (small)
    L.control.attribution({ position: "bottomleft", prefix: false }).addTo(map)

    // Zoom controls (top-right)
    L.control.zoom({ position: "topright" }).addTo(map)

    // Helper to emit current bounds
    const emitBounds = () => {
      const b = map.getBounds()
      onBoundsChangeRef.current?.({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      })
    }

    // Fire on move/zoom end
    map.on("moveend", emitBounds)
    map.on("zoomend", emitBounds)

    // Add markers
    properties.forEach((prop) => {
      const isSelected = prop.id === selectedId
      const isHovered = prop.id === hoveredId

      const icon = L.divIcon({
        className: "",
        html: `<div class="price-pin ${isSelected ? "selected" : ""}" data-id="${prop.id}">
          $${prop.price >= 1000000
            ? (prop.price / 1000000).toFixed(1) + "M"
            : Math.round(prop.price / 1000) + "K"}
        </div>`,
        iconSize: [72, 30],
        iconAnchor: [36, 15],
      })

      const marker = L.marker([prop.lat, prop.lng], { icon })
        .addTo(map)
        .on("click", () => onSelect(prop.id))
        .on("mouseover", () => onHover(prop.id))
        .on("mouseout", () => onHover(null))

      markersRef.current[prop.id] = marker
    })

    mapRef.current = map

    // Emit initial bounds after map is ready
    map.whenReady(emitBounds)

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update markers when selection/hover changes
  useEffect(() => {
    if (!mapRef.current) return
    const L = require("leaflet")

    properties.forEach((prop) => {
      const marker = markersRef.current[prop.id]
      if (!marker) return

      const isSelected = prop.id === selectedId
      const isHovered = prop.id === hoveredId

      const icon = L.divIcon({
        className: "",
        html: `<div class="price-pin ${isSelected ? "selected" : isHovered ? "hovered" : ""}" data-id="${prop.id}">
          $${prop.price >= 1000000
            ? (prop.price / 1000000).toFixed(1) + "M"
            : Math.round(prop.price / 1000) + "K"}
        </div>`,
        iconSize: [72, 30],
        iconAnchor: [36, 15],
      })
      marker.setIcon(icon)
    })
  }, [selectedId, hoveredId, properties])

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
      <style>{`
        .price-pin {
          background: rgba(1, 40, 58, 0.92);
          border: 1.5px solid rgba(0, 176, 240, 0.35);
          color: #eef5f8;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          padding: 0 10px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
        }
        .price-pin:hover, .price-pin.hovered {
          background: rgba(0, 176, 240, 0.2);
          border-color: #00B0F0;
          color: #fff;
          transform: scale(1.08);
          box-shadow: 0 0 0 3px rgba(0,176,240,0.15), 0 4px 16px rgba(0,0,0,0.5);
          z-index: 999;
        }
        .price-pin.selected {
          background: #00B0F0;
          border-color: #00B0F0;
          color: #012230;
          font-weight: 700;
          transform: scale(1.12);
          box-shadow: 0 0 0 4px rgba(0,176,240,0.25), 0 6px 20px rgba(0,176,240,0.3);
          z-index: 1000;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: none !important;
        }
        .leaflet-control-zoom a {
          background: rgba(1, 40, 58, 0.9) !important;
          border: 1px solid rgba(0,176,240,0.2) !important;
          color: #6e9bb0 !important;
          backdrop-filter: blur(10px);
          width: 32px !important;
          height: 32px !important;
          line-height: 30px !important;
          font-size: 16px !important;
          transition: all 0.15s ease !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(0,176,240,0.15) !important;
          color: #00B0F0 !important;
          border-color: rgba(0,176,240,0.4) !important;
        }
        .leaflet-control-zoom-in {
          border-radius: 6px 6px 0 0 !important;
          margin-bottom: 1px;
        }
        .leaflet-control-zoom-out {
          border-radius: 0 0 6px 6px !important;
        }
        .leaflet-container {
          background: #011c28;
        }
        .leaflet-attribution-flag {
          display: none !important;
        }
        .leaflet-control-attribution {
          background: rgba(1, 25, 37, 0.7) !important;
          color: #3a6478 !important;
          font-size: 10px !important;
          backdrop-filter: blur(6px);
          border-radius: 4px !important;
          border: none !important;
        }
        .leaflet-control-attribution a {
          color: #6e9bb0 !important;
        }
      `}</style>
    </div>
  )
}
