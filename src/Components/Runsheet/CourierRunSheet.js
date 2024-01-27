import React, { useEffect, useState } from 'react'
import SearchableDropdown from '../Common/SearchableDropdown/SearchableDropdown'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { headerFormat } from '../Utility/tableHeaderFormat';
import ButtonBox from '../Common/ButtonBox';

export default function CourierRunSheet() {
    const modelTemplate = {
        memberId: ""
    }
    const [model, setModel] = useState(modelTemplate);
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        Api.Get(apiUrls.memberController.getByRole + `?role=courier`)
            .then(res => {
                setMemberList(res.data);
            });
    },[]);

    const handleTextChange = (e) => {
        var { name, value } = e.target;
        setModel({ ...model, [name]: value });
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
                // handler: removeShipment,
                title: 'Remove Shipment'
            }
        }
    };

    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    return (
        <>
            <div className="modal fade" id="modalCourierRunsheet" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalCourierRunsheetLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalCourierRunsheetLabel">Courier RunSheet</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-12'>
                                    <SearchableDropdown data={memberList} value={model.memberId} name="memberId" defaultText="Select Courier Person..." onChange={handleTextChange} elementValue="firstName"></SearchableDropdown>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ButtonBox type="export" className="btn-sm"></ButtonBox>
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true}></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
