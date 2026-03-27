"use client"

import { useState } from "react"
import Link from "next/link"
import {
  RiMailLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowRightLine,
  RiGoogleLine,
  RiAppleLine,
  RiUserLine,
  RiHome4Line,
  RiBuilding2Line,
  RiBriefcaseLine,
  RiBankLine,
} from "@remixicon/react"

const accountTypes = [
  { value: "buyer", label: "Buyer / Renter", icon: RiHome4Line },
  { value: "agent", label: "Agent / Broker", icon: RiBriefcaseLine },
  { value: "investor", label: "Investor", icon: RiBuilding2Line },
  { value: "institution", label: "Institution", icon: RiBankLine },
]

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState("buyer")
  const [agreed, setAgreed] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const passwordStrength = Math.min(4, Math.floor(password.length / 3))
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength] || ""
  const strengthColor =
    passwordStrength <= 1 ? "#ef4444" : passwordStrength <= 2 ? "#f59e0b" : passwordStrength <= 3 ? "#00B0F0" : "#22c55e"

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Background layers ─────────────────────────────────── */}
      <div className="absolute inset-0" style={{ backgroundColor: "var(--bg-base)" }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial gradient wash */}
      <div
        className="absolute top-[-15%] right-[20%] w-[700px] h-[700px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #00B0F0 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* ── Main card ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[460px] mx-6 py-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center select-none mb-10 animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <img src="/assets/logoGridpoint.svg" alt="Gridpoint" className="h-7 w-auto" />
        </Link>

        {/* Card */}
        <div
          className="rounded-2xl p-8 sm:p-10 animate-fade-up"
          style={{
            animationDelay: "60ms",
            backgroundColor: "var(--bg-raised)",
            border: "1px solid var(--border-col)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,176,240,0.03)",
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1
              className="font-heading text-[26px] font-bold tracking-[-0.03em] mb-1.5"
              style={{ color: "var(--text-primary)" }}
            >
              Create your account
            </h1>
            <p className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
              Free to join. No credit card required.
            </p>
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: RiGoogleLine, label: "Google" },
              { icon: RiAppleLine, label: "Apple" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2.5 h-[44px] rounded-xl text-[13px] font-medium transition-all duration-200"
                style={{
                  border: "1px solid var(--border-col)",
                  color: "var(--text-primary)",
                  backgroundColor: "var(--bg-surface)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = "var(--border-hover-col)"
                  el.style.transform = "translateY(-1px)"
                  el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = "var(--border-col)"
                  el.style.transform = "translateY(0)"
                  el.style.boxShadow = "none"
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-col)" }} />
            <span
              className="text-[11px] uppercase tracking-[0.12em] font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              or continue with email
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-col)" }} />
          </div>

          {/* Account type selector */}
          <div className="mb-6">
            <label
              className="block text-[12px] font-semibold uppercase tracking-[0.06em] mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              I am a
            </label>
            <div className="grid grid-cols-4 gap-2">
              {accountTypes.map(({ value, label, icon: Icon }) => {
                const isSelected = accountType === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAccountType(value)}
                    className="flex flex-col items-center gap-2 rounded-xl py-3.5 px-2 text-center transition-all duration-200"
                    style={{
                      border: `1.5px solid ${isSelected ? "#00B0F0" : "var(--border-col)"}`,
                      backgroundColor: isSelected ? "var(--brand-subtle)" : "var(--bg-base)",
                      boxShadow: isSelected ? "0 0 0 3px rgba(0,176,240,0.08)" : "none",
                      transform: isSelected ? "translateY(-1px)" : "translateY(0)",
                    }}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: isSelected ? "#00B0F0" : "var(--text-muted)",
                        transition: "color 200ms",
                      }}
                    />
                    <span
                      className="text-[10px] font-semibold leading-tight"
                      style={{
                        color: isSelected ? "#00B0F0" : "var(--text-secondary)",
                        transition: "color 200ms",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            {/* Full name */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[12px] font-semibold uppercase tracking-[0.06em]"
                style={{ color: focusedField === "name" ? "#00B0F0" : "var(--text-secondary)" }}
              >
                Full name
              </label>
              <div
                className="flex items-center gap-3 h-[46px] rounded-xl px-4 transition-all duration-200"
                style={{
                  border: `1.5px solid ${focusedField === "name" ? "#00B0F0" : "var(--border-col)"}`,
                  backgroundColor: focusedField === "name" ? "var(--brand-subtle)" : "var(--bg-base)",
                  boxShadow: focusedField === "name" ? "0 0 0 4px rgba(0,176,240,0.08)" : "none",
                }}
              >
                <RiUserLine
                  size={16}
                  style={{
                    color: focusedField === "name" ? "#00B0F0" : "var(--text-muted)",
                    flexShrink: 0,
                    transition: "color 200ms",
                  }}
                />
                <input
                  type="text"
                  placeholder="Tendai Moyo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[color:var(--text-muted)]"
                  style={{ color: "var(--text-primary)" }}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[12px] font-semibold uppercase tracking-[0.06em]"
                style={{ color: focusedField === "email" ? "#00B0F0" : "var(--text-secondary)" }}
              >
                Email
              </label>
              <div
                className="flex items-center gap-3 h-[46px] rounded-xl px-4 transition-all duration-200"
                style={{
                  border: `1.5px solid ${focusedField === "email" ? "#00B0F0" : "var(--border-col)"}`,
                  backgroundColor: focusedField === "email" ? "var(--brand-subtle)" : "var(--bg-base)",
                  boxShadow: focusedField === "email" ? "0 0 0 4px rgba(0,176,240,0.08)" : "none",
                }}
              >
                <RiMailLine
                  size={16}
                  style={{
                    color: focusedField === "email" ? "#00B0F0" : "var(--text-muted)",
                    flexShrink: 0,
                    transition: "color 200ms",
                  }}
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[color:var(--text-muted)]"
                  style={{ color: "var(--text-primary)" }}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[12px] font-semibold uppercase tracking-[0.06em]"
                style={{ color: focusedField === "password" ? "#00B0F0" : "var(--text-secondary)" }}
              >
                Password
              </label>
              <div
                className="flex items-center gap-3 h-[46px] rounded-xl px-4 transition-all duration-200"
                style={{
                  border: `1.5px solid ${focusedField === "password" ? "#00B0F0" : "var(--border-col)"}`,
                  backgroundColor: focusedField === "password" ? "var(--brand-subtle)" : "var(--bg-base)",
                  boxShadow: focusedField === "password" ? "0 0 0 4px rgba(0,176,240,0.08)" : "none",
                }}
              >
                <RiLockPasswordLine
                  size={16}
                  style={{
                    color: focusedField === "password" ? "#00B0F0" : "var(--text-muted)",
                    flexShrink: 0,
                    transition: "color 200ms",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[color:var(--text-muted)]"
                  style={{ color: "var(--text-primary)" }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="transition-colors duration-150 hover:opacity-70"
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              </div>

              {/* Password strength meter */}
              {password.length > 0 && (
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex gap-1.5 flex-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="h-[3px] flex-1 rounded-full transition-all duration-400"
                        style={{
                          backgroundColor: level <= passwordStrength ? strengthColor : "var(--border-col)",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[11px] font-medium shrink-0"
                    style={{ color: strengthColor }}
                  >
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div
                className="relative flex h-[18px] w-[18px] mt-0.5 items-center justify-center rounded-md transition-all duration-200 shrink-0"
                style={{
                  border: `1.5px solid ${agreed ? "#00B0F0" : "var(--border-col)"}`,
                  backgroundColor: agreed ? "#00B0F0" : "transparent",
                  boxShadow: agreed ? "0 0 0 3px rgba(0,176,240,0.12)" : "none",
                }}
                onClick={() => setAgreed(!agreed)}
              >
                {agreed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                I agree to Gridpoint&apos;s{" "}
                <Link href="#" className="underline underline-offset-2 font-medium" style={{ color: "var(--text-primary)" }}>
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="#" className="underline underline-offset-2 font-medium" style={{ color: "var(--text-primary)" }}>
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreed}
              className="relative flex items-center justify-center gap-2 h-[46px] rounded-xl text-[14px] font-semibold transition-all duration-200 mt-1 overflow-hidden"
              style={{
                backgroundColor: agreed ? "#00B0F0" : "var(--bg-surface)",
                color: agreed ? "#fff" : "var(--text-muted)",
                cursor: agreed ? "pointer" : "not-allowed",
                opacity: agreed ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                if (!agreed) return
                e.currentTarget.style.backgroundColor = "#1AC3FF"
                e.currentTarget.style.transform = "translateY(-1px)"
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,176,240,0.3)"
              }}
              onMouseLeave={(e) => {
                if (!agreed) return
                e.currentTarget.style.backgroundColor = "#00B0F0"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              Create Account
              <RiArrowRightLine size={15} />
            </button>
          </form>
        </div>

        {/* Login link */}
        <p
          className="mt-7 text-center text-[13px] animate-fade-up"
          style={{ color: "var(--text-secondary)", animationDelay: "140ms" }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold transition-colors duration-150 hover:opacity-80"
            style={{ color: "#00B0F0" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
