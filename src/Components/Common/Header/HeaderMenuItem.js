import React from 'react'
import { Link } from 'react-router-dom'
import { common } from '../../Utility/common';

export default function HeaderMenuItem({ link, name, currentRole }) {
    return (
        <>
            {common.displayMenu() && <li className="nav-item">
                <Link className="nav-link" to={link}>{name}</Link>
            </li>
            }
        </>
    )
}
