import React, { useState, useEffect } from 'react'
import TableView from '../Table/TableView'
import Breadcrumb from '../Common/Breadcrumb';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { headerFormat } from '../Utility/tableHeaderFormat'
import ShipmentsButtons from './ShipmentsButtons';
import ShipmentSearchPanel from './ShipmentSearchPanel';
import { common } from '../Utility/common';
import NewShipment from './NewShipment';
import ThirdPartyShipment from './ThirdPartyShipment';
import ScanToPrint from './ScanToPrint';
import BulkScanToPrint from './BulkScanToPrint';
import AssignToTransfer from './AssignToTransfer';
import ShipmentTracking from './ShipmentTracking';
import PrintShipmentSlip from './PrintShipmentSlip';
import AssignForPickup from './AssignForPickup';
import CourierRunSheet from '../Runsheet/CourierRunSheet';
import ReceiveShipments from './ReceiveShipments';
import HoldShipment from './HoldShipment';
import ApiLoader from '../Loader/ApiLoader';
import AssignForDelivery from './AssignForDelivery';

export default function Shipment({ loginDetails }) {
    const filterYearStartFrom = 2022;
    const searchFilterTemplate = {
        customerId: 0,
        reason: 0,
        status: 0,
        courier: 0,
        stationId: 0,
        consigneeCityId: 0,
        createdFrom: common.getHtmlDate(new Date().setFullYear(filterYearStartFrom)),
        createdTo: common.getHtmlDate(new Date()),
        deliveredFrom: common.getHtmlDate(new Date().setFullYear(filterYearStartFrom)),
        deliveredTo: common.getHtmlDate(new Date()),
        receivedFrom: common.getHtmlDate(new Date().setFullYear(filterYearStartFrom)),
        receivedTo: common.getHtmlDate(new Date()),
        codDateFrom: common.getHtmlDate(new Date().setFullYear(filterYearStartFrom)),
        codDateTo: common.getHtmlDate(new Date()),
        returnFrom: common.getHtmlDate(new Date().setFullYear(filterYearStartFrom)),
        returnTo: common.getHtmlDate(new Date()),
        searchTerm: ""
    }
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchFilter, setSearchFilter] = useState(searchFilterTemplate);
    const [clearFilter, setClearFilter] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [shipmentIdForPrint, setShipmentIdForPrint] = useState("");
    const [shipmentIdForTracking, setShipmentIdForTracking] = useState("");
    const [refreshGrid, setRefreshGrid] = useState(0);
    const [searchUrl, setSearchUrl] = useState("?");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        var initialLoader = document.getElementsByClassName('loader'); //get the global api data loader element
        if (initialLoader) {
            initialLoader[0].style.display = "none";
        }
        Api.Get(apiUrls.shipmentController.search + `?pageNo=${pageNo}&pageSize=${pageSize}&${searchUrl.replaceAll('+', " ")}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption({ ...tableOptionTemplet });
            }).finally(fl => {
                debugger;
                setLoading(false);
            })
    }, [pageNo, pageSize, clearFilter, refreshGrid, searchUrl])

    const handleSearch = (searchTerm) => {
        if (searchTerm.length > 0 && searchTerm.length < 3)
            return;
        Api.Get(apiUrls.fabricPurchaseController.searchPurchase + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        }).catch(err => {

        });
    }
    const selectAllRowHandler = (e) => {
        if (!e.target.checked) {
            setSelectedRows([]);
            return;
        }
        setSelectedRows([...tableOption.data]);
    }

    const selectRowHandler = (e, data) => {
        if (!e.target.checked) {
            var filterIds = selectedRows.filter((x) => {
                return x?.id !== data?.id
            })
            setSelectedRows([...filterIds]);
            return;
        }

        if (selectedRows.filter(x => x.id === data?.id)?.length === 0) {
            var selectedRowData = selectedRows;
            selectedRowData.push(data);
            setSelectedRows([...selectedRowData]);
        }
    }

    var shipmentTableHeader = headerFormat.shipmentDetails;

    shipmentTableHeader[0].name = () => {
        return <input type='checkbox' onChange={e => selectAllRowHandler(e)} checked={tableOption.totalRecords === selectedRows?.length && selectedRows.length > 0} id="checkAll"></input>
    }

    shipmentTableHeader[0].customColumn = (data) => {
        return <input type='checkbox' onChange={e => selectRowHandler(e, data)} checked={selectedRows?.find(x => x?.id === data?.id) !== undefined}></input>
    }

    const tableOptionTemplet = {
        headers: shipmentTableHeader,
        data: [],
        showTableTop: true,
        totalRecords: 0,
        showFooter: false,
        pageNo: pageNo,
        pageSize: pageSize,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        actions: {
            showPrint: true,
            print: {
                handler: (id) => {
                    setShipmentIdForPrint(id);
                },
                title: "Print Order Receipt",
                modelId: 'modalPrintShipmentSlip'
            },
            buttons: [{
                icon: "fa-solid fa-shoe-prints",
                title: "Shipment Tracking",
                modelId: "modalShipmentTracking",
                showModel: true,
                handler: (id, data) => {
                    setShipmentIdForTracking(id);
                }
            }]
        }
    };
    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    const breadcrumbOption = {
        title: 'Shipments',
        items: [
            {
                title: "Shipment",
                icon: "fa-solid fa-truck-fast",
                isActive: false,
            }
        ]
    }
    return (
        <>
            {loading && <ApiLoader></ApiLoader>}
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <ShipmentSearchPanel searchUrl={searchUrl} setSearchUrl={setSearchUrl} setSearchFilter={setSearchFilter} searchFilter={searchFilter} setClearFilter={setClearFilter} searchFilterTemplate={searchFilterTemplate}></ShipmentSearchPanel>
            <ShipmentsButtons loginDetails={loginDetails} selectedRows={selectedRows}></ShipmentsButtons>
            <TableView option={tableOption}></TableView>
            <NewShipment setRefreshGrid={setRefreshGrid}></NewShipment>
            <ThirdPartyShipment></ThirdPartyShipment>
            <ScanToPrint></ScanToPrint>
            <BulkScanToPrint></BulkScanToPrint>
            <AssignToTransfer></AssignToTransfer>
            <ShipmentTracking shipmentId={shipmentIdForTracking}></ShipmentTracking>
            <PrintShipmentSlip shipmentIds={shipmentIdForPrint} />
            <AssignForPickup data={selectedRows}></AssignForPickup>
            <AssignForDelivery data={selectedRows}></AssignForDelivery>
            <ReceiveShipments data={selectedRows}></ReceiveShipments>
            <CourierRunSheet></CourierRunSheet>
            <HoldShipment data={selectedRows}></HoldShipment>
        </>
    )
}
