import React from 'react'
import Navbar from '../components/header/Navbar'
import CatCompanion from '../components/CatCompanion'
import SandboxIntroPopup from '../components/sandbox/SandboxIntroPopup'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <>
      <SandboxIntroPopup />
      <CatCompanion />
      <main>
        <Outlet />
      </main>
      
    </>
  )
}

export default AppLayout