import React, { useState, useEffect } from 'react'
import ButtonBox from '../Common/ButtonBox'
import Inputbox from '../Common/Inputbox'
import { validationMessage } from '../Utility/ValidationMessage';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { common } from '../Utility/common';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';

export default function MemberChangePassword({ data }) {
    debugger;
    const modalTemplate = {
        userName: data?.email,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    }

    useEffect(() => {
        setModal(modalTemplate);
    }, [data]);

    const [modal, setModal] = useState(modalTemplate);
    const [errors, setErrors] = useState();
    const handleTextChange = (e) => {
        var { value, name } = e.target;
        setModal({ ...modal, [name]: value });
        if (!!errors[name]) {
            setErrors({ ...errors, [name]: null })
        }
    }
    const validateError = () => {
        const { userName, oldPassword, newPassword, confirmNewPassword } = modal;
        const newError = {};
        if (!userName || userName === "") newError.userName = validationMessage.reqEmail;
        if (!oldPassword || oldPassword === "") newError.oldPassword = validationMessage.reqOldPassword;
        if (!newPassword || newPassword === "") newError.newPassword = validationMessage.reqNewPassword;
        if (confirmNewPassword !== newPassword) newError.confirmNewPassword = validationMessage.ConfirmPasswordDoesnotMatch;
        return newError;
    }
    const handleChangePassword = () => {
        const formError = validateError();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return
        }
        Api.Post(apiUrls.memberController.changePassword, modal)
            .then(res => {
                if (res.data) {
                    common.closePopup('closePopupMemberChangePassword');
                    toast.success(toastMessage.updateSuccess);
                }
            })
    }
    return (
        <>
            <div id="memberChangePassword" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Change Password</h5>
                            <button type="button" className="btn-close" id='closePopupMemberChangePassword' data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <Inputbox labelText="User Name" disabled={true} isRequired={true} errorMessage={errors?.userName} name="userName" value={modal.userName} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12">
                                                <Inputbox labelText="Old Password" isRequired={true} errorMessage={errors?.oldPassword} name="oldPassword" value={modal.oldPassword} type="password" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12">
                                                <Inputbox labelText="New Password" isRequired={true} errorMessage={errors?.newPassword} name="newPassword" value={modal.newPassword} type="password" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12">
                                                <Inputbox labelText="Confirm New Password" isRequired={true} errorMessage={errors?.confirmNewPassword} name="confirmNewPassword" value={modal.confirmNewPassword} type="password" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox text="Change Password" type="update" onClickHandler={handleChangePassword} className="btn-sm" />
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
