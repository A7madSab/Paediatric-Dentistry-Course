import type { ExportPayload, Session } from '../types';
import { SCHEMA_VERSION } from '../constants';

export function exportToJson(sessions: Session[]): void {
  const payload: ExportPayload = {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    courseName: 'Paediatric Dentistry Course 2026–2028',
    sessions,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dental-calendar-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseImportFile(file: File): Promise<ExportPayload> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target?.result as string) as unknown;
        if (!isValidExportPayload(raw)) {
          reject(new Error('Invalid file format. Please import a valid calendar JSON file.'));
          return;
        }
        resolve(raw);
      } catch {
        reject(new Error('Could not parse file. Make sure it is a valid JSON file.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
}

function isValidExportPayload(raw: unknown): raw is ExportPayload {
  if (typeof raw !== 'object' || raw === null) {
    return false;
  }

  const obj = raw as Record<string, unknown>;
  return (
    typeof obj.schemaVersion === 'number' &&
    Array.isArray(obj.sessions) &&
    obj.sessions.every(isValidSession)
  );
}

function isValidSession(raw: unknown): raw is Session {
  if (typeof raw !== 'object' || raw === null) {
    return false;
  }

  const session = raw as Record<string, unknown>;
  return (
    typeof session.id === 'string' &&
    typeof session.date === 'string' &&
    typeof session.title === 'string' &&
    typeof session.phase === 'string' &&
    typeof session.notes === 'string' &&
    Array.isArray(session.cases)
  );
}
