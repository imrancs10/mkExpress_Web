import React from 'react'
import LeftMenu from './LeftMenu'
import {Outlet } from 'react-router-dom'
import '../Admin/LeftMenuStyle.css'

export default function AdminLayout({loginDetails,isSidebarCollapsed,setIsSidebarCollapsed}) {
  return (
    <>
     <div className='menu-slider'>
                        <LeftMenu
                            authData={loginDetails}
                            isSidebarCollapsed={isSidebarCollapsed}
                            setIsSidebarCollapsed={setIsSidebarCollapsed}></LeftMenu>
                    </div>
                    <main className={isSidebarCollapsed ? "page-content page-content-collaps" : "page-content page-content-expand"}>
                        <Outlet/>
                        </main>
    </>
  )
}
