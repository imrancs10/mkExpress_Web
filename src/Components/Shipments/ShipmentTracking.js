import React, { useState, useEffect } from 'react'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import Label from '../Common/Label';
import { common } from '../Utility/common';
import './shipment.css';
import { Link } from 'react-router-dom';
import ButtonBox from '../Common/ButtonBox';

export default function ShipmentTracking({ shipmentId }) {
    const [trackingDetails, setTrackingDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [podImages, setPodImages] = useState([])
    const [selectedPodImageIndex, setSelectedPodImageIndex] = useState(0);

    useEffect(() => {
        if (shipmentId === undefined || !common.validateGuid(shipmentId))
            return;
        Api.Get(apiUrls.shipmentController.getTrackingByShipmentId + `/${shipmentId}`)
            .then(res => {
                setTrackingDetails([...res.data]);
                var images = [];
                res.data?.forEach(element => {
                    element?.shipmentImages?.forEach(img => {
                        images.push(img);
                    })
                });
                setPodImages(images)
            });

    }, [shipmentId]);

    const createPodImageLink = (ele, forComment) => {
        if (forComment > 1) {
            if ((ele[`comment${forComment - 1}`] !== null && ele[`comment${forComment - 1}`] !== undefined))
                return ele[`comment${forComment}`];
        }
        if (ele?.shipmentImages?.length === 0 || (ele[`comment${forComment}`] !== null && ele[`comment${forComment}`] !== undefined))
            return ele[`comment${forComment}`];
        else {
            return ele?.shipmentImages?.map((img, imgIndex) => {
                return <Link target='_blank' to={process.env.REACT_APP_API_URL + img?.url}>POD {imgIndex + 1}</Link>
            })
        }
    }

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
                         {currentPage===1 &&   <div className='row'>
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
}
                           {currentPage===1 && <div className='page-1'>
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
                                                    {
                                                        podImages?.length === 0 && <div className='small-text text-danger'>POD images not available</div>
                                                    }
                                                    {podImages.length > 0 && <> <div className='d-flex content-justify-start pod-img w-100'>
                                                        {
                                                            podImages?.map((ele, index) => {
                                                                return <img loading='lazy' onClick={e=>{setCurrentPage(2);setSelectedPodImageIndex(index)}} title={ele?.remark} key={index} src={process.env.REACT_APP_API_URL + ele?.thumbnailUrl} alt='POD' />
                                                            })
                                                        }
                                                    </div>
                                                    </>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
}
                          {currentPage===2 &&  <div className='page-2 mb-2'>
                                <div className='row'>
                                    <div className='col-12 mb-2'>
                                        <ButtonBox type="back" onClickHandler={e=>{setCurrentPage(1)}} className="btn-sm"></ButtonBox>
                                    </div>
                                    <div className='col-12'>
                                    <img loading='lazy' title={podImages[selectedPodImageIndex]?.remark} className='img-fluid rounded' src={process.env.REACT_APP_API_URL + podImages[selectedPodImageIndex]?.url} alt='POD' />
                                    <div className='w-100 text-center pod-remark'>{podImages[selectedPodImageIndex]?.remark}</div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='pod-container'>
                                            {podImages?.map((ele,index)=>{
                                                return <div>
                                                    <img loading='lazy' className={`img-fluid img-thumbnail rounded ${index===selectedPodImageIndex?'active':''}`} onClick={e=>{setSelectedPodImageIndex(index)}} title={ele?.remark} key={index} src={process.env.REACT_APP_API_URL + ele?.thumbnailUrl} alt='POD' />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
}
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
                                                        return <tr key={index} style={{ fontSize: '12px' }}>
                                                            <td>{index + 1}</td>
                                                            <td>{common.formatDate(res?.createdAt)}</td>
                                                            <td>{res?.activity}</td>
                                                            <td>{createPodImageLink(res, 1)}</td>
                                                            <td>{createPodImageLink(res, 2)}</td>
                                                            <td>{createPodImageLink(res, 3)}</td>
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
