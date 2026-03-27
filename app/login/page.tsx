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
} from "@remixicon/react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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
        className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[800px] h-[800px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #00B0F0 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #00B0F0 0%, transparent 70%)",
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* ── Main card ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[440px] mx-6">
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
              Welcome back
            </h1>
            <p className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
              Sign in to your Gridpoint account
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
                className="group flex items-center justify-center gap-2.5 h-[44px] rounded-xl text-[13px] font-medium transition-all duration-200"
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

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
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
              <div className="flex items-center justify-between">
                <label
                  className="text-[12px] font-semibold uppercase tracking-[0.06em]"
                  style={{ color: focusedField === "password" ? "#00B0F0" : "var(--text-secondary)" }}
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[12px] font-medium transition-colors duration-150 hover:opacity-80"
                  style={{ color: "#00B0F0" }}
                >
                  Forgot?
                </Link>
              </div>
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[color:var(--text-muted)]"
                  style={{ color: "var(--text-primary)" }}
                  autoComplete="current-password"
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
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer select-none group">
              <div
                className="relative flex h-[18px] w-[18px] items-center justify-center rounded-md transition-all duration-200 shrink-0"
                style={{
                  border: `1.5px solid ${remember ? "#00B0F0" : "var(--border-col)"}`,
                  backgroundColor: remember ? "#00B0F0" : "transparent",
                  boxShadow: remember ? "0 0 0 3px rgba(0,176,240,0.12)" : "none",
                }}
                onClick={() => setRemember(!remember)}
              >
                {remember && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                Keep me signed in
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="relative flex items-center justify-center gap-2 h-[46px] rounded-xl text-[14px] font-semibold transition-all duration-200 mt-1 overflow-hidden group"
              style={{ backgroundColor: "#00B0F0", color: "#fff" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1AC3FF"
                e.currentTarget.style.transform = "translateY(-1px)"
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,176,240,0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#00B0F0"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              Sign In
              <RiArrowRightLine size={15} />
            </button>
          </form>
        </div>

        {/* Sign up link */}
        <p
          className="mt-7 text-center text-[13px] animate-fade-up"
          style={{ color: "var(--text-secondary)", animationDelay: "140ms" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold transition-colors duration-150 hover:opacity-80"
            style={{ color: "#00B0F0" }}
          >
            Create one free
          </Link>
        </p>

        {/* Footer */}
        <p
          className="mt-5 text-center text-[11px] animate-fade-up"
          style={{ color: "var(--text-muted)", animationDelay: "180ms" }}
        >
          By signing in you agree to our{" "}
          <Link href="#" className="underline underline-offset-2 hover:opacity-80" style={{ color: "var(--text-muted)" }}>
            Terms
          </Link>
          {" "}&amp;{" "}
          <Link href="#" className="underline underline-offset-2 hover:opacity-80" style={{ color: "var(--text-muted)" }}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
