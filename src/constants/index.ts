import type { PhaseType } from '../types';

export const COURSE_START = '2026-09-01';
export const COURSE_END = '2028-09-01';
export const SCHEMA_VERSION = 1 as const;

export const PHASE_COLORS: Record<PhaseType, string> = {
  preclinical: 'bg-blue-500',
  clinical_y1: 'bg-emerald-500',
  clinical_y2: 'bg-teal-600',
  vacation: 'bg-amber-400',
  tbd: 'bg-slate-400',
};

export const PHASE_TEXT_COLORS: Record<PhaseType, string> = {
  preclinical: 'text-blue-700',
  clinical_y1: 'text-emerald-700',
  clinical_y2: 'text-teal-700',
  vacation: 'text-amber-700',
  tbd: 'text-slate-600',
};

export const PHASE_BG_LIGHT: Record<PhaseType, string> = {
  preclinical: 'bg-blue-50 border-blue-200',
  clinical_y1: 'bg-emerald-50 border-emerald-200',
  clinical_y2: 'bg-teal-50 border-teal-200',
  vacation: 'bg-amber-50 border-amber-200',
  tbd: 'bg-slate-50 border-slate-200',
};

export const PHASE_LABELS: Record<PhaseType, string> = {
  preclinical: 'Preclinical',
  clinical_y1: 'Clinical — Year 1',
  clinical_y2: 'Clinical — Year 2',
  vacation: 'Vacation',
  tbd: 'TBD / Unscheduled',
};

export const PHASE_DOT_COLORS: Record<PhaseType, string> = {
  preclinical: 'bg-blue-500',
  clinical_y1: 'bg-emerald-500',
  clinical_y2: 'bg-teal-600',
  vacation: 'bg-amber-400',
  tbd: 'bg-slate-400',
};

export const CLINICAL_Y1_CASES: string[] = [
  'Extraction Cases',
  'Pulpotomy Cases',
  'Pulpectomy Cases',
  'Stainless Steel Cases',
  'Space Maintainers',
  'Simple Composite',
  'Fissure Sealant & PRR',
  'Minimally Invasive',
  'Strip Crown',
];
