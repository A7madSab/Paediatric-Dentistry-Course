import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { Session } from '../types';
import type { AppDispatch, RootState } from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useSessionsOnDate(date: string): Session[] {
  return useAppSelector((state) =>
    Object.values(state.sessions.entities).filter((session) => session.date === date),
  );
}

export function useSession(id: string | null): Session | null {
  return useAppSelector((state) => (id ? state.sessions.entities[id] ?? null : null));
}

export function useAllSessions(): Session[] {
  return useAppSelector((state) => Object.values(state.sessions.entities));
}
