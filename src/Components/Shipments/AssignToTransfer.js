import React, { useState } from 'react'
import ButtonBox from '../Common/ButtonBox'
import TableView from '../Table/TableView'
import Dropdown from '../Common/Dropdown'

export default function AssignToTransfer() {
    const tableOptionTemplate={
        showTableTop:false
    };
    const [tableOption, setTableOption] = useState(tableOptionTemplate);
    return (
        <>
            <div className="modal fade" id="modalAssignToTransfer" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalAssignToTransferLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalAssignToTransferLabel">Assign To Transfer</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group input-group-sm mb-3">
                                <input type="text" className="form-control" placeholder="Scan shipment number" aria-label="Scan shipment number" aria-describedby="basic-addon2" />
                                <ButtonBox type="print" text="Scan Shipment" icon="fa-solid fa-barcode" className="btn btn-primary btn-sm" id="basic-addon2" />
                            </div>
                            <TableView option={tableOption}></TableView>
                        </div>
                        <div className="modal-footer">
                            <div className='d-flex justify-content-end w-50'>
                                {/* <Dropdown className="form-control form-control-sm"></Dropdown>
                                <Dropdown className="form-control form-control-sm mx-2"></Dropdown> */}
                                <ButtonBox type="save" style={{width:'100px'}} className="btn btn-sm"></ButtonBox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
