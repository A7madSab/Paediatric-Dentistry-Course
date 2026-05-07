import { isSameMonth } from 'date-fns';
import { useAppSelector } from '../../hooks';
import { getMonthGrid } from '../../utils/dateUtils';
import DayCell from './DayCell';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function MonthView() {
  const { currentYear, currentMonth } = useAppSelector((state) => state.ui);
  const days = getMonthGrid(currentYear, currentMonth);
  const referenceMonth = new Date(currentYear, currentMonth, 1);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:rounded-xl">
      <div className="grid grid-cols-7 border-b border-slate-200">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:py-2 md:text-xs"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((date) => (
          <DayCell
            key={date.toISOString()}
            date={date}
            isCurrentMonth={isSameMonth(date, referenceMonth)}
          />
        ))}
      </div>
    </div>
  );
}
