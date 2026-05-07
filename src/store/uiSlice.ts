/** @format */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { UIState, ViewMode } from "../types"

const initialState: UIState = {
  viewMode: "month",
  currentYear: 2026,
  currentMonth: 8,
  selectedSessionId: null,
  selectedDate: null,
  modalOpen: false,
  importExportOpen: false,
  sidebarOpen: false
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload
    },
    navigate(state, action: PayloadAction<{ year: number; month: number }>) {
      state.currentYear = action.payload.year
      state.currentMonth = action.payload.month
    },
    openAddModal(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload
      state.selectedSessionId = null
      state.modalOpen = true
    },
    openEditModal(state, action: PayloadAction<string>) {
      state.selectedSessionId = action.payload
      state.selectedDate = null
      state.modalOpen = true
    },
    closeModal(state) {
      state.modalOpen = false
      state.selectedSessionId = null
      state.selectedDate = null
    },
    openImportExport(state) {
      state.importExportOpen = true
    },
    closeImportExport(state) {
      state.importExportOpen = false
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    closeSidebar(state) {
      state.sidebarOpen = false
    }
  }
})

export const {
  setViewMode,
  navigate,
  openAddModal,
  openEditModal,
  closeModal,
  openImportExport,
  closeImportExport,
  toggleSidebar,
  closeSidebar
} = uiSlice.actions

export default uiSlice.reducer
