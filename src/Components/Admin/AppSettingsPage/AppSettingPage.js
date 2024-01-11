import React, { useState, useEffect } from 'react'
import ButtonBox from '../../Common/ButtonBox';
import Inputbox from '../../Common/Inputbox';
import Label from '../../Common/Label';
import { common } from '../../Utility/common';
import { Api } from '../../../API/API';
import { apiUrls } from '../../../API/ApiUrl';
import { toast } from 'react-toastify';
import { toastMessage } from '../../Utility/ConstantValues';
import RegexFormat from '../../Utility/RegexFormat';
import { validationMessage } from '../../Utility/ValidationMessage';
import Breadcrumb from '../../Common/Breadcrumb';
import TableView from '../../Table/TableView';
import Dropdown from '../../Common/Dropdown';
import ErrorLabel from '../../Common/ErrorLabel';

export default function AppSettingPage() {
    const appSettingModelTemplate = {
        id: common.guid(),
        key: '',
        value: '',
        group: 0
    }
    const [appSettingModel, setAppSettingModel] = useState(appSettingModelTemplate);
    const [isRecordSaving, setIsRecordSaving] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [errors, setErrors] = useState();
    const groupData=[{id:1,value:'Shipment'},{id:2,value:'Container'},{id:3,value:'Admin'},{id:4,value:'Customer'}]
    const handleDelete = (id) => {
        Api.Delete(apiUrls.appSettingController.delete + id).then(res => {
            if (res.data === 1) {
                handleSearch('');
                toast.success(toastMessage.deleteSuccess);
            }
        });
    }
    const handleSearch = (searchTerm) => {
        if (searchTerm.length > 0 && searchTerm.length < 3)
            return;
        if (searchTerm === null || searchTerm === undefined)
            searchTerm = "";
        Api.Get(apiUrls.appSettingController.search + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        });
    }

    const handleTextChange = (e) => {
        var { value, name,type } = e.target;
        var data = appSettingModel;
        if(type==='select-one')
        {
            value=parseInt(value);
        }
        data[name] = value;
        setAppSettingModel({ ...data });

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

        let data = appSettingModel;
        if (isRecordSaving) {
            Api.Put(apiUrls.appSettingController.create, data).then(res => {
                if (res.data.id != null) {
                    common.closePopup('closePopupAppSetting');
                    toast.success(toastMessage.saveSuccess);
                }
            }).catch(err => {
                toast.error(toastMessage.saveError);
            });
        }
        else {
            Api.Post(apiUrls.appSettingController.update, appSettingModel).then(res => {
                if (res.data.id != null) {
                    common.closePopup('closePopupAppSetting');
                    toast.success(toastMessage.updateSuccess);
                }
            });
        }
    }
    const handleEdit = (appSettingId) => {
        setIsRecordSaving(false);
        setErrors({});
        Api.Get(apiUrls.appSettingController.get + appSettingId).then(res => {
            if (res.data.id !== null) {
                var data = res.data;
                setAppSettingModel({ ...data });
            }
        });
    };

    const tableOptionTemplet = {
        headers: [
            { name: 'Group', prop: 'group',customColumn:(data)=>{return groupData.find(x=>x.id==data["group"])?.value} },
            { name: 'Key', prop: 'key' },
            { name: 'Value', prop: 'value' }
        ],
        data: [],
        showSerialNo: true,
        totalRecords: 0,
        pageSize: pageSize,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        actions: {
            showView: false,
            popupModelId: "add-appSetting",
            delete: {
                handler: handleDelete
            },
            edit: {
                handler: handleEdit
            }
        }
    };

    const saveButtonHandler = () => {

        setAppSettingModel({ ...appSettingModelTemplate });
        setErrors({});
        setIsRecordSaving(true);
    }
    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    const breadcrumbOption = {
        title: 'App Setting',
        items: [
            {
                title: "App Setting'",
                icon: "fa-solid fa-share-nodes",
                isActive: false,
            }
        ],
        buttons: [
            {
                text: "App Setting",
                icon: 'fa-solid fa-plus',
                modelId: 'add-appSetting',
                handler: saveButtonHandler
            }
        ]
    }

    useEffect(() => {
        setIsRecordSaving(true);
        Api.Get(apiUrls.appSettingController.getAll + `?PageNo=${pageNo}&PageSize=${pageSize}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        })
            ;
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (isRecordSaving) {
            setAppSettingModel({ ...appSettingModelTemplate });
        }
    }, [isRecordSaving]);


    const validateError = () => {
        const { key, value, group } = appSettingModel;
        const newError = {};
        if (!value || value === "") newError.value = validationMessage.reqAppSettingValue;
        if (!key || key === "") newError.key = validationMessage.reqAppSettingKey;
        if (!group || group === "" || group===0) newError.group = validationMessage.reqAppSettingGroup;
        return newError;
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <hr />
            <TableView option={tableOption}></TableView>

            {/* <!-- Add Contact Popup Model --> */}
            <div id="add-appSetting" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New App Setting</h5>
                            <button type="button" className="btn-close" id='closePopupAppSetting' data-bs-dismiss="modal" aria-hidden="true"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <Inputbox labelText="Key" className="form-control-sm" maxLength={50} labelFontSize='12px' isRequired={true} onChangeHandler={handleTextChange} name="key" value={appSettingModel.key} errorMessage={errors?.key} />
                                            </div>
                                            <div className="col-md-12">
                                                <Inputbox labelText="Value" className="form-control-sm" maxLength={100} labelFontSize='12px' isRequired={true} onChangeHandler={handleTextChange} name="value" value={appSettingModel.value} errorMessage={errors?.value} />
                                            </div>
                                            <div className="col-md-12">
                                                <Label text="Group" isRequired={true}></Label>
                                                <Dropdown data={groupData} defaultText="Select Group" defaultValue="0" className="form-control-sm" onChange={handleTextChange} name="group" value={appSettingModel.group} />
                                                <ErrorLabel message={errors?.group}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox type={isRecordSaving ? 'save' : 'update'} onClickHandler={handleSave} className="btn-sm" />
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
            </div>
            {/* <!-- /.modal-dialog --> */}
        </>

    )
}
