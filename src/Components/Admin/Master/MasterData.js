import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Api } from '../../../API/API';
import { apiUrls } from '../../../API/ApiUrl';
import { toastMessage } from '../../Utility/ConstantValues';
import { validationMessage } from '../../Utility/ValidationMessage';
import { common } from '../../Utility/common';
import Breadcrumb from '../../Common/Breadcrumb';
import ErrorLabel from '../../Common/ErrorLabel';
import Label from '../../Common/Label';
import ButtonBox from '../../Common/ButtonBox';
import Dropdown from '../../Common/Dropdown';
import Inputbox from '../../Common/Inputbox';
import TableView from '../../Table/TableView';
import RegexFormat from '../../Utility/RegexFormat'

export default function MasterData() {
    const [masterDataTypeList, setMasterDataTypeList] = useState([]);
    const masterDataModelTemplate = {
        id: common.guid(),
        code: '',
        value: '',
        masterDataType: '',
        remark: ''
    }
    const [masterDataModel, setMasterDataModel] = useState(masterDataModelTemplate);
    const [isRecordSaving, setIsRecordSaving] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [errors, setErrors] = useState();
    const [filterMasterDataType, setFilterMasterDataType] = useState("")
    const handleDelete = (id) => {
        Api.Delete(apiUrls.masterDataController.delete + id).then(res => {
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
        Api.Get(apiUrls.masterDataController.search + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        });
    }

    const handleTextChange = (e) => {
        var { value, name, type } = e.target;
        var data = masterDataModel;
        if (type === 'select-one') {
            data.masterDataType = value
        }
        else {
            data[name] = value;
            data.code = value.toLowerCase().trim().replaceAll(RegexFormat.specialCharectors, "_").replaceAll(RegexFormat.endWithHyphen, '');
        }
        setMasterDataModel({ ...data });

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

        let data = masterDataModel;
        if (isRecordSaving) {
            Api.Put(apiUrls.masterDataController.add, data).then(res => {
                if (res.data.id != null) {
                    common.closePopup('closePopupMasterData');
                    toast.success(toastMessage.saveSuccess);
                    handleSearch(filterMasterDataType);
                }
            }).catch(err => {
                toast.error(toastMessage.saveError);
            });
        }
        else {
            Api.Post(apiUrls.masterDataController.update, masterDataModel).then(res => {
                if (res.data.id != null) {
                    common.closePopup('closePopupMasterData');
                    toast.success(toastMessage.updateSuccess);
                    handleSearch(filterMasterDataType);
                }
            });
        }
    }
    const handleEdit = (masterDataId) => {
        setIsRecordSaving(false);
        setErrors({});
        Api.Get(apiUrls.masterDataController.get + masterDataId).then(res => {
            if (res.data.id !== null) {
                var data = res.data;
                data.masterDataType = res.data.masterDataTypeCode;
                setMasterDataModel({ ...data });
            }
        });
    };

    const tableOptionTemplet = {
        headers: [
            { name: 'Master Data Type', prop: 'masterDataTypeValue' },
            { name: 'Value', prop: 'value' },
            { name: 'Code', prop: 'code' }
        ],
        data: [],
        showSerialNo:true,
        totalRecords: 0,
        pageSize: pageSize,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        actions: {
            showView: false,
            popupModelId: "add-masterData",
            delete: {
                handler: handleDelete
            },
            edit: {
                handler: handleEdit
            }
        }
    };

    const saveButtonHandler = () => {

        setMasterDataModel({ ...masterDataModelTemplate });
        setErrors({});
        setIsRecordSaving(true);
    }
    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    const breadcrumbOption = {
        title: 'Master Data',
        items: [
            {
                title: "Master Data'",
                icon: "fa-solid fa-share-nodes",
                isActive: false,
            }
        ],
        buttons: [
            {
                text: "Master Data",
                icon: 'fa-solid fa-plus',
                modelId: 'add-masterData',
                handler: saveButtonHandler
            }
        ]
    }

    useEffect(() => {
        setIsRecordSaving(true);
        setFilterMasterDataType('');
        Api.Get(apiUrls.masterDataController.getAll + `?PageNo=${pageNo}&PageSize=${pageSize}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        })
            ;
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (isRecordSaving) {
            setMasterDataModel({ ...masterDataModelTemplate });
        }
    }, [isRecordSaving]);
    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getAllDataType + "?pageNo=1&PageSize=10000")
            .then(res => {
                setMasterDataTypeList(res.data.data);
            })
    }, [])


    const validateError = () => {
        const { value, masterDataType, code } = masterDataModel;
        const newError = {};
        if (!value || value === "") newError.value = validationMessage.reqMasterData;
        if (!masterDataType || masterDataType === "" || masterDataType === "0") newError.masterDataType = validationMessage.reqMasterDataType;
        return newError;
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <div className="d-flex justify-content-end bd-highlight">
                <div className="p-2 bd-highlight">
                    <Label text="Master Data Type" fontSize='12px'></Label>
                </div>
                <div className="p-2 bd-highlight">
                    <select className='form-control form-control-sm' onChange={e => { handleSearch(e.target.value); setFilterMasterDataType(e.target.value) }} value={filterMasterDataType}>
                        <option value="">Select </option>
                        {
                            masterDataTypeList?.map(ele => {
                                return <option key={ele.id} value={ele.code}>{ele.value}</option>
                            })
                        }
                    </select></div>
            </div>
            <hr />
            <TableView option={tableOption}></TableView>

            {/* <!-- Add Contact Popup Model --> */}
            <div id="add-masterData" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Master Data</h5>
                            <button type="button" className="btn-close" id='closePopupMasterData' data-bs-dismiss="modal" aria-hidden="true"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <form className="row g-3">
                                            <div className="col-md-12">
                                                <Label text="Master Data Type" fontSize='12px' isRequired={true}></Label>
                                                <Dropdown data={masterDataTypeList} className="form-control-sm" onChange={e => handleTextChange(e)} value={masterDataModel.masterDataType} name="masterDataType" elementKey="code" defaultText='Select Master Data Type' defaultValue=''></Dropdown>
                                                <ErrorLabel message={errors?.masterDataType}></ErrorLabel>
                                            </div>
                                            <div className="col-md-12">
                                                <Inputbox labelText="Master Data" className="form-control-sm" maxLength={10000} labelFontSize='12px' isRequired={true} onChangeHandler={handleTextChange} name="value" value={masterDataModel.value} errorMessage={errors?.value} />
                                            </div>
                                        </form>
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
