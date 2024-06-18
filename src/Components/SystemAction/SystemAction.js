import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Common/Breadcrumb'
import Dropdown from '../Common/Dropdown'
import ButtonBox from '../Common/ButtonBox'
import Label from '../Common/Label'
import Inputbox from '../Common/Inputbox'
import { common } from '../Utility/common'
import { Api } from '../../API/API'
import { apiUrls } from '../../API/ApiUrl'
import './systemaction.css';
import TableView from '../Table/TableView'
import * as signalR from '@microsoft/signalr';

export default function SystemAction() {
    const filterTemplate = {
        actionType: "",
        stationId: "",
        consigneeCityId: "",
        actionFrom: common.getHtmlDate(new Date()),
        actionTo: common.getHtmlDate(new Date())
    }
    const [filter, setFilter] = useState(filterTemplate);
    const [isLive, setIsLive] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [stationList, setStationList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [searchButton, setSearchButton] = useState(0)
    const [pageSize, setPageSize] = useState(10);
    const [shipmentStatusList, setShipmentStatusList] = useState([])

    const breadcrumbOption = {
        title: 'System Action',
        items: [
            {
                title: "System Action",
                icon: "fa-brands fa-nfc-directional",
                isActive: false,
            }
        ]
    }

    const tableOptionTemplet = {
        headers: [
            { name: 'Action Date', prop: 'actionDate' },
            { name: 'Action By Name', prop: 'actionByName' },
            { name: 'Action Type', prop: 'actionType' },
            { name: 'Shipment Number', prop: 'shipmentNumber' },
            { name: 'Shipment Unique Reference', prop: 'uniqueReferanceNumber' },
            { name: 'Current Status', prop: 'currentStatus' },
            { name: 'Station', prop: 'station' },
            { name: 'Received On', prop: 'receiveOn' },
            { name: 'Shipment Created On', prop: 'shipmentCreatedOn' },
            { name: 'Shipper Name', prop: 'shipperName' },
            { name: 'Consignee Name', prop: 'consigneeName' },
            { name: 'Consignee City', prop: 'consigneeCity' },
            { name: 'Customer Name', prop: 'customerName' },
            { name: 'Cod', prop: 'codAmount' },
            { name: 'Payment Method', prop: 'paymentMode' },
            { name: 'Comment1', prop: 'comment1' },
            { name: 'Comment2', prop: 'comment2' },
            { name: 'Comment3', prop: 'comment3' }
        ],
        data: [],
        totalRecords: 0,
        showSerialNo: false,
        pageSize: pageSize,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: () => { },
        showAction: false
    };


    useEffect(() => {
        var apiList = [];
        apiList.push(Api.Get(apiUrls.masterDataController.getByMasterDataTypes + '?masterDataTypes=city&masterDataTypes=station'));
        apiList.push(Api.Get(apiUrls.masterDataController.getShipmentStatusList))
        Api.MultiCall(apiList)
            .then(res => {
                setCityList(res[0].data.filter(x => x?.masterDataTypeCode === 'city'))
                setStationList(res[0].data.filter(x => x?.masterDataTypeCode === 'station'))
                if (res[1]?.data) {
                    var data = [];
                    res[1].data?.forEach(element => {
                        data.push({ id: common.addSpaceBeforeCapitalLetters(element), value: common.addSpaceBeforeCapitalLetters(element) });
                    });
                    setShipmentStatusList(data);
                }
            });
    }, []);

    useEffect(() => {
        fetchTrackings();
    }, [pageNo, pageSize, searchButton]);

    const handleTextChange = (e) => {
        var { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    }

    const onLiveButtonClick = (e) => {
        setIsLive(pre => !pre);
    }

    const fetchTrackings = () => {
        Api.Get(apiUrls.systemActionController.getAll + `?pageNo=${pageNo}&pageSize=${pageSize}&actionType=${filter.actionType}&stationId=${filter.stationId}&consigneeCityId=${filter.consigneeCityId}&actionFrom=${filter.actionFrom}&actionTo=${filter.actionTo}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption(tableOptionTemplet);
            });
    }

    useEffect(() => {
        debugger;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_API_URL + "shipment/tracking/live",{
                withCredentials: true
            })
            .build();

        connection.start()
            .then(() => console.log('Connected to SignalR'))
            .catch(err => console.log('Error connecting to SignalR:', err));

        connection.on("ReceiveShipmentUpdate", (user, message) => {
            if (isLive) {
                // Fetch the updated shipment list or just add the new shipment
                fetchTrackings();
            }
        });

        return () => {
            connection.stop();
        };
    }, [isLive]);

    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <hr />
            <div className='row mb-2'>
                <div className='col-sm-12 col-lg-3 mb-2'>
                    <Label text="Action Type"></Label>
                    <Dropdown data={shipmentStatusList} defaultValue="" onChange={handleTextChange} name="actionType" value={filter.actionType} className="form-control form-control-sm" ></Dropdown>
                </div>
                <div className='col-sm-12 col-lg-3 mb-2'>
                    <Label text="Station"></Label>
                    <Dropdown data={stationList} onChange={handleTextChange} value={filter.stationId} name="stationId" className="form-control form-control-sm" ></Dropdown>
                </div>
                <div className='col-sm-12 col-lg-3 mb-2'>
                    <Label text="Consignee City"></Label>
                    <Dropdown data={cityList} onChange={handleTextChange} value={filter.consigneeCityId} name="consigneeCityId" className="form-control form-control-sm" ></Dropdown>
                </div>
                <div className='col-sm-12 col-lg-3 mb-2'>
                    <Label text="Action From-To"></Label>
                    <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        <Inputbox type="date" onChangeHandler={handleTextChange} value={filter.actionFrom} name="actionFrom" showLabel={false} className="form-control form-control-sm" />
                        <Inputbox type="date" onChangeHandler={handleTextChange} value={filter.actionTo} name="actionTo" showLabel={false} className="form-control form-control-sm" />
                    </div>
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-12' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <ButtonBox type="reset" text="Clear" className="btn-sm"></ButtonBox>

                        <ButtonBox type="export" className="btn-sm mx-2"></ButtonBox>

                        <ButtonBox type="search" onClickHandler={e => { setSearchButton(pre => pre + 1) }} className="btn-sm"></ButtonBox>
                    </div>
                    <div>
                        <ButtonBox type="live" onClickHandler={onLiveButtonClick} text={`${isLive ? 'Disable' : 'Enable'} live`} className={`btn-sm `} icon={`fa-solid fa-circle text-danger ${isLive ? 'blink' : ''}`}></ButtonBox>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <TableView option={tableOption} />
                    </div>
                </div>
            </div>
        </>
    )
}
