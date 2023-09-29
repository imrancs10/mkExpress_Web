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

export default function Shipment() {
    const filterYearStartFrom = 2022;
    const searchFilterTemplate = {
        customer: 0,
        reason: 0,
        status: 0,
        courier: 0,
        station: 0,
        consigneeCity: 0,
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
    const [shipmentIdForPrint, setShipmentIdForPrint] = useState("")
    const [shipmentIdForTracking, setShipmentIdForTracking] = useState("")
    useEffect(() => {
        Api.Get(apiUrls.shipmentController.getAll + `?pageNo=${pageNo}&pageSize=${pageSize}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption(tableOptionTemplet);
            })
    }, [pageNo, pageSize, clearFilter])

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
        var selectedIds = tableOption.data.map(x => x.id);
        setSelectedRows([...selectedIds]);
    }

    const selectRowHandler = (e, data) => {
        if (!e.target.checked) {
            var filterIds = selectedRows.filter((x) => {
                return x !== data?.id
            })
            setSelectedRows([...filterIds]);
            return;
        }
        var selectedIds = selectedRows;
        selectedIds.push(data?.id);
        setSelectedRows([...selectedIds]);
    }

    var shipmentTableHeader = headerFormat.shipmentDetails;
    shipmentTableHeader[0].name = () => {
        return <input type='checkbox' onChange={e => selectAllRowHandler(e)} checked={tableOption.totalRecords === selectedRows?.length && selectedRows.length > 0} id="checkAll"></input>
    }
    shipmentTableHeader[0].customColumn = (data) => {
        return <input type='checkbox' onChange={e => selectRowHandler(e, data)} checked={selectedRows?.find(x => x === data?.id) !== undefined}></input>
    }
    const tableOptionTemplet = {
        headers: shipmentTableHeader,
        data: [],
        showTableTop: true,
        totalRecords: 0,
        pageSize: pageSize,
        showFooter: false,
        pageNo: pageNo,
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
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <ShipmentSearchPanel setSearchFilter={setSearchFilter} searchFilter={searchFilter} setClearFilter={setClearFilter} searchFilterTemplate={searchFilterTemplate}></ShipmentSearchPanel>
            <ShipmentsButtons selectedRows={selectedRows}></ShipmentsButtons>
            <TableView option={tableOption}></TableView>
            <NewShipment></NewShipment>
            <ThirdPartyShipment></ThirdPartyShipment>
            <ScanToPrint></ScanToPrint>
            <BulkScanToPrint></BulkScanToPrint>
            <AssignToTransfer></AssignToTransfer>
            <ShipmentTracking shipmentId={shipmentIdForTracking}></ShipmentTracking>
            <PrintShipmentSlip shipmentIds={shipmentIdForPrint} />
        </>
    )
}
