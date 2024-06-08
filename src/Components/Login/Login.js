import React, { useState } from 'react'
import './login.css'
import { redirect } from 'react-router-dom'
import axios from "axios";
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { validationMessage } from '../Utility/ValidationMessage';
import ErrorLabel from '../Common/ErrorLabel';
import { ToastContainer, toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';
import { common } from '../Utility/common';
import AlertMessage from '../Common/AlertMessage';

export default function Login({ setLoginDetails }) {
    const modelTemplete = {
        userName: "",
        password: ""
    }
    const [model, setModel] = useState(modelTemplete);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [responseError, setResponseError] = useState("");
    const textChangeHandler = (e) => {
        var { name, value } = e.target;
        setModel({ ...model, [name]: value });
    }
    const validateForm = () => {
        var { userName, password } = model
        var formError = {};
        if (!userName || userName === "") formError.userName = validationMessage.reqUsername;
        if (!password || password === "") formError.password = validationMessage.reqPassword;
        return formError;
    }
    const loginHandler = (e) => {
        e.preventDefault();
        setResponseError("");
        var formError = validateForm();
        if (Object.keys(formError).length > 0) {
            setErrors({ ...formError });
            return;
        }
        var postModel =JSON.parse(JSON.stringify(model));
        postModel.password = btoa(postModel.password); //string to base64
        Api.Post(apiUrls.authController.getToken, postModel)
            .then(res => {
                if (common.validateGuid(res.data?.userResponse?.id)) {
                    setLoginDetails(res.data);
                    toast.success(toastMessage.loginSuccess);
                    window.localStorage.setItem(process.env.REACT_APP_ACCESS_STORAGE_KEY, JSON.stringify(res.data));
                    redirect("/", { replace: true });
                }
                else {
                    setLoginDetails({ isAuthenticated: false })
                    redirect("/login")
                }

            }).catch(err => {
                setLoginDetails({ isAuthenticated: false });
                setResponseError(err?.response?.data?.Message);
                toast.error(toastMessage.saveError);
            })
    }
    axios.interceptors.response.use(
        (res) => {
            setIsLoading(false);
            return res;
        },
        (err) => {
            setIsLoading(false);
            return Promise.reject(err);
        }
    );

    axios.interceptors.request.use(
        (req) => {
            setIsLoading(true);
            return req;
        }
    )
    return (
        <>
            <div className="container login-container d-flex justify-content-center my-2" >
                <div className="row justify-content-center" >
                    <div className='col-md-6 col-lg-6 col-xl-6 col-sm-9'>
                        <div className='card card-info'>
                            <div className='card-header text-center text-uppercase bold' style={{ fontWeight: '800' }}>Employee/User Login</div>
                            <div className='card-body'>
                                {common.defaultIfEmpty(responseError, "") !== "" && <AlertMessage type="warn" message={responseError}></AlertMessage>}
                                <form>
                                    <div className='row'>
                                        <div className='col-12 mb-4 text-center'>
                                            <img className='loginlogo' src='/logo512.png' alt='login logo'></img>
                                            <div className='text-center text-uppercase bold' style={{ fontWeight: '800' }}>{process.env.REACT_APP_COMPANY_NAME}</div>
                                        </div>
                                        <div className='col-12 mb-2'>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1"><i style={{ fontSize: '20px' }} className="fa-solid fa-user"></i></span>
                                                </div>
                                                <input type="text" name="userName" value={model.userName} onChange={e => textChangeHandler(e)} className="form-control form-control-sm" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                            <ErrorLabel message={errors.userName} />
                                        </div>
                                        <div className='col-12 mb-2'>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1"><i style={{ fontSize: '20px' }} className="fa-solid fa-key"></i></span>
                                                </div>
                                                <input type="password" name="password" value={model.password} onChange={e => textChangeHandler(e)} className="form-control  form-control-sm" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                            <ErrorLabel message={errors.password} />
                                            <div className='w-100 text-end forget-pass mb-3'><a href="\forgetpassword" style={{ fontSize: '10px' }}>Forget password?</a></div>
                                        </div>
                                        <div className='col-12 mb-2'>
                                            <button className='btn brn-sm btn-primary w-100' onClick={e => loginHandler(e)} >Login <i className="fa-brands fa-golang"></i> {isLoading && <i className="fa-solid fa-spinner fa-spin" style={{ color: '#e22c9f' }}></i>}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer style={{ zIndex: '1000000000000' }}></ToastContainer>
        </>
    )
}
