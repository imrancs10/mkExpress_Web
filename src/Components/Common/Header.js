import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ loginDetails }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Containers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Shipments</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pickup Dispatch</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Drafts</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/customer">Customer</Link>
                            </li>
                            <li className="nav-item"> 
                            <Link className="nav-link" to="/members">Members</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">System Actions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Cod</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Cod Report</a>
                            </li>
                        </ul>
                        {/* <!-- Left links --> */}
                    </div>
                    {/* <!-- Collapsible wrapper --> */}

                    {/* <!-- Right elements --> */}
                    <div className="d-flex align-items-center">
                        {/* <!-- Icon --> */}
                        <div className="text-reset me-3 " style={{ fontSize: '11px' }}>
                            Guest user name
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
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
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
                                    <a className="dropdown-item" href="#">My profile</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Logout</a>
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
