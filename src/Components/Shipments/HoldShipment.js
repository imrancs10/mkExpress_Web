import React,{useState,useEffect} from 'react'
import ButtonBox from '../Common/ButtonBox'
import TableView from '../Table/TableView'
import { headerFormat } from '../Utility/tableHeaderFormat';
import { validationMessage } from '../Utility/ValidationMessage';
import { common } from '../Utility/common';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';

export default function HoldShipment({data}) {
    const modelTemplate = {
        data: data
    }
    const [model, setModel] = useState(modelTemplate);
    const [errors, setErrors] = useState({});

    const validateModel = () => {
        var { data } = model;
        var formError = {};
        if (!data || data?.length === 0) formError.memberId = validationMessage.noShipmentError;
        return formError;
    }
    useEffect(() => {
        if (data && data?.length > 0) {
            setModel({ ...model, "data": data });
            tableOptionTemplet.data = model?.data;
            tableOptionTemplet.totalRecords = model?.data?.length;
            setTableOption({ ...tableOptionTemplet });
        }
    }, [data])

    const handleSave = () => {
        const formError = validateModel();
        if (Object.keys(formError).length > 0) {
            setErrors(formError);
            return;
        }

        var postData = [];
        model?.data?.forEach(res => {
            postData.push(res?.id)
        });
        Api.Post(apiUrls.shipmentController.holdShipment, postData)
            .then(res => {
                if(res.data===true){
                toast.success(toastMessage.saveSuccess);
                common.closePopup('closeHoldShipmentModel');
                resetModel();
                }
            });
    }

    const resetModel = () => {
        tableOptionTemplet.data = [];
        tableOptionTemplet.totalRecords = 0;
        setTableOption({ ...tableOptionTemplet });
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
        headers: headerFormat.holdShipments,
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
  return (
    <>
    <div className="modal fade" id="modelHoldShipment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modelHoldShipmentLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modelHoldShipmentLabel">Hold Shipments</h1>
                    <button type="button" className="btn-close" onClick={e => resetModel()} id='closeHoldShipmentModel' data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className='col-12 my-2'>
                        <TableView option={tableOption}></TableView>
                    </div>
                </div>
                <div className="modal-footer">
                    <ButtonBox type="save" text="Hold Shipments" onClickHandler={handleSave} className="btn btn-sm"></ButtonBox>
                    <ButtonBox type="cancel" modelDismiss={true} onClickHandler={resetModel} className="btn btn-sm"></ButtonBox>
                </div>
            </div>
        </div>
    </div>
</>
  )
}
