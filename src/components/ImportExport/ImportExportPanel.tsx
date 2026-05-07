import { useRef, useState } from 'react';
import { useAllSessions, useAppDispatch, useAppSelector } from '../../hooks';
import { mergeSessions, replaceSessions } from '../../store/sessionsSlice';
import { closeImportExport } from '../../store/uiSlice';
import type { ExportPayload } from '../../types';
import { exportToJson, parseImportFile } from '../../utils/importExport';

type ImportMode = 'replace' | 'merge';

export default function ImportExportPanel() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.importExportOpen);
  const allSessions = useAllSessions();
  const fileRef = useRef<HTMLInputElement>(null);

  const [importMode, setImportMode] = useState<ImportMode>('replace');
  const [pending, setPending] = useState<ExportPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  function handleExport() {
    exportToJson(allSessions);
    setSuccess(`Exported ${allSessions.length} sessions.`);
    setTimeout(() => setSuccess(null), 3000);
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setError(null);
    try {
      const payload = await parseImportFile(file);
      setPending(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      if (fileRef.current) {
        fileRef.current.value = '';
      }
    }
  }

  function confirmImport() {
    if (!pending) {
      return;
    }

    if (importMode === 'replace') {
      dispatch(replaceSessions(pending.sessions));
      setSuccess(`Replaced calendar with ${pending.sessions.length} sessions.`);
    } else {
      dispatch(mergeSessions(pending.sessions));
      setSuccess(`Merged ${pending.sessions.length} sessions.`);
    }

    setPending(null);
    setTimeout(() => setSuccess(null), 3000);
  }

  function handleClose() {
    setPending(null);
    setError(null);
    setSuccess(null);
    dispatch(closeImportExport());
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-bold text-slate-800">Export / Import Calendar</h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
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

        <div className="space-y-6 p-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-1 font-semibold text-slate-800">📤 Export</h3>
            <p className="mb-3 text-sm text-slate-500">
              Download all {allSessions.length} sessions as a JSON file to share with others.
            </p>
            <button
              onClick={handleExport}
              className="w-full rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Download calendar.json
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-1 font-semibold text-slate-800">📥 Import</h3>
            <p className="mb-3 text-sm text-slate-500">
              Import sessions from a previously exported JSON file.
            </p>

            <div className="mb-3 flex gap-3">
              {(['replace', 'merge'] as ImportMode[]).map((mode) => (
                <label key={mode} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    checked={importMode === mode}
                    onChange={() => setImportMode(mode)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm font-medium capitalize text-slate-700">{mode}</span>
                </label>
              ))}
            </div>
            <p className="mb-3 text-xs text-slate-400">
              {importMode === 'replace'
                ? '⚠️ Replace will overwrite all current sessions.'
                : '✅ Merge will add new sessions without overwriting existing ones.'}
            </p>

            <button
              onClick={() => fileRef.current?.click()}
              className="w-full rounded-lg border-2 border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-blue-400 hover:text-blue-600"
            >
              Choose JSON file…
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {pending && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-1 text-sm font-medium text-amber-800">
                Ready to import {pending.sessions.length} sessions
              </p>
              <p className="mb-3 text-xs text-amber-600">
                Exported on {new Date(pending.exportedAt).toLocaleString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPending(null)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmImport}
                  className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Confirm {importMode === 'replace' ? 'Replace' : 'Merge'}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              ✅ {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
