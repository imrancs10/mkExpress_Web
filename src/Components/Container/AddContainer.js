import React, { useState, useEffect } from 'react'
import Inputbox from '../Common/Inputbox';
import ButtonBox from '../Common/ButtonBox';
import Dropdown from '../Common/Dropdown';
import { common } from '../Utility/common';
import { validationMessage } from '../Utility/ValidationMessage';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import Label from '../Common/Label';
import TableView from '../Table/TableView';
import { headerFormat } from '../Utility/tableHeaderFormat';
import ErrorAudio from './buzzer.wav'
import ErrorLabel from '../Common/ErrorLabel';
export default function AddContainer({ handleSearch }) {
    const containerModelTemplate = {
        id: common.guid(),
        journeyId: '',
        containerTypeId: '',
        shipmentNumber: '',
        containerDetails: []
    };

    const [containerModel, setContainerModel] = useState(containerModelTemplate);
    const [errors, setErrors] = useState({});
    const [shipmentError, setShipmentError] = useState()
    const [journeyList, setJourneyList] = useState([]);
    const [containerTypeList, setContainerTypeList] = useState([])

    useEffect(() => {
        var apiList = [];
        apiList.push(Api.Get(apiUrls.masterDataController.getJourneyDropdown));
        apiList.push(Api.Get(apiUrls.masterDataController.getByMasterDataType + 'container_type'));
        Api.MultiCall(apiList)
            .then(res => {
                setJourneyList(res[0].data);
                setContainerTypeList(res[1].data);
            });
    }, [])

    const validateError = () => {
        const { journeyId, containerDetails,containerTypeId } = containerModel;
        const newError = {};
        if (!journeyId || journeyId === "" || !common.validateGuid(journeyId)) newError.journeyId = validationMessage.reqContainerRoute;
        if (!containerTypeId || containerTypeId === "" || !common.validateGuid(containerTypeId)) newError.containerTypeId = validationMessage.reqContainerType;
        if (!containerDetails || containerDetails?.length === 0) newError.containerDetails = validationMessage.reqShipments;
        return newError;
    }

    const handleTextChange = (e) => {
        var { value, name, type } = e.target;
        setContainerModel({ ...containerModel, [name]: value });
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
        let data = containerModel;
            Api.Put(apiUrls.containerController.add, data).then(res => {
                if (common.validateGuid(res.data.id)) {
                    common.closePopup('closePopupContainer');
                    toast.success(toastMessage.saveSuccess);
                    resetForm();
                    handleSearch('');
                }
            }).catch(err => {
                toast.error(toastMessage.saveError);
            });
    }

    const validateShipment = () => {
        if (containerModel.containerDetails.find(x => x.shipmentNumber === containerModel.shipmentNumber) !== undefined) {
            setShipmentError(validationMessage.shipmentAlreadyAdded);
            return;
        }
        var lst = [];
        lst.push(containerModel.shipmentNumber);
        Api.Post(apiUrls.shipmentController.validateShipments + `${containerModel.journeyId}`, lst)
            .then(res => {
                if (res.data?.errors[0]?.isValid === true) {
                    setShipmentError();
                    var model = containerModel;
                    model.shipmentNumber = "";
                    model.containerDetails.push(
                        {
                            shipmentNumber: containerModel.shipmentNumber,
                            containerId: containerModel.id,
                            shipmentId:res.data?.shipments[0]?.id,
                            ...res.data?.shipments[0]
                        });
                    setContainerModel({ ...model });
                    tableOptionTemplet.data = model.containerDetails;
                    tableOptionTemplet.totalRecords = model.containerDetails.length;
                    setTableOption({ ...tableOptionTemplet });
                }
                else {
                    setShipmentError(res.data?.errors[0]?.error)
                    var AudioPlay = new Audio(ErrorAudio);
                    AudioPlay.play();
                }
            })
            .catch(err => {
                setShipmentError(err?.response?.data?.Message)
            });
    }

    const tableOptionTemplet = {
        headers: headerFormat.containerShipments,
        showPagination: false,
        showTableTop: false,
        data: [],
        totalRecords: 0,
        showFooter: false,
        searchHandler: () => { },
        showAction: false
    };

    const [tableOption, setTableOption] = useState(tableOptionTemplet);

    const resetForm=()=>{
        setContainerModel({...containerModelTemplate});
        tableOptionTemplet.data=[];
        tableOptionTemplet.totalRecords=0;
        setTableOption(tableOptionTemplet);
      }
    return (
        <>
            <div id="add-container"  data-bs-backdrop="static" data-bs-keyboard="false" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Container</h5>
                            <button type="button" className="btn-close" id='closePopupContainer' onClick={e=>{resetForm()}} data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-6 col-sm-12">
                                                <Label text="Container Route" isRequired={true} />
                                                <Dropdown data={journeyList} isRequired={true} name="journeyId" value={containerModel.journeyId} className="form-control form-control-sm" onChange={handleTextChange} />
                                                <ErrorLabel message={errors?.journeyId} />
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <Label text="Container Type" isRequired={true} />
                                                <Dropdown data={containerTypeList} isRequired={true} name="containerTypeId" value={containerModel.containerTypeId} className="form-control form-control-sm" onChange={handleTextChange} />
                                                <ErrorLabel message={errors?.containerTypeId} />
                                            </div>
                                            {common.validateGuid(containerModel.journeyId) && <>
                                                <div className="col-12">
                                                    <div style={{ position: 'relative' }}>
                                                        <Inputbox type="text" labelText="Scan Shipment" errorMessage={shipmentError} name="shipmentNumber" className="form-control-sm" value={containerModel.shipmentNumber} onChangeHandler={handleTextChange} />
                                                        <ButtonBox type="add" className="btn-sm" icon="fa-solid fa-plus" style={{ position: 'absolute', top: '27px', right: '3px' }} onClickHandler={validateShipment} />
                                                    </div>
                                                </div>
                                                <div className='col-12'>
                                                    <ErrorLabel message={errors?.containerDetails} />
                                                    <TableView option={tableOption}></TableView>
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox text="Save" type="save" onClickHandler={handleSave} className="btn-sm" />
                            <ButtonBox type="cancel" className="btn-sm" onClickHandler={resetForm} modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
