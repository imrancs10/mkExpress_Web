import React from 'react'
import './login.css'

export default function Login() {
    return (
        <>
            <div className='loginContainer'>
                <div className='loginbox'>
                    <div className='card card-info'>
                        <div className='card-header text-center text-uppercase bold' style={{fontWeight: '800'}}>Employee/User Login</div>
                        <div className='card-body'>                          
                            <div className='row'>
                                <div className='col-12 mb-4 text-center'>
                                <img className='loginlogo' src='/logo512.png'></img>
                                <div className='text-center text-uppercase bold' style={{fontWeight: '800'}}>{process.env.REACT_APP_COMPANY_NAME}</div>
                                </div>
                                <div className='col-12 mb-2'>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><i style={{fontSize:'20px'}} className="fa-solid fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className='col-12 mb-2'>
                                <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><i style={{fontSize:'20px'}} className="fa-solid fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control  form-control-sm" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className='col-12 mb-2'>
                                    <button className='btn btn-primary w-100'>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
