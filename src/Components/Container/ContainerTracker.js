import React, { useEffect, useState } from 'react'
import ButtonBox from '../Common/ButtonBox'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { common } from '../Utility/common';
import './container.css';
import Label from '../Common/Label';
import TableView from '../Table/TableView';
import { headerFormat } from '../Utility/tableHeaderFormat';
import ErrorAudio from './buzzer.wav'
import Inputbox from '../Common/Inputbox';
import { validationMessage } from '../Utility/ValidationMessage';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';

export default function ContainerTracker({ containerId }) {
    const [model, setModel] = useState({});
    const [showAddShipmet, setShowAddShipmet] = useState(false);
    const containerModelTemplate = {
        id: common.guid(),
        journeyId: '',
        containerTypeId: '',
        shipmentNumber: '',
        containerDetails: []
    };
    const [containerModel, setContainerModel] = useState(containerModelTemplate);
    const [shipmentError, setShipmentError] = useState()
    useEffect(() => {
        if (!common.validateGuid(containerId))
            return
        Api.Get(apiUrls.containerController.get + containerId)
            .then(res => {
                var data = res.data;
                var newJourneyDetails = data?.containerJourneys?.sort((a, b) => a.sequenceNo - b.sequenceNo);
                data.containerJourneys = newJourneyDetails;
                setModel({ ...res.data });
                var shipmentDetails = data?.containerDetails.map(res => {
                    return res.shipment;
                })
                var model = containerModel;
                model.journeyId = data?.journeyId;
                model.containerTypeId = data?.containerTypeId;
                model.containerDetails = shipmentDetails;
                model.id=data?.id;
                tableOptionShipmentTemplet.data = model.containerDetails;
                tableOptionShipmentTemplet.totalRecords = model.containerDetails?.length;
                tableOptionShipmentTemplet.showAction = !res.data?.isClosed;
                setContainerModel({ ...model });
                setTableOptionShipment({ ...tableOptionShipmentTemplet });

                if (!data?.isClosed) {
                    tableOptionTrackingTemplet.data = data?.containerTrackings;
                    tableOptionTrackingTemplet.totalRecords = data?.containerTrackings?.length;
                    setTableOptionTracking({ ...tableOptionTrackingTemplet });
                }
            });
    }, [containerId])

    const getTimelineText = (ele, count) => {
        var text = "";
        var A = common.getHtmlDate(ele?.arrivalAt, 'ddmmyyyyhhmmss');
        var D = common.getHtmlDate(ele?.departureOn, 'ddmmyyyyhhmmss');
        if (ele?.sequenceNo !== 1 && A !== '01-01-1 00:00:00')
            text += `Arri: ${A},`;
        if (ele?.sequenceNo !== count && D !== '01-01-1 00:00:00')
            text += ` Dep: ${D}`;
        return text;
    }
    const removeShipmentFromContainer = (id, data) => {
        debugger;
        Api.Post(apiUrls.containerController.removeShipmentFromContainer + `${containerModel.id}/${data?.shipmentNumber}`,{})
            .then(res => {
                if (res.data) {
                    toast.success(toastMessage.updateSuccess);
                }
            })
    }
    const tableOptionShipmentTemplet = {
        headers: headerFormat.containerShipments,
        showPagination: false,
        showTableTop: false,
        data: [],
        totalRecords: 0,
        showFooter: false,
        searchHandler: () => { },
        showAction: false,
        actions: {
            showDelete: false,
            showEdit: false,
            view: {
                icon: 'fa-solid fa-xmark text-danger',
                handler: removeShipmentFromContainer,
                showModel: false,
            }
        }
    };

    const [tableOptionShipment, setTableOptionShipment] = useState(tableOptionShipmentTemplet);

    const tableOptionTrackingTemplet = {
        headers: headerFormat.containerTracking,
        showPagination: false,
        showTableTop: false,
        data: [],
        totalRecords: 0,
        showFooter: false,
        searchHandler: () => { },
        showAction: false
    };

    const [tableOptionTracking, setTableOptionTracking] = useState(tableOptionTrackingTemplet);

    const handleTextChange = (e) => {
        var { value, name, type } = e.target;
        setContainerModel({ ...containerModel, [name]: value });
    }
    const validateShipment = () => {
        if (containerModel.containerDetails.find(x => x.shipmentNumber === containerModel.shipmentNumber) !== undefined) {
            setShipmentError(validationMessage.shipmentAlreadyAdded);
            return;
        }
        Api.Post(apiUrls.containerController.addShipmentInContainer + `${containerId}/${containerModel.shipmentNumber}`, {})
            .then(res => {
                if (res.data?.errors[0]?.isValid === true) {
                    setShipmentError();
                    var model = containerModel;
                    model.shipmentNumber = "";
                    model.containerDetails.push(
                        {
                            shipmentNumber: containerModel.shipmentNumber,
                            containerId: containerModel.id,
                            shipmentId: res.data?.shipments[0]?.id,
                            ...res.data?.shipments[0]
                        });
                    setContainerModel({ ...model });
                    tableOptionShipmentTemplet.data = model.containerDetails;
                    tableOptionShipmentTemplet.totalRecords = model.containerDetails.length;
                    tableOptionShipment({ ...tableOptionShipmentTemplet });
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
    return (
        <>
            <div id="containerTracking" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Container Tracking</h5>
                            <button type="button" className="btn-close" id='closePopupContainerCheckIn' data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                {!model?.isClosed && <div className='col-12 d-flex justify-content-end my-2'>
                                    <ButtonBox type="add" className="btn-sm" onClickHandler={e => { setShowAddShipmet(true); }} text="Add Shipments" />
                                </div>
                                }
                                <div className='col-12 d-flex justify-content-between'>
                                    <Label bold={true} text={`Container No: ${model?.containerNo}`} />
                                    <Label bold={true} text={`Closed On: ${common.getHtmlDate(model?.closedOn, 'ddmmyyyyhhmmss')}`} />
                                    <Label bold={true} text={`Created On: ${common.getHtmlDate(model?.createdAt, 'ddmmyyyyhhmmss')}`} />
                                </div>
                                <div className='col-12' style={{ position: 'relative' }}>
                                    <ul class="timeline">
                                        {
                                            model?.containerJourneys?.map((ele, ind) => {
                                                return <li key={ind} data-year={ele.stationName} data-text={getTimelineText(ele, model?.containerJourneys?.length)}></li>
                                            })
                                        }
                                    </ul>
                                </div>
                                {!model?.isClosed && showAddShipmet && <>
                                    <div className="col-12">
                                        <div style={{ position: 'relative' }}>
                                            <Inputbox type="text" labelText="Scan Shipment" errorMessage={shipmentError} name="shipmentNumber" className="form-control-sm" value={containerModel.shipmentNumber} onChangeHandler={handleTextChange} />
                                            <ButtonBox type="add" className="btn-sm" icon="fa-solid fa-plus" style={{ position: 'absolute', top: '27px', right: '3px' }} onClickHandler={validateShipment} />
                                        </div>
                                    </div>
                                </>}
                                <div className='col-12 my-2'>
                                    <TableView option={tableOptionShipment}></TableView>
                                </div>
                                {model?.isClosed && <div className='col-12'>
                                    <TableView option={tableOptionTracking}></TableView>
                                </div>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
