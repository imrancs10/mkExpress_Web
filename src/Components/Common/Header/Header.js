import React, { useEffect, useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import './Header.css'
import HeaderMenuItem from './HeaderMenuItem';

export default function Header({ loginDetails, setLoginDetails }) {
    const [authData, setAuthData] = useState({});
    const logoutHandler = (e) => {
        e.preventDefault();
        var loginModel = {
            isAuthenticated: false
        }
        window.localStorage.setItem(process.env.REACT_APP_ACCESS_STORAGE_KEY, JSON.stringify(loginModel));
        setLoginDetails({ ...loginModel })
    }

    useEffect(() => {
        var localAuthData = window.localStorage.getItem(process.env.REACT_APP_ACCESS_STORAGE_KEY);
        try {
            localAuthData = JSON.parse(localAuthData);
            setAuthData(localAuthData);
        } catch (error) {
            redirect("/login");
        }
    }, []);

    const getDynamicMenu = () => {
        if (authData?.userResponse?.permissions?.length ?? 0 > 0) {
            return authData.userResponse.permissions?.filter(x => x?.menu?.menuPosition === "header")?.map((ele, index) => {
                return <HeaderMenuItem key={index} name={ele?.menu?.name} link={ele?.menu?.link} currentRole={loginDetails?.userResponse?.role} />
            })
        }
        else
            return <></>
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light header-container">
                {/* <!-- Container wrapper --> */}
                <div className="container-fluid">
                    {/* <!-- Toggle button --> */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* <!-- Collapsible wrapper --> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <!-- Navbar brand --> */}
                        <a className="navbar-brand mt-2 mt-lg-0" href="#">
                            <img
                                src="/mkexpresslogo.png"
                                height="25"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </a>
                        {/* <!-- Left links --> */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: '13px' }}>
                            {
                                getDynamicMenu()
                            }
                        </ul>
                        {/* <!-- Left links --> */}
                    </div>
                    {/* <!-- Collapsible wrapper --> */}

                    {/* <!-- Right elements --> */}
                    <div className="d-flex align-items-center">
                        {/* <!-- Icon --> */}
                        <div className="text-reset me-3 " style={{ fontSize: '11px' }}>
                            {loginDetails?.userResponse?.firstName !== undefined ? `Hello ${loginDetails?.userResponse?.firstName} ${loginDetails?.userResponse?.lastName}` : 'Hello Guest'}
                        </div>

                        {/* <!-- Notifications --> */}
                        <div className="dropdown">
                            <a
                                className="text-reset me-3 dropdown-toggle hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-bs-toggle='dropdown'
                                aria-expanded="false"
                            >
                                <i className="fas fa-bell"></i>
                                <span className="badge rounded-pill badge-notification bg-danger">1</span>
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">Some news</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Another news</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Avatar --> */}
                        <div className="dropdown">
                            <a
                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuAvatar"
                                role="button"
                                data-bs-toggle='dropdown'
                                aria-expanded="false"
                            >
                                <img
                                    src={loginDetails?.userResponse?.profileImagePath===null || loginDetails?.userResponse?.profileImagePath===''? 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp':process.env.REACT_APP_API_URL+loginDetails?.userResponse?.profileImagePath}
                                    className="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuAvatar"
                            >
                                <li>
                                    <div className="dropdown-item disabled" style={{ fontSize: '12px' }}>Role : {loginDetails?.userResponse?.role}</div>
                                </li>
                                <li>
                                    <Link to="/user-profile" className="dropdown-item">Profile</Link>
                                </li>
                                <li className='divider'></li>
                                <li> 
                                    <Link to="/change-password" className="dropdown-item">Change Passwords</Link>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <a onClick={e => logoutHandler(e)} className="dropdown-item" href="#">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- Right elements --> */}
                </div>
                {/* <!-- Container wrapper --> */}
            </nav>
            {/* <!-- Navbar --> */}
        </>
    )
}
