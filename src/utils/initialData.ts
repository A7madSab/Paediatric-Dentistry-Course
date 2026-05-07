import { v4 as uuidv4 } from 'uuid';
import type { Session, PhaseType } from '../types';
import { CLINICAL_Y1_CASES } from '../constants';
import { addWeeks } from './dateUtils';

function makeSession(
  date: string,
  title: string,
  phase: PhaseType,
  notes = '',
  cases: string[] = [],
): Session {
  return { id: uuidv4(), date, title, phase, notes, cases };
}

export function buildInitialSessions(): Record<string, Session> {
  const sessions: Session[] = [];

  const preclinicalStart = '2026-09-01';

  for (let i = 0; i < 3; i++) {
    sessions.push(
      makeSession(
        addWeeks(preclinicalStart, i),
        `Pulpotomy & Pulpectomy on Teeth (${i + 1}/3)`,
        'preclinical',
        'Hands-on pulpotomy and pulpectomy procedures on extracted teeth.',
      ),
    );
  }

  for (let i = 3; i < 17; i++) {
    sessions.push(
      makeSession(
        addWeeks(preclinicalStart, i),
        'Preclinical Session — TBD',
        'tbd',
        'Content to be decided.',
      ),
    );
  }

  sessions.push(
    makeSession(
      addWeeks(preclinicalStart, 17),
      'Rotary Endodontics on Teeth',
      'preclinical',
      'Introduction to rotary endodontic systems and technique.',
    ),
  );

  sessions.push(
    makeSession(
      addWeeks(preclinicalStart, 18),
      'Photography',
      'preclinical',
      'Clinical dental photography techniques and documentation.',
    ),
  );

  sessions.push(
    makeSession(
      addWeeks(preclinicalStart, 19),
      'Isolation',
      'preclinical',
      'Rubber dam isolation and moisture control techniques.',
    ),
  );

  const clinicalY1Start = '2027-03-02';
  for (let i = 0; i < 15; i++) {
    sessions.push(
      makeSession(
        addWeeks(clinicalY1Start, i),
        `Clinical Session ${i + 1}`,
        'clinical_y1',
        '4 cases per candidate per day. Cover required case types as listed.',
        CLINICAL_Y1_CASES,
      ),
    );
  }

  const clinicalY2Start = '2027-09-07';
  const y2Topics: Array<{ title: string; count: number; notes: string }> = [
    {
      title: 'MTA Pulpotomy',
      count: 4,
      notes: 'MTA-based pulpotomy procedures on permanent and primary teeth.',
    },
    {
      title: 'Revascularization',
      count: 4,
      notes: 'Regenerative endodontic procedures for immature permanent teeth.',
    },
    {
      title: 'Interceptive Treatment',
      count: 3,
      notes: 'Interceptive orthodontic and paediatric dental management.',
    },
    {
      title: 'SSC Permanent',
      count: 3,
      notes: 'Stainless steel crowns on permanent teeth.',
    },
    {
      title: 'Trauma Management',
      count: 3,
      notes: 'Diagnosis, splinting, and management of dental trauma.',
    },
    {
      title: 'ICON',
      count: 3,
      notes: 'ICON infiltration technique for white spot lesions.',
    },
  ];

  let idx = 0;
  for (const topic of y2Topics) {
    for (let j = 0; j < topic.count; j++) {
      sessions.push(
        makeSession(
          addWeeks(clinicalY2Start, idx),
          `${topic.title} (${j + 1}/${topic.count})`,
          'clinical_y2',
          topic.notes,
        ),
      );
      idx++;
    }
  }

  const record: Record<string, Session> = {};
  for (const session of sessions) {
    record[session.id] = session;
  }
  return record;
}
