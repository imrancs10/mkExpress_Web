import React from 'react'
import './shipment.css'
import ButtonBox from '../Common/ButtonBox'

export default function ShipmentsButtons({ selectedRows }) {
    var isRowSelected = selectedRows?.length>0;
    return (
        <div className='card mb-2'>
            <div className='card-body' style={{ padding: '7px' }}>
                <div className='ship-btn-container'>
                    <div className="btn-group mb-1 btn-group-sm" role="group" aria-label="Second group" style={{ width: '100%', fontSize: '10px' }}>
                        <ButtonBox modalId="#modalThirdPartyShipment" className="btn btn-primary btn-sm" icon="fa-solid fa-truck-droplet" text="Third Party Shipments" />
                        <ButtonBox modalId="#modalScanToPrint" className="btn btn-primary btn-sm" icon="fa-solid fa-barcode" text="Scan To Print" />
                        <ButtonBox modalId="#modalBulkScanToPrint" className="btn btn-primary btn-sm" icon="fa-solid fa-print" text="Bulk Scan To Print" />
                        <ButtonBox modalId="#modalAssignToTransfer" className="btn btn-primary btn-sm" icon="fa-solid fa-motorcycle" text="Assign for Transfer" />
                        {isRowSelected && <ButtonBox className="btn btn-primary btn-sm" icon="fa-solid fa-motorcycle" modalId="#modalAssignForPickup"  text="Assign For Pickup" />}
                        {/* {!isRowSelected && <ButtonBox className="btn btn-primary btn-sm" icon="fa-solid fa-motorcycle"></i> </button>} */}
                        {!isRowSelected && <ButtonBox className="btn btn-primary btn-sm" icon="fa-solid fa-box" modalId="#modalCourierRunsheet" text="Courier RunSheet" />}
                        {!isRowSelected && <ButtonBox className="btn btn-primary btn-sm" icon="fa-solid fa-person-walking-arrow-loop-left" text="Assign for return" />}
                        {!isRowSelected && <ButtonBox className="btn btn-primary btn-sm" icon="fa-solid fa-hand-holding-heart" text="Receive Returned" />}
                        {!isRowSelected && <ButtonBox modalId="#modalReceiveShipment" className="btn btn-primary btn-sm" icon="fa-solid fa-hands-holding" text="Receive" />}
                        {!isRowSelected && <ButtonBox className="btn btn-primary btn-sm" icon="fa-solid fa-shop" text="Store" />}
                        {!isRowSelected && <ButtonBox className="btn btn-primary btn-sm" icon="fa-solid fa-hand-holding-dollar" text="Hold" />}
                        {!isRowSelected && <ButtonBox className="btn btn-primary btn-sm" icon="fa-solid fa-hand-holding-hand" text="Assign For Delivery" />}
                        <ButtonBox className="btn btn-primary btn-sm" icon="fa-solid fa-file-export" text="Export to Excel" />
                        <ButtonBox className="btn btn-primary btn-sm" modalId="#modalNewShipment" icon="fa-solid fa-dolly" text="New Shipment" />
                    </div>
                </div>
            </div>
        </div>
    )
}
