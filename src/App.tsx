/** @format */

import { useState } from "react"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import CalendarView from "./components/Calendar/CalendarView"
import SessionModal from "./components/Modal/SessionModal"
import ImportExportPanel from "./components/ImportExport/ImportExportPanel"
import LoginGuard from "./components/LoginGuard/LoginGuard"

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)

  if (!authenticated) {
    return <LoginGuard onSuccess={() => setAuthenticated(true)} />
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-2 sm:p-4 md:p-6">
          <CalendarView />
        </main>
      </div>
      <SessionModal />
      <ImportExportPanel />
    </div>
  )
}
