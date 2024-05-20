import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderMenuItem({ link, name, currentRole }) {
    let hideWhenRole = ["customeradmin", "customer"];
    const displayMenu = () => {
        if (hideWhenRole.lenght === 0)
            return true;
        if (hideWhenRole.indexOf(currentRole?.toLowerCase()) > -1) {
            if (link === "/shipments" || link === "/system/action")
                return true
            return false;
        }
        return true;
    }
    return (
        <>
            {displayMenu() && <li className="nav-item">
                <Link className="nav-link" to={link}>{name}</Link>
            </li>
            }
        </>
    )
}
