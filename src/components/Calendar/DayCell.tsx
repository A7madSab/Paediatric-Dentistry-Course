import { useDroppable } from '@dnd-kit/core';
import { isToday } from 'date-fns';
import { useAppDispatch, useSessionsOnDate } from '../../hooks';
import { openAddModal } from '../../store/uiSlice';
import { toDateString } from '../../utils/dateUtils';
import SessionChip from './SessionChip';

interface Props {
  date: Date;
  isCurrentMonth: boolean;
}

export default function DayCell({ date, isCurrentMonth }: Props) {
  const dateStr = toDateString(date);
  const dispatch = useAppDispatch();
  const sessions = useSessionsOnDate(dateStr);
  const today = isToday(date);

  const { setNodeRef, isOver } = useDroppable({ id: dateStr });

  function handleClick() {
    dispatch(openAddModal(dateStr));
  }

  return (
    <div
      ref={setNodeRef}
      onClick={handleClick}
      className={[
        'flex min-h-[80px] cursor-pointer flex-col gap-0.5 border border-slate-100 p-1.5 transition-colors',
        isCurrentMonth ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/50 hover:bg-slate-100/50',
        isOver ? 'ring-2 ring-blue-400 ring-inset bg-blue-50' : '',
      ].join(' ')}
    >
      <span
        className={[
          'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
          today
            ? 'bg-blue-600 font-bold text-white'
            : isCurrentMonth
              ? 'text-slate-700'
              : 'text-slate-300',
        ].join(' ')}
      >
        {date.getDate()}
      </span>
      <div className="flex flex-col gap-0.5 overflow-hidden">
        {sessions.slice(0, 3).map((session) => (
          <SessionChip key={session.id} session={session} />
        ))}
        {sessions.length > 3 && (
          <span className="pl-1 text-[9px] text-slate-400">+{sessions.length - 3} more</span>
        )}
      </div>
    </div>
  );
}
