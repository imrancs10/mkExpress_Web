import React from 'react'
import './userProfile.css'

export default function UserProfile({ loginDetails }) {
    return (
        <>
            <div className='row justify-content-center mt-4'>
                <div className='col-4 align-self-center'>
                    <div className='card'>
                        <div className='card-header user-profile' style={{ background: '#27a8e8;' }}>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                className="user-profile"
                                height="25"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                            />
                        </div>
                        <div className='card-body' style={{ marginTop: '150px' }}>
                            <div className='form-control mb-1'>
                                <span className='small'>Name : </span>
                                <span className='small fw-bold'>{`${loginDetails?.userResponse?.firstName} ${loginDetails?.userResponse?.lastName}`}</span>
                            </div>
                            <div className='form-control mb-1'>
                                <span className='small'>Email : </span>
                                <span className='small fw-bold'>{`${loginDetails?.userResponse?.email}`}</span>
                            </div>
                            <div className='form-control mb-1'>
                                <span className='small'>Gender : </span>
                                <span className='small fw-bold'>{loginDetails?.userResponse?.gender === 1 ? "Male" : "Femail"}</span>
                            </div>
                            <div className='form-control mb-1'>
                                <span className='small'>User Name : </span>
                                <span className='small fw-bold'>{`${loginDetails?.userResponse?.userName}`}</span>
                            </div>
                            <div className='form-control mb-1'>
                                <span className='small'>Mobile : </span>
                                <span className='small fw-bold'>{loginDetails?.userResponse?.mobile}</span>
                            </div>
                            <div className='form-control mb-1'>
                                <span className='small'>Role : </span>
                                <span className='small fw-bold'>{loginDetails?.userResponse?.role}</span>
                            </div>
                            <div className='form-control mb-1'>
                                <span className='small'>User ID : </span>
                                <span className='small fw-bold'>{loginDetails?.userResponse?.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
