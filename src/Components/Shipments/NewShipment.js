import React, { useState, useEffect } from 'react'
import ButtonBox from '../Common/ButtonBox'
import Label from '../Common/Label';
import ErrorLabel from '../Common/ErrorLabel';
import { validationMessage } from '../Utility/ValidationMessage';
import { toastMessage } from '../Utility/ConstantValues';
import { apiUrls } from '../../API/ApiUrl';
import { Api } from '../../API/API';
import Dropdown from '../Common/Dropdown';
import { common } from '../Utility/common';
import { toast } from 'react-toastify';
import Inputbox from '../Common/Inputbox';
import SearchableDropdown from '../Common/SearchableDropdown/SearchableDropdown';

export default function NewShipment() {
    const shipmentModelTemplete = {
        id: common.guid(),
        shipmentNumber: common.getShipmentNumber(),
        customerId: "",
        uniqueRefNo: "",
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
        statusReason: "",
        status: "",
        shipmentDetail: {}
    };
    const [customerList, setCustomerList] = useState([])
    const [storeList, setStoreList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [errors, setErrors] = useState({});
    const [shipmentModel, setShipmentModel] = useState(shipmentModelTemplete);
    useEffect(() => {
        var apiList = [];
        apiList.push(Api.Get(apiUrls.masterDataController.getByMasterDataTypes + '?masterDataTypes=city&masterDataTypes=store'));
        apiList.push(Api.Get(apiUrls.customerController.getAll));
        Api.MultiCall(apiList)
            .then(res => {
                setCustomerList(res[1].data.data);
                setCityList(res[0].data.filter(x => x?.masterDataTypeCode === 'city'))
                setStoreList(res[0].data.filter(x => x?.masterDataTypeCode === 'store'))
            });
    }, []);

    const handleTextChange = (e) => {
        var { type, name, value } = e.target;
        if (type === 'number') {
            value = parseInt(value);
        }
        if (name === 'weight') {
            value = parseFloat(value);
            value = isNaN(value) ? 0 : value;
        }
        setShipmentModel({ ...shipmentModel, [name]: value });
        if (!!errors[name]) {
            setErrors({ ...errors, [name]: null })
        }
    }

    const validateError = () => {
        var formError = {};
        var { customerId, uniqueRefNo, fromStoreId, toStoreId, shipperAdd2, shipperAdd1, shipperCityId,
            shipperPhone, shipperName, consigneeAdd2, consigneeAdd1, consigneeCityId, consigneePhone, consigneeName,
         numberOfPieces, weight } = shipmentModel;

        //   if (!itemName || itemName === "") formError.itemName = validationMessage.reqItemName;
        if (!numberOfPieces || numberOfPieces === 0) formError.numberOfPieces = validationMessage.reqNumberOfPieces;
        //if (!dimensions || dimensions === "") formError.dimensions = validationMessage.reqDimensions;
        if (!weight || isNaN(weight) || weight === 0) formError.weight = validationMessage.reqWeight;

        if (!customerId || customerId === 0) formError.customerId = validationMessage.reqCustomer;
        //if (!uniqueRefNo || uniqueRefNo === "") formError.uniqueRefNo = validationMessage.reqUniqueRefNumber;
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
        if (consigneeCityId === shipperCityId && consigneeCityId !== "") {
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
        var model = shipmentModel;
        model.shipmentDetail = {
            shipmentId: model.id,
            fromStoreId: model.fromStoreId,
            toStoreId: model.toStoreId,
            shipperName: model.shipperName,
            shipperEmail: model.shipperEmail,
            shipperPhone: model.shipperPhone,
            shipperSecondPhone: model.shipperSecondPhone,
            shipperAddress1: model.shipperAdd1,
            shipperAddress2: model.shipperAdd2,
            shipperAddress3: model.shipperAdd3,
            shipperCityId: model.shipperCityId,
            consigneeName: model.consigneeName,
            consigneeEmail: model.consigneeEmail,
            consigneePhone: model.consigneePhone,
            consigneeSecondPhone: model.consigneeSecondPhone,
            consigneeAddress1: model.consigneeAdd1,
            consigneeAddress2: model.consigneeAdd2,
            consigneeAddress3: model.consigneeAdd3,
            consigneeCityId: model.consigneeCityId,
            weight: model.weight,
            totalPieces: model.numberOfPieces,
            dimension: model.dimensions,
            description: model.description
        };
        Api.Put(apiUrls.shipmentController.create, model)
            .then(res => {
                if (common.validateGuid(res.data?.id)) {
                    toast.success(toastMessage.saveSuccess);
                }
            })
    }
    return (
        <>
            <div className="modal fade" id="modalNewShipment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalNewShipmentLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalNewShipmentLabel">New Shipment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-sm-12 col-md-6'>
                                    <Label text="Customer" isRequired={true} fontSize='12px' bold={true}></Label>
                                    <SearchableDropdown data={customerList} elementValue="name" text="name" value={shipmentModel.customerId} name="customerId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select Customer' />
                                    <ErrorLabel message={errors?.customerId} />
                                </div>
                                <div className='col-sm-12 col-md-6'>
                                    <Inputbox labelText="Unique Reference Number" type='text' name="uniqueRefNo" value={shipmentModel.uniqueRefNo} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Unique Reference Number' />
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-md-4 col-sm-12 mb-2'>
                                    <div className="card border border-primary">
                                        <div className='card-body'>
                                            <div className='card-title'>Shipper</div>
                                            <div className='col-12'>
                                                <Label text="From Store" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <SearchableDropdown data={storeList} value={shipmentModel.fromStoreId} name="fromStoreId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select From Store' />
                                                <ErrorLabel message={errors?.fromStoreId} />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Name" isRequired={true} labelFontSize='12px' type='text' name="shipperName" value={shipmentModel.shipperName} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Name' errorMessage={errors?.shipperName} />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Email" type='text' name="shipperEmail" value={shipmentModel.shipperEmail} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Email' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Phone" isRequired={true} message={errors?.shipperPhone} errorMessagetype='text' name="shipperPhone" value={shipmentModel.shipperPhone} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Phone Number' />
                                            </div>
                                            <div className='col-12'>
                                                <Label bold={true} fontSize='12px'></Label>
                                                <Inputbox type='text' labelText="Second Phone" name="shipperSecondPhone" value={shipmentModel.shipperSecondPhone} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Second Phone Number' />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="City" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <SearchableDropdown data={cityList} value={shipmentModel.shipperCityId} name="shipperCityId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select City' />
                                                <ErrorLabel message={errors?.shipperCityId} />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Address 1" type='text' errorMessage={errors?.shipperAdd1} isRequired={true} name="shipperAdd1" value={shipmentModel.shipperAdd1} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Address 1' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Address 2" isRequired={true} errorMessage={errors?.shipperAdd2} type='text' name="shipperAdd2" value={shipmentModel.shipperAdd2} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Address 2' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Address 3" type='text' name="shipperAdd3" value={shipmentModel.shipperAdd3} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Shipper Address 3' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-12 mb-2'>
                                    <div className="card border border-primary">
                                        <div className='card-body'>
                                            <div className='card-title'>Consignee</div>
                                            <div className='col-12'>
                                                <Label text="To Store" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <SearchableDropdown data={storeList} value={shipmentModel.toStoreId} name="toStoreId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select From Store' />

                                                <ErrorLabel message={errors?.toStoreId} />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Name" isRequired={true} type='text' errorMessage={errors?.consigneeName} name="consigneeName" value={shipmentModel.consigneeName} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Name' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Email" type='text'  name="consigneeEmail"  value={shipmentModel.consigneeEmail} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Email' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox errorMessage={errors?.consigneePhone} labelText="Phone" isRequired={true} type='text' name="consigneePhone" value={shipmentModel.consigneePhone} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Phone Number' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Second Phone" type='text' name="consigneeSecondPhone" value={shipmentModel.consigneeSecondPhone} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Second Phone Number' />
                                            </div>
                                            <div className='col-12'>
                                                <Label text="City" isRequired={true} fontSize='12px' bold={true}></Label>
                                                <SearchableDropdown data={cityList} value={shipmentModel.consigneeCityId} name="consigneeCityId" onChange={handleTextChange} className='form-control form-control-sm' style={{ fontSize: '11px' }} defaultText='Select City' />
                                                <ErrorLabel message={errors?.consigneeCityId} />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Address 1" errorMessage={errors?.consigneeAdd1} isRequired={true} type='text' name="consigneeAdd1" value={shipmentModel.consigneeAdd1} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Address 1' />
                                             </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Address 2" isRequired={true} type='text' name="consigneeAdd2" value={shipmentModel.consigneeAdd2} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Address 2' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Address 3" type='text' name="consigneeAdd3" value={shipmentModel.consigneeAdd3} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Consignee Address 3' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-12'>
                                    <div className="card border border-primary">
                                        <div className='card-body'>
                                            <div className='card-title'>Commodity</div>

                                            <div className='col-12'>
                                                <Inputbox type='text' errorMessage={errors?.weight} labelText="Weight" name="weight" value={shipmentModel.weight} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Weight' />
                                             </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Dimensions" type='text' name="dimensions" value={shipmentModel.dimensions} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Dimensions' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="COD" type='number' min={0.0} name="codAmount" value={shipmentModel.codAmount} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder="COD" />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Description" type='text' name="description" value={shipmentModel.description} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Description' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox isRequired={true} labelText="Number of pieces Minimum(1)" type='number' errorMessage={errors?.numberOfPieces} min={1} name="numberOfPieces" value={shipmentModel.numberOfPieces} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Number Of Pieces' />
                                            </div>
                                            <div className='col-12'>
                                                <Inputbox labelText="Item Name" type='text' name="itemName" value={shipmentModel.itemName} onChangeHandler={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Item Name' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox type="save" onClickHandler={handleCreateShipment} className="btn-sm"></ButtonBox>
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true}></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
