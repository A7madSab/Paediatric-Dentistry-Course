import { format, isSameMonth } from 'date-fns';
import { PHASE_DOT_COLORS } from '../../constants';
import { useAllSessions, useAppDispatch, useAppSelector } from '../../hooks';
import { navigate, setViewMode } from '../../store/uiSlice';
import { getMonthGrid, toDateString } from '../../utils/dateUtils';

const MINI_WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface MiniMonthProps {
  year: number;
  month: number;
}

function MiniMonth({ year, month }: MiniMonthProps) {
  const dispatch = useAppDispatch();
  const allSessions = useAllSessions();
  const days = getMonthGrid(year, month);
  const referenceMonth = new Date(year, month, 1);

  const sessionMap: Record<string, string> = {};
  for (const session of allSessions) {
    sessionMap[session.date] = PHASE_DOT_COLORS[session.phase];
  }

  function handleClick() {
    dispatch(navigate({ year, month }));
    dispatch(setViewMode('month'));
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-md"
    >
      <h3 className="mb-2 text-center text-xs font-bold text-slate-700">
        {format(new Date(year, month, 1), 'MMMM')}
      </h3>
      <div className="mb-1 grid grid-cols-7 gap-0">
        {MINI_WEEKDAYS.map((day, index) => (
          <div key={`${day}-${index}`} className="text-center text-[9px] font-medium text-slate-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {days.map((date) => {
          const dateStr = toDateString(date);
          const dotColor = sessionMap[dateStr];
          const inMonth = isSameMonth(date, referenceMonth);

          return (
            <div key={dateStr} className="flex aspect-square items-center justify-center">
              {inMonth ? (
                dotColor ? (
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold text-white ${dotColor}`}
                  >
                    {date.getDate()}
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-400">{date.getDate()}</span>
                )
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function YearView() {
  const { currentYear } = useAppSelector((state) => state.ui);

  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-4">
      {Array.from({ length: 12 }, (_, index) => (
        <MiniMonth key={index} year={currentYear} month={index} />
      ))}
    </div>
  );
}
