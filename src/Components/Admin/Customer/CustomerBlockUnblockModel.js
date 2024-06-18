import React from 'react'
import { Api } from '../../../API/API';
import { apiUrls } from '../../../API/ApiUrl';
import { toast } from 'react-toastify';
import { toastMessage } from '../../Utility/ConstantValues';
import { common } from '../../Utility/common';
import Label from '../../Common/Label';
import ButtonBox from '../../Common/ButtonBox';

export default function CustomerBlockUnblockModel({handleSearch,data}) {
    const handleBlockUnblock = () => {
        Api.Post(`${apiUrls.customerController.blockUnblocked}${data?.id}/${!data.isBlocked}`,data)
            .then(res => {
                if (res.data === true) {
                    toast.success(toastMessage.updateSuccess);
                    common.closePopup('closePopupCustomerBlockUnblockModel');
                    handleSearch('');
                }
            });
    }
    return (
        <>
            <div id="customerBlockUnblockModel" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmation of {data?.isBlocked ? "Unblock" : "Block"} customer</h5>
                            <button type="button" className="btn-close" id='closePopupCustomerBlockUnblockModel' data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <Label text={`Are you sure! You want to ${data?.isBlocked ? "Unblock" : "Block"} customer`} bold={true} fontSize='20px' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox text="Yes" type="yes" onClickHandler={handleBlockUnblock} className="btn-sm" />
                            <ButtonBox type="cancel" text="No" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
