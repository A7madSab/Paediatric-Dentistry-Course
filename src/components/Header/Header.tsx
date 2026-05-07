import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigate, openImportExport, setViewMode } from '../../store/uiSlice';
import { formatMonthYear } from '../../utils/dateUtils';

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
  );
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
  );
}

export default function Header() {
  const dispatch = useAppDispatch();
  const { viewMode, currentYear, currentMonth } = useAppSelector((state) => state.ui);

  function goBack() {
    if (viewMode === 'year') {
      dispatch(navigate({ year: currentYear - 1, month: currentMonth }));
      return;
    }

    let month = currentMonth - 1;
    let year = currentYear;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    dispatch(navigate({ year, month }));
  }

  function goForward() {
    if (viewMode === 'year') {
      dispatch(navigate({ year: currentYear + 1, month: currentMonth }));
      return;
    }

    let month = currentMonth + 1;
    let year = currentYear;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    dispatch(navigate({ year, month }));
  }

  const title = viewMode === 'year'
    ? String(currentYear)
    : formatMonthYear(currentYear, currentMonth);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">🦷</span>
        <div>
          <h1 className="leading-tight text-lg font-bold text-slate-800">
            Paediatric Dentistry Course
          </h1>
          <p className="text-xs text-slate-500">Sep 2026 – Sep 2028</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex overflow-hidden rounded-lg border border-slate-200 text-sm">
          <button
            onClick={() => dispatch(setViewMode('month'))}
            className={`px-3 py-1.5 font-medium transition-colors ${
              viewMode === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => dispatch(setViewMode('year'))}
            className={`border-l border-slate-200 px-3 py-1.5 font-medium transition-colors ${
              viewMode === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Year
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          <button
            onClick={goBack}
            className="rounded-md p-1.5 text-slate-600 transition-all hover:bg-white hover:shadow-sm"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <span className="min-w-[160px] px-3 py-1 text-center text-sm font-semibold text-slate-800">
            {title}
          </span>
          <button
            onClick={goForward}
            className="rounded-md p-1.5 text-slate-600 transition-all hover:bg-white hover:shadow-sm"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <button
        onClick={() => dispatch(openImportExport())}
        className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
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
    </header>
  );
}
