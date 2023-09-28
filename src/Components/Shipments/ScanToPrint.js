import React from 'react'
import ButtonBox from '../Common/ButtonBox'

export default function ScanToPrint() {
    return (
        <>
            <div className="modal fade" id="modalScanToPrint" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalScanToPrintLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalScanToPrintLabel">Scan To Print</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group input-group-sm mb-3">
                                <input type="text" className="form-control" placeholder="Scan shipment number" aria-label="Scan shipment number" aria-describedby="basic-addon2" />
                                <ButtonBox type="print" text="Print" className="btn btn-primary btn-sm" id="basic-addon2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
