import React, { useState, useEffect } from 'react'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import Label from '../Common/Label';
import SearchableDropdown from '../Common/SearchableDropdown/SearchableDropdown';
import ErrorLabel from '../Common/ErrorLabel';
import TableView from '../Table/TableView';
import ButtonBox from '../Common/ButtonBox';
import { headerFormat } from '../Utility/tableHeaderFormat';
import { common } from '../Utility/common';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';
import { validationMessage } from '../Utility/ValidationMessage';
import Inputbox from '../Common/Inputbox';

export default function ReceiveShipments() {
    const modelTemplate = {
        storeId: "",
        shipmentNumber:'',
        shipments: []
    }
    const [model, setModel] = useState(modelTemplate);
    const [storeList, setStoreList] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        tableOptionTemplet.data = model?.data;
        tableOptionTemplet.totalRecords = model?.data?.length;
        setTableOption({ ...tableOptionTemplet });
    }, [model.shipments])


    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getByMasterDataTypes + '?masterDataTypes=store')
            .then(res => {
                setStoreList(res.data);
            })
    }, []);

    const handleTextChange = (e) => {
        var { name, value } = e.target;
        setModel({ ...model, [name]: value });
    }

    const removeShipment = (id) => {
        var newModel = model;
        var newShipmentList = [];
        newModel.shipments?.forEach(res => {
            if (res.id !== id)
                newShipmentList.push(res);
        });
        newModel.data = newShipmentList;
        setModel({ ...newModel });

        tableOptionTemplet.data = newShipmentList;
        tableOptionTemplet.totalRecords = newShipmentList.length;
        setTableOption({ ...tableOptionTemplet });
    }

    const tableOptionTemplet = {
        headers: headerFormat.receiveShipments,
        showPagination: false,
        showTableTop: false,
        data: [],
        totalRecords: 0,
        showFooter: false,
        searchHandler: () => { },
        actions: {
            showDelete: false,
            showEdit: false,
            view: {
                icon: 'fa-solid fa-xmark text-danger',
                handler: removeShipment,
                title: 'Remove Shipment'
            }
        }
    };

    const [tableOption, setTableOption] = useState(tableOptionTemplet);

    const validateModel = () => {
        var { storeId, shipments } = model;
        var formError = {};
        if (!storeId || !common.validateGuid(storeId)) formError.storeId = validationMessage.reqToStoreId;
        if (!shipments || shipments?.length === 0) formError.storeId = validationMessage.noShipmentError;
        return formError;
    }

    const handleSave = () => {
        const formError = validateModel();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return;
        }

        var postData = [];
        model?.shipments?.forEach(res => {
            postData.push({
                storeId: model?.storeId,
                shipmentId: res
            });
        });
        Api.Post(apiUrls.shipmentController.assignForPickup, postData)
            .then(res => {
                toast.success(toastMessage.saveSuccess);
                common.closePopup('closeReceiveShipmentModel');
                resetModel();
            })
    }

    const resetModel = () => {
        var newModel = model;
        newModel.storeId = "";
        newModel.data = [];
        tableOptionTemplet.data = [];
        tableOptionTemplet.totalRecords = 0;
        setModel({ ...newModel });
        setTableOption({ ...tableOptionTemplet });
    }

    // const validateError = (validateList = false) => {
    //     const { shipments } = model;
    //     const newError = {};
    //     if (!thirdPartyCourierCompanyId || !common.validateGuid(thirdPartyCourierCompanyId)) newError.thirdPartyCourierCompanyId = validationMessage.reqThirdParty;

    //     if (validateList) {
    //         if (!shipmentList || shipmentList?.length === 0) newError.shipmentList = validationMessage.noShipmentError;
    //         if (shipmentList.find(x => x.hasError) !== undefined)
    //             newError.shipmentList = validationMessage.shipmentsHasError;
    //     }
    //     return newError;
    // }

    const validateShipment = () => {
        if (model?.shipments?.find(x => x.shipmentNumber === model?.shipmentNumber) !== undefined) {
            setErrors({ ...errors, "shipmentNumber": validationMessage.shipmentAlreadyAdded });
            return;
        }

        Api.Get(`${apiUrls.shipmentController.validateStatus}${model.shipmentNumber}&status=Picked Up`)
            .then(res => {
                if (common.validateGuid(res?.data?.id)) {
                    res.data.shipmentId = res?.data?.id;
                    var newModel = model;
                    newModel.shipmentNumber = "";
                    newModel.shipments.push(res?.data);
                    setModel({ ...newModel });
                    tableOptionTemplet.data = newModel.shipments;
                    tableOptionTemplet.totalRecords = newModel.shipments.length;
                    setTableOption({ ...tableOptionTemplet });
                    setErrors({ ...errors, "shipmentNumber": undefined });
                    setErrors({ ...errors, "shipmentList": undefined });
                }
            }).catch(err => {
                setErrors({ ...errors, "shipmentNumber": err?.response?.data?.Message });
            });
    }


    return (
        <>
            <div className="modal fade" id="modalReceiveShipment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalReceiveShipmentLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalReceiveShipmentLabel">Receive Shipments</h1>
                            <button type="button" className="btn-close" onClick={e => resetModel()} id='closeReceiveShipmentModel' data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                            <div className="col-12">
                                    <div style={{ position: 'relative' }}>
                                        <Inputbox type="text" labelText="Scan Shipment" errorMessage={errors?.shipmentNumber} name="shipmentNumber" className="form-control-sm" value={model.shipmentNumber} onChangeHandler={handleTextChange} />
                                        <ButtonBox type="add" className="btn-sm" icon="fa-solid fa-plus" style={{ position: 'absolute', top: '27px', right: '3px' }} onClickHandler={validateShipment} />
                                    </div>
                                </div>
                                <div className='col-12 my-2'>
                                    <TableView option={tableOption}></TableView>
                                </div>
                                <div className='col-12'>
                                    <Label text="Select Store" isRequired={true} />
                                    <SearchableDropdown data={storeList} value={model.storeId} name="storeId" defaultText="Select Store" onChange={handleTextChange}></SearchableDropdown>
                                    <ErrorLabel message={errors?.storeId} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox type="save" onClickHandler={handleSave} className="btn btn-sm"></ButtonBox>
                            <ButtonBox type="cancel" modelDismiss={true} onClickHandler={resetModel} className="btn btn-sm"></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
