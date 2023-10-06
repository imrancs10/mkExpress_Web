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
import { headerFormat } from '../../Utility/tableHeaderFormat';
import './journey.css';

export default function MasterJourney() {
    const [stationList, setStationList] = useState([]);
    const masterJourneyModelTemplate = {
        id: common.guid(),
        fromStationId: '',
        toStationId: '',
        subStationId: '',
        masterJourneyDetails: []
    }
    const [masterJourneyModel, setMasterJourneyModel] = useState(masterJourneyModelTemplate);
    const [isRecordSaving, setIsRecordSaving] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [errors, setErrors] = useState();
    const [showSubStationDdl, setShowSubStationDdl] = useState(false);
    const handleAddMoreStation = (e) => {
        e.preventDefault();
        if (!showSubStationDdl) {
            setShowSubStationDdl(true);
        }
        else {

        }

        addBlankSubStation();
    }

    const addBlankSubStation = () => {
        var model = masterJourneyModel;
        model.masterJourneyDetails.push({
            id: common.guid(),
            masterJourneyId: model.id,
            subStationId: ''
        });
        setMasterJourneyModel({ ...model });
    }
    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getByMasterDataType + "station")
            .then(res => {
                res?.data?.map(ele => {
                    ele.value = `${ele?.value} - ${ele?.code}`;
                })
                setStationList([...res.data]);
            })
    }, [])
    const handleDelete = (id) => {
        Api.Delete(apiUrls.masterDataController.deleteJourney + id).then(res => {
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
        Api.Get(apiUrls.masterDataController.searchJourney + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        });
    }

    const handleTextChange = (e, subStationIndex) => {
        var { value, name } = e.target;
        var data = masterJourneyModel;
        data[name] = value;
        if (name === "subStationId") {
            data.masterJourneyDetails[subStationIndex].subStationId = value;
        }
        setMasterJourneyModel({ ...data });

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

        let data = masterJourneyModel;
        if (isRecordSaving) {
            Api.Put(apiUrls.masterDataController.addJourney, data).then(res => {
                if (res.data.id != null) {
                    common.closePopup('closePopupMasterJourney');
                    toast.success(toastMessage.saveSuccess);
                    handleSearch();
                }
            }).catch(err => {
                toast.error(toastMessage.saveError);
            });
        }
        else {
            Api.Post(apiUrls.masterDataController.updatJourney, masterJourneyModel).then(res => {
                if (res.data.id != null) {
                    common.closePopup('closePopupMasterJourney');
                    toast.success(toastMessage.updateSuccess);
                    handleSearch();
                }
            });
        }
    }
    const handleEdit = (masterDataId) => {
        setIsRecordSaving(false);
        setShowSubStationDdl(true);
        setErrors({});
        Api.Get(apiUrls.masterDataController.getJourney + masterDataId).then(res => {
            if (res.data.id !== null) {
                setMasterJourneyModel({ ...res.data });
            }
        });
    };

    const tableOptionTemplet = {
        headers: headerFormat.masterJourney,
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
            popupModelId: "add-masterJourney",
            delete: {
                handler: handleDelete
            },
            edit: {
                handler: handleEdit
            }
        }
    };

    const saveButtonHandler = () => {
        setMasterJourneyModel({ ...masterJourneyModelTemplate });
        setErrors({});
        setIsRecordSaving(true);
    }
    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    const breadcrumbOption = {
        title: 'Master Journey',
        items: [
            {
                title: "Master Journey'",
                icon: "fa-solid fa-taxi",
                isActive: false,
            }
        ],
        buttons: [
            {
                text: "Master Journey",
                icon: 'fa-solid fa-plus',
                modelId: 'add-masterJourney',
                handler: saveButtonHandler
            }
        ]
    }

    useEffect(() => {
        setIsRecordSaving(true);
        Api.Get(apiUrls.masterDataController.getAllJourney + `?PageNo=${pageNo}&PageSize=${pageSize}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        })
            ;
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (isRecordSaving) {
            setMasterJourneyModel({ ...masterJourneyModelTemplate });
        }
    }, [isRecordSaving]);

    const validateError = () => {
        const { fromStationId, toStationId } = masterJourneyModel;
        const newError = {};
        if (!common.validateGuid(fromStationId)) newError.fromStationId = validationMessage.reqFromStation;
        if (!common.validateGuid(toStationId)) newError.toStationId = validationMessage.reqToStation;
        if (common.validateGuid(toStationId) && toStationId === fromStationId) newError.toStationId = validationMessage.InvalidFromToStation;
        masterJourneyModel.masterJourneyDetails.forEach((res, index) => {
            if (res?.subStationId === masterJourneyModel.fromStationId || res?.subStationId === masterJourneyModel.toStationId || masterJourneyModel.masterJourneyDetails.filter(x => x.subStationId === res.subStationId)?.length > 1) {
                newError[`subStationId${index + 1}`] = validationMessage.InvalidStation;
            }
        });
        return newError;
    }

    const removeSubStation = (e, index) => {
        var model = masterJourneyModel;
        var newDetail = [];
        model.masterJourneyDetails.forEach((ele, ind) => {
            if (ind !== index) {
                newDetail.push(ele)
            }
        })
        model.masterJourneyDetails = newDetail;
        setMasterJourneyModel({ ...model });
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <hr />
            <TableView option={tableOption}></TableView>

            {/* <!-- Add Contact Popup Model --> */}
            <div id="add-masterJourney" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Master Journey</h5>
                            <button type="button" className="btn-close" id='closePopupMasterJourney' data-bs-dismiss="modal" aria-hidden="true"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <Label text="From Station" fontSize='12px' isRequired={true}></Label>
                                                <Dropdown data={stationList} className="form-control-sm" onChange={e => handleTextChange(e)} value={masterJourneyModel.fromStationId} name="fromStationId" defaultText='Select From Station' defaultValue=''></Dropdown>
                                                <ErrorLabel message={errors?.fromStationId}></ErrorLabel>
                                            </div>
                                            <div className="col-md-12">
                                                <Label text="To Station" fontSize='12px' isRequired={true}></Label>
                                                <Dropdown data={stationList} className="form-control-sm" onChange={e => handleTextChange(e)} value={masterJourneyModel.toStationId} name="toStationId" defaultText='Select To Station' defaultValue=''></Dropdown>
                                                <ErrorLabel message={errors?.toStationId}></ErrorLabel>
                                            </div>

                                            {showSubStationDdl && masterJourneyModel?.masterJourneyDetails?.map((res, ind) => {
                                                return <div className="col-md-12">
                                                    <Label text={"Sub Station " + (ind + 1)} fontSize='12px' isRequired={true}></Label>
                                                    <div style={{ position: 'relative' }}>
                                                        <Dropdown data={stationList} className="form-control-sm w90" onChange={e => handleTextChange(e, ind)} value={masterJourneyModel.masterJourneyDetails[ind].subStationId} name="subStationId" defaultText='Select Sub Station' defaultValue=''></Dropdown>
                                                        <ButtonBox text="" icon="fa-solid fa-trash text-danger" onClickHandler={removeSubStation} onClickHandlerData={ind} style={{ position: 'absolute', top: '-4px', right: '0px' }} />
                                                    </div>
                                                    <ErrorLabel message={errors["subStationId" + (ind+1)]}></ErrorLabel>
                                                </div>
                                            })
                                            }
                                            <div className="col-md-12">
                                                <ButtonBox type="add" onClickHandler={handleAddMoreStation} className="btn-sm w-100" text="Add Sub Station"></ButtonBox>
                                            </div>


                                            <div className='col-md-12'>
                                                <div className='journey-container'>
                                                    <span>{stationList?.find(x => x.id === masterJourneyModel.fromStationId)?.value ?? "Start"} </span>
                                                    {
                                                        masterJourneyModel?.masterJourneyDetails?.map((res, ind) => {
                                                            return <span>{stationList?.find(x => x.id === res.subStationId)?.value ?? "Sub Station " + (ind + 1)} </span>
                                                        })
                                                    }
                                                    <span>{stationList?.find(x => x.id === masterJourneyModel.toStationId)?.value ?? "End"} </span>
                                                </div>
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
