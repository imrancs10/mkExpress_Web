import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import Breadcrumb from '../../Common/Breadcrumb';
import TableView from '../../Table/TableView';
import { Api } from '../../../API/API';
import { apiUrls } from '../../../API/ApiUrl';
import { toastMessage } from '../../Utility/ConstantValues';
import { common } from '../../Utility/common';
import { headerFormat } from '../../Utility/tableHeaderFormat';
import { validationMessage } from '../../Utility/ValidationMessage';
import Inputbox from '../../Common/Inputbox';
import ButtonBox from '../../Common/ButtonBox';
import Dropdown from '../../Common/Dropdown';
import Label from '../../Common/Label';
import ErrorLabel from '../../Common/ErrorLabel';
import RegexFormat from '../../Utility/RegexFormat';

export default function ThirdPartyCourier() {
    const thirdPartyModelTemplate = {
        id: common.guid(),
        name: "",
        Contact: "",
        mobile: "",
        email: '',
        trackingUrl: "",
    };
    const [thirdPartyModel, setThirdPartyModel] = useState(thirdPartyModelTemplate);
    const [isRecordSaving, setIsRecordSaving] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [errors, setErrors] = useState({});
    const handleDelete = (id) => {
        Api.Delete(apiUrls.thirdPartyController.delete + id).then(res => {
            if (res.data > 0) {
                handleSearch('');
                toast.success(toastMessage.deleteSuccess);
            }
        }).catch(err => {
            toast.error(toastMessage.deleteError);
        });
    }
    const handleSearch = (searchTerm) => {
        if (searchTerm.length > 0 && searchTerm.length < 3)
            return;
        Api.Get(apiUrls.thirdPartyController.search + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm.replace('+', "")}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        }).catch(err => {

        });
    }


    const handleTextChange = (e) => {
        var { value, name, type } = e.target;
        if (type === 'number') {
            value = parseInt(value);
        }
        if (value !== undefined && (name === 'name')) {
            value = value.toUpperCase();
        }
        setThirdPartyModel({ ...thirdPartyModel, [name]: value });
        if (!!errors[name]) {
            setErrors({ ...errors, [name]: null })
        }
    }
    const handleSave = () => {
        const formError = validateError();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return
        }
        let data = thirdPartyModel;
        if (isRecordSaving) {
            Api.Put(apiUrls.thirdPartyController.add, data).then(res => {
                if (common.validateGuid(res.data.id)) {
                    common.closePopup('closePopupThirdPartyCourierDetails');
                    toast.success(toastMessage.saveSuccess);
                    handleSearch('');
                }
            }).catch(err => {
                toast.error(toastMessage.saveError);
            });
        }
        else {
            Api.Post(apiUrls.thirdPartyController.update, data).then(res => {
                if (common.validateGuid(res.data.id)) {
                    common.closePopup('closePopupThirdPartyCourierDetails');
                    toast.success(toastMessage.updateSuccess);
                    handleSearch('');
                }
            }).catch(err => {
                toast.error(toastMessage.updateError);
            });
        }
    }
    const handleEdit = (thirdPartyId) => {
        Api.Get(apiUrls.thirdPartyController.get + thirdPartyId).then(res => {
            if (res.data.id !== null) {
                setThirdPartyModel(res.data);
                setIsRecordSaving(false);
            }
        }).catch(err => {
            toast.error(toastMessage.getError);
        })
    }

    const tableOptionTemplet = {
        headers: headerFormat.thirdPartyDetail,
        data: [],
        showFooter: false,
        totalRecords: 0,
        pageSize: pageSize,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        actions: {
            showView: false,
            popupModelId: "add-thirdParty",
            delete: {
                handler: handleDelete
            },
            edit: {
                handler: handleEdit
            }
        }
    }
    const saveButtonHandler = () => {
        setThirdPartyModel({ ...thirdPartyModelTemplate });
        setIsRecordSaving(true);
    }
    const [tableOption, setTableOption] = useState(tableOptionTemplet);

    const breadcrumbOption = {
        title: 'Third Party Companies',
        items: [
            {
                isActive: false,
                title: "Third Party Companies Details",
                icon: "fa-solid fa-person-military-pointing"
            }
        ],
        buttons: [
            {
                text: "Add Third Party Companies",
                icon: 'fa-soli fa-plus',
                modelId: 'add-thirdParty',
                handler: saveButtonHandler
            }
        ]
    }

    useEffect(() => {
        Api.Get(apiUrls.thirdPartyController.getAll + `?pageNo=${pageNo}&PageSize=${pageSize}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption({ ...tableOptionTemplet });
            })
    }, [pageNo, pageSize])

    useEffect(() => {
        if (isRecordSaving) {
            setThirdPartyModel({ ...thirdPartyModelTemplate });
        }
    }, [isRecordSaving])

    const validateError = () => {
        const { name, mobile, email } = thirdPartyModel;
        const newError = {};
        if (!name || name === "") newError.name = validationMessage.reqName;
        if (!email || email === "" || !email.match(RegexFormat.email)) newError.email = validationMessage.reqEmail;
        if (!mobile || mobile === "" || !mobile.match(RegexFormat.mobile)) newError.mobile = validationMessage.reqContactNo;
        return newError;
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <h6 className="mb-0 text-uppercase">Third Party Details</h6>
            <hr />
            <TableView option={tableOption}></TableView>

            <div id="add-thirdParty" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Third Party Courier Details</h5>
                            <button type="button" className="btn-close" id='closePopupThirdPartyCourierDetails' data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-sm-12 col-md-6">
                                                <Inputbox labelText="Name" isRequired={true} errorMessage={errors?.name} name="name" value={thirdPartyModel.name} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <Inputbox labelText="Mobile" isRequired={true} errorMessage={errors?.mobile} name="mobile" value={thirdPartyModel.mobile} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <Inputbox labelText="Contact No" isRequired={false} errorMessage={errors?.Contact} name="Contact" value={thirdPartyModel.Contact} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Inputbox labelText="Email" isRequired={true} errorMessage={errors?.email} name="email" value={thirdPartyModel.email} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12">
                                                <Inputbox labelText="Tracking URL" isRequired={false}  name="trackingUrl" value={thirdPartyModel.trackingUrl} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox text={isRecordSaving ? "Save" : "Update"} type="save" onClickHandler={handleSave} className="btn-sm" />
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
