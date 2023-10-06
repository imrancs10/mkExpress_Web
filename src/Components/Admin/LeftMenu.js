import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import LeftMenuItem from './LeftMenuItem';
import Login from '../Login/Login';
export default function LeftMenu({ setAuthData, authData, accessLogin, setAccessLogin,isSidebarCollapsed, setIsSidebarCollapsed }) {
    const tokenStorageKey = process.env.REACT_APP_TOKEN_STORAGE_KEY;
    
    const [selectParentMenu, setSelectParentMenu] = useState("shop");
    const location = useLocation();

    useEffect(() => {
        var roleName = accessLogin?.roleName?.toLowerCase();
        if (roleName === "superadmin" || roleName === "admin")
            return;
    }, [location]);

    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem(tokenStorageKey);
        setAuthData({
            isAuthenticated: false
        });
        return <Login setAuthData={setAuthData}></Login>
    }
    useEffect(() => {

    }, [authData]);

    const menuClickHandler = (e) => {
        e.target.parentElement.childNodes.forEach(res => {
            if (res.classList.contains('mm-collapse')) {
                document.getElementsByClassName('mm-show').forEach(res => {
                    res.classList.remove('mm-show');
                });
                res.classList.add('mm-show')
            }
        });
    }
    const hasAccess = (menuName) => {
        return true;
    }

    const accessLogout = () => {
        setAccessLogin({});
        window.localStorage.setItem(process.env.REACT_APP_ACCESS_STORAGE_KEY, "{}");
        window.location = window.location.origin;
    }
    return (
        <>
            <section>
                <aside className={isSidebarCollapsed ? "sidebar-wrapper sidebar-collaps" : "sidebar-wrapper sidebar"} data-simplebar="init">
                    <div className="simplebar-wrapper" style={{ margin: '0px' }}>
                        <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer"></div>
                        </div>
                        <div className="simplebar-mask">
                            <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                                <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: 'hidden' }}>
                                    <div className="simplebar-content" style={{ padding: '0px' }}>
                                        <div className='toggle-icon' onClick={e=>setIsSidebarCollapsed(pre=>!pre)} title={`${isSidebarCollapsed ? "Expand Menu" :"Collaps Menu"} `}>
                                            <i className={`fa-solid fa-angles-up ${isSidebarCollapsed ? "fa-rotate-90" :"fa-rotate-270"} `}></i>
                                        </div>
                                        <ul className="metismenu" id="menu">
                                            {/* {hasUserPermission('dashobardview') &&
                                                <> */}
                                            {/* <li>
                                                <LeftMenuItem hasAccess={hasAccess} link="dashboard" icon="bi bi-speedometer2" menuName="Dashboard" />
                                            </li> */}
                                            <li onClick={e => menuClickHandler(e)}>
                                                {hasAccess("Master Data") && <>
                                                    <a href="#" className="has-arrow" aria-expanded="true">
                                                        <div className="parent-icon">
                                                            <i className="fa-solid fa-database"></i>
                                                        </div>
                                                        <div className="menu-title">{isSidebarCollapsed?"":"Master Data"}</div>
                                                    </a>
                                                    <ul name="master" className={selectParentMenu === 'master' ? 'mm-collapse mm-show' : "mm-collapse"}>
                                                        <li>
                                                            <LeftMenuItem hasAccess={hasAccess} isSidebarCollapsed={isSidebarCollapsed} icon="fa-solid fa-code-branch" menuName="Master Data Type" link="admin/master/type" />
                                                        </li>
                                                        <li>
                                                            <LeftMenuItem hasAccess={hasAccess} isSidebarCollapsed={isSidebarCollapsed} icon="fa-solid fa-share-nodes" menuName="Master Data" link="admin/master/data" />
                                                        </li>
                                                        <li>
                                                            <LeftMenuItem hasAccess={hasAccess} isSidebarCollapsed={isSidebarCollapsed} icon="fa-solid fa-person-military-pointing" menuName="Customers" link="admin/customer" />
                                                        </li>
                                                        <li>
                                                            <LeftMenuItem hasAccess={hasAccess} isSidebarCollapsed={isSidebarCollapsed} icon="fa-solid fa-map-location" menuName="Logistic Region" link="admin/logistic-region" />
                                                        </li>
                                                        <li>
                                                            <LeftMenuItem hasAccess={hasAccess} isSidebarCollapsed={isSidebarCollapsed} icon="fa-solid fa-taxi" menuName="Journey" link="admin/journey" />
                                                        </li>
                                                    </ul>
                                                </>
                                                }
                                            </li>
                                            {/* <li>
                                                <a href="#" onClick={e => logoutHandler(e)} data-bs-toggle="modal" data-bs-target="#accessLoginModel">
                                                    <div className="parent-icon">
                                                        <i className="fa-solid fa-lock"></i>
                                                    </div>
                                                    <div className="menu-title">{isSidebarCollapsed?"":"Logout"}</div>
                                                </a>
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="simplebar-placeholder" style={{ width: 'auto', height: '427px' }}></div>
                    </div>
                    <div className="simplebar-track simplebar-horizontal" style={{ visibility: 'hidden' }}>
                        <div className="simplebar-scrollbar"
                            style={{ width: '0px', display: 'none', transform: 'translate3d(0px, 0px, 0px)' }}></div>
                    </div>
                    <div className="simplebar-track simplebar-vertical" style={{ visibility: 'hidden' }}>
                        <div className="simplebar-scrollbar" style={{ height: '0px', display: 'none' }}></div>
                    </div>
                </aside>
            </section>
        </>
    )
}
