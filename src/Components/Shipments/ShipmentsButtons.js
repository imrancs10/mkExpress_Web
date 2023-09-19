import React from 'react'
import './shipment.css'

export default function ShipmentsButtons() {
    return (
        <div className='card mb-2'>
            <div className='card-body' style={{padding:'7px'}}>
              <div className='ship-btn-container'>
              <div className="btn-group mb-1 btn-group-sm" role="group" aria-label="Second group" style={{width:'100%',fontSize:'10px'}}>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-truck-droplet"></i> Third Party Shipments</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-barcode"></i> Scan To Print</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-print"></i> Bulk Scan To Print</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-motorcycle"></i> Assign for Transfer</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-box"></i> Courier RunSheet</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-person-walking-arrow-loop-left"></i> Assign for return</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-hand-holding-heart"></i> Receive Returned</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-hands-holding"></i> Receive</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-shop"></i> Store</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-hand-holding-dollar"></i> Hold</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-hand-holding-hand"></i> Assign For Delivery</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa-solid fa-file-export"></i> Export to Excel</button>
                    <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalNewShipment"><i className="fa-solid fa-dolly"></i> New Shipment</button>
                </div>
              </div>
            </div>
        </div>
    )
}
