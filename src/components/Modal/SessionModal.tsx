import { useEffect, useState } from 'react';
import { CLINICAL_Y1_CASES, PHASE_COLORS, PHASE_LABELS } from '../../constants';
import { useAppDispatch, useAppSelector, useSession } from '../../hooks';
import { addSession, deleteSession, updateSession } from '../../store/sessionsSlice';
import { closeModal } from '../../store/uiSlice';
import { formatDisplayDate } from '../../utils/dateUtils';
import type { PhaseType, Session } from '../../types';

const PHASES: PhaseType[] = ['preclinical', 'clinical_y1', 'clinical_y2', 'vacation', 'tbd'];

export default function SessionModal() {
  const dispatch = useAppDispatch();
  const { modalOpen, selectedSessionId, selectedDate } = useAppSelector((state) => state.ui);
  const existingSession = useSession(selectedSessionId);

  const isEditing = selectedSessionId !== null;

  const [title, setTitle] = useState('');
  const [phase, setPhase] = useState<PhaseType>('preclinical');
  const [notes, setNotes] = useState('');
  const [cases, setCases] = useState<string[]>([]);
  const [newCase, setNewCase] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    if (existingSession) {
      setTitle(existingSession.title);
      setPhase(existingSession.phase);
      setNotes(existingSession.notes);
      setCases(existingSession.cases);
      setEditMode(false);
    } else {
      setTitle('');
      setPhase('preclinical');
      setNotes('');
      setCases([]);
      setEditMode(true);
    }

    setConfirmDelete(false);
    setNewCase('');
  }, [existingSession, modalOpen]);

  if (!modalOpen) {
    return null;
  }

  const date = existingSession?.date ?? selectedDate ?? '';
  if (!date) {
    return null;
  }

  function handleSave() {
    if (!title.trim()) {
      return;
    }

    if (isEditing && existingSession) {
      const updated: Session = {
        ...existingSession,
        title: title.trim(),
        phase,
        notes,
        cases,
      };
      dispatch(updateSession(updated));
    } else {
      dispatch(
        addSession({
          date,
          title: title.trim(),
          phase,
          notes,
          cases,
        }),
      );
    }

    dispatch(closeModal());
  }

  function handleDelete() {
    if (selectedSessionId) {
      dispatch(deleteSession(selectedSessionId));
      dispatch(closeModal());
    }
  }

  function addCase() {
    const trimmed = newCase.trim();
    if (trimmed && !cases.includes(trimmed)) {
      setCases([...cases, trimmed]);
      setNewCase('');
    }
  }

  function removeCase(caseName: string) {
    setCases(cases.filter((item) => item !== caseName));
  }

  function addPresetCases() {
    setCases([...new Set([...cases, ...CLINICAL_Y1_CASES])]);
  }

  const readOnly = isEditing && !editMode;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`rounded-t-2xl px-4 py-3 text-white sm:px-6 sm:py-4 ${PHASE_COLORS[phase]}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium opacity-80 sm:text-sm">{formatDisplayDate(date)}</p>
              <h2 className="mt-0.5 text-base font-bold sm:text-lg">
                {readOnly ? existingSession?.title : isEditing ? 'Edit Session' : 'Add Session'}
              </h2>
            </div>
            <button
              onClick={() => dispatch(closeModal())}
              className="mt-0.5 rounded-lg p-1 text-white hover:bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {readOnly && existingSession ? (
            <>
              <div>
                <span
                  className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold text-white ${PHASE_COLORS[existingSession.phase]}`}
                >
                  {PHASE_LABELS[existingSession.phase]}
                </span>
              </div>
              {existingSession.notes && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Notes
                  </p>
                  <p className="whitespace-pre-wrap text-sm text-slate-700">
                    {existingSession.notes}
                  </p>
                </div>
              )}
              {existingSession.cases.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Required Cases
                  </p>
                  <ul className="space-y-1">
                    {existingSession.cases.map((caseName) => (
                      <li key={caseName} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                        {caseName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Session Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Pulpotomy on Teeth"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Phase
                </label>
                <select
                  value={phase}
                  onChange={(event) => setPhase(event.target.value as PhaseType)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {PHASES.map((phaseOption) => (
                    <option key={phaseOption} value={phaseOption}>
                      {PHASE_LABELS[phaseOption]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Session description or instructions..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Required Cases
                  </label>
                  <button
                    type="button"
                    onClick={addPresetCases}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    + Add Y1 preset cases
                  </button>
                </div>
                <div className="mb-2 flex gap-2">
                  <input
                    type="text"
                    value={newCase}
                    onChange={(event) => setNewCase(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        addCase();
                      }
                    }}
                    placeholder="Case type..."
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCase}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    Add
                  </button>
                </div>
                {cases.length > 0 && (
                  <ul className="space-y-1">
                    {cases.map((caseName) => (
                      <li
                        key={caseName}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5"
                      >
                        <span className="text-sm text-slate-700">{caseName}</span>
                        <button
                          onClick={() => removeCase(caseName)}
                          className="ml-2 text-sm font-medium text-slate-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-6 pb-6">
          {isEditing ? (
            <>
              {confirmDelete ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-red-600">Sure?</span>
                  <button
                    onClick={handleDelete}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="text-sm font-medium text-red-500 hover:text-red-700"
                >
                  Delete Session
                </button>
              )}
              <div className="flex gap-2">
                {readOnly ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setEditMode(false)}
                      className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!title.trim()}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Save Changes
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => dispatch(closeModal())}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!title.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
