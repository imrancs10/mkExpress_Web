import React, { useState, useEffect } from 'react'
import ButtonBox from '../Common/ButtonBox'
import Label from '../Common/Label';
import ErrorLabel from '../Common/ErrorLabel';
import { validationMessage } from '../Utility/ValidationMessage';
import { apiUrls } from '../../API/ApiUrl';
import { Api } from '../../API/API';
import Dropdown from '../Common/Dropdown';

export default function NewShipment() {
    const shipmentModelTemplete = {
        customerId: "",
        uniqueRefNumber: "",
        fromStoreId: "",
        toStoreId: "",
        shipperAdd3: "",
        shipperAdd2: "",
        shipperAdd1: "",
        shipperCityId: "",
        shipperSecondPhone: "",
        shipperPhone: "",
        shipperEmail: "",
        shipperName: "",
        consigneeAdd3: "",
        consigneeAdd2: "",
        consigneeAdd1: "",
        consigneeCityId: "",
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
    const [customerList, setCustomerList] = useState([])
    const [storeList, setStoreList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [errors, setErrors] = useState({});
    const [shipmentModel, setShipmentModel] = useState(shipmentModelTemplete);
    useEffect(() => {
        var apiList = [];
        apiList.push(Api.Get(apiUrls.masterDataController.getByMasterDataTypes + '?masterDataTypes=city&masterDataTypes=store'));
        //apiList.push(Api.Get(apiUrls.customerController.getAll));
        Api.MultiCall(apiList)
            .then(res => {
               // setCustomerList(res[1].data.data);
                setCityList(res[0].data.filter(x=>x?.masterDataTypeCode==='city'))
                setStoreList(res[0].data.filter(x=>x?.masterDataTypeCode==='store'))
            });
    }, []);

    const handleTextChange = (e) => {
        var { type, name, value } = e.target;
        if (type === 'number') {
            value = parseInt(value);
        }
        setShipmentModel({ ...shipmentModel, [name]: value });
    }

    const validateError = () => {
        var formError = {};
        var { customerId, uniqueRefNumber, fromStoreId, toStoreId, shipperAdd2, shipperAdd1, shipperCityId,
            shipperPhone, shipperName, consigneeAdd2, consigneeAdd1, consigneeCityId, consigneePhone, consigneeName,
            itemName, numberOfPieces, dimensions, weight } = shipmentModel;

        if (!itemName || itemName === "") formError.itemName = validationMessage.reqItemName;
        if (!numberOfPieces || numberOfPieces === 0) formError.numberOfPieces = validationMessage.reqNumberOfPieces;
        if (!dimensions || dimensions === "") formError.dimensions = validationMessage.reqDimensions;
        if (!weight || weight === "") formError.weight = validationMessage.reqWeight;

        if (!customerId || customerId === 0) formError.customerId = validationMessage.reqCustomer;
        if (!uniqueRefNumber || uniqueRefNumber === "") formError.uniqueRefNumber = validationMessage.reqUniqueRefNumber;
        if (!fromStoreId || fromStoreId === 0) formError.fromStoreId = validationMessage.reqFromStoreId;
        if (!toStoreId || toStoreId === 0) formError.toStoreId = validationMessage.reqToStoreId;
        if (!shipperAdd2 || shipperAdd2 === "") formError.shipperAdd2 = validationMessage.reqAddress2;
        if (!shipperAdd1 || shipperAdd1 === "") formError.shipperAdd1 = validationMessage.reqAddress1;
        if (!shipperCityId || shipperCityId === 0) formError.shipperCityId = validationMessage.reqCity;
        if (!shipperPhone || shipperPhone === "") formError.shipperPhone = validationMessage.reqPhone;
        if (!shipperName || shipperName === "") formError.shipperName = validationMessage.reqName;
        if (!consigneeName || consigneeName === "") formError.consigneeName = validationMessage.reqName;
        if (!consigneeAdd2 || consigneeAdd2 === "") formError.consigneeAdd2 = validationMessage.reqAddress2;
        if (!consigneeAdd1 || consigneeAdd1 === "") formError.consigneeAdd1 = validationMessage.reqAddress1;
        if (!consigneeCityId || consigneeCityId === 0) formError.consigneeCityId = validationMessage.reqCity;
        if (!consigneePhone || consigneePhone === "") formError.consigneePhone = validationMessage.reqPhone;
        if (consigneeCityId === shipperCityId && consigneeCityId!=="") 
        {
            formError.consigneeCityId = validationMessage.invalidBothCity;
            formError.shipperCityId = validationMessage.invalidBothCity;
        }
        return formError;
    }

    const handleCreateShipment = () => {
        var err = validateError();
        if (Object.keys(err).length > 0) {
            setErrors({ ...err });
            return;
        }
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
                                    <Dropdown data={customerList} text="name" value={shipmentModel.customerId} name="customerId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select Customer'/>
                                   <ErrorLabel message={errors?.customerId} />
                                </div>
                                <div className='col-sm-12 col-md-6'>
                                    <Label text="Unique Reference Number" isRequired={true} bold={true} fontSize='12px'></Label>
                                    <input type='text' name="uniqueRefNumber" value={shipmentModel.uniqueRefNumber} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Unique Reference Number'></input>
                                    <ErrorLabel message={errors?.uniqueRefNumber} />
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-md-4 col-sm-12 mb-2'>
                                    <div class="card border border-primary">
                                        <div className='card-body'>
                                            <div className='card-title'>Shipper</div>
                                            <div className='col-12'>
                                                <Label text="From Store" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <Dropdown data={storeList}  value={shipmentModel.fromStoreId} name="fromStoreId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select From Store'/>
                                               
                                                <ErrorLabel message={errors?.fromStoreId} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Name" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperName" value={shipmentModel.shipperName} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Name'></input>
                                                <ErrorLabel message={errors?.shipperName} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Email" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperEmail" value={shipmentModel.shipperEmail} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Email'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Phone" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperPhone" value={shipmentModel.shipperPhone} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Phone Number'></input>
                                                <ErrorLabel message={errors?.shipperPhone} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Second Phone" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperSecondPhone" value={shipmentModel.shipperSecondPhone} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Second Phone Number'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="City" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <Dropdown data={cityList} value={shipmentModel.shipperCityId} name="shipperCityId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select City'/>
                                               
                                               <ErrorLabel message={errors?.shipperCityId} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 1" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperAdd1" value={shipmentModel.shipperAdd1} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Address 1'></input>
                                                <ErrorLabel message={errors?.shipperAdd1} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 2" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="shipperAdd2" value={shipmentModel.shipperAdd2} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Address 2'></input>
                                                <ErrorLabel message={errors?.shipperAdd2} />
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
                                                <Dropdown data={storeList}  value={shipmentModel.toStoreId} name="toStoreId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select From Store'/>
                                               
                                                <ErrorLabel message={errors?.toStoreId} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Name" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeName" value={shipmentModel.consigneeName} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Name'></input>
                                                <ErrorLabel message={errors?.consigneeName} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Email" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeEmail" value={shipmentModel.consigneeEmail} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Email'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Phone" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneePhone" value={shipmentModel.consigneePhone} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Phone Number'></input>
                                                <ErrorLabel message={errors?.consigneePhone} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Second Phone" bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeSecondPhone" value={shipmentModel.consigneeSecondPhone} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Second Phone Number'></input>
                                            </div>
                                            <div className='col-12'>
                                                <Label text="City" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <Dropdown data={cityList} value={shipmentModel.consigneeCityId} name="consigneeCityId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select City'/>
                                               
                                                <ErrorLabel message={errors?.consigneeCityId} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 1" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeAdd1" value={shipmentModel.consigneeAdd1} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Address 1'></input>
                                                <ErrorLabel message={errors?.consigneeAdd1} />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="Address 2" isRequired={true} bold={true} fontSize='12px'></Label>
                                                <input type='text' name="consigneeAdd2" value={shipmentModel.consigneeAdd2} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Address 2'></input>
                                                <ErrorLabel message={errors?.consigneeAdd2} />
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
                                                <ErrorLabel message={errors?.weight} />
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
                                                <ErrorLabel message={errors?.numberOfPieces} />
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
                            <ButtonBox type="save" onClickHandler={handleCreateShipment} className="btn-sm"></ButtonBox>
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true}></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
