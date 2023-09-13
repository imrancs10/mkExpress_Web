import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <>
            <div className="page-footer">
            <div className='row'>
                        <div className='col-12 text-center text-white'>
                            Copyright © {new Date().getFullYear()} Designed &amp; Developed by
                            {" " + process.env.REACT_APP_COMPANY_NAME}
                        </div>
                    </div>
            </div>
        </>
    )
}
