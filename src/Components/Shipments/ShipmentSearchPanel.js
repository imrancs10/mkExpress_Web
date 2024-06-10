import React, { useState, useEffect } from 'react'
import Label from '../Common/Label'
import ButtonBox from '../Common/ButtonBox'
import { apiUrls } from '../../API/ApiUrl';
import { Api } from '../../API/API';
import SearchableDropdown from '../Common/SearchableDropdown/SearchableDropdown'
import Inputbox from '../Common/Inputbox';
import { common } from '../Utility/common';

export default function ShipmentSearchPanel({ setSearchFilter, searchFilter, searchFilterTemplate, setClearFilter,setSearchUrl,searchUrl }) {
    const [showPanel, setShowPanel] = useState(true);
    const [customerList, setCustomerList] = useState([]);
    const [masterList, setMasterList] = useState([]);
    
    

    const handleTextChange = (e) => {
        var { type, name, value } = e.target;
        const urlParams = new URLSearchParams(searchUrl);
        debugger;
        if (type === 'select-one') {
            // value = parseInt(value);
        }
        if (name === 'customer') {
            setQueryString(urlParams,"customerId", value);
        }
        else if (name === 'reason') {
            setQueryString(urlParams,"reason", value);
        }
        else if (name === 'status') {
            setQueryString(urlParams,"status",common.addSpaceBeforeCapitalLetters(value));
        }
        else if (name === 'courier') {
            setQueryString(urlParams,"courier", value);
        }
        else if (name === 'stationId') {
            setQueryString(urlParams,"stationId", value);
        }
        else if (name === 'consigneeCity') {
            setQueryString(urlParams,"consigneeCity", value);
        }
        else if (name === 'createdFrom') {
            setQueryString(urlParams,"createdFrom", value);
            setQueryString(urlParams,"createdTo", searchFilter?.createdTo);
        }
        else if (name === 'createdTo') {
            setQueryString(urlParams,"createdFrom", searchFilter?.createdFrom);
            setQueryString(urlParams,"createdTo", value);
        }
        else if (name === 'deliveredFrom') {
            setQueryString(urlParams,"deliveredFrom", value);
            setQueryString(urlParams,"deliveredTo", searchFilter?.deliveredTo);
        }
        else if (name === 'deliveredTo') {
            setQueryString(urlParams,"deliveredFrom", searchFilter?.deliveredFrom);
            setQueryString(urlParams,"deliveredTo", value);
        }
        else if (name === 'receivedFrom') {
            setQueryString(urlParams,"receivedFrom", value);
            setQueryString(urlParams,"receivedTo", searchFilter?.receivedTo);
        }
        else if (name === 'receivedTo') {
            setQueryString(urlParams,"receivedFrom", searchFilter?.receivedFrom);
            setQueryString(urlParams,"receivedTo", value);
        }        
        else if (name === 'returnFrom') {
            setQueryString(urlParams,"returnFrom", value);
            setQueryString(urlParams,"returnTo", searchFilter?.returnTo);
        }
        else if (name === 'returnTo') {
            setQueryString(urlParams,"returnFrom", searchFilter?.returnFrom);
            setQueryString(urlParams,"returnTo", value);
        }        
        else if (name === 'codDateFrom') {
            setQueryString(urlParams,"codDateFrom", value);
            setQueryString(urlParams,"codDateTo", searchFilter?.codDateTo);
        }
        else if (name === 'codDateTo') {
            setQueryString(urlParams,"codDateFrom", searchFilter?.codDateFrom);
            setQueryString(urlParams,"codDateTo", value);
        }
        setSearchUrl(urlParams.toString());
        setSearchFilter({ ...searchFilter, [name]: value });
    }
    const handleClearFiler = () => {
        setSearchFilter(searchFilterTemplate);
        setClearFilter(pre => pre + 1);
    }

    useEffect(() => {
        var apis = [];
        apis.push(Api.Get(apiUrls.customerController.getDropdown));
        apis.push(Api.Get(apiUrls.masterDataController.getByMasterDataTypes + '?masterDataTypes=reason&masterDataTypes=status&masterDataTypes=courier&masterDataTypes=station&masterDataTypes=city'));
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
                            <Label text="Customer" bold={true}></Label>
                            <SearchableDropdown value={searchFilter.customer} defaultText="Customers" data={customerList} name="customer" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} placeholder='Customer' />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Reason" bold={true}></Label>
                            <SearchableDropdown value={searchFilter.reason} data={masterList.filter(x => x.masterDataTypeCode === 'reason')} defaultText="Reason" name="reason" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Status" bold={true}></Label>
                            <SearchableDropdown elementKey="value" value={searchFilter.status} name="status" data={masterList.filter(x => x.masterDataTypeCode === 'status')} defaultText="Status" onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                            </SearchableDropdown>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Courier" bold={true}></Label>
                            <SearchableDropdown value={searchFilter.courier} elementKey="value" name="courier" data={masterList.filter(x => x.masterDataTypeCode === 'courier')} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                            </SearchableDropdown>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Station" bold={true}></Label>
                            <SearchableDropdown value={searchFilter.stationId} name="stationId" data={masterList.filter(x => x.masterDataTypeCode === 'station')} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                            </SearchableDropdown>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Consignee City" bold={true}></Label>
                            <SearchableDropdown value={searchFilter.consigneeCityId} name="consigneeCityId" data={masterList.filter(x => x.masterDataTypeCode === 'city')} onChange={e => handleTextChange(e)} className='form-control form-control-sm' style={{ fontSize: '11px' }}>
                            </SearchableDropdown>
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Created From-To" bold={true}></Label>
                            <Inputbox showLabel={false} value={searchFilter.createdFrom} name="createdFrom" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                            <Inputbox showLabel={false} value={searchFilter.createdTo} name="createdTo" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Delivered From-To" bold={true}></Label>
                            <Inputbox showLabel={false} value={searchFilter.deliveredFrom} name="deliveredFrom" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <Inputbox showLabel={false} value={searchFilter.deliveredTo} name="deliveredTo" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Received From-To" bold={true}></Label>
                            <Inputbox showLabel={false} value={searchFilter.receivedFrom} name="receivedFrom" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <Inputbox showLabel={false} value={searchFilter.receivedTo} name="receivedTo" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="COD Date From-To" bold={true}></Label>
                            <Inputbox showLabel={false} value={searchFilter.codDateFrom} name="codDateFrom" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <Inputbox showLabel={false} value={searchFilter.codDateTo} name="codDateTo" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <Label text="Return From-To" bold={true}></Label>
                            <Inputbox showLabel={false} value={searchFilter.returnFrom} name="returnFrom" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm  mb-1' style={{ fontSize: '11px' }} />
                            <Inputbox showLabel={false} value={searchFilter.returnTo} name="returnTo" onChangeHandler={handleTextChange} type='date' className='form-control form-control-sm' style={{ fontSize: '11px' }} />
                        </div>
                        <div className='col-md-2 col-sm-12 mb-1'>
                            <div className="input-group mb-1">
                                <Inputbox showLabel={false} value={searchFilter.searchTerm} name="searchTerm" onChangeHandler={handleTextChange} type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" style={{ fontSize: '11px' }} />
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
function setQueryString(urlParams, param, value) {
    if (urlParams.has(param))
        urlParams.delete(param);
        urlParams.append(param, value);
}

