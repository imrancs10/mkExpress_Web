// src/components/ChangePassword.js
import React, { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import Inputbox from '../Common/Inputbox';
import ButtonBox from '../Common/ButtonBox';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';

const ChangePassword = () => {
    const modelTemplate = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }
    const [model, setModel] = useState(modelTemplate);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChangePassword = () => {
        var newError = {};
        if (model.oldPassword?.length < 6) {
            newError.oldPassword = 'Please enter the valid old paaword';
        }

        if (!validatePasswordComplexity(model.newPassword)) {
            newError.newPassword = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.';
        }
        if (model.newPassword !== model.confirmNewPassword) {
            newError.confirmNewPassword = 'New Password and Confirm Password do not match.';
        }


        if (Object.keys(newError).length > 0) {
            setErrors({ ...newError });
            return
        }
        var postData = JSON.parse(JSON.stringify(model));
        postData.oldPassword = btoa(model.oldPassword);
        postData.newPassword = btoa(model.newPassword);
        postData.confirmNewPassword = btoa(model.confirmNewPassword);
        Api.Post(apiUrls.authController.changePassword, postData)
            .then(res => {
                if (res.data === true) {
                    toast.success(toastMessage.passwordChangeSuccess);
                }
            })
    };

    const handleTextChange = (e) => {
        var { name, value } = e.target;
        setModel({ ...model, [name]: value });
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    const validatePasswordComplexity = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    return (
        <div className='row justify-content-center mt-4'>
            <div className='col-md-6 col-sm-12 col-lg-4 align-self-center'>
                <div className="card">
                    <div className="card-header">Change Password</div>
                    <div className='card-body'>
                        <div className="row g-3">
                            <div className="col-12">
                                <Inputbox labelText="Old Password" isRequired={true}
                                    type="password"
                                    name="oldPassword"
                                    value={model.oldPassword}
                                    className="form-control form-control-sm"
                                    errorMessage={errors?.oldPassword}
                                    onChangeHandler={handleTextChange}
                                />
                            </div>
                            <div className="col-12">
                                <Inputbox labelText="New Password" isRequired={true}
                                    type='password'
                                    name="newPassword"
                                    value={model.newPassword}
                                    className="form-control form-control-sm"
                                    onChangeHandler={handleTextChange}
                                    errorMessage={errors?.newPassword}
                                />
                            </div>
                            <div className="col-12">
                                <Inputbox labelText="Confirm Password" isRequired={true}
                                    type="password"
                                    name="confirmNewPassword"
                                    value={model.confirmNewPassword}
                                    className="form-control form-control-sm"
                                    onChangeHandler={handleTextChange}
                                    errorMessage={errors?.confirmNewPassword}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='card-footer text-end'>
                        <ButtonBox type="save" className="btn-sm mx-2" onClickHandler={handleChangePassword} />
                        <ButtonBox type="cancel" className="btn-sm" onClickHandler={handleCancel} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
