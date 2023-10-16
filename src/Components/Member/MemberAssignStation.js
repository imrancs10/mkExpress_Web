import React, { useState, useEffect } from 'react'
import ButtonBox from '../Common/ButtonBox'
import Inputbox from '../Common/Inputbox'
import { validationMessage } from '../Utility/ValidationMessage';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { common } from '../Utility/common';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';
import Dropdown from '../Common/Dropdown';
import Label from '../Common/Label';
import ErrorLabel from '../Common/ErrorLabel';

export default function MemberAssignStation({data,handleSearch}) {
    const modalTemplate = {
        userId: data?.id,
        stationId: data?.stationId,
    }

    useEffect(() => {
        setModal(modalTemplate);
    }, [data]);

    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getByMasterDataType+'station')
        .then(res=>{
           setStationList(res.data);
        })
    }, [data]);

    const [stationList,setStationList] = useState([])
    const [modal, setModal] = useState(modalTemplate);
    const [errors, setErrors] = useState({});
    const handleTextChange = (e) => {
        var { value, name } = e.target;
        setModal({ ...modal, [name]: value });
        if (!!errors[name]) {
            setErrors({ ...errors, [name]: null })
        }
    }
    const validateError = () => {
        const { stationId,userId } = modal;
        const newError = {};
        if (!stationId || !common.validateGuid(stationId)) newError.stationId = validationMessage.reqStation;
        if (!userId || !common.validateGuid(userId)) newError.userId = validationMessage.reqUsername;
        return newError;
    }
    const handleAssignStation = () => {
        const formError = validateError();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return
        }
        Api.Post(apiUrls.memberController.changeStation+`${modal.userId}/${modal.stationId}`, modal)
            .then(res => {
                if (res.data) {
                    common.closePopup('closePopupMemberAssignStation');
                    toast.success(toastMessage.updateSuccess);
                    handleSearch('');
                }
            })
    }
    return (
        <>
            <div id="memberAssignStation" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Change Role</h5>
                            <button type="button" className="btn-close" id='closePopupMemberAssignStation' data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <Inputbox labelText="User Name" disabled={true} isRequired={true} errorMessage={errors?.userId} name="userId" value={data?.firstName+' '+data?.lastName} type="text" className="form-control form-control-sm"  />
                                            </div>
                                            <div className="col-12">
                                                <Label text="Station" isRequired={true}/>
                                               <Dropdown className="form-control-sm"  data={stationList} name="stationId" value={modal.stationId} defaultText="Select Station" onChange={handleTextChange} />
                                               <ErrorLabel message={errors?.stationId}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox text="Assign Station" type="update" onClickHandler={handleAssignStation} className="btn-sm" />
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
