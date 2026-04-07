"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import {
  RiHeartLine,
  RiHeartFill,
  RiMapPinLine,
  RiSearchLine,
  RiFilter3Line,
  RiCloseLine,
  RiPhoneLine,
  RiMailLine,
  RiShareLine,
  RiHome4Line,
  RiBuilding2Line,
  RiBuilding4Line,
  RiArrowRightLine,
  RiCheckLine,
  RiImageLine,
  RiWaterFlashLine,
  RiSunLine,
  RiParkingLine,
  RiShieldCheckLine,
  RiTempColdLine,
  RiFireLine,
  RiPlantLine,
  RiUserLine,
  RiCalendarLine,
  RiRuler2Line,
  RiBarChartLine,
  RiMapLine,
} from "@remixicon/react"
import type { Property } from "./types"

import type { MapBounds } from "./MapComponent"

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "#011c28" }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#00B0F0", borderTopColor: "transparent" }}
        />
        <span className="text-xs tracking-widest uppercase" style={{ color: "#3a6478" }}>
          Loading map
        </span>
      </div>
    </div>
  ),
})

/* ── Mock property data ──────────────────────────────────────── */
const PROPERTIES: Property[] = [
  {
    id: 1,
    address: "14 Borrowdale Road",
    suburb: "Borrowdale",
    city: "Harare",
    price: 850000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    lot: 5000,
    type: "House",
    status: "For Sale",
    lat: -17.7282,
    lng: 31.0762,
    year: 2018,
    description:
      "An exceptional 5-bedroom residence nestled in the prestigious Borrowdale corridor. This architect-designed home blends contemporary finishes with generous living spaces, offering panoramic garden views and seamless indoor-outdoor flow. Featuring a heated pool, double garage, and advanced security, it represents the finest in Harare luxury living.",
    features: ["Heated Pool", "Double Garage", "Borehole", "Solar System", "Garden Cottage", "CCTV"],
    agent: { name: "Tendai Moyo", agency: "Knight Frank Zimbabwe", phone: "+263 772 123 456" },
    daysListed: 12,
    priceHistory: [
      { date: "Jan 2025", price: 920000 },
      { date: "Mar 2025", price: 880000 },
      { date: "Jun 2025", price: 850000 },
    ],
    images: [],
    saved: false,
  },
  {
    id: 2,
    address: "7 Ridgeway North",
    suburb: "Highlands",
    city: "Harare",
    price: 420000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    lot: 3500,
    type: "House",
    status: "For Sale",
    lat: -17.7958,
    lng: 31.0612,
    year: 2005,
    description:
      "A solidly built 4-bedroom home in the leafy suburb of Highlands. Recently renovated kitchen and bathrooms, with a mature garden and staff quarters. Ideal for families seeking a peaceful setting with quick access to Harare CBD.",
    features: ["Staff Quarters", "Borehole", "Alarm System", "Double Garage", "Vegetable Garden"],
    agent: { name: "Rudo Chikwanda", agency: "RE/MAX Zimbabwe", phone: "+263 773 987 654" },
    daysListed: 28,
    priceHistory: [
      { date: "Nov 2024", price: 450000 },
      { date: "Feb 2025", price: 430000 },
      { date: "May 2025", price: 420000 },
    ],
    images: [],
    saved: true,
  },
  {
    id: 3,
    address: "Unit 4B, Avondale Square",
    suburb: "Avondale",
    city: "Harare",
    price: 195000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    lot: 0,
    type: "Apartment",
    status: "For Sale",
    lat: -17.8062,
    lng: 31.0448,
    year: 2022,
    description:
      "Brand-new luxury 2-bedroom apartment in the sought-after Avondale Square complex. Open-plan living, premium finishes, and a private balcony. Enjoy concierge services, rooftop terrace, and secure basement parking in this modern development.",
    features: ["Rooftop Terrace", "Concierge", "Gym", "Basement Parking", "Generator Backup"],
    agent: { name: "Farai Mutangadura", agency: "Pam Golding Zimbabwe", phone: "+263 772 456 789" },
    daysListed: 5,
    priceHistory: [{ date: "Jun 2025", price: 195000 }],
    images: [],
    saved: false,
  },
  {
    id: 4,
    address: "22 Cork Road",
    suburb: "Greendale",
    city: "Harare",
    price: 310000,
    beds: 3,
    baths: 2,
    sqft: 1950,
    lot: 2200,
    type: "House",
    status: "For Sale",
    lat: -17.8121,
    lng: 31.1002,
    year: 2001,
    description:
      "Charming 3-bedroom family home in tranquil Greendale. Large covered patio, established garden, and a self-contained cottage. Borehole and solar give off-grid capability. Walking distance to top schools.",
    features: ["Solar System", "Borehole", "Cottage", "Covered Patio", "School Zoning"],
    agent: { name: "Tendai Moyo", agency: "Knight Frank Zimbabwe", phone: "+263 772 123 456" },
    daysListed: 41,
    priceHistory: [
      { date: "Dec 2024", price: 340000 },
      { date: "Mar 2025", price: 320000 },
      { date: "Jun 2025", price: 310000 },
    ],
    images: [],
    saved: false,
  },
  {
    id: 5,
    address: "The Residences, Pomona",
    suburb: "Pomona",
    city: "Harare",
    price: 1450000,
    beds: 6,
    baths: 5,
    sqft: 7200,
    lot: 10000,
    type: "House",
    status: "For Sale",
    lat: -17.7058,
    lng: 31.0921,
    year: 2021,
    description:
      "An extraordinary estate in the exclusive Pomona corridor. This architect-designed masterpiece spans 7,200 sqft across two floors, featuring a cinema room, wine cellar, spa bathroom, and 3-car garage. The landscaped grounds include a 25m lap pool, outdoor kitchen, and a private tennis court — the pinnacle of Harare luxury.",
    features: ["Lap Pool", "Tennis Court", "Cinema Room", "Wine Cellar", "3-Car Garage", "Smart Home", "Guest Wing"],
    agent: { name: "Rudo Chikwanda", agency: "RE/MAX Zimbabwe", phone: "+263 773 987 654" },
    daysListed: 8,
    priceHistory: [
      { date: "Apr 2025", price: 1600000 },
      { date: "Jun 2025", price: 1450000 },
    ],
    images: [],
    saved: false,
  },
  {
    id: 6,
    address: "Mount Pleasant Heights — Phase 1",
    suburb: "Mount Pleasant",
    city: "Harare",
    price: 280000,
    beds: 3,
    baths: 2,
    sqft: 1600,
    lot: 1800,
    type: "Development",
    status: "New Development",
    lat: -17.7752,
    lng: 31.0301,
    year: 2026,
    description:
      "Mount Pleasant Heights is a premium 48-unit gated residential development launching in Q3 2025. Choose from 2 and 3-bedroom townhouse configurations, each with a private garden, allocated parking, and access to a community clubhouse and swimming pool. Transfer duty benefits apply for off-plan purchasers.",
    features: ["Gated Community", "Clubhouse", "Pool", "Off-Plan Benefits", "Fibre Ready", "Generator"],
    agent: { name: "Farai Mutangadura", agency: "Pam Golding Zimbabwe", phone: "+263 772 456 789" },
    daysListed: 2,
    priceHistory: [{ date: "Jun 2025", price: 280000 }],
    images: [],
    saved: false,
  },
  {
    id: 7,
    address: "18 Alexander Park Drive",
    suburb: "Alexandra Park",
    city: "Harare",
    price: 560000,
    beds: 4,
    baths: 3,
    sqft: 3100,
    lot: 4000,
    type: "House",
    status: "For Sale",
    lat: -17.8198,
    lng: 31.0498,
    year: 2010,
    description:
      "A refined 4-bedroom home in the tranquil Alexandra Park. Beautifully landscaped with a heated pool, open-plan kitchen/lounge, and a cottage suite. Recently renovated with imported fittings and a fully off-grid solar system.",
    features: ["Heated Pool", "Solar System", "Cottage Suite", "Imported Fittings", "Borehole"],
    agent: { name: "Tendai Moyo", agency: "Knight Frank Zimbabwe", phone: "+263 772 123 456" },
    daysListed: 19,
    priceHistory: [
      { date: "Feb 2025", price: 600000 },
      { date: "May 2025", price: 575000 },
      { date: "Jun 2025", price: 560000 },
    ],
    images: [],
    saved: false,
  },
]

const featureIcons: Record<string, React.ComponentType<any>> = {
  Pool: RiWaterFlashLine,
  "Heated Pool": RiWaterFlashLine,
  "Lap Pool": RiWaterFlashLine,
  Solar: RiSunLine,
  "Solar System": RiSunLine,
  Garage: RiParkingLine,
  "Double Garage": RiParkingLine,
  "3-Car Garage": RiParkingLine,
  "Basement Parking": RiParkingLine,
  Security: RiShieldCheckLine,
  "Alarm System": RiShieldCheckLine,
  CCTV: RiShieldCheckLine,
  "Smart Home": RiShieldCheckLine,
  Garden: RiPlantLine,
  "Vegetable Garden": RiPlantLine,
  "Tennis Court": RiFireLine,
  Borehole: RiWaterFlashLine,
}

const getFeatureIcon = (feat: string) => {
  for (const key in featureIcons) {
    if (feat.toLowerCase().includes(key.toLowerCase())) return featureIcons[key]
  }
  return RiCheckLine
}

const GRADIENT_PALETTES = [
  "linear-gradient(135deg, #013142 0%, #025a7a 50%, #013142 100%)",
  "linear-gradient(135deg, #01283A 0%, #014a62 50%, #01283A 100%)",
  "linear-gradient(135deg, #02243A 0%, #013D55 100%)",
  "linear-gradient(135deg, #011c28 0%, #023448 50%, #011c28 100%)",
  "linear-gradient(135deg, #012230 0%, #024060 50%, #012230 100%)",
  "linear-gradient(135deg, #013142 0%, #003d52 100%)",
  "linear-gradient(135deg, #01283A 0%, #025070 50%, #01283A 100%)",
]

type ActiveTab = "buy" | "rent" | "developments"

/* ── Main Page ───────────────────────────────────────────────── */
export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("buy")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set([2]))
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailScrolled, setDetailScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null)
  const detailScrollRef = useRef<HTMLDivElement>(null)
  const cardScrollRef = useRef<HTMLDivElement>(null)

  // Properties visible in current map viewport
  const visibleProperties = mapBounds
    ? PROPERTIES.filter(
        (p) =>
          p.lat <= mapBounds.north &&
          p.lat >= mapBounds.south &&
          p.lng <= mapBounds.east &&
          p.lng >= mapBounds.west
      )
    : PROPERTIES

  const handleBoundsChange = useCallback((bounds: MapBounds) => {
    setMapBounds(bounds)
  }, [])

  const selectedProp = PROPERTIES.find((p) => p.id === selectedId) ?? null

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id)
    setDetailOpen(true)
    setDetailScrolled(false)
    if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0
  }, [])

  const handleClose = useCallback(() => {
    setDetailOpen(false)
    setTimeout(() => setSelectedId(null), 350)
  }, [])

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setSavedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Scroll property list to active card
  useEffect(() => {
    if (!selectedId || !cardScrollRef.current) return
    const el = cardScrollRef.current.querySelector(`[data-card="${selectedId}"]`) as HTMLElement
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [selectedId])

  const handleDetailScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setDetailScrolled(e.currentTarget.scrollTop > 20)
  }

  const formatPrice = (p: number) =>
    p >= 1000000
      ? `$${(p / 1000000).toFixed(2)}M`
      : `$${(p / 1000).toFixed(0)}K`

  const tabCount = (tab: ActiveTab) => {
    if (tab === "buy") return PROPERTIES.filter((p) => p.status === "For Sale").length
    if (tab === "rent") return 0
    return PROPERTIES.filter((p) => p.status === "New Development").length
  }

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: "100dvh", background: "#011c28" }}
    >
      {/* ── Top Bar ──────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center gap-3 px-4 h-14 z-30"
        style={{
          background: "rgba(1, 25, 37, 0.96)",
          borderBottom: "1px solid rgba(0,176,240,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 mr-2">
          <img src="/assets/logoGridpoint.svg" alt="Gridpoint" className="h-6 w-auto" />
        </Link>

        {/* Tabs */}
        <div
          className="flex items-center gap-0.5 p-1 rounded-lg shrink-0"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {(["buy", "rent", "developments"] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all duration-200"
              style={{
                background: activeTab === tab ? "#00B0F0" : "transparent",
                color: activeTab === tab ? "#012230" : "#6e9bb0",
              }}
            >
              {tab === "developments" ? "Off-Plan" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tabCount(tab) > 0 && (
                <span
                  className="ml-1.5 px-1 py-0.5 rounded text-[10px]"
                  style={{
                    background: activeTab === tab ? "rgba(1,34,48,0.3)" : "rgba(0,176,240,0.15)",
                    color: activeTab === tab ? "#012230" : "#00B0F0",
                  }}
                >
                  {tabCount(tab)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2 flex-1 max-w-[340px] h-9 rounded-lg px-3 transition-all duration-200"
          style={{
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(0,176,240,0.15)",
          }}
        >
          <RiSearchLine size={14} style={{ color: "#3a6478", flexShrink: 0 }} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search suburb, street, or agent…"
            className="flex-1 bg-transparent text-[13px] outline-none"
            style={{ color: "#eef5f8" }}
          />
        </div>

        {/* Filter button */}
        <button
          className="flex items-center gap-2 h-9 px-3.5 rounded-lg text-xs font-medium transition-all duration-150"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#6e9bb0",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,176,240,0.3)"
            e.currentTarget.style.color = "#00B0F0"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
            e.currentTarget.style.color = "#6e9bb0"
          }}
        >
          <RiFilter3Line size={14} />
          Filters
        </button>

        {/* Result count */}
        <span className="text-xs ml-auto shrink-0" style={{ color: "#3a6478" }}>
          <span style={{ color: "#6e9bb0" }}>{visibleProperties.length}</span>
          {visibleProperties.length !== PROPERTIES.length && (
            <span style={{ color: "#3a6478" }}> of {PROPERTIES.length}</span>
          )}{" "}
          in view
        </span>
      </header>

      {/* ── Main Layout: Map 2/3 | Properties 1/3 ────────── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* ── Map Area (2/3) ─────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ width: "66.666%" }}>
          <MapComponent
            properties={PROPERTIES}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={handleSelect}
            onHover={setHoveredId}
            onBoundsChange={handleBoundsChange}
          />
        </div>

        {/* ── Properties Panel (1/3) ────────────────────────── */}
        <div
          className="flex flex-col overflow-hidden relative"
          style={{
            width: "33.334%",
            background: "rgba(1, 20, 30, 0.98)",
            borderLeft: "1px solid rgba(0,176,240,0.1)",
          }}
        >
          {/* Panel header */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-4 py-3"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(1, 25, 37, 0.95)",
            }}
          >
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#3a6478" }}>
              {visibleProperties.length} listing{visibleProperties.length !== 1 ? "s" : ""} in view
              {visibleProperties.length !== PROPERTIES.length && (
                <span style={{ color: "#3a6478", opacity: 0.6 }}> · {PROPERTIES.length} total</span>
              )}
            </span>
          </div>

          {/* Scrollable property list */}
          <div
            ref={cardScrollRef}
            className="flex-1 overflow-y-auto px-3 py-3"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,176,240,0.2) transparent",
            }}
          >
            {visibleProperties.length === 0 ? (
              <div
                className="flex items-center justify-center gap-2 px-4 py-6 rounded-xl text-xs"
                style={{
                  background: "rgba(1,35,50,0.9)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#3a6478",
                }}
              >
                No properties in this area · Pan or zoom out to find listings
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {visibleProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    prop={prop}
                    isSelected={prop.id === selectedId}
                    isHovered={prop.id === hoveredId}
                    isSaved={savedIds.has(prop.id)}
                    gradient={GRADIENT_PALETTES[PROPERTIES.indexOf(prop) % GRADIENT_PALETTES.length]}
                    onSelect={() => handleSelect(prop.id)}
                    onHover={(id) => setHoveredId(id)}
                    onSave={toggleSave}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Detail Panel Overlay ──────────────────────────── */}
          <div
            className="absolute inset-0 z-20 flex flex-col overflow-hidden transition-all duration-[350ms]"
            style={{
              transform: detailOpen ? "translateX(0)" : "translateX(100%)",
              background: "rgba(1, 25, 37, 0.98)",
              backdropFilter: "blur(20px)",
            }}
          >
            {selectedProp && (
              <DetailPanel
                prop={selectedProp}
                isSaved={savedIds.has(selectedProp.id)}
                gradient={GRADIENT_PALETTES[PROPERTIES.findIndex((p) => p.id === selectedProp.id) % GRADIENT_PALETTES.length]}
                scrollRef={detailScrollRef}
                scrolled={detailScrolled}
                onClose={handleClose}
                onSave={toggleSave}
                onScroll={handleDetailScroll}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Property Card (bottom strip) ───────────────────────────── */
function PropertyCard({
  prop,
  isSelected,
  isHovered,
  isSaved,
  gradient,
  onSelect,
  onHover,
  onSave,
}: {
  prop: Property
  isSelected: boolean
  isHovered: boolean
  isSaved: boolean
  gradient: string
  onSelect: () => void
  onHover: (id: number | null) => void
  onSave: (id: number, e: React.MouseEvent) => void
}) {
  const patternId = `card-bp-${prop.id}`
  const TypeIcon =
    prop.type === "Apartment"
      ? RiBuilding2Line
      : prop.type === "Development"
      ? RiBuilding4Line
      : RiHome4Line
  const isNew = prop.status === "New Development"
  const price =
    prop.price >= 1_000_000
      ? `$${(prop.price / 1_000_000).toFixed(2)}M`
      : `$${(prop.price / 1000).toFixed(0)}K`

  return (
    <div
      data-card={prop.id}
      onClick={onSelect}
      onMouseEnter={() => onHover(prop.id)}
      onMouseLeave={() => onHover(null)}
      className="w-full rounded-2xl overflow-hidden cursor-pointer"
      style={{
        border: isSelected
          ? "1.5px solid rgba(0,176,240,0.7)"
          : isHovered
          ? "1.5px solid rgba(0,176,240,0.28)"
          : "1.5px solid rgba(255,255,255,0.065)",
        background: "rgba(1, 20, 30, 0.97)",
        boxShadow: isSelected
          ? "0 0 0 4px rgba(0,176,240,0.1), 0 16px 48px rgba(0,0,0,0.65)"
          : isHovered
          ? "0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(0,176,240,0.04)"
          : "0 4px 20px rgba(0,0,0,0.35)",
        transform: isSelected
          ? "translateY(-4px)"
          : isHovered
          ? "translateY(-2px)"
          : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* ── Visual / image area ──────────────────── */}
      <div className="relative h-[148px]" style={{ background: gradient, overflow: "hidden" }}>
        {/* Blueprint grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={patternId}
              width="26"
              height="26"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 26 0 L 0 0 0 26"
                fill="none"
                stroke="rgba(0,176,240,0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          <line x1="0" y1="148" x2="190" y2="0" stroke="rgba(0,176,240,0.07)" strokeWidth="0.8" />
          <line x1="70" y1="148" x2="272" y2="12" stroke="rgba(0,176,240,0.05)" strokeWidth="0.8" />
        </svg>

        {/* Large ghost icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <TypeIcon size={56} style={{ color: "rgba(0,176,240,0.055)" }} />
        </div>

        {/* Top row: status + heart */}
        <div className="absolute top-0 left-0 right-0 p-2.5 flex items-start justify-between">
          <span
            className="px-2 py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-[0.07em]"
            style={{
              background: isNew ? "rgba(34,197,94,0.14)" : "rgba(0,176,240,0.14)",
              border: isNew
                ? "1px solid rgba(34,197,94,0.35)"
                : "1px solid rgba(0,176,240,0.3)",
              color: isNew ? "#22c55e" : "#00B0F0",
              backdropFilter: "blur(8px)",
            }}
          >
            {isNew ? "Off-Plan" : "For Sale"}
          </span>

          <button
            onClick={(e) => onSave(prop.id, e)}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150"
            style={{
              background: "rgba(1,18,28,0.72)",
              border: `1px solid ${
                isSaved ? "rgba(245,158,11,0.45)" : "rgba(255,255,255,0.09)"
              }`,
              color: isSaved ? "#f59e0b" : "#5e8899",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              if (!isSaved) e.currentTarget.style.color = "#eef5f8"
            }}
            onMouseLeave={(e) => {
              if (!isSaved) e.currentTarget.style.color = "#5e8899"
            }}
          >
            {isSaved ? <RiHeartFill size={12} /> : <RiHeartLine size={12} />}
          </button>
        </div>

        {/* Bottom overlay — type + date */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2"
          style={{
            background:
              "linear-gradient(to top, rgba(1,18,30,0.94) 0%, rgba(1,18,30,0.4) 65%, transparent 100%)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <TypeIcon size={10} style={{ color: "#4e8599" }} />
            <span
              style={{
                color: "#4e8599",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.06em",
              }}
            >
              {prop.type}
            </span>
            <span style={{ color: "#1a3545", fontSize: "10px", margin: "0 1px" }}>·</span>
            <span style={{ color: "#314f5f", fontSize: "10px" }}>
              {prop.daysListed === 1 ? "Today" : `${prop.daysListed}d ago`}
            </span>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div className="px-3.5 pt-3 pb-3.5">
        {/* Price */}
        <div
          className="font-heading text-[20px] font-bold tracking-tight leading-none"
          style={{ color: "#eef5f8" }}
        >
          {price}
          <span
            style={{
              color: "#254558",
              fontSize: "10.5px",
              fontWeight: 400,
              marginLeft: "5px",
              letterSpacing: "0.04em",
            }}
          >
            USD
          </span>
        </div>

        {/* Address */}
        <div className="mt-1.5 flex items-start gap-1">
          <RiMapPinLine
            size={10}
            style={{ color: "#00B0F0", marginTop: "2px", flexShrink: 0 }}
          />
          <div className="min-w-0">
            <div
              className="text-[11.5px] font-medium truncate"
              style={{ color: "#94b8c8" }}
            >
              {prop.address}
            </div>
            <div
              className="text-[10px] truncate"
              style={{ color: "#2e5060" }}
            >
              {prop.suburb}, {prop.city}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        />

        {/* Stats */}
        <div className="flex items-center mt-2.5">
          {[
            { v: prop.beds, l: "beds" },
            { v: prop.baths, l: "baths" },
            { v: prop.sqft.toLocaleString(), l: "ft\u00b2" },
          ].map((s, i, arr) => (
            <div key={s.l} className="flex items-center">
              <div
                style={{
                  padding:
                    i === 0
                      ? "0 14px 0 0"
                      : i === arr.length - 1
                      ? "0 0 0 14px"
                      : "0 14px",
                }}
              >
                <span
                  style={{
                    color: "#c0d8e4",
                    fontSize: "14px",
                    fontWeight: 700,
                    display: "block",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.v}
                </span>
                <span
                  style={{
                    color: "#2e5060",
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginTop: "3px",
                  }}
                >
                  {s.l}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    height: "28px",
                    background: "rgba(255,255,255,0.055)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Detail Panel ────────────────────────────────────────────── */
function DetailPanel({
  prop,
  isSaved,
  gradient,
  scrollRef,
  scrolled,
  onClose,
  onSave,
  onScroll,
}: {
  prop: Property
  isSaved: boolean
  gradient: string
  scrollRef: React.RefObject<HTMLDivElement | null>
  scrolled: boolean
  onClose: () => void
  onSave: (id: number, e: React.MouseEvent) => void
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden animate-fade-right">
      {/* ── Hero image area ───────────────────────────────────── */}
      <div className="relative flex-shrink-0 h-[240px]" style={{ background: gradient }}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150"
          style={{
            background: "rgba(1,25,37,0.8)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#6e9bb0",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#eef5f8"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6e9bb0"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"
          }}
        >
          <RiCloseLine size={16} />
        </button>

        {/* Save button */}
        <button
          onClick={(e) => onSave(prop.id, e)}
          className="absolute top-4 right-14 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150"
          style={{
            background: "rgba(1,25,37,0.8)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: isSaved ? "#f59e0b" : "#6e9bb0",
          }}
        >
          {isSaved ? <RiHeartFill size={15} /> : <RiHeartLine size={15} />}
        </button>

        {/* Share button */}
        <button
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150"
          style={{
            background: "rgba(1,25,37,0.8)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#6e9bb0",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#eef5f8"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6e9bb0"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"
          }}
        >
          <RiShareLine size={15} />
        </button>

        {/* Status */}
        <div className="absolute bottom-4 left-4">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background:
                prop.status === "New Development"
                  ? "rgba(34,197,94,0.18)"
                  : "rgba(0,176,240,0.18)",
              border:
                prop.status === "New Development"
                  ? "1px solid rgba(34,197,94,0.35)"
                  : "1px solid rgba(0,176,240,0.3)",
              color:
                prop.status === "New Development" ? "#22c55e" : "#00B0F0",
            }}
          >
            {prop.status === "New Development" ? "Off-Plan" : prop.status}
          </span>
        </div>

        {/* Image placeholder text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <RiImageLine size={40} style={{ color: "#00B0F0" }} />
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background:
              "linear-gradient(to top, rgba(1,25,37,0.98) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Scrollable content ───────────────────────────────── */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto relative"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,176,240,0.2) transparent" }}
      >
        {/* Price + address */}
        <div className="px-6 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div
            className="font-heading text-[28px] font-bold tracking-tight leading-none mb-2"
            style={{ color: "#eef5f8" }}
          >
            {prop.price >= 1000000
              ? `$${(prop.price / 1000000).toFixed(2)}M`
              : `$${(prop.price / 1000).toFixed(0)}K`}
            <span className="ml-2 text-[13px] font-normal" style={{ color: "#3a6478" }}>
              USD
            </span>
          </div>

          <div className="flex items-start gap-2 mb-1">
            <RiMapPinLine size={14} className="mt-0.5 shrink-0" style={{ color: "#00B0F0" }} />
            <div>
              <div className="text-[14px] font-medium" style={{ color: "#eef5f8" }}>
                {prop.address}
              </div>
              <div className="text-[12px]" style={{ color: "#6e9bb0" }}>
                {prop.suburb}, {prop.city}, Zimbabwe
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-0 mt-4">
            {[
              { label: "Beds", value: prop.beds },
              { label: "Baths", value: prop.baths },
              { label: "Floor", value: `${prop.sqft.toLocaleString()} ft²` },
              ...(prop.lot > 0 ? [{ label: "Lot", value: `${prop.lot.toLocaleString()} ft²` }] : []),
            ].map((stat, i, arr) => (
              <div key={stat.label} className="flex items-center">
                <div className="flex flex-col items-center px-4 first:pl-0">
                  <span className="text-[18px] font-bold font-heading" style={{ color: "#eef5f8" }}>
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "#3a6478" }}>
                    {stat.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.07)" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#3a6478" }}>
            About this property
          </h3>
          <p className="text-[13px] leading-[1.7]" style={{ color: "#6e9bb0" }}>
            {prop.description}
          </p>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { icon: RiCalendarLine, label: "Year Built", value: prop.year },
              { icon: RiHome4Line, label: "Type", value: prop.type },
              { icon: RiRuler2Line, label: "Floor Area", value: `${prop.sqft.toLocaleString()} ft²` },
              { icon: RiMapLine, label: "Listed", value: `${prop.daysListed}d ago` },
            ].map((fact) => (
              <div
                key={fact.label}
                className="flex items-center gap-2.5 p-2.5 rounded-lg"
                style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <fact.icon size={13} style={{ color: "#00B0F0", flexShrink: 0 }} />
                <div>
                  <div className="text-[10px] uppercase tracking-wide" style={{ color: "#3a6478" }}>
                    {fact.label}
                  </div>
                  <div className="text-[12px] font-medium" style={{ color: "#eef5f8" }}>
                    {fact.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#3a6478" }}>
            Features & Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
            {prop.features.map((feat) => {
              const Icon = getFeatureIcon(feat)
              return (
                <div
                  key={feat}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium"
                  style={{
                    background: "rgba(0,176,240,0.07)",
                    border: "1px solid rgba(0,176,240,0.15)",
                    color: "#6e9bb0",
                  }}
                >
                  <Icon size={12} style={{ color: "#00B0F0" }} />
                  {feat}
                </div>
              )
            })}
          </div>
        </div>

        {/* Price history */}
        {prop.priceHistory.length > 1 && (
          <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#3a6478" }}>
              Price History
            </h3>
            <div className="flex flex-col gap-2">
              {prop.priceHistory.map((entry, i) => {
                const isLatest = i === prop.priceHistory.length - 1
                const prev = prop.priceHistory[i - 1]
                const diff = prev ? entry.price - prev.price : 0
                return (
                  <div key={entry.date} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: isLatest ? "#00B0F0" : "#3a6478" }}
                      />
                      <span className="text-[12px]" style={{ color: isLatest ? "#eef5f8" : "#6e9bb0" }}>
                        {entry.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {diff !== 0 && (
                        <span
                          className="text-[11px] font-medium"
                          style={{ color: diff < 0 ? "#22c55e" : "#ef4444" }}
                        >
                          {diff < 0 ? "↓" : "↑"} $
                          {Math.abs(diff / 1000).toFixed(0)}K
                        </span>
                      )}
                      <span className="text-[12px] font-semibold font-heading" style={{ color: isLatest ? "#eef5f8" : "#6e9bb0" }}>
                        ${(entry.price / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Agent card */}
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#3a6478" }}>
            Listed by
          </h3>
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-semibold text-sm"
              style={{ background: "rgba(0,176,240,0.15)", color: "#00B0F0" }}
            >
              {prop.agent.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold truncate" style={{ color: "#eef5f8" }}>
                {prop.agent.name}
              </div>
              <div className="text-[11px] truncate" style={{ color: "#6e9bb0" }}>
                {prop.agent.agency}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                style={{
                  background: "rgba(0,176,240,0.12)",
                  border: "1px solid rgba(0,176,240,0.2)",
                  color: "#00B0F0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,176,240,0.22)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,176,240,0.12)"
                }}
              >
                <RiPhoneLine size={14} />
              </button>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                style={{
                  background: "rgba(0,176,240,0.12)",
                  border: "1px solid rgba(0,176,240,0.2)",
                  color: "#00B0F0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,176,240,0.22)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,176,240,0.12)"
                }}
              >
                <RiMailLine size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="px-6 py-5 flex flex-col gap-3">
          <button
            className="w-full h-11 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all duration-150"
            style={{ background: "#00B0F0", color: "#012230" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1AC3FF"
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,176,240,0.3)"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#00B0F0"
              e.currentTarget.style.boxShadow = "none"
              e.currentTarget.style.transform = "none"
            }}
          >
            Request a Viewing
            <RiArrowRightLine size={15} />
          </button>
          <button
            className="w-full h-11 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2 transition-all duration-150"
            style={{
              background: "rgba(0,176,240,0.08)",
              border: "1px solid rgba(0,176,240,0.2)",
              color: "#00B0F0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,176,240,0.14)"
              e.currentTarget.style.borderColor = "rgba(0,176,240,0.35)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,176,240,0.08)"
              e.currentTarget.style.borderColor = "rgba(0,176,240,0.2)"
            }}
          >
            <RiBarChartLine size={14} />
            Get Valuation Report
          </button>
        </div>

        {/* Spacer for bottom fade comfort */}
        <div className="h-16" />
      </div>

      {/* ── Bottom fade (fading for more info) ───────────────── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(1,25,37,1) 0%, rgba(1,25,37,0.85) 40%, transparent 100%)",
          opacity: scrolled ? 0 : 1,
          zIndex: 5,
        }}
      >
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
            style={{
              background: "rgba(1,40,58,0.95)",
              border: "1px solid rgba(0,176,240,0.2)",
              color: "#3a6478",
            }}
          >
            <span>Scroll for more details</span>
            <RiArrowRightLine size={11} style={{ transform: "rotate(90deg)" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
