/** @format */

import { useDroppable } from "@dnd-kit/core"
import { isToday } from "date-fns"
import { useAppDispatch, useSessionsOnDate } from "../../hooks"
import { openAddModal } from "../../store/uiSlice"
import { toDateString } from "../../utils/dateUtils"
import SessionChip from "./SessionChip"

interface Props {
  date: Date
  isCurrentMonth: boolean
}

export default function DayCell({ date, isCurrentMonth }: Props) {
  const dateStr = toDateString(date)
  const dispatch = useAppDispatch()
  const sessions = useSessionsOnDate(dateStr)
  const today = isToday(date)

  const { setNodeRef, isOver } = useDroppable({ id: dateStr })

  function handleClick() {
    dispatch(openAddModal(dateStr))
  }

  return (
    <div
      ref={setNodeRef}
      onClick={handleClick}
      className={[
        "flex min-h-[52px] cursor-pointer flex-col gap-0.5 border border-slate-100 p-0.5 transition-colors md:min-h-[80px] md:p-1.5",
        isCurrentMonth
          ? "bg-white hover:bg-slate-50"
          : "bg-slate-50/50 hover:bg-slate-100/50",
        isOver ? "ring-2 ring-blue-400 ring-inset bg-blue-50" : ""
      ].join(" ")}
    >
      <span
        className={[
          "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium md:h-6 md:w-6 md:text-xs",
          today
            ? "bg-blue-600 font-bold text-white"
            : isCurrentMonth
              ? "text-slate-700"
              : "text-slate-300"
        ].join(" ")}
      >
        {date.getDate()}
      </span>
      <div className="hidden flex-col gap-0.5 overflow-hidden sm:flex">
        {sessions.slice(0, 3).map(session => (
          <SessionChip key={session.id} session={session} />
        ))}
        {sessions.length > 3 && (
          <span className="pl-1 text-[9px] text-slate-400">
            +{sessions.length - 3} more
          </span>
        )}
      </div>
      {sessions.length > 0 && (
        <div className="flex gap-0.5 sm:hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        </div>
      )}
    </div>
  )
}
