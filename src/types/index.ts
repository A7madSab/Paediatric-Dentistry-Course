export type PhaseType =
  | 'preclinical'
  | 'clinical_y1'
  | 'clinical_y2'
  | 'vacation'
  | 'tbd';

export type ViewMode = 'month' | 'year';

export interface Session {
  id: string;
  date: string; // "YYYY-MM-DD"
  title: string;
  phase: PhaseType;
  notes: string;
  cases: string[];
}

export interface SessionsState {
  entities: Record<string, Session>;
}

export interface UIState {
  viewMode: ViewMode;
  currentYear: number;
  currentMonth: number; // 0-indexed
  selectedSessionId: string | null;
  selectedDate: string | null;
  modalOpen: boolean;
  importExportOpen: boolean;
}

export interface ExportPayload {
  schemaVersion: 1;
  exportedAt: string;
  courseName: string;
  sessions: Session[];
}
