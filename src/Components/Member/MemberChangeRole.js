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

export default function MemberChangeRole({data,handleSearch}) {
    const modalTemplate = {
        userId: data?.id,
        roleId: data?.roleId,
    }

    useEffect(() => {
        setModal(modalTemplate);
    }, [data]);

    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getByMasterDataType+'role')
        .then(res=>{
            setRoleList(res.data);
        })
    }, [data]);

    const [roleList, setRoleList] = useState([])
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
        const { roleId,userId } = modal;
        const newError = {};
        if (!roleId || !common.validateGuid(roleId)) newError.roleId = validationMessage.reqRole;
        if (!userId || !common.validateGuid(userId)) newError.userId = validationMessage.reqUsername;
        return newError;
    }
    const handleChangeRole = () => {
        const formError = validateError();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return
        }
        Api.Post(apiUrls.memberController.changeRole+`${modal.userId}/${modal.roleId}`, modal)
            .then(res => {
                if (res.data) {
                    common.closePopup('closePopupMemberChangeRole');
                    toast.success(toastMessage.updateSuccess);
                    handleSearch('');
                }
            })
    }
    return (
        <>
            <div id="memberChangeRole" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Change Role</h5>
                            <button type="button" className="btn-close" id='closePopupMemberChangeRole' data-bs-dismiss="modal" aria-hidden="true"></button>
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
                                                <Label text="Role" isRequired={true}/>
                                               <Dropdown className="form-control-sm"  data={roleList} name="roleId" value={modal.roleId} defaultText="Select Role" onChange={handleTextChange} />
                                               <ErrorLabel message={errors?.roleId}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox text="Change Role" type="update" onClickHandler={handleChangeRole} className="btn-sm" />
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
