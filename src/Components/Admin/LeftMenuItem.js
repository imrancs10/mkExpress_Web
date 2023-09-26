import React from 'react'
import { Link } from 'react-router-dom'
import { common } from '../Utility/common'

export default function LeftMenuItem({ link, icon, menuName, title,hasAccess,isSidebarCollapsed }) {
    title = common.defaultIfEmpty(title, menuName);
    return (
        <>
            {hasAccess(menuName) && <Link to={"/" + link} title={title}>
                {icon !== "" && <div className="parent-icon">
                    <i className={"bi " + icon}></i>
                </div>
                }
                <div className={icon !== "" ? "menu-title" : ""}>{isSidebarCollapsed?"":menuName}</div>
            </Link>
            }
        </>
    )
}
