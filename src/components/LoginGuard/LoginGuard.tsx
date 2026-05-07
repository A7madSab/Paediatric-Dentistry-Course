/** @format */

import { useState, type FormEvent } from "react"

const CORRECT_PASSWORD = "Iamadmin!"

interface Props {
  onSuccess: () => void
}

export default function LoginGuard({ onSuccess }: Props) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100" />

      {/* Decorative blurred circles */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200 opacity-40 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-200 opacity-30 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-indigo-200 opacity-25 blur-2xl" />

      <form
        onSubmit={handleSubmit}
        className={`relative z-10 w-full max-w-sm rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-md sm:p-10 ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
      >
        {/* Icon with gradient ring */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 shadow-inner">
          <span className="text-4xl" aria-hidden="true">
            🦷
          </span>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            FPaed Program
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Enter your password to access the calendar
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              setError(false)
            }}
            placeholder="••••••••"
            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-800 shadow-sm transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none ${
              error
                ? "border-red-300 bg-red-50/50"
                : "border-slate-200 bg-white/70"
            }`}
            autoFocus
          />
          <div className="h-5">
            {error && (
              <p className="text-xs font-medium text-red-500">
                Incorrect password. Please try again.
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-[0.98]"
        >
          Enter
        </button>

        <p className="mt-6 text-center text-[11px] text-slate-400">
          Paediatric Dentistry · Sep 2026 – Sep 2028
        </p>
      </form>
    </div>
  )
}
