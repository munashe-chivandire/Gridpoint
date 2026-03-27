"use client"

import { useState } from "react"
import Link from "next/link"
import {
  RiMailLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCheckLine,
} from "@remixicon/react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
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
          {!sent ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1
                  className="font-heading text-[26px] font-bold tracking-[-0.03em] mb-1.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  Reset your password
                </h1>
                <p className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              {/* Form */}
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email) setSent(true)
                }}
              >
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

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 h-[46px] rounded-xl text-[14px] font-semibold transition-all duration-200 overflow-hidden"
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
                  Send Reset Link
                  <RiArrowRightLine size={15} />
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="flex flex-col items-center text-center py-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl mb-6"
                style={{
                  backgroundColor: "var(--brand-subtle)",
                  border: "1.5px solid rgba(0,176,240,0.15)",
                }}
              >
                <RiCheckLine size={28} style={{ color: "#00B0F0" }} />
              </div>
              <h1
                className="font-heading text-[24px] font-bold tracking-[-0.03em] mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Check your inbox
              </h1>
              <p className="text-[14px] leading-relaxed mb-1" style={{ color: "var(--text-secondary)" }}>
                We sent a password reset link to
              </p>
              <p
                className="text-[14px] font-semibold mb-8 px-4 py-1.5 rounded-lg"
                style={{
                  color: "var(--text-primary)",
                  backgroundColor: "var(--bg-base)",
                  border: "1px solid var(--border-col)",
                }}
              >
                {email}
              </p>
              <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                Didn&apos;t receive it?{" "}
                <button
                  onClick={() => setSent(false)}
                  className="font-semibold transition-colors duration-150 hover:opacity-80"
                  style={{ color: "#00B0F0" }}
                >
                  Try again
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Back to login */}
        <div
          className="mt-7 flex justify-center animate-fade-up"
          style={{ animationDelay: "140ms" }}
        >
          <Link
            href="/login"
            className="flex items-center gap-2 text-[13px] font-medium transition-all duration-150 hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            <RiArrowLeftLine size={14} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
