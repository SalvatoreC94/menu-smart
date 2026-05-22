import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import QRLandingPage from './pages/customer/QRLandingPage'
import MenuPage from './pages/customer/MenuPage'
import LoginPage from './pages/admin/LoginPage'
import RegisterPage from './pages/admin/RegisterPage'
import DashboardPage from './pages/admin/DashboardPage'
import EditorPage from './pages/admin/EditorPage'
import CreateMenuPage from './pages/admin/CreateMenuPage'
import PaletteSwitcher from './components/shared/PaletteSwitcher'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QRLandingPage />} />
        <Route path="/menu/:menuId" element={<MenuPage />} />
        <Route path="/admin/accedi" element={<LoginPage />} />
        <Route path="/admin/registrati" element={<RegisterPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/menu/nuovo" element={<CreateMenuPage />} />
        <Route path="/admin/menu/:menuId/edit" element={<EditorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <PaletteSwitcher />
    </>
  )
}
