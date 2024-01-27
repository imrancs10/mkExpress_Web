import React, { useState, useEffect } from 'react'
import ButtonBox from '../Common/ButtonBox'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import SearchableDropdown from '../Common/SearchableDropdown/SearchableDropdown';
import { headerFormat } from '../Utility/tableHeaderFormat';
import TableView from '../Table/TableView';
import Label from '../Common/Label';
import ErrorLabel from '../Common/ErrorLabel';
import { common } from '../Utility/common';
import { validationMessage } from '../Utility/ValidationMessage';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';

export default function AssignForPickup({ data }) {
    const modelTemplate = {
        memberId: "",
        data: data
    }
    const [model, setModel] = useState(modelTemplate);
    const [memberList, setMemberList] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data && data?.length > 0) {
            setModel({ ...model, "data": data });
            tableOptionTemplet.data = model?.data;
            tableOptionTemplet.totalRecords = model?.data?.length;
            setTableOption({ ...tableOptionTemplet });
        }
    }, [data])


    useEffect(() => {
        Api.Get(apiUrls.memberController.getByRole + `?role=courier`)
            .then(res => {
                setMemberList(res.data);
            })
    }, []);

    const handleTextChange = (e) => {
        var { name, value } = e.target;
        setModel({ ...model, [name]: value });
    }

    const removeShipment = (id) => {
        var newModel = model;
        var newShipmentList = [];
        newModel.data?.forEach(res => {
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
        headers: headerFormat.containerShipments,
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
        var { memberId, data } = model;
        var formError = {};
        if (!memberId || !common.validateGuid(memberId)) formError.memberId = validationMessage.reqDriver;
        if (!data || data?.length === 0) formError.memberId = validationMessage.noShipmentError;
        return formError;
    }

    const handleSave = () => {
        const formError = validateModel();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return;
        }

        var postData = [];
        model?.data?.forEach(res => {
            postData.push({
                memberId: model?.memberId,
                shipmentId: res?.id
            })
        });
        Api.Post(apiUrls.shipmentController.assignForPickup, postData)
            .then(res => {
                toast.success(toastMessage.saveSuccess);
                common.closePopup('closeAssignForPickupModel');
                resetModel();
            })
    }

    const resetModel = () => {
        var newModel = model;
        newModel.memberId = "";
        newModel.data = [];
        tableOptionTemplet.data = [];
        tableOptionTemplet.totalRecords = 0;
        setModel({ ...newModel });
        setTableOption({ ...tableOptionTemplet });
    }
    return (
        <>
            <div className="modal fade" id="modalAssignForPickup" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalAssignForPickupLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalAssignForPickupLabel">Assign For Pickup</h1>
                            <button type="button" className="btn-close" onClick={e => resetModel()} id='closeAssignForPickupModel' data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className='col-12'>
                                <Label text="Select Driver" isRequired={true} />
                                <SearchableDropdown data={memberList} value={model.memberId} name="memberId" defaultText="Select Courier Person..." onChange={handleTextChange} elementValue="firstName"></SearchableDropdown>
                                <ErrorLabel message={errors?.memberId} />
                            </div>
                            <div className='col-12 my-2'>
                                <TableView option={tableOption}></TableView>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox type="save" onClickHandler={handleSave} className="btn btn-sm"></ButtonBox>
                            <ButtonBox type="cancel" onClickHandler={resetModel} className="btn btn-sm"></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
