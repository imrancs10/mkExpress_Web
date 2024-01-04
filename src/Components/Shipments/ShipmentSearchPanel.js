import React, { useState, useEffect } from 'react'
import Label from '../Common/Label'
import ButtonBox from '../Common/ButtonBox'
import { apiUrls } from '../../API/ApiUrl';
import { Api } from '../../API/API';
import SearchableDropdown from '../Common/SearchableDropdown/SearchableDropdown'

export default function ShipmentSearchPanel({ setSearchFilter, searchFilter, searchFilterTemplate, setClearFilter }) {
    const [showPanel, setShowPanel] = useState(true);
    const [customerList, setCustomerList] = useState([]);
    const [masterList, setMasterList] = useState([]);

    const handleTextChange = (e) => {
        var { type, name, value } = e.target;
        if (type === 'select-one') {
           // value = parseInt(value);
        }
        setSearchFilter({ ...searchFilter, [name]: value });
    }
    const handleClearFiler = () => {
        setSearchFilter(searchFilterTemplate);
        setClearFilter(pre => pre + 1);
    }

    useEffect(() => {
        var apis = [];
        apis.push(Api.Get(apiUrls.customerController.getDropdown));
        apis.push(Api.Get(apiUrls.masterDataController.getByMasterDataTypes+'?masterDataTypes=reason&masterDataTypes=status&masterDataTypes=courier'));
        Api.MultiCall(apis)
            .then(res => {
                setCustomerList([...res[0].data]);
                setMasterList([...res[1].data]);
            });
    }, [])

    return (
        <div className='card mb-2'>
            <div className='card-body' style={{ padding: '7px', fontSize: '9px' }}>
                <div className='row'>
                    <div className='col-12 mb-1 d-block d-md-none'>
                        <ButtonBox type="view" text={(showPanel ? "Hide" : "Show") + " Search Panel"} onClickHandler={() => { setShowPanel(pre => !pre) }} className="btn-sm w-100"></ButtonBox>
                    </div>
                    {showPanel && <>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <SearchableDropdown value={searchFilter.customer} defaultText="Customers" data={customerList} name="customer" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Customer' />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <SearchableDropdown value={searchFilter.reason} data={masterList.filter(x=>x.masterDataTypeCode==='reason')} defaultText="Reason" name="reason" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <SearchableDropdown value={searchFilter.status} name="status" data={masterList.filter(x=>x.masterDataTypeCode==='status')} defaultText="Status" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                            </SearchableDropdown>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <SearchableDropdown value={searchFilter.courier} name="courier" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                            </SearchableDropdown>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <SearchableDropdown value={searchFilter.station} name="station" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                            </SearchableDropdown>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <SearchableDropdown value={searchFilter.consigneeCity} name="consigneeCity" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                            </SearchableDropdown>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Created From-To" bold={true}></Label>
                            <input value={searchFilter.createdFrom} name="createdFrom" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                            <input value={searchFilter.createdTo} name="createdTo" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Delivered From-To" bold={true}></Label>
                            <input value={searchFilter.deliveredFrom} name="deliveredFrom" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <input value={searchFilter.deliveredTo} name="deliveredTo" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Received From-To" bold={true}></Label>
                            <input value={searchFilter.receivedFrom} name="receivedFrom" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <input value={searchFilter.receivedTo} name="receivedTo" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="COD Date From-To" bold={true}></Label>
                            <input value={searchFilter.codDateFrom} name="codDateFrom" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <input value={searchFilter.codDateTo} name="codDateTo" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Return From-To" bold={true}></Label>
                            <input value={searchFilter.returnFrom} name="returnFrom" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <input value={searchFilter.returnTo} name="returnTo" onChange={e => handleTextChange(e)} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <div className="input-group mb-1">
                                <input value={searchFilter.searchTerm} name="searchTerm" onChange={e => handleTextChange(e)} type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" style={{ fontSize: '11px' }} />
                                <div className="input-group-append">
                                    <button className="btn btn-sm btn-primary btn-outline-secondary" type="button"><i className="fa-brands fa-searchengin"></i></button>
                                </div>
                            </div>
                            <ButtonBox type="cancel" text="Clear" onClickHandler={handleClearFiler} className="btn-sm w-100"></ButtonBox>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}
