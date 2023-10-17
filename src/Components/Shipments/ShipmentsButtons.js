import React from 'react'
import './shipment.css'
import ButtonBox from '../Common/ButtonBox'

export default function ShipmentsButtons({ selectedRows }) {
    var isRowSelected = selectedRows?.length;
    return (
        <div className='card mb-2'>
            <div className='card-body' style={{ padding: '7px' }}>
                <div className='ship-btn-container'>
                    <div className="btn-group mb-1 btn-group-sm" role="group" aria-label="Second group" style={{ width: '100%', fontSize: '10px' }}>
                        <ButtonBox modalId="#modalThirdPartyShipment" className="btn btn-primary btn-sm" icon="fa-solid fa-truck-droplet" text="Third Party Shipments" />
                        <ButtonBox modalId="#modalScanToPrint" className="btn btn-primary btn-sm" icon="fa-solid fa-barcode" text="Scan To Print" />
                        <ButtonBox modalId="#modalBulkScanToPrint" className="btn btn-primary btn-sm" icon="fa-solid fa-print" text="Bulk Scan To Print" />
                        <ButtonBox modalId="#modalAssignToTransfer" className="btn btn-primary btn-sm" icon="fa-solid fa-motorcycle" text="Assign for Transfer" />
                        {isRowSelected && <button type="button" className="btn btn-primary btn-sm"  data-bs-toggle="modal" data-bs-target="#modalAssignForPickup"><i className="fa-solid fa-motorcycle"></i> Assign For Pickup</button>}
                        {!isRowSelected && <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-motorcycle"></i> </button>}
                        {!isRowSelected && <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-box"></i> Courier RunSheet</button>}
                        {!isRowSelected && <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-person-walking-arrow-loop-left"></i> Assign for return</button>}
                        {!isRowSelected && <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-hand-holding-heart"></i> Receive Returned</button>}
                        {!isRowSelected && <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-hands-holding"></i> Receive</button>}
                        {!isRowSelected && <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-shop"></i> Store</button>}
                        {!isRowSelected && <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-hand-holding-dollar"></i> Hold</button>}
                        {!isRowSelected && <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-hand-holding-hand"></i> Assign For Delivery</button>}
                        <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-file-export"></i> Export to Excel</button>
                        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalNewShipment"><i className="fa-solid fa-dolly"></i> New Shipment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
