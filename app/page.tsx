"use client"

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  RiSearchLine,
  RiMapPin2Line,
  RiHome4Line,
  RiBuilding2Line,
  RiBarChartBoxLine,
  RiTeamLine,
  RiBankLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiSunLine,
  RiMoonLine,
  RiMenuLine,
  RiCloseLine,
  RiCheckLine,
  RiShieldLine,
  RiDatabase2Line,
  RiLineChartLine,
  RiFileTextLine,
  RiMapLine,
  RiHeartLine,
  RiMailLine,
  RiLinkedinBoxLine,
  RiTwitterXLine,
  RiFacebookBoxLine,
  RiInstagramLine,
  RiSmartphoneLine,
  RiMoneyDollarCircleLine,
  RiBriefcaseLine,
  RiGlobalLine,
  RiPhoneLine,
  RiLightbulbLine,
  RiEyeLine,
  RiLeafLine,
  RiRoadMapLine,
  RiPieChartLine,
  RiUserLine,
  RiGroupLine,
  RiBuildingLine,
  RiAlertLine,
  RiScales3Line,
  RiCommunityLine,
  RiStarFill,
  RiDoubleQuotesL,
  RiAppleLine,
  RiGooglePlayLine,
  RiArrowDownLine,
} from "@remixicon/react"

// ── Scroll Reveal Hook ───────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible")
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// ── Stagger children reveal ──────────────────────────────────
function useStaggerReveal(count: number, baseDelay = 80) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const children = el.querySelectorAll("[data-stagger]")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              ;(child as HTMLElement).classList.add("visible")
            }, i * baseDelay)
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [count, baseDelay])
  return ref
}

// ── Logo ────────────────────────────────────────────────────────
function Logo({ className, size = "sm" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <div className={cn("flex items-center select-none", className)}>
      <img src="/assets/logoGridpoint.svg" alt="Gridpoint" className={cn("w-auto", size === "sm" ? "h-5" : "h-7")} />
    </div>
  )
}

// ── Nav ─────────────────────────────────────────────────────────
const navLinks = ["Solutions", "Industries", "Data", "Resources", "Pricing"]

const megaMenuSolutions = [
  { icon: RiHome4Line, title: "Property Marketplace", desc: "Search 3,000+ listings across Zimbabwe — buy, rent, or invest.", href: "#" },
  { icon: RiSearchLine, title: "Prospecting & Valuations", desc: "AVM, CAMA, CMA and 6 more valuation models at your fingertips.", href: "#" },
  { icon: RiBarChartBoxLine, title: "Data & Analytics", desc: "155M+ property records, market indices, and suburb profiles.", href: "#" },
  { icon: RiTeamLine, title: "Real Estate CRM", desc: "Manage leads, run prospecting workflows, and skip trace owners.", href: "#" },
  { icon: RiBankLine, title: "Brokerage & Mortgage", desc: "ROI calculators, mortgage origination, and portfolio tools.", href: "#" },
  { icon: RiFileTextLine, title: "Conveyancing & Due Diligence", desc: "Title verification, inspections, watch lists, and legal reports.", href: "#" },
]

function MegaMenu({ onClose }: { onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="mega-menu-enter absolute left-0 right-0 top-full z-50 noise-overlay"
      style={{
        backgroundColor: "#011F2F",
        borderBottom: "1px solid rgba(0,176,240,0.15)",
        boxShadow: "0 32px 80px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-20 left-1/3 h-40 w-96 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(0,176,240,0.08) 0%, transparent 70%)" }} />

      <div className="mx-auto max-w-[1280px] px-6 py-10 relative z-10">
        <div className="flex gap-10">
          {/* Solutions grid — left */}
          <div className="flex-1">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: "rgba(0,176,240,0.12)" }}>
                <RiDatabase2Line size={13} style={{ color: "#00b0f0" }} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "#00b0f0" }}>Platform Modules</span>
              <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(0,176,240,0.2), transparent)" }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {megaMenuSolutions.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="mega-card group flex items-start gap-4 rounded-xl border px-5 py-4"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="mega-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(0,176,240,0.08)", color: "#4da8c7" }}
                  >
                    <item.icon size={21} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold tracking-[-0.01em] text-white">{item.title}</span>
                      <RiArrowRightLine size={13} className="mega-arrow" style={{ color: "#00b0f0" }} />
                    </div>
                    <p className="mt-1 text-[12.5px] leading-[1.5]" style={{ color: "#5a8fa5" }}>{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Spotlight — right */}
          <div className="hidden w-[300px] shrink-0 lg:flex lg:flex-col lg:gap-4">
            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: "rgba(245,158,11,0.12)" }}>
                <RiLightbulbLine size={13} style={{ color: "#f59e0b" }} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "#5a8fa5" }}>Spotlight</span>
              <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.06), transparent)" }} />
            </div>

            {/* Featured card */}
            <div
              className="mega-spotlight relative rounded-xl border p-6 overflow-hidden"
              style={{
                borderColor: "rgba(0,176,240,0.15)",
                background: "linear-gradient(145deg, #01283A 0%, #013B52 100%)",
              }}
            >
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,176,240,0.15) 0%, transparent 70%)" }} />
              <div
                className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{ backgroundColor: "rgba(0,176,240,0.15)", color: "#00b0f0", border: "1px solid rgba(0,176,240,0.2)" }}
              >
                <RiLightbulbLine size={11} />
                New Feature
              </div>
              <h4 className="font-heading text-[17px] font-bold tracking-[-0.02em] leading-snug text-white">
                AI-Powered Property Valuations
              </h4>
              <p className="mt-2.5 text-[13px] leading-[1.55]" style={{ color: "#6e9bb0" }}>
                Satellite imagery, transaction history, and suburb dynamics — 94% accuracy.
              </p>
              <Link
                href="#"
                onClick={onClose}
                className="group mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-black transition-all duration-150 hover:brightness-110"
                style={{ backgroundColor: "#00b0f0" }}
              >
                Learn more
                <RiArrowRightLine size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Quick link */}
            <Link
              href="#"
              onClick={onClose}
              className="mega-card group flex items-center gap-3.5 rounded-xl border px-5 py-3.5"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(245,158,11,0.08)", color: "#f59e0b" }}
              >
                <RiPieChartLine size={19} />
              </div>
              <div>
                <span className="text-[13.5px] font-semibold text-white">Platform Overview</span>
                <p className="text-[12px]" style={{ color: "#5a8fa5" }}>See how all 6 modules connect</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div
          className="mt-8 flex items-center justify-between rounded-xl border px-6 py-4"
          style={{
            background: "linear-gradient(135deg, rgba(0,176,240,0.08) 0%, rgba(0,176,240,0.03) 100%)",
            borderColor: "rgba(0,176,240,0.12)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(0,176,240,0.12)" }}>
              <RiGlobalLine size={16} style={{ color: "#00b0f0" }} />
            </div>
            <div>
              <span className="text-[13.5px] font-semibold text-white">Zimbabwe&apos;s most comprehensive property intelligence platform</span>
              <p className="text-[12px]" style={{ color: "#5a8fa5" }}>6 modules &middot; One unified data layer &middot; 155M+ records</p>
            </div>
          </div>
          <Link
            href="#"
            onClick={onClose}
            className="group flex items-center gap-2 rounded-lg border px-4 py-2 text-[13px] font-semibold transition-all duration-150 hover:bg-[rgba(0,176,240,0.1)]"
            style={{ borderColor: "rgba(0,176,240,0.25)", color: "#00b0f0" }}
          >
            Explore all solutions
            <RiArrowRightLine size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => { setMounted(true) }, [])
  const isDark = mounted ? resolvedTheme === "dark" : false

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleMegaEnter = useCallback(() => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current)
    setMegaOpen(true)
  }, [])

  const handleMegaLeave = useCallback(() => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 200)
  }, [])

  const closeMega = useCallback(() => setMegaOpen(false), [])

  return (
    <header
      className={cn("sticky top-0 z-50 w-full transition-all duration-300", scrolled && "shadow-sm")}
      style={{
        backgroundColor: scrolled || megaOpen ? "var(--bg-base)" : "transparent",
        borderBottom: scrolled || megaOpen ? "1px solid var(--border-col)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link === "Solutions" ? (
              <div key={link} className="relative" onMouseEnter={handleMegaEnter} onMouseLeave={handleMegaLeave}>
                <button
                  className={cn("nav-link flex items-center gap-1 px-3 py-2 text-[14px] font-medium", megaOpen && "!text-[var(--text-primary)]")}
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                >
                  {link}
                  <RiArrowDownLine size={14} className={cn("transition-transform duration-200", megaOpen && "rotate-180")} />
                </button>
              </div>
            ) : (
              <Link key={link} href="#" className="nav-link px-3 py-2 text-[14px] font-medium">
                {link}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg"
            aria-label="Toggle theme"
          >
            {isDark ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
          </button>
          <Link href="/login" className="nav-link px-4 py-2 text-[14px] font-medium rounded-lg">
            Sign In
          </Link>
          <Link href="/signup" className="btn-brand flex items-center gap-1.5 rounded-lg px-4 py-2 text-[14px] font-semibold">
            Get Started
            <RiArrowRightLine size={14} />
          </Link>
        </div>

        <button
          className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <RiCloseLine size={18} /> : <RiMenuLine size={18} />}
        </button>
      </div>

      {/* Mega Menu */}
      {megaOpen && (
        <div onMouseEnter={handleMegaEnter} onMouseLeave={handleMegaLeave}>
          <MegaMenu onClose={closeMega} />
        </div>
      )}

      {/* Backdrop overlay */}
      {megaOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/20 animate-fade-in"
          style={{ backdropFilter: "blur(2px)" }}
          onClick={closeMega}
          aria-hidden="true"
        />
      )}

      {mobileOpen && (
        <div className="md:hidden animate-fade-up" style={{ backgroundColor: "var(--bg-surface)", borderBottom: "1px solid var(--border-col)" }}>
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link key={link} href="#" className="nav-link py-2 text-[15px] font-medium" onClick={() => setMobileOpen(false)}>
                {link}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t pt-3" style={{ borderColor: "var(--border-col)" }}>
              <Link href="/login" className="py-2 text-center text-[14px] font-medium rounded-lg btn-ghost">
                Sign In
              </Link>
              <Link href="/signup" className="py-2 text-center text-[14px] font-semibold rounded-lg btn-brand">
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

// ── Logo Cloud ──────────────────────────────────────────────────
const logoNames = ["CBRE Zimbabwe", "Knight Frank", "Pam Golding", "Dawn Properties", "FBC Holdings", "CBZ Bank", "Old Mutual", "Zimnat", "Datvest", "NBS"]

function LogoCloud() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const posRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const speed = 0.4 // px per frame

    const animate = () => {
      posRef.current -= speed
      const firstChild = container.firstElementChild as HTMLElement | null
      if (firstChild && Math.abs(posRef.current) >= firstChild.offsetWidth + 32) {
        posRef.current += firstChild.offsetWidth + 32
        container.appendChild(firstChild)
      }
      container.style.transform = `translateX(${posRef.current}px)`
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <div className="overflow-hidden w-full" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
      <div ref={containerRef} className="flex items-center gap-8 will-change-transform" style={{ width: "max-content" }}>
        {[...logoNames, ...logoNames, ...logoNames].map((name, i) => (
          <span
            key={i}
            className="text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap shrink-0 opacity-30"
            style={{ color: "#ffffff" }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Filter Dropdown ─────────────────────────────────────────────────────────────────
function FilterDropdown({
  label,
  options,
  value,
  onChange,
  icon: Icon,
  flex = "flex-1",
  borderRight = true,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  icon: React.ComponentType<any>
  flex?: string
  borderRight?: boolean
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const [visible, setVisible] = useState(false)

  const updatePos = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 8 + window.scrollY, left: rect.left + window.scrollX })
    }
  }, [])

  useLayoutEffect(() => {
    if (!open) { setVisible(false); return }
    updatePos()
    requestAnimationFrame(() => setVisible(true))
    window.addEventListener("scroll", updatePos, true)
    window.addEventListener("resize", updatePos)
    return () => {
      window.removeEventListener("scroll", updatePos, true)
      window.removeEventListener("resize", updatePos)
    }
  }, [open, updatePos])

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onOutside)
    return () => document.removeEventListener("mousedown", onOutside)
  }, [])

  return (
    <div
      ref={triggerRef}
      className={`relative flex items-center gap-2 px-4 ${flex} min-w-0 cursor-pointer select-none`}
      style={{ borderRight: borderRight ? "1px solid rgba(255,255,255,0.07)" : "none" }}
      onClick={() => setOpen((o) => !o)}
    >
      <Icon size={14} style={{ color: open ? "#00B0F0" : "#3a6478", flexShrink: 0, transition: "color 0.15s" }} />
      <div className="flex flex-col py-2.5 min-w-0 w-full">
        <span className="text-[9px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#3a6478" }}>
          {label}
        </span>
        <div className="flex items-center justify-between gap-1">
          <span
            className="text-[13px] truncate transition-colors duration-150"
            style={{ color: value && value !== options[0] ? "#eef5f8" : "#5a8599" }}
          >
            {value || options[0]}
          </span>
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            style={{
              flexShrink: 0,
              color: "#3a6478",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Dropdown panel — portaled to body to escape backdrop-filter stacking context */}
      {open && createPortal(
        <div
          ref={dropdownRef}
          className="min-w-[190px]"
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            zIndex: 9999,
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#072F42",
            border: "1px solid rgba(0,176,240,0.25)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.95), 0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.18s cubic-bezier(0.4,0,0.2,1), transform 0.18s cubic-bezier(0.4,0,0.2,1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 pt-2.5 pb-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(0,0,0,0.15)" }}>
            <span className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: "#3a6478" }}>{label}</span>
          </div>
          <div className="py-1.5">
            {options.map((opt) => {
              const isSelected = opt === value
              return (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false) }}
                  className="flex items-center w-full px-3 py-2 gap-2.5 text-left transition-colors duration-100"
                  style={{ backgroundColor: isSelected ? "rgba(0,176,240,0.15)" : "transparent" }}
                  onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,176,240,0.06)" }}
                  onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent" }}
                >
                  <div
                    className="flex h-4 w-4 items-center justify-center rounded-full shrink-0 transition-all duration-150"
                    style={{
                      border: isSelected ? "none" : "1px solid rgba(255,255,255,0.1)",
                      backgroundColor: isSelected ? "#00B0F0" : "transparent",
                    }}
                  >
                    {isSelected && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.2 5.7L6.5 2.3" stroke="#01253A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-[13px] leading-none"
                    style={{ color: isSelected ? "#00B0F0" : "#7aaec4", fontWeight: isSelected ? 600 : 400 }}
                  >
                    {opt}
                  </span>
                </button>
              )
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

// ── Hero ────────────────────────────────────────────────────────
const searchTypes = ["Buy", "Rent", "Developments"]

const priceRanges: Record<string, string[]> = {
  Buy: ["Any Price", "Under $30k", "$30k – $60k", "$60k – $100k", "$100k – $200k", "$200k – $500k", "$500k+"],
  Rent: ["Any Price", "Under $300/mo", "$300 – $600/mo", "$600 – $1,000/mo", "$1,000 – $2,000/mo", "$2,000+/mo"],
  Developments: ["Any Price", "Under $50k", "$50k – $150k", "$150k – $300k", "$300k+"],
}

const propertyTypes: Record<string, string[]> = {
  Buy: ["All Types", "House", "Apartment", "Townhouse", "Commercial", "Land", "Farm"],
  Rent: ["All Types", "House", "Apartment", "Townhouse", "Room", "Office Space"],
  Developments: ["All Types", "Residential", "Mixed-Use", "Commercial", "Industrial"],
}

const modules = [
  { label: "Marketplace", icon: RiHome4Line },
  { label: "Prospecting & Valuations", icon: RiSearchLine },
  { label: "Data & Analytics", icon: RiBarChartBoxLine },
  { label: "Real Estate CRM", icon: RiTeamLine },
  { label: "Brokerage & Mortgage", icon: RiBankLine },
  { label: "Conveyancing", icon: RiFileTextLine },
]

const heroImages = ["/assets/gridpointHero.jpg", "/assets/gridpointHero2.jpg"]

function Hero() {
  const [searchType, setSearchType] = useState("Buy")
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("All Types")
  const [priceRange, setPriceRange] = useState("Any Price")
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((i) => (i + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])
  const [bedrooms, setBedrooms] = useState("Any")
  const [bathrooms, setBathrooms] = useState("Any")

  return (
    <section className="relative h-[calc(100dvh-4rem)] flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 grid-pattern noise-overlay"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,176,240,0.14) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 80% 30%, rgba(245,158,11,0.04) 0%, transparent 50%), linear-gradient(180deg, #013142 0%, #01253A 100%)",
        }}
      />

      {/* Hero images — crossfade rotation */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: activeImg === i ? 1 : 0,
              scale: activeImg === i ? "1.05" : "1",
              transition: "opacity 1.5s ease-in-out, scale 6s ease-in-out",
            }}
          />
        ))}
      </div>
      {/* Left fade */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background: "linear-gradient(to right, #013142 0%, #013142 35%, rgba(1,49,66,0.7) 50%, transparent 70%)",
        }}
      />
      {/* Top fade */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background: "linear-gradient(to bottom, #013142 0%, rgba(1,49,66,0.5) 10%, transparent 30%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background: "linear-gradient(to top, #01253A 0%, rgba(1,37,58,0.5) 10%, transparent 30%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pt-14 pb-[120px] flex-1 flex items-center">
        <div className="w-full"><div className="max-w-[670px]">
          <h1
            className="font-heading text-[52px] md:text-[64px] font-bold leading-[1.08] tracking-[-0.035em] text-white animate-fade-up mb-4"
            style={{ animationDelay: "80ms" }}
          >
            Technology That Revolutionize<br />
            <span style={{ color: "#00B0F0" }}>Real Estate Business</span>
          </h1>

          <p
            className="text-[17px] leading-[1.65] animate-fade-up mb-7 max-w-[85%]"
            style={{ color: "#8cb8cc", animationDelay: "160ms" }}
          >
            Gridpoint is a technology platform that uses data and analytics to enable you to make more informed decisions, streamline processes, and enhance due diligence in your real estate transactions.
          </p>
        </div>

          {/* Search card */}
          <div
            className="rounded-2xl p-5 animate-fade-up max-w-[900px]"
            style={{
              backgroundColor: "rgba(1,20,30,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
              animationDelay: "240ms",
            }}
          >
            {/* Compact switcher */}
            <div className="flex gap-0.5 p-0.5 rounded-md w-fit mb-3" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {searchTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => { setSearchType(t); setPriceRange("Any Price"); setPropertyType("All Types") }}
                  className="px-3 py-1 text-[12px] font-semibold rounded-[5px] transition-all duration-150"
                  style={{
                    backgroundColor: searchType === t ? "#00B0F0" : "transparent",
                    color: searchType === t ? "#01253A" : "#4d8499",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Inline filters + search */}
            <div className="flex items-stretch gap-0 rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "#072F42" }}>
              {/* Location */}
              <div className="flex items-center gap-2 px-4 flex-[2] min-w-0" style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
                <RiMapPin2Line size={14} style={{ color: "#3a6478", flexShrink: 0 }} />
                <div className="flex flex-col py-2.5 min-w-0 w-full">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#3a6478" }}>Location</span>
                  <input
                    type="text"
                    placeholder="Harare, Bulawayo..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent text-[13px] outline-none placeholder:text-[#2e5a6e] w-full"
                    style={{ color: "#eef5f8" }}
                  />
                </div>
              </div>

              <FilterDropdown
                label="Type"
                options={propertyTypes[searchType] ?? propertyTypes["Buy"]}
                value={propertyType}
                onChange={setPropertyType}
                icon={RiHome4Line}
                flex="flex-[1.5]"
              />

              <FilterDropdown
                label="Price"
                options={priceRanges[searchType] ?? priceRanges["Buy"]}
                value={priceRange}
                onChange={setPriceRange}
                icon={RiMoneyDollarCircleLine}
                flex="flex-[1.5]"
              />

              <FilterDropdown
                label="Beds"
                options={["Any", "1+", "2+", "3+", "4+", "5+"]}
                value={bedrooms}
                onChange={setBedrooms}
                icon={RiBuilding2Line}
                flex="flex-1"
              />

              <FilterDropdown
                label="Baths"
                options={["Any", "1+", "2+", "3+", "4+"]}
                value={bathrooms}
                onChange={setBathrooms}
                icon={RiLeafLine}
                flex="flex-1"
                borderRight={false}
              />

              {/* Search button */}
              <button className="btn-brand flex items-center justify-center gap-1.5 px-5 text-[13px] font-semibold shrink-0 rounded-l-none rounded-r-xl">
                <RiSearchLine size={15} />
                Search
              </button>
            </div>
          </div>

        {/* Quick Access Module Cards */}
        <div className="mt-7 animate-fade-up" style={{ animationDelay: "420ms" }}>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {modules.map((mod) => {
              const Icon = mod.icon
              return (
                <Link
                  key={mod.label}
                  href="#"
                  className="group flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-center card-hover"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.65)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#00B0F0" }}
                  >
                    <Icon size={18} style={{ color: "#FFFFFF" }} />
                  </div>
                  <span className="text-[13px] font-semibold leading-tight" style={{ color: "#01253A" }}>
                    {mod.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div></div>

      {/* Trust bar — absolute bottom of hero */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pb-6 pt-5 animate-fade-up"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          animationDelay: "500ms",
        }}
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.14em] mb-4" style={{ color: "#3a6478" }}>
            Trusted by leading institutions across Zimbabwe
          </p>
          <LogoCloud />
        </div>
      </div>
    </section>
  )
}

// ── Problem Section ─────────────────────────────────────────────
const problems = [
  { icon: RiShieldLine, title: "Property Fraud", desc: "Double selling, fake titles, and identity theft plague transactions.", accent: "#ef4444" },
  { icon: RiFileTextLine, title: "Broken Processes", desc: "Paper-heavy, disjointed workflows slow every deal to a crawl.", accent: "#f59e0b" },
  { icon: RiMoneyDollarCircleLine, title: "Financing Barriers", desc: "Banks lack reliable property data to make fast lending decisions.", accent: "#f59e0b" },
  { icon: RiLineChartLine, title: "No Market Visibility", desc: "Zero access to real-time trends, ownership records, or price indices.", accent: "#ef4444" },
]

function ProblemSection() {
  const leftRef = useReveal()
  const rightRef = useReveal()

  return (
    <section className="py-28" style={{ backgroundColor: "var(--bg-surface)" }}>
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          {/* Left */}
          <div ref={leftRef} className="reveal-left">
            <h2
              className="font-heading text-[40px] md:text-[44px] font-bold leading-[1.1] tracking-[-0.03em] mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Africa&apos;s property market
              <br />
              <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
                is flying blind.
              </span>
            </h2>
            <p className="text-[16px] leading-[1.7] mb-10" style={{ color: "var(--text-secondary)" }}>
              Zimbabwe&apos;s real estate industry runs on fragmented records,
              paper trails, and blind trust. The cost? Fraud, delays, and
              billions in locked capital.
            </p>
            <div className="space-y-5">
              {problems.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="flex gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${p.accent}10`, border: `1px solid ${p.accent}20` }}
                    >
                      <Icon size={18} style={{ color: p.accent }} />
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                        {p.title}
                      </div>
                      <div className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {p.desc}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right — big stat callout instead of mock dashboard */}
          <div ref={rightRef} className="reveal-right lg:pl-8">
            <div
              className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #01283A 0%, #013B52 100%)",
                border: "1px solid rgba(0,176,240,0.12)",
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }} />
              <div className="relative z-10">
                <div className="font-heading text-[72px] md:text-[88px] font-bold leading-none tracking-[-0.04em] mb-4" style={{ color: "#FFFFFF" }}>
                  $3.2B
                </div>
                <div className="text-[20px] font-semibold text-white mb-3">
                  Lost annually to property fraud in Sub-Saharan Africa
                </div>
                <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#6e9bb0" }}>
                  The lack of transparent property data creates an environment
                  where fraud thrives, deals stall, and capital remains locked.
                  Gridpoint exists to fix this.
                </p>
                <Link href="#" className="btn-brand inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[14px] font-semibold">
                  See how we solve this
                  <RiArrowRightLine size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Solutions ────────────────────────────────────────────────────
const solutions = [
  {
    icon: RiHome4Line,
    title: "Property Marketplace",
    desc: "Search 3,000+ listings. Buy, rent, or discover new developments across Zimbabwe.",
  },
  {
    icon: RiSearchLine,
    title: "Prospecting & Valuations",
    desc: "AVM, CAMA, CMA and 6 more valuation models. Find and value any property instantly.",
  },
  {
    icon: RiBarChartBoxLine,
    title: "Data & Analytics",
    desc: "Access 155M+ property records, market indices, ownership data, and suburb profiles.",
  },
  {
    icon: RiTeamLine,
    title: "Real Estate CRM",
    desc: "Built for agents. Manage leads, run prospecting workflows, and skip trace owners.",
  },
  {
    icon: RiBankLine,
    title: "Brokerage & Mortgage",
    desc: "ROI calculators, mortgage origination, loan appraisal, and investment portfolio tools.",
  },
  {
    icon: RiFileTextLine,
    title: "Conveyancing & Due Diligence",
    desc: "Title verification, property inspections, watch lists, and full legal due diligence.",
  },
]

function SolutionsSection() {
  const headerRef = useReveal()
  const gridRef = useStaggerReveal(solutions.length, 100)

  return (
    <section className="py-28" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto max-w-[1280px] px-6">
        <div ref={headerRef} className="reveal text-center mb-14">
          <div className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#FFFFFF" }}>
            <RiDatabase2Line size={14} />
            Platform
          </div>
          <h2 className="font-heading text-[36px] md:text-[42px] font-bold tracking-[-0.03em]" style={{ color: "var(--text-primary)" }}>
            Six modules. One data layer.
          </h2>
          <p className="mt-3 text-[16px] max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
            Every tool shares the same intelligence layer, so your data flows
            seamlessly from search to close.
          </p>
        </div>

        {/* Bento grid — first item spans 2 rows */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => {
            const Icon = s.icon
            const isFeatured = i === 0
            const isLast = i === solutions.length - 1
            return (
              <div
                key={s.title}
                data-stagger
                className={cn(
                  "reveal group rounded-2xl p-8 cursor-pointer card-hover",
                  isFeatured && "md:row-span-2 bento-featured",
                  isLast && "md:col-span-2 lg:col-span-3"
                )}
                style={isFeatured ? {} : {
                  backgroundColor: "var(--bg-raised)",
                  border: "1px solid var(--border-col)",
                }}
              >
                <div
                  className={cn("mb-5 flex items-center justify-center rounded-xl", isFeatured ? "h-14 w-14" : "h-10 w-10")}
                  style={{ backgroundColor: "rgba(0,176,240,0.1)", border: "1px solid rgba(0,176,240,0.12)" }}
                >
                  <Icon size={isFeatured ? 24 : 20} style={{ color: "#FFFFFF" }} />
                </div>
                <h3
                  className={cn("font-semibold mb-2", isFeatured ? "font-heading text-[22px] tracking-[-0.02em]" : "text-[17px]")}
                  style={{ color: isFeatured ? "#eef5f8" : "var(--text-primary)" }}
                >
                  {s.title}
                </h3>
                <p
                  className={cn("leading-relaxed", isFeatured ? "text-[15px] mb-8" : "text-[14px]")}
                  style={{ color: isFeatured ? "#6e9bb0" : "var(--text-secondary)" }}
                >
                  {s.desc}
                </p>
                {isFeatured && (
                  <div className="space-y-2 mb-6">
                    {["Map-based search", "Saved searches & alerts", "Agent direct connect"].map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <RiCheckLine size={14} style={{ color: "#22c55e" }} />
                        <span className="text-[13px]" style={{ color: "#8cb8cc" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-5 flex items-center gap-1 text-[13px] font-medium" style={{ color: "#FFFFFF" }}>
                  {isFeatured ? "Explore Marketplace" : "Learn more"} {isFeatured ? <RiArrowRightLine size={14} /> : <RiArrowRightSLine size={16} />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Persona Tabs ─────────────────────────────────────────────────
const personas = [
  {
    tab: "Real Estate",
    icon: RiBuildingLine,
    headline: "Tools built for real estate professionals",
    body: "List properties, manage client relationships, prospect leads, and run valuations — all in one CRM purpose-built for Zimbabwe's property market.",
    points: [
      "Full-featured agent CRM with deal pipeline",
      "Skip trace property owners in seconds",
      "Automated valuations on any listing",
      "Market analytics and suburb reports",
    ],
    stat: "4x", statLabel: "faster prospecting",
  },
  {
    tab: "Investors",
    icon: RiMoneyDollarCircleLine,
    headline: "Data-first tools for serious investors",
    body: "Analyse deal ROI, track your portfolio, and access deep market data before committing capital. Built for professionals who invest on numbers.",
    points: [
      "ROI & rental yield calculators",
      "Opportunity zone mapping",
      "Comparative market analysis",
      "Portfolio performance tracking",
    ],
    stat: "155M+", statLabel: "data points",
  },
  {
    tab: "Banks",
    icon: RiBankLine,
    headline: "Smarter mortgage origination",
    body: "Reliable property valuations, appraisal management, and risk data to make fast, confident lending decisions — backed by 155M+ property records.",
    points: [
      "Automated Valuation Models (AVM)",
      "Computer Assisted Mass Appraisal (CAMA)",
      "Environmental & flood risk layers",
      "Appraisal management workflow",
    ],
    stat: "60%", statLabel: "faster appraisals",
  },
  {
    tab: "Government",
    icon: RiCommunityLine,
    headline: "National property intelligence",
    body: "Land registry data, boundary layers, census integration, and ownership records to inform policy, planning, and compliance at scale.",
    points: [
      "Land parcel & boundary data",
      "Census-linked demographic layers",
      "Zoning and land use mapping",
      "Title deed & ownership records",
    ],
    stat: "100%", statLabel: "coverage",
  },
]

function PersonasSection() {
  const [active, setActive] = useState(0)
  const p = personas[active]
  const Icon = p.icon
  const sectionRef = useReveal()

  return (
    <section className="py-28" style={{ backgroundColor: "var(--bg-surface)" }}>
      <div ref={sectionRef} className="reveal mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#f59e0b" }}>
            <RiGroupLine size={14} />
            Industries
          </div>
          <h2 className="font-heading text-[36px] md:text-[42px] font-bold tracking-[-0.03em]" style={{ color: "var(--text-primary)" }}>
            Built for every stakeholder
          </h2>
        </div>

        {/* Tabs — active uses brand fill */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl p-1 gap-1" style={{ backgroundColor: "var(--bg-raised)", border: "1px solid var(--border-col)" }}>
            {personas.map((pers, i) => {
              const TabIcon = pers.icon
              return (
                <button
                  key={pers.tab}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200"
                  style={{
                    backgroundColor: active === i ? "#00B0F0" : "transparent",
                    color: active === i ? "#000" : "var(--text-secondary)",
                  }}
                >
                  <TabIcon size={15} />
                  <span className="hidden sm:inline">{pers.tab}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content — 3/2 split with stat panel */}
        <div
          className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 items-stretch"
          style={{ backgroundColor: "var(--bg-raised)", border: "1px solid var(--border-col)" }}
        >
          <div className="lg:col-span-3 p-8 lg:p-12">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(0,176,240,0.08)", border: "1px solid rgba(0,176,240,0.15)" }}>
              <Icon size={24} style={{ color: "#FFFFFF" }} />
            </div>
            <h3 className="font-heading text-[28px] font-bold tracking-[-0.02em] mb-4" style={{ color: "var(--text-primary)" }}>
              {p.headline}
            </h3>
            <p className="text-[15px] leading-[1.7] mb-8" style={{ color: "var(--text-secondary)" }}>
              {p.body}
            </p>
            <div className="space-y-3 mb-8">
              {p.points.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.12)" }}>
                    <RiCheckLine size={11} style={{ color: "#22c55e" }} />
                  </div>
                  <span className="text-[14px]" style={{ color: "var(--text-primary)" }}>{point}</span>
                </div>
              ))}
            </div>
            <Link href="#" className="btn-brand inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[14px] font-semibold">
              Explore solutions
              <RiArrowRightLine size={14} />
            </Link>
          </div>

          {/* Right — big stat */}
          <div
            className="lg:col-span-2 flex flex-col items-center justify-center p-8 lg:p-12"
            style={{ background: "linear-gradient(135deg, #01283A 0%, #013B52 100%)", borderLeft: "1px solid rgba(0,176,240,0.08)" }}
          >
            <div className="font-heading text-[72px] md:text-[88px] font-bold leading-none tracking-[-0.04em]" style={{ color: "#FFFFFF" }}>
              {p.stat}
            </div>
            <div className="text-[16px] font-medium mt-2" style={{ color: "#6e9bb0" }}>
              {p.statLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Data Coverage ────────────────────────────────────────────────
const dataCategories = [
  { icon: RiHome4Line, label: "Property Data", count: "42M", sub: "Addresses, type, size, zoning" },
  { icon: RiUserLine, label: "Ownership Data", count: "28M", sub: "Owner details, title deeds" },
  { icon: RiLineChartLine, label: "Market Analytics", count: "15M", sub: "Price indices, trends" },
  { icon: RiPieChartLine, label: "Valuation Data", count: "22M", sub: "AVM, CAMA, CMA, tax" },
  { icon: RiMapLine, label: "Boundaries", count: "8M", sub: "Parcels, suburbs, provinces" },
  { icon: RiRoadMapLine, label: "Infrastructure", count: "12M", sub: "Roads, water, electricity" },
  { icon: RiBriefcaseLine, label: "Points of Interest", count: "18M", sub: "Schools, hospitals, banks" },
  { icon: RiGroupLine, label: "Demographics", count: "6M", sub: "Population, buying power" },
  { icon: RiLeafLine, label: "Environment", count: "4M", sub: "Flood zones, air quality" },
]

function DataCoverageSection() {
  const headerRef = useReveal()
  const gridRef = useStaggerReveal(dataCategories.length, 60)

  return (
    <section className="py-28 relative overflow-hidden noise-overlay" style={{ backgroundColor: "#011F2F" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(0,176,240,0.05) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 70% 60%, rgba(245,158,11,0.03) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6">
        <div ref={headerRef} className="reveal text-center mb-14">
          <div className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#FFFFFF" }}>
            <RiDatabase2Line size={14} />
            Data Coverage
          </div>
          <h2 className="font-heading text-[36px] md:text-[42px] font-bold tracking-[-0.03em] text-white mb-4">
            The most comprehensive property
            <br className="hidden md:block" />
            dataset in Africa
          </h2>
          <p className="text-[16px]" style={{ color: "#6e9bb0" }}>
            155M+ records across 9 categories — and growing every day.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {dataCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.label}
                data-stagger
                className="reveal flex items-center gap-4 rounded-xl p-5 card-hover cursor-default"
                style={{ backgroundColor: "rgba(1,40,58,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(0,176,240,0.08)" }}>
                  <Icon size={20} style={{ color: "#FFFFFF" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-[14px] font-semibold text-white truncate">{cat.label}</span>
                    <span className="text-[13px] font-bold tabular-nums shrink-0" style={{ color: "#FFFFFF" }}>{cat.count}</span>
                  </div>
                  <div className="text-[12px]" style={{ color: "#3a6478" }}>{cat.sub}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[14px] font-semibold transition-all duration-150 hover:opacity-90"
            style={{ backgroundColor: "rgba(0,176,240,0.08)", border: "1px solid rgba(0,176,240,0.2)", color: "#00B0F0" }}
          >
            Explore the data platform
            <RiArrowRightLine size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ─────────────────────────────────────────────────
const testimonials = [
  { quote: "Gridpoint gave us visibility into property data we didn\u2019t know existed. Our appraisal turnaround dropped from 2 weeks to 3 days.", name: "Tatenda Moyo", role: "Head of Mortgage Lending", company: "FBC Holdings" },
  { quote: "As an agent, skip tracing and automated valuations have completely changed how I prospect. I close more deals with less effort.", name: "Sarah Ndlovu", role: "Senior Property Agent", company: "Pam Golding Properties" },
  { quote: "The data coverage across Zimbabwe is unlike anything else available. It\u2019s become our primary source for investment decisions.", name: "James Chigumira", role: "Portfolio Manager", company: "Old Mutual Real Estate" },
]

function TestimonialsSection() {
  const ref = useStaggerReveal(testimonials.length, 120)
  return (
    <section className="py-28" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-14">
          <div className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#22c55e" }}>
            <RiHeartLine size={14} />
            Testimonials
          </div>
          <h2 className="font-heading text-[36px] md:text-[42px] font-bold tracking-[-0.03em]" style={{ color: "var(--text-primary)" }}>
            What our users say
          </h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} data-stagger className="reveal rounded-2xl p-7 card-hover" style={{ backgroundColor: "var(--bg-raised)", border: "1px solid var(--border-col)" }}>
              <RiDoubleQuotesL size={28} className="mb-4" style={{ color: "rgba(0,176,240,0.3)" }} />
              <p className="text-[15px] leading-[1.7] mb-6" style={{ color: "var(--text-primary)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold" style={{ backgroundColor: "rgba(0,176,240,0.1)", color: "#00B0F0" }}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>{t.name}</div>
                  <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Banner ───────────────────────────────────────────────────
function CTABanner() {
  const ref = useReveal()
  return (
    <section className="py-24" style={{ backgroundColor: "var(--bg-surface)" }}>
      <div ref={ref} className="reveal mx-auto max-w-[800px] px-6 text-center">
        <h2 className="font-heading text-[36px] md:text-[48px] font-bold tracking-[-0.03em] mb-4" style={{ color: "var(--text-primary)" }}>
          Ready to transform how you
          <br />
          <span style={{ color: "#FFFFFF" }}>do property?</span>
        </h2>
        <p className="text-[17px] leading-[1.7] mb-8 max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
          Join 200+ professionals already using Gridpoint to close deals
          faster, value properties smarter, and access data they never had.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/signup" className="btn-brand flex items-center gap-2 rounded-lg px-8 py-3.5 text-[15px] font-semibold">
            Start Free Trial
            <RiArrowRightLine size={16} />
          </Link>
          <Link href="#" className="btn-ghost flex items-center gap-2 rounded-lg px-8 py-3.5 text-[15px] font-medium">
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────
const footerLinks = {
  Solutions: [
    "Property Marketplace",
    "Prospecting & Valuation",
    "Property Data & Analytics",
    "Real Estate CRM",
    "Brokerage & Mortgage",
    "Conveyancing & Due Diligence",
  ],
  Data: [
    "Property Data",
    "Ownership Data",
    "Market Analytics",
    "Valuation Data",
    "Boundaries",
    "Utilities & Infrastructure",
    "Points of Interest",
    "Demographics & Crime",
    "Environment & Climate",
  ],
  Industries: [
    "Real Estate",
    "Buyers & Sellers",
    "Property Development",
    "Financial Institutions",
    "Government & Parastatals",
    "Business Consulting",
    "Technology Platforms",
  ],
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#011F2F", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-[1280px] px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div>
            <Logo className="mb-4" size="md" />
            <p className="text-[14px] leading-relaxed mb-5" style={{ color: "#6e9bb0" }}>
              Zimbabwe&apos;s end-to-end property technology platform. Data,
              analytics, and tools for every stakeholder.
            </p>
            <div className="flex items-center gap-1.5 mb-2">
              <RiMailLine size={14} style={{ color: "#3a6478" }} />
              <a href="mailto:enquiries@gridpointglobal.com" className="footer-link text-[13px]">
                enquiries@gridpointglobal.com
              </a>
            </div>
            <div className="flex items-center gap-1.5 mb-6">
              <RiPhoneLine size={14} style={{ color: "#3a6478" }} />
              <a href="tel:+263773725423" className="footer-link text-[13px]">
                +263 773 725 423
              </a>
            </div>
            <div className="flex items-center gap-2">
              {[RiLinkedinBoxLine, RiTwitterXLine, RiFacebookBoxLine, RiInstagramLine].map(
                (SocialIcon, i) => (
                  <button key={i} className="social-btn flex h-8 w-8 items-center justify-center rounded-lg" aria-label="Social link">
                    <SocialIcon size={15} />
                  </button>
                )
              )}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#3a6478" }}>
                {heading}
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="footer-link text-[13px]">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[12px]" style={{ color: "#3a6478" }}>
            &copy; 2026 Gridpoint Global. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            {["Terms of Use", "Privacy Policy", "Accessibility", "Sitemap"].map((item) => (
              <Link key={item} href="#" className="footer-link text-[12px]">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Page ─────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionsSection />
        <PersonasSection />
        <DataCoverageSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
