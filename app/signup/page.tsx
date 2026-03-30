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
  RiErrorWarningLine,
  RiLoader4Line,
} from "@remixicon/react"

const accountTypes = [
  { value: "buyer", label: "Buyer / Renter", icon: RiHome4Line },
  { value: "agent", label: "Agent / Broker", icon: RiBriefcaseLine },
  { value: "investor", label: "Investor", icon: RiBuilding2Line },
  { value: "institution", label: "Institution", icon: RiBankLine },
]

type SignupErrors = {
  name?: string
  email?: string
  password?: string
  terms?: string
  form?: string
}

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState("buyer")
  const [agreed, setAgreed] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<SignupErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)

  const passwordStrength = Math.min(4, Math.floor(password.length / 3))
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength] || ""
  const strengthColor =
    passwordStrength <= 1 ? "#ef4444" : passwordStrength <= 2 ? "#f59e0b" : passwordStrength <= 3 ? "#00B0F0" : "#22c55e"

  const validate = (vals = { name, email, password, agreed }) => {
    const errs: SignupErrors = {}
    if (!vals.name.trim()) {
      errs.name = "Full name is required"
    } else if (vals.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters"
    }
    if (!vals.email.trim()) {
      errs.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      errs.email = "Enter a valid email address"
    }
    if (!vals.password) {
      errs.password = "Password is required"
    } else if (vals.password.length < 8) {
      errs.password = "Password must be at least 8 characters"
    }
    if (!vals.agreed) {
      errs.terms = "You must agree to the Terms of Service"
    }
    return errs
  }

  const handleBlur = (field: string) => {
    setFocusedField(null)
    setTouched((prev) => ({ ...prev, [field]: true }))
    const errs = validate()
    setErrors((prev) => ({ ...prev, [field]: errs[field as keyof SignupErrors] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched = { name: true, email: true, password: true, terms: true }
    setTouched(allTouched)
    const errs = validate()
    setErrors(errs)
    if (errs.name || errs.email || errs.password || errs.terms) return

    setIsLoading(true)
    setErrors({})
    // Simulate API call — replace with real registration endpoint
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    setErrors({ form: "An account with this email already exists. Try signing in instead." })
  }

  const fieldError = (field: string) =>
    touched[field] ? errors[field as keyof SignupErrors] : undefined

  const fieldBorder = (field: string) =>
    fieldError(field) ? "#ef4444" : focusedField === field ? "#00B0F0" : "var(--border-col)"

  const fieldBg = (field: string) =>
    fieldError(field)
      ? "rgba(239,68,68,0.04)"
      : focusedField === field
      ? "var(--brand-subtle)"
      : "var(--bg-base)"

  const fieldShadow = (field: string) =>
    fieldError(field)
      ? "0 0 0 4px rgba(239,68,68,0.06)"
      : focusedField === field
      ? "0 0 0 4px rgba(0,176,240,0.08)"
      : "none"

  const labelColor = (field: string) =>
    fieldError(field) ? "#ef4444" : focusedField === field ? "#00B0F0" : "var(--text-secondary)"

  const iconColor = (field: string) =>
    fieldError(field) ? "#ef4444" : focusedField === field ? "#00B0F0" : "var(--text-muted)"

  const canSubmit = !isLoading

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

          {/* Form-level error banner */}
          {errors.form && (
            <div
              className="flex items-center gap-3 p-3.5 rounded-xl mb-5"
              style={{
                backgroundColor: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.18)",
              }}
            >
              <RiErrorWarningLine size={15} style={{ color: "#ef4444", flexShrink: 0 }} />
              <span className="text-[13px]" style={{ color: "#ef4444" }}>{errors.form}</span>
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[12px] font-semibold uppercase tracking-[0.06em]"
                style={{ color: labelColor("name") }}
              >
                Full name
              </label>
              <div
                className="flex items-center gap-3 h-[46px] rounded-xl px-4 transition-all duration-200"
                style={{
                  border: `1.5px solid ${fieldBorder("name")}`,
                  backgroundColor: fieldBg("name"),
                  boxShadow: fieldShadow("name"),
                }}
              >
                <RiUserLine
                  size={16}
                  style={{
                    color: iconColor("name"),
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
                  onBlur={() => handleBlur("name")}
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[color:var(--text-muted)]"
                  style={{ color: "var(--text-primary)" }}
                  autoComplete="name"
                />
              </div>
              {fieldError("name") && (
                <p className="text-[12px]" style={{ color: "#ef4444" }}>{fieldError("name")}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[12px] font-semibold uppercase tracking-[0.06em]"
                style={{ color: labelColor("email") }}
              >
                Email
              </label>
              <div
                className="flex items-center gap-3 h-[46px] rounded-xl px-4 transition-all duration-200"
                style={{
                  border: `1.5px solid ${fieldBorder("email")}`,
                  backgroundColor: fieldBg("email"),
                  boxShadow: fieldShadow("email"),
                }}
              >
                <RiMailLine
                  size={16}
                  style={{
                    color: iconColor("email"),
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
                  onBlur={() => handleBlur("email")}
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[color:var(--text-muted)]"
                  style={{ color: "var(--text-primary)" }}
                  autoComplete="email"
                />
              </div>
              {fieldError("email") && (
                <p className="text-[12px]" style={{ color: "#ef4444" }}>{fieldError("email")}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[12px] font-semibold uppercase tracking-[0.06em]"
                style={{ color: labelColor("password") }}
              >
                Password
              </label>
              <div
                className="flex items-center gap-3 h-[46px] rounded-xl px-4 transition-all duration-200"
                style={{
                  border: `1.5px solid ${fieldBorder("password")}`,
                  backgroundColor: fieldBg("password"),
                  boxShadow: fieldShadow("password"),
                }}
              >
                <RiLockPasswordLine
                  size={16}
                  style={{
                    color: iconColor("password"),
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
                  onBlur={() => handleBlur("password")}
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
                <div className="flex items-center gap-3 mt-0.5">
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

              {fieldError("password") && (
                <p className="text-[12px]" style={{ color: "#ef4444" }}>{fieldError("password")}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <div
                  className="relative flex h-[18px] w-[18px] mt-0.5 items-center justify-center rounded-md transition-all duration-200 shrink-0"
                  style={{
                    border: `1.5px solid ${errors.terms && touched.terms ? "#ef4444" : agreed ? "#00B0F0" : "var(--border-col)"}`,
                    backgroundColor: agreed ? "#00B0F0" : "transparent",
                    boxShadow: agreed ? "0 0 0 3px rgba(0,176,240,0.12)" : "none",
                  }}
                  onClick={() => {
                    const next = !agreed
                    setAgreed(next)
                    if (touched.terms) {
                      setErrors((prev) => ({ ...prev, terms: next ? undefined : "You must agree to the Terms of Service" }))
                    }
                  }}
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
              {fieldError("terms") && (
                <p className="text-[12px]" style={{ color: "#ef4444" }}>{fieldError("terms")}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="relative flex items-center justify-center gap-2 h-[46px] rounded-xl text-[14px] font-semibold transition-all duration-200 mt-1 overflow-hidden"
              style={{
                backgroundColor: "#00B0F0",
                color: "#fff",
                opacity: isLoading ? 0.8 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (isLoading) return
                e.currentTarget.style.backgroundColor = "#1AC3FF"
                e.currentTarget.style.transform = "translateY(-1px)"
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,176,240,0.3)"
              }}
              onMouseLeave={(e) => {
                if (isLoading) return
                e.currentTarget.style.backgroundColor = "#00B0F0"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              {isLoading ? (
                <>
                  <RiLoader4Line
                    size={16}
                    style={{ animation: "spin 0.8s linear infinite" }}
                  />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <RiArrowRightLine size={15} />
                </>
              )}
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

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
