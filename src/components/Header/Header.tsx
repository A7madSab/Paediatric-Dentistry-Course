/** @format */

import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  navigate,
  openImportExport,
  setPage,
  setViewMode,
  toggleSidebar
} from "../../store/uiSlice"
import { formatMonthYear } from "../../utils/dateUtils"

function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}

export default function Header() {
  const dispatch = useAppDispatch()
  const { viewMode, currentYear, currentMonth, page } = useAppSelector(
    state => state.ui
  )

  function goBack() {
    if (viewMode === "year") {
      dispatch(navigate({ year: currentYear - 1, month: currentMonth }))
      return
    }

    let month = currentMonth - 1
    let year = currentYear
    if (month < 0) {
      month = 11
      year -= 1
    }
    dispatch(navigate({ year, month }))
  }

  function goForward() {
    if (viewMode === "year") {
      dispatch(navigate({ year: currentYear + 1, month: currentMonth }))
      return
    }

    let month = currentMonth + 1
    let year = currentYear
    if (month > 11) {
      month = 0
      year += 1
    }
    dispatch(navigate({ year, month }))
  }

  function goToday() {
    const now = new Date()
    dispatch(navigate({ year: now.getFullYear(), month: now.getMonth() }))
    dispatch(setViewMode("month"))
  }

  const title =
    viewMode === "year"
      ? String(currentYear)
      : formatMonthYear(currentYear, currentMonth)

  return (
    <header className="flex flex-col gap-2 border-b border-slate-200 bg-white px-3 py-2 shadow-sm md:flex-row md:items-center md:justify-between md:gap-4 md:px-6 md:py-3">
      {/* Top row: menu + title + export */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </button>
          <span className="text-xl md:text-2xl" aria-hidden="true">
            🦷
          </span>
          <div>
            <h1 className="text-sm font-bold leading-tight text-slate-800 md:text-lg">
              FPaed Program 2026
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Sep 2026 – Sep 2028
            </p>
          </div>
        </div>

        <button
          onClick={() => dispatch(openImportExport())}
          className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3.5 w-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Export
        </button>
      </div>

      {/* Bottom row on mobile: nav controls */}
      <div className="flex items-center justify-between gap-2 md:justify-end">
        <div className="flex overflow-hidden rounded-lg border border-slate-200 text-xs md:text-sm">
          <button
            onClick={() => dispatch(setPage("calendar"))}
            className={`px-2.5 py-1 font-medium transition-colors md:px-3 md:py-1.5 ${
              page === "calendar"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => dispatch(setPage("overview"))}
            className={`border-l border-slate-200 px-2.5 py-1 font-medium transition-colors md:px-3 md:py-1.5 ${
              page === "overview"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Overview
          </button>
        </div>

        <div className="flex overflow-hidden rounded-lg border border-slate-200 text-xs md:text-sm">
          <button
            onClick={() => dispatch(setViewMode("month"))}
            className={`px-2.5 py-1 font-medium transition-colors md:px-3 md:py-1.5 ${
              viewMode === "month"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => dispatch(setViewMode("year"))}
            className={`border-l border-slate-200 px-2.5 py-1 font-medium transition-colors md:px-3 md:py-1.5 ${
              viewMode === "year"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Year
          </button>
        </div>

        <button
          onClick={goToday}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 md:px-3 md:py-1.5 md:text-sm"
        >
          Today
        </button>

        <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5 md:gap-1 md:p-1">
          <button
            onClick={goBack}
            className="rounded-md p-1 text-slate-600 transition-all hover:bg-white hover:shadow-sm md:p-1.5"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <span className="min-w-[100px] px-1.5 py-0.5 text-center text-xs font-semibold text-slate-800 md:min-w-[160px] md:px-3 md:py-1 md:text-sm">
            {title}
          </span>
          <button
            onClick={goForward}
            className="rounded-md p-1 text-slate-600 transition-all hover:bg-white hover:shadow-sm md:p-1.5"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Desktop export button */}
        <button
          onClick={() => dispatch(openImportExport())}
          className="hidden items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 md:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Export / Import
        </button>
      </div>
    </header>
  )
}
