import React, { useEffect, useState } from 'react'
import './shipment.css'
import ButtonBox from '../Common/ButtonBox'
import { redirect } from 'react-router-dom'

export default function ShipmentsButtons({ selectedRows, loginDetails }) {
    const [permissionList, setPermissionList] = useState([]);
    var isRowSelected = selectedRows?.length > 0;
    useEffect(() => {
        var authData = window.localStorage.getItem(process.env.REACT_APP_ACCESS_STORAGE_KEY);
        try {
            authData = JSON.parse(authData);
            setPermissionList([...authData?.userResponse?.permissions?.filter(x => x?.menu?.menuPosition === "shipment_actions")]);
        } catch (error) {
            redirect("/login");
        }
    }, []);

    const getDynamicMenu = () => {
        if (permissionList.length > 0) {
            return permissionList?.map((ele, index) => {
                return <ButtonBox key={index}
                    modalId={"#" + ele?.menu?.link}
                    className="btn btn-primary btn-sm"
                    style={{ margin: "1px" }}
                    icon={ele?.menu?.icon}
                    text={ele?.menu?.name} />
            })
        }
        else
            return <></>
    }
    return (
        <div className='card mb-2'>
            <div className='card-body' style={{ padding: '7px' }}>
                <div className='ship-btn-container'>
                    <div className="" role="group" aria-label="Second group" style={{
                        display: 'flex',
                        textAlign: 'right',
                        width: '100%',
                        fontSize: '10px',
                        fontSize: '10px',
                        flexWrap: 'wrap',
                        flexDirection: 'row-reverse'
                    }}>
                        {
                            getDynamicMenu()
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
