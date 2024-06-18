import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Common/Breadcrumb'
import TableView from '../../Table/TableView'
import Dropdown from '../../Common/Dropdown';
import { common } from '../../Utility/common';
import { Api } from '../../../API/API';
import { apiUrls } from '../../../API/ApiUrl';
import ButtonBox from '../../Common/ButtonBox';
import { toast } from 'react-toastify';
import { toastMessage } from '../../Utility/ConstantValues';
import Label from '../../Common/Label';
import ErrorLabel from '../../Common/ErrorLabel';

export default function RoleMenuMapper() {
    const modelTemplate = {
        roleId: '',
        menuId: [],
        data: []
    }
    const [isRecordSaving, setIsRecordSaving] = useState(true);
    const [errors, setErrors] = useState();
    const [roleList, setRoleList] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [model, setModel] = useState(modelTemplate);
    const [filter, setFilter] = useState({ roleId: '' });
    const [menuPosition, setMenuPosition] = useState([]);
    const [menuByRole, setMenuByRole] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const handleSearch = (searchTerm) => {
        searchTerm = searchTerm === undefined || searchTerm === null || searchTerm === "" ? "all" : searchTerm;
        Api.Get(apiUrls.masterDataController.searchRoleMenuMapper + `?searchTerm=${searchTerm}`)
            .then(res => {
                tableOptionTemplet.data = res.data;
                tableOptionTemplet.totalRecords = res.data.length;
                setTableOption(tableOptionTemplet);
            });
    }

    const handleDelete = (id) => {
        Api.Delete(apiUrls.masterDataController.deleteRoleMenuMapperById + id)
            .then(res => {
                if (res.data === true) {
                    handleSearch('all');
                    toast.success(toastMessage.deleteSuccess);
                }
            });
    }

    const handleEdit = (id, data) => {
        Api.Get(apiUrls.masterDataController.getByIdRoleMenuMapper + data?.roleId)
            .then(res => {
                var dataModel = model;
                dataModel.roleId = data?.roleId;
                dataModel.menuId = [];
                res?.data?.forEach(ele => {
                    dataModel.menuId.push(ele?.menuId);
                })
                setModel(dataModel);
                var mPosition = [];
                menuList.forEach(ele => {
                    if (mPosition.indexOf(ele.menuPosition) === -1) {
                        mPosition.push(ele.menuPosition);
                    }
                });
                setMenuPosition(mPosition);
                setIsRecordSaving(false);
            });
    }

    const saveButtonHandler = () => {

    }

    const handleSave = () => {
        var postData = [];
        if (!common.validateGuid(model.roleId)) {
            setErrors({ ...errors, ["roleId"]: "Please select role!" })
            return;
        }
        if (model.menuId.length < 1) {
            setErrors({ ...errors, ["menuId"]: "Please select menu!" })
            return;
        }

        model?.menuId.forEach(ele => {
            postData.push({ roleId: model.roleId, menuId: ele, id: common.guid() });
        });

        Api.Put(apiUrls.masterDataController.addRoleMenuMapper, postData)
            .then(res => {
                if (res.data) {
                    toast.success(toastMessage.saveSuccess);
                    setIsRecordSaving(true);
                    common.closePopup('close-masterRoleModel');
                    setFilter({ ...filter });
                    setModel(modelTemplate);
                }
            });
    }

    const tableOptionTemplet = {
        headers: [
            {
                name: 'Role Name', prop: 'role', customColumn: (data) => {
                    return data?.userRole?.name
                }
            },
            {
                name: 'Menu Name', prop: 'menu', customColumn: (data) => {
                    return data?.menu?.name
                }
            }
        ],
        data: [],
        totalRecords: 0,
        showSerialNo: true,
        pageNo: pageNo,
        pageSize: pageSize,
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

    useEffect(() => {
        var apiList = [];
        apiList.push(Api.Get(apiUrls.masterDataController.getAllRole + `?PageNo=1&PageSize=100000`));
        apiList.push(Api.Get(apiUrls.masterDataController.getAllMenu + `?PageNo=1&PageSize=100000`));
        Api.MultiCall(apiList).then(res => {
            setRoleList(res[0].data.data);
            setMenuList(res[1].data.data);
            var mPosition = [];
            res[1]?.data?.data.forEach(ele => {
                if (mPosition.indexOf(ele.menuPosition) === -1) {
                    mPosition.push(ele.menuPosition);
                }
            });
            setMenuPosition(mPosition);
        });
    }, []);


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

    const filterChangeHandler = (e) => {
        var { value, name } = e.target;
        var data = filter
        data[name] = value;
        setFilter({ ...data });
    }

    const changeHandler = (e) => {
        var { value, name } = e.target;
        var data = model

        if (name === 'menuId') {
            if (data?.menuId.indexOf(value) === -1) {
                data.menuId.push(value);
            }
        }
        else {
            data[name] = value;
        }
        setModel({ ...data });
    }

    useEffect(() => {
        if (filter.roleId !== "") {
            Api.Get(apiUrls.masterDataController.getByIdRoleMenuMapper + `${filter.roleId}`).then(res => {
                tableOptionTemplet.data = res.data;
                tableOptionTemplet.totalRecords = res.data.length;
                setTableOption(tableOptionTemplet);
            });
        }
    }, [filter.roleId, pageNo, pageSize, model.roleId])

    useEffect(() => {
        if (model.roleId !== "") {
            Api.Get(apiUrls.masterDataController.getByIdRoleMenuMapper + `${model.roleId}`)
                .then(res => {
                    setMenuByRole(res.data);
                    var m = model;
                    res?.data?.forEach(ele => {
                        if (m?.menuId?.indexOf(ele?.menuId) === -1) {
                            m?.menuId?.push(ele.menuId)
                        }
                    });
                    setModel({ ...m });
                });
        }
    }, [model.roleId])

    const removeMenu = (menuId) => {
        var data = model;
        var newMenus = [];
        data?.menuId?.forEach(ele => {
            if (ele !== menuId) {
                newMenus.push(ele);
            }
        });
        data.menuId = newMenus;
        setModel({ ...data });

        var mbr = [];
        menuByRole?.forEach(ele => {
            if (ele?.menuId !== menuId) {
                mbr.push(ele);
            }
        });
        setMenuByRole(mbr);
    }

    const onSelectAllHandler = (e, menuPosition) => {
        debugger;
        var isChecked = e.target.checked;
        var tempModel = model;
        menuList?.filter(x => x.menuPosition === menuPosition)?.forEach(ele => {
            if (model.menuId.indexOf(ele?.id) === -1 && isChecked) {
                tempModel.menuId.push(ele.id)
            }
            if (!isChecked) {
                tempModel.menuId = tempModel.menuId.filter(item => item !== ele.id);
            }
        });

        setModel({ ...tempModel });
    }

    const isMenuSelected = (menuId) => {
        return model?.menuId?.indexOf(menuId) > -1 || menuByRole?.find(x => x?.menuId === menuId) !== undefined
    }

    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <hr />
            <div className='row'>
                <div className='col-12 mb-2'>
                    <Label bold={true} text="Select role to view mapper menus" />
                    <Dropdown data={roleList} text="name" defaultText="Select Role..." name="roleId" value={filter.roleId} onChange={filterChangeHandler} className="form-control-sm form-control" />
                </div>
            </div>
            <TableView option={tableOption}></TableView>
            <div id="add-masterRoleModel" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Role Menu Mapper</h5>
                            <button type="button" id='close-masterRoleModel' className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <Label text="User Role" isRequired={true} />
                                                <Dropdown data={roleList} text="name" name="roleId" value={model.roleId} onChange={changeHandler} className="form-control-sm form-control" />
                                                <ErrorLabel message={errors?.roleId} />
                                            </div>
                                            <div className="col-md-12">
                                                <ErrorLabel message={errors?.menuId} />
                                                <div className='menu-container'>
                                                    {menuPosition?.map((ele, index) => {
                                                        return <div key={index}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <h6 style={{ textTransform: "uppercase", marginTop: '10px' }}>{ele}</h6>
                                                                <div> Select All <input type='checkbox' onChange={e => onSelectAllHandler(e, ele)} name={ele}></input></div>
                                                            </div>
                                                            <hr style={{ width: '100%', marginTop: '0.5rem' }} />
                                                            <div className='m-section'>
                                                                {menuList?.filter(x => x.menuPosition === ele)?.map((eleInner, indexInner) => {
                                                                    return <div key={(indexInner + 1) * 1000} className={isMenuSelected(eleInner?.id) ? 'm-container-menu-active' : 'm-container-menu'}>
                                                                        <span onClick={() => {
                                                                            changeHandler({
                                                                                target: {
                                                                                    name: 'menuId',
                                                                                    value: eleInner?.id
                                                                                }
                                                                            })
                                                                        }}>{eleInner?.name}</span>
                                                                        {isMenuSelected(eleInner?.id) && <i onClick={() => { removeMenu(eleInner?.id) }} className='fa-solid fa-times text-danger'></i>}
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
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
        </>
    )
}
