import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { Session, SessionsState } from '../types';
import { buildInitialSessions } from '../utils/initialData';

const initialState: SessionsState = {
  entities: buildInitialSessions(),
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    addSession(state, action: PayloadAction<Omit<Session, 'id'>>) {
      const id = uuidv4();
      state.entities[id] = { ...action.payload, id };
    },
    updateSession(state, action: PayloadAction<Session>) {
      state.entities[action.payload.id] = action.payload;
    },
    deleteSession(state, action: PayloadAction<string>) {
      delete state.entities[action.payload];
    },
    moveSession(state, action: PayloadAction<{ id: string; newDate: string }>) {
      const session = state.entities[action.payload.id];
      if (session) {
        session.date = action.payload.newDate;
      }
    },
    replaceSessions(state, action: PayloadAction<Session[]>) {
      state.entities = {};
      for (const session of action.payload) {
        state.entities[session.id] = session;
      }
    },
    mergeSessions(state, action: PayloadAction<Session[]>) {
      for (const session of action.payload) {
        if (!state.entities[session.id]) {
          state.entities[session.id] = session;
        }
      }
    },
  },
});

export const {
  addSession,
  updateSession,
  deleteSession,
  moveSession,
  replaceSessions,
  mergeSessions,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
