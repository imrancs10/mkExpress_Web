import React,{useState,useEffect} from 'react'
import TableView from '../Table/TableView'
import Breadcrumb from '../Common/Breadcrumb';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import {headerFormat} from '../Utility/tableHeaderFormat'
import ShipmentsButtons from './ShipmentsButtons';
import ShipmentSearchPanel from './ShipmentSearchPanel';

export default function Shipment() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    useEffect(() => {
        Api.Get(apiUrls.authController.getToken)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption(tableOptionTemplet);
            })
    }, [pageNo, pageSize])
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
    const tableOptionTemplet = {
        headers: headerFormat.shipmentDetails,
        data: [],
        showTableTop:false,
        totalRecords: 0,
        pageSize: pageSize,
        showFooter:false,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        actions:{
            
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
    <ShipmentSearchPanel></ShipmentSearchPanel>
    <ShipmentsButtons></ShipmentsButtons>
    <TableView option={tableOption}></TableView>
    </>
  )
}
