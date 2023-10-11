import React, { useEffect, useState } from 'react'
import ButtonBox from '../Common/ButtonBox'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { common } from '../Utility/common';
import './container.css';
import Label from '../Common/Label';
import TableView from '../Table/TableView';
import { headerFormat } from '../Utility/tableHeaderFormat';

export default function ContainerTracker({ containerId }) {
    const [model, setModel] = useState({});
    useEffect(() => {
        if (!common.validateGuid(containerId))
            return
        Api.Get(apiUrls.containerController.get + containerId)
            .then(res => {
                var data = res.data;
                var newJourneyDetails = data?.containerJourneys?.sort((a, b) => a.sequenceNo - b.sequenceNo);
                data.containerJourneys = newJourneyDetails;
                setModel({ ...res.data });
                var shipmentDetails=data?.containerDetails.map(res=>{
                    return res.shipment;
                })
                tableOptionShipmentTemplet.data=shipmentDetails;
                tableOptionShipmentTemplet.totalRecords=shipmentDetails?.length;
                setTableOptionShipment(tableOptionShipmentTemplet);

                tableOptionTrackingTemplet.data=data?.containerTrackings;
                tableOptionTrackingTemplet.totalRecords=data?.containerTrackings?.length;
                setTableOptionTracking(tableOptionTrackingTemplet);
            });
    }, [containerId])

    const getTimelineText = (ele, count) => {
        var text = "";
        var A = common.getHtmlDate(ele?.arrivalAt, 'ddmmyyyyhhmmss');
        var D = common.getHtmlDate(ele?.departureOn, 'ddmmyyyyhhmmss');
        if (ele?.sequenceNo !== 1 && A !== '01-01-1 00:00:00')
            text += `Arrival : ${A},`;
        if (ele?.sequenceNo !== count && D !== '01-01-1 00:00:00')
            text += ` Departure : ${D}`;
        return text;
    }
    const tableOptionShipmentTemplet = {
        headers: headerFormat.containerShipments,
        showPagination: false,
        showTableTop: false,
        data: [],
        totalRecords: 0,
        showFooter: false,
        searchHandler: () => { },
        showAction: false
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
                                <div className='col-12 d-flex'>
                                    <Label text={`Container No: ${model?.containerNo}`} />
                                    <Label text={`Closed On: ${common.getHtmlDate(model?.closedOn,'ddmmyyyyhhmmss')}`} />
                                    <Label text={`Created On: ${common.getHtmlDate(model?.createdAt,'ddmmyyyyhhmmss')}`} />
                                </div>
                                <div className='col-12' style={{ position: 'relative' }}>
                                    <ul class="timeline">
                                        {
                                            model?.containerJourneys?.map((ele, ind) => {
                                                return <li data-year={ele.stationName} data-text={getTimelineText(ele, model?.containerJourneys?.length)}></li>
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className='col-12'>
                                <TableView option={tableOptionShipment}></TableView>
                                </div>
                                <div className='col-12'>
                                <TableView option={tableOptionTracking}></TableView>
                                </div>
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
