import React from 'react'
import ButtonBox from '../../Common/ButtonBox';
import { apiUrls } from '../../../API/ApiUrl';
import { Api } from '../../../API/API';
import { toast } from 'react-toastify';
import { toastMessage } from '../../Utility/ConstantValues';
import { common } from '../../Utility/common';
import Label from '../../Common/Label';

export default function CustomerResetPasswordModel({data}) {
    const handleResetPassword = () => {
        Api.Post(`${apiUrls.customerController.resetPassword}${data?.id}`,data)
            .then(res => {
                if (res.data === true) {
                    toast.success(toastMessage.updateSuccess);
                    common.closePopup('closePopupCustomerPasswordResetModel');
                }
                else{
                    toast.warn('Unable to reset password');
                }
            });
    }
    return (
        <>
            <div id="customerPasswordResetModel" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmation of password reset</h5>
                            <button type="button" className="btn-close" id='closePopupCustomerPasswordResetModel' data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <Label text={`Are you sure! You want to reset customer login password`} bold={true} fontSize='20px' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox text="Reset Password" type="yes" onClickHandler={handleResetPassword} className="btn-sm" />
                            <ButtonBox type="cancel" text="No" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
