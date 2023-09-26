import React, { useState, useEffect } from 'react'
import { Api } from '../../../API/API';
import { apiUrls } from '../../../API/ApiUrl';
import { common } from '../../Utility/common';
import { toast } from 'react-toastify';
import { toastMessage } from '../../Utility/ConstantValues';
import Breadcrumb from '../../Common/Breadcrumb';
import TableView from '../../Table/TableView';
import ButtonBox from '../../Common/ButtonBox';
import Label from '../../Common/Label';
import Dropdown from '../../Common/Dropdown';
import ErrorLabel from '../../Common/ErrorLabel';
import { validationMessage } from '../../Utility/ValidationMessage';
import { headerFormat } from '../../Utility/tableHeaderFormat';

export default function LogisticRegion() {
    const [countryList, setCountryList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [stationList, setStationList] = useState([]);
    const [parentStationList, setParentStationList] = useState([]);
    const modelTemplate = {
        id: common.guid(),
        cityId: '',
        countryId: '',
        districtId: null,
        stationId: '',
        provinceId: '',
        parentStationId: '',
    }
    const [model, setModel] = useState(modelTemplate);
    const [isRecordSaving, setIsRecordSaving] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [errors, setErrors] = useState();

    useEffect(() => {
        var apiList = [];
        apiList.push(Api.Get(apiUrls.masterDataController.getByMasterDataTypes + `?masterDataTypes=city&masterDataTypes=station&masterDataTypes=province&masterDataTypes=parent-station&masterDataTypes=district&masterDataTypes=country`))
        Api.MultiCall(apiList)
            .then(res => {
                setCityList(res[0].data.filter(x => x.masterDataTypeCode === 'city'))
                setStationList(res[0].data.filter(x => x.masterDataTypeCode === 'station'))
                setProvinceList(res[0].data.filter(x => x.masterDataTypeCode === 'province'))
                setParentStationList(res[0].data.filter(x => x.masterDataTypeCode === 'parent-station'))
                setCountryList(res[0].data.filter(x => x.masterDataTypeCode === 'country'))
                setDistrictList(res[0].data.filter(x => x.masterDataTypeCode === 'district'))
            });
    }, []);

    const handleDelete = (id) => {
        Api.Delete(apiUrls.logisticRegionController.delete + id).then(res => {
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
        Api.Get(apiUrls.logisticRegionController.search + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        });
    }

    const handleTextChange = (e) => {
        var { value, name, } = e.target;
        var data = model;

        data[name] = value;
        setModel({ ...data });

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

        let data = model;
        if (isRecordSaving) {
            Api.Put(apiUrls.logisticRegionController.add, data).then(res => {
                if (common.validateGuid(res.data.id)) {
                    common.closePopup('closeLogisticRegionModel');
                    toast.success(toastMessage.saveSuccess);
                    handleSearch("");
                }
            }).catch(err => {
                toast.error(toastMessage.saveError);
            });
        }
        else {
            Api.Post(apiUrls.logisticRegionController.update, model).then(res => {
                if (common.validateGuid(res.data.id)) {
                    common.closePopup('closeLogisticRegionModel');
                    toast.success(toastMessage.updateSuccess);
                    handleSearch("");
                }
            });
        }
    }

    const handleEdit = (id) => {
        setIsRecordSaving(false);
        setErrors({});
        Api.Get(apiUrls.logisticRegionController.get + id).then(res => {
            if (common.validateGuid(res.data.id)) {
                setModel({ ...res.data });
            }
        });
    };

    const tableOptionTemplet = {
        headers: headerFormat.logisticRegion,
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

        setModel({ ...modelTemplate });
        setErrors({});
        setIsRecordSaving(true);
    }

    const [tableOption, setTableOption] = useState(tableOptionTemplet);

    const breadcrumbOption = {
        title: 'Logistic Region',
        items: [
            {
                title: "Logistic Region",
                icon: "fa-solid fa-share-nodes",
                isActive: false,
            }
        ],
        buttons: [
            {
                text: "Logistic Region",
                icon: 'fa-solid fa-plus',
                modelId: 'add-masterData',
                handler: saveButtonHandler
            }
        ]
    }

    useEffect(() => {
        setIsRecordSaving(true);
        Api.Get(apiUrls.logisticRegionController.getAll + `?PageNo=${pageNo}&PageSize=${pageSize}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        });
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (isRecordSaving) {
            setModel({ ...modelTemplate });
        }
    }, [isRecordSaving]);

    const validateError = () => {
        const { countryId, cityId, provinceId, stationId, parentStationId } = model;
        const newError = {};
        if (!countryId || countryId === "" || !common.validateGuid(countryId)) newError.countryId = validationMessage.reqCountry;
        if (!cityId || cityId === "" || !common.validateGuid(cityId)) newError.cityId = validationMessage.reqCity;
        if (!provinceId || provinceId === "" || !common.validateGuid(provinceId)) newError.provinceId = validationMessage.reqProvince;
        if (!stationId || stationId === "" || !common.validateGuid(stationId)) newError.stationId = validationMessage.reqStation;
        if (!parentStationId || parentStationId === "" || !common.validateGuid(parentStationId)) newError.parentStationId = validationMessage.reqParentStation;
        return newError;
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <TableView option={tableOption}></TableView>
            <div id="add-masterData" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Logistic Region</h5>
                            <button type="button" className="btn-close" id='closeLogisticRegionModel' data-bs-dismiss="modal" aria-hidden="true"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <form className="row g-3">
                                            <div className="col-md-12">
                                                <Label text="Country" fontSize='12px' isRequired={true}></Label>
                                                <Dropdown data={countryList} className="form-control-sm" onChange={e => handleTextChange(e)} value={model.countryId} name="countryId" defaultText='Select Country' defaultValue=''></Dropdown>
                                                <ErrorLabel message={errors?.countryId}></ErrorLabel>
                                            </div>
                                            <div className="col-md-12">
                                                <Label text="Province" fontSize='12px' isRequired={true}></Label>
                                                <Dropdown data={provinceList} className="form-control-sm" onChange={e => handleTextChange(e)} value={model.provinceId} name="provinceId" defaultText='Select Province' defaultValue=''></Dropdown>
                                                <ErrorLabel message={errors?.provinceId}></ErrorLabel>
                                            </div>
                                            <div className="col-md-12">
                                                <Label text="City" fontSize='12px' isRequired={true}></Label>
                                                <Dropdown data={cityList} className="form-control-sm" onChange={e => handleTextChange(e)} value={model.cityId} name="cityId" defaultText='Select City' defaultValue=''></Dropdown>
                                                <ErrorLabel message={errors?.cityId}></ErrorLabel>
                                            </div>
                                            <div className="col-md-12">
                                                <Label text="District" fontSize='12px'></Label>
                                                <Dropdown data={districtList} className="form-control-sm" onChange={e => handleTextChange(e)} value={model.districtId} name="districtId" defaultText='Select District' defaultValue=''></Dropdown>
                                            </div>
                                            <div className="col-md-12">
                                                <Label text="Station" fontSize='12px' isRequired={true}></Label>
                                                <Dropdown data={stationList} className="form-control-sm" onChange={e => handleTextChange(e)} value={model.stationId} name="stationId" defaultText='Select Station' defaultValue=''></Dropdown>
                                                <ErrorLabel message={errors?.stationId}></ErrorLabel>
                                            </div>
                                            <div className="col-md-12">
                                                <Label text="Parent Station" fontSize='12px' isRequired={true}></Label>
                                                <Dropdown data={parentStationList} className="form-control-sm" onChange={e => handleTextChange(e)} value={model.parentStationId} name="parentStationId" defaultText='Select Parent Station' defaultValue=''></Dropdown>
                                                <ErrorLabel message={errors?.parentStationId}></ErrorLabel>
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
        </>
    )
}
