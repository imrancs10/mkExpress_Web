import React from 'react'
import ButtonBox from '../Common/ButtonBox'

export default function ThirdPartyShipment() {
    return (
        <>
            <div className="modal fade" id="modalThirdPartyShipment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalThirdPartyShipmentLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalThirdPartyShipmentLabel">Third Party Shipment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <textarea className='form-control' style={{ resize: 'none' }}></textarea>
                        </div>
                        <div className='modal-footer'>
                            <ButtonBox type="save" className="btn btn-sm"></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
