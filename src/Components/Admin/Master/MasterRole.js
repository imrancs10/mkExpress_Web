import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Api } from '../../../API/API';
import { apiUrls } from '../../../API/ApiUrl';
import { toastMessage } from '../../Utility/ConstantValues';
import { validationMessage } from '../../Utility/ValidationMessage';
import { common } from '../../Utility/common';
import Breadcrumb from '../../Common/Breadcrumb';
import TableView from '../../Table/TableView';
import ButtonBox from '../../Common/ButtonBox';
import Inputbox from '../../Common/Inputbox';

export default function MasterRole() {
    const masterRoleModelTemplate = {
        id: common.guid(),
        code: '',
        name: ''
    }
    const [masterRoleModel, setMasterRoleModel] = useState(masterRoleModelTemplate);
    const [isRecordSaving, setIsRecordSaving] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [errors, setErrors] = useState();
    const handleDelete = (id) => {
        Api.Delete(apiUrls.masterDataController.deleteRole + id).then(res => {
            if (res.data === 1) {
                handleSearch('');
                toast.success(toastMessage.deleteSuccess);
            }
        });
    }
    const handleSearch = (searchTerm) => {
        if (searchTerm.length > 0 && searchTerm.length < 3)
            return;
        Api.Get(apiUrls.masterDataController.searchRole + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        }).catch(err => {

        });
    }

    const handleTextChange = (e) => {
        var { value, name } = e.target;
        var data = masterRoleModel;
        data[name] = value;
        data.code = common.generateMasterDataCode(value);
        setMasterRoleModel({ ...data });

        if (!!errors[name]) {
            setErrors({ ...errors, [name]: null })
        }
    }
    const handleSave = (e) => {
        e.preventDefault();
        const formError = validateError();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return
        }

        let data = masterRoleModel;
        if (isRecordSaving) {
            Api.Put(apiUrls.masterDataController.addRole, data).then(res => {
                if (res.data.id !== null) {
                    common.closePopup('close-masterRoleModel');
                    toast.success(toastMessage.saveSuccess);
                    handleSearch('');
                }
            })
        }
        else {
            Api.Post(apiUrls.masterDataController.updateRole, masterRoleModel).then(res => {
                if (res.data.id !== null) {
                    common.closePopup('close-masterRoleModel');
                    toast.success(toastMessage.updateSuccess);
                    handleSearch('');
                }
            })
        }
    }
    const handleEdit = (masterDataId) => {
        setIsRecordSaving(false);
        setErrors({});
        Api.Get(apiUrls.masterDataController.getByIdRole + masterDataId).then(res => {
            if (res.data.id != null) {
                setMasterRoleModel(res.data);
            }
        });
    };

    const tableOptionTemplet = {
        headers: [
            { name: 'Role Name', prop: 'name' },
            { name: 'Code', prop: 'code' }
        ],
        data: [],
        totalRecords: 0,
        showSerialNo: true,
        pageSize: pageSize,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        actions: {
            showView: false,
            popupModelId: "add-masterRoleModel",
            delete: {
                handler: handleDelete
            },
            edit: {
                handler: handleEdit
            }
        }
    };

    const saveButtonHandler = () => {

        setMasterRoleModel({ ...masterRoleModelTemplate });
        setErrors({});
        setIsRecordSaving(true);
    }
    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    const breadcrumbOption = {
        title: 'Master User Role',
        items: [
            {
                title: "Master User Role'",
                icon: "fa-solid fa-code-branch",
                isActive: false,
            }
        ],
        buttons: [
            {
                text: "Master User Role",
                icon: 'fa-solid fa-plus',
                modelId: 'add-masterRoleModel',
                handler: saveButtonHandler
            }
        ]
    }

    useEffect(() => {
        setIsRecordSaving(true);
        Api.Get(apiUrls.masterDataController.getAllRole + `?PageNo=${pageNo}&PageSize=${pageSize}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        });
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (isRecordSaving) {
            setMasterRoleModel({ ...masterRoleModelTemplate });
        }
    }, [isRecordSaving]);

    const validateError = () => {
        const { name, code } = masterRoleModel;
        const newError = {};
        if (!name || name === "") newError.value = validationMessage.reqRoleName;
        if (!code || code === "") newError.code = validationMessage.reqRoleCode;
        return newError;
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <hr />
            <TableView option={tableOption}></TableView>

            {/* <!-- Add Contact Popup Model --> */}
            <div id="add-masterRoleModel" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New User Role</h5>
                            <button type="button" id='close-masterRoleModel' className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <Inputbox isRequired={true} maxLength={1000} errorMessage={errors?.name} labelText="Role Name" onChangeHandler={handleTextChange} name="name" value={masterRoleModel.name} type="text" className="form-control form-control-sm" />
                                            </div>
                                            <div className="col-md-12">
                                                <Inputbox isRequired={true} maxLength={1000} errorMessage={errors?.value} labelText="Role Code" onChangeHandler={handleTextChange} name="value" disabled={true} value={masterRoleModel.code} type="text" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox type={isRecordSaving ? 'Save' : 'Update'} onClickHandler={handleSave} className="btn-sm" ></ButtonBox>
                            <ButtonBox type="cancel" className="btn-sm" id='closePopup' modelDismiss={true}></ButtonBox>
                        </div>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
            </div>
            {/* <!-- /.modal-dialog --> */}
        </>

    )
}
