import React from 'react'
import './shipment.css'

export default function ShipmentsButtons() {
    return (
        <div className='card mb-2'>
            <div className='card-body' style={{padding:'7px'}}>
              <div className='ship-btn-container'>
              <div className="btn-group me-2 btn-group-sm" role="group" aria-label="Second group" style={{width:'100%'}}>
                    <button type="button" className="btn btn-primary btn-sm">Third Party Shipments</button>
                    <button type="button" className="btn btn-primary btn-sm">Scan To Print</button>
                    <button type="button" className="btn btn-primary btn-sm">Bulk Scan To Print</button>
                    <button type="button" className="btn btn-primary btn-sm">Assign for Transfer</button>
                    <button type="button" className="btn btn-primary btn-sm">Courier RunSheet</button>
                    <button type="button" className="btn btn-primary btn-sm">Assign for return</button>
                    <button type="button" className="btn btn-primary btn-sm">Receive Returned</button>
                    <button type="button" className="btn btn-primary btn-sm">Receive</button>
                    <button type="button" className="btn btn-primary btn-sm">Store</button>
                    <button type="button" className="btn btn-primary btn-sm">Hold</button>
                    <button type="button" className="btn btn-primary btn-sm">Assign For Delivery</button>
                    <button type="button" className="btn btn-primary btn-sm">Export to Excel</button>
                    <button type="button" className="btn btn-primary btn-sm">New Shipment</button>
                </div>
              </div>
            </div>
        </div>
    )
}
