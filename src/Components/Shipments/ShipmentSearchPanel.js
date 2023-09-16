import React, { useState } from 'react'
import Label from '../Common/Label'
import ButtonBox from '../Common/ButtonBox'

export default function ShipmentSearchPanel() {
    const [showPanel, setShowPanel] = useState(true)
    return (
        <div className='card mb-2'>
            <div className='card-body' style={{ padding: '7px', fontSize: '9px' }}>
                <div className='row'>
                    <div className='col-12 mb-1 d-block d-md-none'>
                        <ButtonBox type="view" text={(showPanel ? "Hide" : "Show") + " Search Panel"} onClickHandler={() => { setShowPanel(pre => !pre) }} className="btn-sm w-100"></ButtonBox>
                    </div>
                    {showPanel && <>     <div className='col-md-2 col-sm-12 mb-1'>
                        <select className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Customer'>
                            <option value="0">Customer</option>
                        </select>
                    </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <select className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                                <option value="0">Reason</option>
                            </select>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <select className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                                <option value="0">Status</option>
                            </select>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <select className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                                <option value="0">Courier</option>
                            </select>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <select className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                                <option value="0">Station</option>
                            </select>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <select className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                                <option value="0">Consignee City</option>
                            </select>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Created From-To" bold={true}></Label>
                            <input type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                            <input type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                        <Label text="Delivered From-To" bold={true}></Label>
                            <input type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <input type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                        <Label text="Received From-To" bold={true}></Label>
                            <input type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <input type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                        <Label text="COD Date From-To" bold={true}></Label>
                            <input type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <input type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                        <Label text="Return From-To" bold={true}></Label>
                            <input type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <input type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <div className="input-group mb-1">
                                <input type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" style={{ fontSize: '11px' }} />
                                <div className="input-group-append">
                                    <button className="btn btn-sm btn-primary btn-outline-secondary" type="button"><i className="fa-brands fa-searchengin"></i></button>
                                </div>
                            </div>
                            <ButtonBox type="cancel" text="Clear" onClickHandler={() => { setShowPanel(pre => !pre) }} className="btn-sm w-100"></ButtonBox>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}
