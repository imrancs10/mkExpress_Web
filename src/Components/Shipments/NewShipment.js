import React, { useState } from 'react'
import ButtonBox from '../Common/ButtonBox'
import Label from '../Common/Label';

export default function NewShipment() {
    const shipmentModelTemplete = {
        customerId: 0,
        uniqueRefNumber: "",
        fromStoreId: 0,
        toStoreId: 0,
        shipperAdd3: "",
        shipperAdd2: "",
        shipperAdd1: "",
        shipperCityId: 0,
        shipperSecondPhone: "",
        shipperPhone: "",
        shipperEmail: "",
        shipperName: "",
        consigneeAdd3: "",
        consigneeAdd2: "",
        consigneeAdd1: "",
        consigneeCityId: 0,
        consigneeSecondPhone: "",
        consigneePhone: "",
        consigneeEmail: "",
        consigneeName: "",
        itemName: "",
        numberOfPieces: 0,
        description: "",
        codAmount: 0.00,
        dimensions: "",
        weight: "",
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
                                    <Label text="Customer" isRequired={true} fontSize='12px' bold={true}></Label>
                                    <select value={shipmentModel.customerId} name="customerId" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Customer'>
                                        <option value="0">Customer</option>
                                    </select>

                                </div>
                                <div className='col-sm-12 col-md-6'>
                                    <Label text="Unique Reference Number" isRequired={true} bold={true} fontSize='12px'></Label>
                                    <input type='text' name="uniqueRefNumber" value={shipmentModel.uniqueRefNumber} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Unique Reference Number'></input>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-md-4 col-sm-12 mb-2'>
                                    <div class="card border border-primary">
                                        <div className='card-body'>
                                            <div className='card-title'>Shipper</div>
                                            <div className='col-12'>
                                                <Label text="To Store" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <select value={shipmentModel.fromStoreId} name="fromStoreId" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='From Store'>
                                                    <option value="0">To Store</option>
                                                </select>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Name" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperName" value={shipmentModel.shipperName} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Name'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Email" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperEmail" value={shipmentModel.shipperEmail} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Email'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Phone" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperPhone" value={shipmentModel.shipperPhone} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Phone Number'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Second Phone" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperSecondPhone" value={shipmentModel.shipperSecondPhone} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Second Phone Number'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="City" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <select value={shipmentModel.shipperCityId} name="shipperCityId" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper City'>
                                                    <option value="0">Select Shipper City</option>
                                                </select>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 1" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperAdd1" value={shipmentModel.shipperAdd1} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Address 1'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 2" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperAdd2" value={shipmentModel.shipperAdd2} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Address 2'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 3" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperAdd3" value={shipmentModel.shipperAdd3} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Address 3'></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-12 mb-2'>
                                    <div class="card border border-primary">
                                        <div className='card-body'>
                                            <div className='card-title'>Consignee</div>
                                            <div className='col-12'>
                                                <Label text="To Store" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <select value={shipmentModel.toStoreId} name="toStoreId" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='To Store'>
                                                    <option value="0">To Store</option>
                                                </select>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Name" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeName" value={shipmentModel.consigneeName} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Name'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Email" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeEmail" value={shipmentModel.consigneeEmail} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Email'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Phone" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneePhone" value={shipmentModel.consigneePhone} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Phone Number'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Second Phone" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeSecondPhone" value={shipmentModel.consigneeSecondPhone} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Second Phone Number'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="City" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <select value={shipmentModel.consigneeCityId} name="consigneeCityId" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee City'>
                                                    <option value="0">Select Consignee City</option>
                                                </select>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 1" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeAdd1" value={shipmentModel.consigneeAdd1} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Address 1'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 2" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeAdd2" value={shipmentModel.consigneeAdd2} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Address 2'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 3" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeAdd3" value={shipmentModel.consigneeAdd3} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Address 3'></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-12'>
                                    <div class="card border border-primary">
                                        <div className='card-body'>
                                            <div className='card-title'>Commodity</div>

                                            <div className='col-12'>
                                                <Label text="Weight" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="weight" value={shipmentModel.weight} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Weight'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Dimensions" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="dimensions" value={shipmentModel.dimensions} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Dimensions'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="COD" bold={true} fontSize='12px'></Label>
                                                <input type='number' min={0.0} name="codAmount" value={shipmentModel.codAmount} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder="COD"></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Description" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="description" value={shipmentModel.description} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Description'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Number of pieces Minimum(1)" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='number' min={1} name="numberOfPieces" value={shipmentModel.numberOfPieces} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Number Of Pieces'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Item Name" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="itemName" value={shipmentModel.itemName} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Item Name'></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
