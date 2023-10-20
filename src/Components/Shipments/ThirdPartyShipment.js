import React, { useState, useEffect } from 'react'
import ButtonBox from '../Common/ButtonBox'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import Label from '../Common/Label';
import ErrorLabel from '../Common/ErrorLabel';
import SearchableDropdown from '../Common/SearchableDropdown/SearchableDropdown';
import { validationMessage } from '../Utility/ValidationMessage';
import { common } from '../Utility/common';
import Inputbox from '../Common/Inputbox';
import { headerFormat } from '../Utility/tableHeaderFormat';
import TableView from '../Table/TableView';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';

export default function ThirdPartyShipment({ data }) {
    const modelTemplate = {
        thirdPartyCourierCompanyId: "",
        shipmentId: "",
        shipmentNumber: "",
        thirdPartyShipmentNo: "",
        shipmentList: [],
    }
    const [thirdPartyCourierList, setThirdPartyCourierList] = useState([]);
    const [model, setModel] = useState(modelTemplate);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        Api.Get(apiUrls.thirdPartyController.getAll + `?fetchAll=true&PageSize=1000000`)
            .then(res => {
                setThirdPartyCourierList(res.data.data);
            });
    }, []);

    const handleTextChange = (e) => {
        var { name, value } = e.target;
        var newModel = model;
        if (name === "thirdPartyCourierCompanyId") {
            newModel?.shipmentList?.forEach(res => {
                res.thirdPartyCourierCompanyId = value;
            });
        }
        setModel({ ...newModel, [name]: value });
        if (!!errors[name]) {
            setErrors({ ...errors, [name]: null })
        }
    }
    const validateShipment = () => {
        if (model.shipmentList.find(x => x.shipmentNumber === model.shipmentNumber) !== undefined) {
            setErrors({ ...errors, "shipmentNumber": validationMessage.shipmentAlreadyAdded });
            return;
        }

        const formError = validateError();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return;
        }

        Api.Get(apiUrls.shipmentController.validateThirdPartyShipment + model.shipmentNumber)
            .then(res => {
                if (common.validateGuid(res?.data?.id)) {
                    res.data.shipmentId = res?.data?.id;
                    res.data.thirdPartyCourierCompanyId = model?.thirdPartyCourierCompanyId;
                    var newModel = model;
                    newModel.shipmentNumber = "";
                    newModel.shipmentList.push(res?.data);
                    setModel({ ...newModel });
                    tableOptionTemplet.data = newModel.shipmentList;
                    tableOptionTemplet.totalRecords = newModel.shipmentList.length;
                    setTableOption({ ...tableOptionTemplet });
                    setErrors({ ...errors, ["shipmentNumber"]: undefined });
                    setErrors({ ...errors, ["shipmentList"]: undefined });
                }
            }).catch(err => {
                setErrors({ ...errors, ["shipmentNumber"]: err?.response?.data?.Message });
            });
    }

    const validateError = (validateList = false) => {
        const { thirdPartyCourierCompanyId, shipmentList } = model;
        const newError = {};
        if (!thirdPartyCourierCompanyId || !common.validateGuid(thirdPartyCourierCompanyId)) newError.thirdPartyCourierCompanyId = validationMessage.reqThirdParty;

        if (validateList) {
            if (!shipmentList || shipmentList?.length === 0) newError.shipmentList = validationMessage.noShipmentError;
            if (shipmentList.find(x => x.hasError) !== undefined)
                newError.shipmentList = validationMessage.shipmentsHasError;
        }
        return newError;
    }

    const removeShipment = (id) => {
        var newModel = model;
        var newShipmentList = [];
        newModel.shipmentList?.forEach(res => {
            if (res.shipmentId !== id)
                newShipmentList.push(res);
        });
        newModel.shipmentList = newShipmentList;
        setModel({ ...newModel });

        tableOptionTemplet.data = newShipmentList;
        tableOptionTemplet.totalRecords = newShipmentList.length;
        setTableOption({ ...tableOptionTemplet });
        validateShipment(true);
    }
    const changeRowClassHandler = (data) => {
        if (data?.hasError) {
            return 'bg-danger';
        }
    }
    const tableOptionTemplet = {
        headers: headerFormat.containerShipments,
        showPagination: false,
        showTableTop: false,
        data: [],
        totalRecords: 0,
        showFooter: false,
        searchHandler: () => { },
        changeRowClassHandler: changeRowClassHandler,
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

    const resetForm = () => {
        setModel({ ...modelTemplate });
        tableOptionTemplet.data = [];
        tableOptionTemplet.totalRecords = 0;
        setTableOption({ ...tableOptionTemplet });
    }

    const saveShipment = () => {
        const formError = validateError(true);
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return;
        }

        Api.Put(apiUrls.thirdPartyController.addThirdPartyShipment, model.shipmentList)
            .then(res => {
                if (res.data) {
                    toast.success(toastMessage.saveSuccess);
                }
            }).catch(err => {
                if (err?.response?.data?.ErrorResponseType === "SomeShipmentsAlreadyAddedToThirdParty!") {
                    var newModel = model;
                    var message = err?.response?.data?.Message?.match(/[20]\d{14}/gm);
                    newModel.shipmentList.forEach(res => {
                        if (message?.indexOf(res.shipmentNumber) > -1) {
                            res.hasError = true;
                        }
                    });
                    setErrors({...errors,["shipmentList"]:validationMessage.shipmentsHasError+" "+err?.response?.data?.Message.split(":")[0]});
                    setModel({ ...newModel });
                    tableOptionTemplet.data = newModel?.shipmentList;
                    tableOptionTemplet.totalRecords = newModel?.shipmentList?.length;
                    setTableOption({ ...tableOptionTemplet });
                }
                console.log(err);
            });
    }
    return (
        <>
            <div className="modal fade" id="modalThirdPartyShipment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalThirdPartyShipmentLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalThirdPartyShipmentLabel">Third Party Shipment</h1>
                            <button type="button" className="btn-close" onClick={e => resetForm()} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-12">
                                    <Label text="Third Party Courier" isRequired={true} />
                                    <SearchableDropdown data={thirdPartyCourierList} elementValue="name" name="thirdPartyCourierCompanyId" value={model.thirdPartyCourierCompanyId} className="form-control form-control-sm" onChange={handleTextChange} />
                                    <ErrorLabel message={errors?.thirdPartyCourierCompanyId} />
                                </div>
                                <div className="col-12">
                                    <div style={{ position: 'relative' }}>
                                        <Inputbox type="text" labelText="Scan Shipment" errorMessage={errors?.shipmentNumber} name="shipmentNumber" className="form-control-sm" value={model.shipmentNumber} onChangeHandler={handleTextChange} />
                                        <ButtonBox type="add" className="btn-sm" icon="fa-solid fa-plus" style={{ position: 'absolute', top: '27px', right: '3px' }} onClickHandler={validateShipment} />
                                    </div>
                                </div>
                                <div className='col-12 my-2'>
                                    <ErrorLabel message={errors?.shipmentList} />
                                    <TableView option={tableOption}></TableView>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <ButtonBox type="save" onClickHandler={saveShipment} className="btn btn-sm"></ButtonBox>
                            <ButtonBox type="cancel" modelDismiss={true} onClickHandler={resetForm} className="btn btn-sm"></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
