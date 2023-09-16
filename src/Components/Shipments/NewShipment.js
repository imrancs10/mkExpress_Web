import React, { useState } from 'react'
import ButtonBox from '../Common/ButtonBox'
import Label from '../Common/Label';

export default function NewShipment() {
    const shipmentModelTemplete = {
        customerId: 0,
        uniqueRefNumber: "",
        fromStoreId: 0,
        shipperName: ""
    };
    const [shipmentModel, setShipmentModel] = useState(shipmentModelTemplete)
    const handleTextChange = (e) => {
        var { type, name, value } = e.target;
        if (type === 'select-one') {
            value = parseInt(value);
        }
        setShipmentModel({ ...shipmentModel, [name]: value });
    }
    return (
        <>
            <div class="modal fade" id="modalNewShipment" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalNewShipmentLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalNewShipmentLabel">New Shipment</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='row'>
                                <div className='col-sm-12 col-md-6'>
                                    <Label text="Unique Reference Number" isRequired={true} fontSize='12px' bold={true}></Label>
                                    <select value={shipmentModel.customerId} name="customerId" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Customer'>
                                        <option value="0">Customer</option>
                                    </select>
                                </div>
                                <div className='col-sm-12 col-md-6'>
                                    <Label text="Unique Reference Number" isRequired={true} bold={true} fontSize='12px'></Label>
                                    <input type='text' name="uniqueRefNumber" value={shipmentModel.uniqueRefNumber} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Unique Reference Number'></input>
                                </div>
                                <div className='col-sm-12 col-md-4'>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Label text="Unique Reference Number" isRequired={true} fontSize='12px' bold={true}></Label>
                                            <select value={shipmentModel.fromStoreId} name="fromStoreId" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='From Store'>
                                                <option value="0">Shipper</option>
                                            </select>
                                        </div>
                                        <div className='col-12'>
                                            <Label text="Shipper Name" isRequired={true} bold={true} fontSize='12px'></Label>
                                            <input type='text' name="shipperName" value={shipmentModel.shipperName} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Name'></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-4'>
                                <div className='row'>
                                        <div className='col-12'>
                                            <Label text="Unique Reference Number" isRequired={true} fontSize='12px' bold={true}></Label>
                                            <select value={shipmentModel.fromStoreId} name="fromStoreId" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='From Store'>
                                                <option value="0">Shipper</option>
                                            </select>
                                        </div>
                                        <div className='col-12'>
                                            <Label text="Shipper Name" isRequired={true} bold={true} fontSize='12px'></Label>
                                            <input type='text' name="shipperName" value={shipmentModel.shipperName} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Name'></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-4'></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <ButtonBox type="save" className="btn-sm"></ButtonBox>
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true}></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
