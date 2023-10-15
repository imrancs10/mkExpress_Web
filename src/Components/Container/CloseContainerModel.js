import React from 'react'
import ButtonBox from '../Common/ButtonBox'
import { Api } from '../../API/API'
import { apiUrls } from '../../API/ApiUrl'
import { common } from '../Utility/common'
import { toast } from 'react-toastify'
import { toastMessage } from '../Utility/ConstantValues'

export default function CloseContainerModel({ containerId }) {
    const closeContainerHandler = () => {
        Api.Post(apiUrls.containerController.closeContainer + containerId, {})
            .then(res => {
                if (res.data) {
                    toast.success(toastMessage.updateSuccess);
                    common.closePopup('closecontainerCloseModel');
                }
            })
    }
    return (
        <>
            <div id="containerCloseModel" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><i className="fa-solid fa-triangle-exclamation" style={{color: 'rgb(246 201 30)'}}></i> Close Container Confirmation</h5>
                            <button type="button" className="btn-close" id='closecontainerCloseModel' data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <h5>You want to close the container. Are you sure...?</h5>
                        </div>
                        <div className='modal-footer'>
                            <ButtonBox type="check-success" text="Yes" className="btn-sm" onClickHandler={closeContainerHandler} />
                            <ButtonBox type="cancel" text="No" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
