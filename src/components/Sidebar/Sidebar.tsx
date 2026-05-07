import { PHASE_DOT_COLORS, PHASE_LABELS } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { navigate, setViewMode } from '../../store/uiSlice';
import type { PhaseType } from '../../types';

const phases: PhaseType[] = ['preclinical', 'clinical_y1', 'clinical_y2', 'vacation', 'tbd'];

interface PhaseLink {
  label: string;
  year: number;
  month: number;
  description: string;
}

const PHASE_LINKS: PhaseLink[] = [
  { label: 'Preclinical Start', year: 2026, month: 8, description: 'Sep 2026' },
  { label: 'Ramadan Vacation', year: 2027, month: 1, description: 'Feb 2027' },
  { label: 'Clinical Y1 Start', year: 2027, month: 2, description: 'Mar 2027' },
  { label: 'Summer Vacation', year: 2027, month: 7, description: 'Aug 2027' },
  { label: 'Clinical Y2 Start', year: 2027, month: 8, description: 'Sep 2027' },
  { label: 'Vacation', year: 2028, month: 1, description: 'Feb 2028' },
  { label: 'TBD Period', year: 2028, month: 2, description: 'Mar 2028' },
  { label: 'Course End', year: 2028, month: 8, description: 'Sep 2028' },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();

  function jumpTo(year: number, month: number) {
    dispatch(navigate({ year, month }));
    dispatch(setViewMode('month'));
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-6 overflow-y-auto border-r border-slate-200 bg-white p-4">
      <div>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Legend</h2>
        <ul className="space-y-2">
          {phases.map((phase) => (
            <li key={phase} className="flex items-center gap-2 text-sm text-slate-700">
              <span className={`h-3 w-3 shrink-0 rounded-full ${PHASE_DOT_COLORS[phase]}`} />
              {PHASE_LABELS[phase]}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Timeline</h2>
        <ul className="space-y-1">
          {PHASE_LINKS.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => jumpTo(link.year, link.month)}
                className="w-full rounded-md px-2 py-1.5 text-left text-xs text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <span className="block font-medium">{link.label}</span>
                <span className="text-slate-400">{link.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
