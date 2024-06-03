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
import Dropdown from '../../Common/Dropdown';
import Label from '../../Common/Label';
import ErrorLabel from '../../Common/ErrorLabel';

export default function MasterMenu() {
    const masterMenuModelTemplate = {
        id: common.guid(),
        code: '',
        name: '',
        link: '',
        menuPosition: '',
        icon: '',
        title: '',
        disable: false,
        tag: '',
        title: '',
        displayOrder:0
    }

    const [masterMenuModel, setMasterMenuModel] = useState(masterMenuModelTemplate);
    const [isRecordSaving, setIsRecordSaving] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [errors, setErrors] = useState();
    const [menuPostionList, setMenuPostionList] = useState([])

    const handleDelete = (id) => {
        Api.Delete(apiUrls.masterDataController.deleteMenu + id).then(res => {
            if (res.data === 1) {
                handleSearch('');
                toast.success(toastMessage.deleteSuccess);
            }
        });
    }

    const handleSearch = (searchTerm) => {
        if (searchTerm.length > 0 && searchTerm.length < 3)
            return;
        Api.Get(apiUrls.masterDataController.searchMenu + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        });
    }

    const handleTextChange = (e) => {
        var { value, name } = e.target;
        var data = masterMenuModel;
        if (name === "name") {
            data.code = common.generateMasterDataCode(value);
            if (data.name === data.title) {
                data.title = value;
            }
        }
        if (name === "disable") {
            data.disable = value === "1" ? false : true;
        }
        data[name] = value;
        setMasterMenuModel({ ...data });

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

        let data = masterMenuModel;
        if (isRecordSaving) {
            Api.Put(apiUrls.masterDataController.addMenu, data).then(res => {
                if (res.data.id !== null) {
                    common.closePopup('close-masterMenuModel');
                    toast.success(toastMessage.saveSuccess);
                    handleSearch('');
                }
            })
        }
        else {
            Api.Post(apiUrls.masterDataController.updateMenu, masterMenuModel).then(res => {
                if (res.data.id !== null) {
                    common.closePopup('close-masterMenuModel');
                    toast.success(toastMessage.updateSuccess);
                    handleSearch('');
                }
            })
        }
    }

    const handleEdit = (masterDataId) => {
        setIsRecordSaving(false);
        setErrors({});
        Api.Get(apiUrls.masterDataController.getByIdMenu + masterDataId).then(res => {
            if (res.data.id != null) {
                setMasterMenuModel(res.data);
            }
        });
    };

    const tableOptionTemplet = {
        headers: [
            { name: 'Menu Name', prop: 'name' },
            { name: 'Code', prop: 'code' },
            { name: 'Menu Position', prop: 'menuPosition' },
            { name: 'Link', prop: 'link' },
            {
                name: 'Icon', prop: 'icon', customColumn: (data) => {
                    return <i className={data?.icon} />
                }
            },
            { name: 'Tag', prop: 'tag' },
            {
                name: 'Disable', prop: 'disable', customColumn: (data) => {
                    return data.disable ? "Yes" : "No"
                }
            },
            { name: 'Title', prop: 'Title' },
            { name: 'Display Order', prop: 'displayOrder' },
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
            popupModelId: "add-masterMenuModel",
            delete: {
                handler: handleDelete
            },
            edit: {
                handler: handleEdit
            }
        }
    };

    const saveButtonHandler = () => {

        setMasterMenuModel({ ...masterMenuModelTemplate });
        setErrors({});
        setIsRecordSaving(true);
    }
    const [tableOption, setTableOption] = useState(tableOptionTemplet);

    const breadcrumbOption = {
        title: 'Master Menu',
        items: [
            {
                title: "Master Menu'",
                icon: "fa-solid fa-code-branch",
                isActive: false,
            }
        ],
        buttons: [
            {
                text: "Master Menu",
                icon: 'fa-solid fa-plus',
                modelId: 'add-masterMenuModel',
                handler: saveButtonHandler
            }
        ]
    }

    useEffect(() => {
        setIsRecordSaving(true);
        Api.Get(apiUrls.masterDataController.getAllMenu + `?PageNo=${pageNo}&PageSize=${pageSize}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        });
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (isRecordSaving) {
            setMasterMenuModel({ ...masterMenuModelTemplate });
        }
    }, [isRecordSaving]);

    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getByMasterDataType + 'menu_position')
            .then(res => {
                setMenuPostionList(res.data);
            });
    }, [])


    const validateError = () => {
        const { name, code, link, menuPosition,displayOrder,title } = masterMenuModel;
        const newError = {};
        if (!name || name === "") newError.name = validationMessage.reqMenuName;
        if (!code || code === "") newError.code = validationMessage.reqMenuCode;
        if (!link || link === "") newError.link = validationMessage.reqMenuLink;
        if (!menuPosition || menuPosition === "") newError.menuPosition = validationMessage.reqMenuPosition;
        if (!displayOrder || displayOrder <0) newError.displayOrder = validationMessage.reqMenuDisplayOrder;
        if (!title || title === "") newError.title = validationMessage.reqMenuTitle;
        return newError;
    }

    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <hr />
            <TableView option={tableOption}></TableView>

            {/* <!-- Add Contact Popup Model --> */}
            <div id="add-masterMenuModel" className="modal fade in" tabIndex="-1" Menu="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Menu</h5>
                            <button type="button" id='close-masterMenuModel' className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <Inputbox isRequired={true} maxLength={1000} errorMessage={errors?.name} labelText="Menu Name" onChangeHandler={handleTextChange} name="name" value={masterMenuModel.name} type="text" className="form-control form-control-sm" />
                                            </div>
                                            <div className="col-md-12">
                                                <Inputbox isRequired={true} maxLength={1000} errorMessage={errors?.code} labelText="Menu Code" onChangeHandler={handleTextChange} name="value" disabled={true} value={masterMenuModel.code} type="text" className="form-control form-control-sm" />
                                            </div>
                                            <div className="col-md-12">
                                                <Label text="Menu Position" isRequired={true} />
                                                <Dropdown data={menuPostionList} isRequired={true} elementKey="code" onChange={handleTextChange} name="menuPosition" value={masterMenuModel.menuPosition} className="form-control form-control-sm" />
                                                <ErrorLabel message={errors?.menuPosition} />
                                            </div>
                                            <div className="col-md-12">
                                                <Label text="Menu Disable" isRequired={true} />
                                                <Dropdown displayDefaultText={false} data={[{ id: 1, value: "No" }, { id: 2, value: "Yes" }]} isRequired={true} onChange={handleTextChange} name="disable" value={masterMenuModel.disable} className="form-control form-control-sm" />
                                            </div>
                                            <div className="col-md-12">
                                                <Inputbox isRequired={true} errorMessage={errors?.link} labelText="Link" onChangeHandler={handleTextChange} name="link" value={masterMenuModel.link} type="text" className="form-control form-control-sm" />
                                            </div>
                                            <div className="col-md-12">
                                                <Inputbox errorMessage={errors?.icon} labelText="Icon" onChangeHandler={handleTextChange} name="icon" value={masterMenuModel.icon} type="text" className="form-control form-control-sm" />
                                            </div>
                                            <div className="col-md-12">
                                                <Inputbox errorMessage={errors?.tag} labelText="Tag" onChangeHandler={handleTextChange} name="tag" value={masterMenuModel.tag} type="text" className="form-control form-control-sm" />
                                            </div>
                                            <div className="col-md-12">
                                                <Inputbox errorMessage={errors?.title} labelText="Menu Title" onChangeHandler={handleTextChange} name="title" value={masterMenuModel.title} type="text" className="form-control form-control-sm" />
                                            </div>
                                            <div className="col-md-12">
                                                <Inputbox errorMessage={errors?.displayOrder} labelText="Display Order" onChangeHandler={handleTextChange} name="displayOrder" value={masterMenuModel.displayOrder} type="number" className="form-control form-control-sm" />
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

    );
}

