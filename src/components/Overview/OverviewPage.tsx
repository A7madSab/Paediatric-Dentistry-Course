/** @format */

import { format } from "date-fns"
import { PHASE_BG_LIGHT, PHASE_COLORS, PHASE_LABELS } from "../../constants"
import { useAllSessions, useAppDispatch } from "../../hooks"
import { openEditModal } from "../../store/uiSlice"
import type { Session } from "../../types"

function groupByMonth(sessions: Session[]): Record<string, Session[]> {
  const groups: Record<string, Session[]> = {}
  for (const session of sessions) {
    const key = session.date.slice(0, 7) // "YYYY-MM"
    if (!groups[key]) groups[key] = []
    groups[key].push(session)
  }
  return groups
}

export default function OverviewPage() {
  const dispatch = useAppDispatch()
  const allSessions = useAllSessions()

  const sorted = [...allSessions].sort(
    (a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title)
  )

  const grouped = groupByMonth(sorted)
  const months = Object.keys(grouped).sort()

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <span className="text-5xl mb-4">📋</span>
        <p className="text-sm">No sessions added yet.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-12">
      <div className="sticky top-0 z-10 bg-slate-50/90 py-3 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
          All Sessions — Overview
        </h2>
        <p className="text-xs text-slate-500">
          {sorted.length} session{sorted.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {months.map(monthKey => {
        const [year, month] = monthKey.split("-")
        const label = format(
          new Date(Number(year), Number(month) - 1, 1),
          "MMMM yyyy"
        )
        const sessions = grouped[monthKey]

        return (
          <section key={monthKey}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              {label}
              <span className="ml-2 text-xs font-normal normal-case text-slate-400">
                ({sessions.length})
              </span>
            </h3>
            <div className="space-y-2">
              {sessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => dispatch(openEditModal(session.id))}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all hover:shadow-md sm:p-4 ${PHASE_BG_LIGHT[session.phase]}`}
                >
                  {/* Date badge */}
                  <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-white shadow-sm sm:h-12 sm:w-12">
                    <span className="text-xs font-bold leading-tight text-slate-700">
                      {format(new Date(session.date), "dd")}
                    </span>
                    <span className="text-[9px] uppercase text-slate-400">
                      {format(new Date(session.date), "EEE")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${PHASE_COLORS[session.phase]}`}
                      >
                        {PHASE_LABELS[session.phase]}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                      {session.title}
                    </p>
                    {session.notes && (
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                        {session.notes}
                      </p>
                    )}
                    {session.cases.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {session.cases.slice(0, 3).map(c => (
                          <span
                            key={c}
                            className="rounded-md bg-white/80 px-1.5 py-0.5 text-[10px] text-slate-600 shadow-sm"
                          >
                            {c}
                          </span>
                        ))}
                        {session.cases.length > 3 && (
                          <span className="text-[10px] text-slate-400">
                            +{session.cases.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
