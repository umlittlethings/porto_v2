import React from 'react'
import Navbar from '../components/header/Navbar'
import CatCompanion from '../components/CatCompanion'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <>
      <CatCompanion />
      <main>
        <Outlet />
      </main>
      
    </>
  )
}

export default AppLayout