import React, { useState, useEffect } from 'react'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import Label from '../Common/Label';
import { common } from '../Utility/common';
import './shipment.css';

export default function ShipmentTracking({ shipmentId }) {
    const [trackingDetails, setTrackingDetails] = useState([]);

    useEffect(() => {
        if (shipmentId === undefined || !common.validateGuid(shipmentId))
            return;
        Api.Get(apiUrls.shipmentController.getTrackingByShipmentId + `/${shipmentId}`)
            .then(res => {
                setTrackingDetails([...res.data]);
            });

    }, [shipmentId])

   return (
        <>
            <div className="modal fade" id="modalShipmentTracking" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalShipmentTrackingLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalShipmentTrackingLabel">Shipment Tracking</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-md-2 col-sm-12'>
                                    <Label text={`Number: ${trackingDetails[0]?.shipment?.shipmentNumber}`}></Label>
                                </div>
                                <div className='col-md-2 col-sm-12'>
                                    <Label text={`Unique No.: ${trackingDetails[0]?.shipment?.uniqueRefNo}`}></Label>
                                </div>
                                <div className='col-md-2 col-sm-12'>
                                    <Label text={`Pickup Date: ${trackingDetails[0]?.shipment?.pickupDate}`}></Label>
                                </div>
                                <div className='col-md-2 col-sm-12'>
                                    <Label text={`Customer: ${trackingDetails[0]?.shipment?.customerName}`}></Label>
                                </div>
                                <div className='col-md-2 col-sm-12'>
                                    <Label text={`Station: ${trackingDetails[0]?.shipment?.shipmentDetail?.toStore}`}></Label>
                                </div>
                                <div className='col-md-2 col-sm-12'>
                                    <Label text={`Reason: ${trackingDetails[0]?.shipment?.reason ?? ""}`}></Label>
                                </div>
                            </div>
                            <div className='row my-4'>
                                <div className='col-md-4 col-sm-12 mb-4'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='mb-2' style={{ borderBottom: '1px solid', paddingBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Shipper</div>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Label text={`Country: ${trackingDetails[0]?.shipment?.shipmentDetail?.country}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`City: ${trackingDetails[0]?.shipment?.shipmentDetail?.shipperCity}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Address Line 1: ${trackingDetails[0]?.shipment?.shipmentDetail?.shipperAddress1}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Address Line 2: ${trackingDetails[0]?.shipment?.shipmentDetail?.shipperAddress2}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Address Line 3: ${trackingDetails[0]?.shipment?.shipmentDetail?.shipperAddress3}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Name: ${trackingDetails[0]?.shipment?.shipmentDetail?.shipperName}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Email: ${trackingDetails[0]?.shipment?.shipmentDetail?.shipperEmail}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Phone: ${trackingDetails[0]?.shipment?.shipmentDetail?.shipperPhone}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Second Phone: ${trackingDetails[0]?.shipment?.shipmentDetail?.shipperSecondPhone}`}></Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-12 mb-4'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='mb-2' style={{ borderBottom: '1px solid', paddingBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Consignee</div>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Label text={`Country: ${trackingDetails[0]?.shipment?.shipmentDetail?.country}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`City: ${trackingDetails[0]?.shipment?.shipmentDetail?.consigneeCity}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Address Line 1: ${trackingDetails[0]?.shipment?.shipmentDetail?.consigneeAddress1}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Address Line 2: ${trackingDetails[0]?.shipment?.shipmentDetail?.consigneeAddress2}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Address Line 3: ${trackingDetails[0]?.shipment?.shipmentDetail?.consigneeAddress3}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Name: ${trackingDetails[0]?.shipment?.shipmentDetail?.consigneeName}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Email: ${trackingDetails[0]?.shipment?.shipmentDetail?.consigneeEmail}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Phone: ${trackingDetails[0]?.shipment?.shipmentDetail?.consigneePhone}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Second Phone: ${trackingDetails[0]?.shipment?.shipmentDetail?.consigneeSecondPhone}`}></Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-12'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='mb-2' style={{ borderBottom: '1px solid', paddingBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Commodity</div>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Label text={`Weight: ${trackingDetails[0]?.shipment?.shipmentDetail?.weight}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Dimensions: ${trackingDetails[0]?.shipment?.shipmentDetail?.dimension}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Description: ${trackingDetails[0]?.shipment?.shipmentDetail?.description}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`COD: ${trackingDetails[0]?.shipment?.codAmount}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Number of pieces: ${trackingDetails[0]?.shipment?.shipmentDetail?.totalPieces}`}></Label>
                                                </div>
                                                <div className='col-12'>
                                                    <Label text={`Attached Images Urls:`}></Label>
                                                    <div className='d-flex content-justify-start pod-img w-100'>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                        <img loading='lazy' src='./loader.gif' alt='POD'/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table className="table table-sm table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date</th>
                                                    <th>Activity</th>
                                                    <th>Comment 1</th>
                                                    <th>Comment 2</th>
                                                    <th>Comment 3</th>
                                                    <th>By</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    trackingDetails?.map((res, index) => {
                                                        return <tr style={{ fontSize: '12px' }}>
                                                            <td>{index + 1}</td>
                                                            <td>{common.formatDate(res?.createdAt)}</td>
                                                            <td>{res?.activity}</td>
                                                            <td>{res?.comment1}</td>
                                                            <td>{res?.comment2}</td>
                                                            <td>{res?.comment3}</td>
                                                            <td>{res?.commentByName}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
