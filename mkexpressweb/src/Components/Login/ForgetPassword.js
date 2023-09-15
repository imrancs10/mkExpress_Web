import React, { useState } from 'react'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { validationMessage } from '../Utility/ValidationMessage';
import ErrorLabel from '../Common/ErrorLabel';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';
import ButtonBox from '../Common/ButtonBox';

export default function ForgetPassword() {
    const modelTemplete = {
        email: ""
    }
    const [model, setModel] = useState(modelTemplete);
    const [errors, setErrors] = useState({});
    const textChangeHandler = (e) => {
        var { name, value } = e.target;
        setModel({ ...model, [name]: value });
    }
    const validateForm = () => {
        var { email } = model
        var formError = {};
        if (!email || email === "") formError.email = validationMessage.reqEmail;
        return formError;
    }
    const forgetPasswordHandler = (e) => {
        e.preventDefault();
        var formError = validateForm();
        if (Object.keys(formError).length > 0) {
            setErrors({ ...formError });
            return;
        }

        Api.Post(apiUrls.authController.getToken, model)
            .then(res => {
                if (res.data.id > 0) {
                    toast.success(toastMessage.saveSuccess);
                }

            }).catch(err => {
                toast.error(toastMessage.saveError);
            })
    }
    return (
        <>
            <div className="container login-container d-flex justify-content-center my-2" style={{ height: '100vh', 'alignItems': 'center' }}>
                <div className="row justify-content-center" >
                    <div className='col-md-6 col-lg-6 col-xl-6 col-sm-9'>
                        <div className='card card-info' style={{ 'boxShadow': '3px 5px 10px 1px gray' }}>
                            <div className='card-body'>
                                <div className='row'>
                                <div className='col-12 mb-4 text-center'>
                                        <img className='loginlogo' src='/logo512.png' alt='mk express logo'></img>
                                        <div className='text-center text-uppercase bold' style={{ fontWeight: '800' }}>{process.env.REACT_APP_COMPANY_NAME}</div>
                                    </div>
                                    <div className='col-12 mb-2'>
                                        <p style={{'fontSize': '12px'}}>Forgot your account’s password? Enter your email address and we’ll send you a recovery link.</p>
                                    </div>
                                    <div className='col-12 mb-2'>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><i style={{ fontSize: '20px' }} className="fa-solid fa-envelope"></i></span>
                                            </div>
                                            <input type="email" name="email" value={model.email} onChange={e => textChangeHandler(e)} className="form-control form-control-sm" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                                        </div>
                                        <ErrorLabel message={errors.email} />
                                    </div>
                                    <div className='col-12 mb-2'>
                                        <ButtonBox type="go" text="Send recovery email" icon="fa-brands fa-golang" showLoader={true} onClickHandler={forgetPasswordHandler}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

