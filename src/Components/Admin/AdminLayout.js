import React,{useState} from 'react'
import LeftMenu from './LeftMenu'
import { Outlet } from 'react-router-dom'
import '../Admin/LeftMenuStyle.css'
import { common } from '../Utility/common'
import UnauthorizedAccess from '../Middleware/UnauthorizedAccess'

export default function AdminLayout({ loginDetails }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  if(!common.checkAdminRole(loginDetails?.userResponse?.roleCode))
  {
    return <UnauthorizedAccess></UnauthorizedAccess>
  }
  return (
    <>
      <div className='menu-slider'>
        <LeftMenu
          authData={loginDetails}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}></LeftMenu>
      </div>
      <main className={isSidebarCollapsed ? "page-content page-content-collaps" : "page-content page-content-expand"}>
        <Outlet />
      </main>
    </>
  )
}
