import React,{useState,useEffect} from 'react'
import TableView from '../Table/TableView'
import Breadcrumb from '../Common/Breadcrumb';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import {headerFormat} from '../Utility/tableHeaderFormat'

export default function Customer() {
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
        headers: headerFormat.customerDetails,
        data: [],
        totalRecords: 0,
        pageSize: pageSize,
        showFooter:false,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        showAction:false
    };
    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    // const saveButtonHandler=()=>{

    // }
    const breadcrumbOption = {
        title: 'Customer',
        items: [
            {
                title: "Customer",
                icon: "fa-solid fa-person",
                isActive: false,
            }
        ],
        // buttons: [
        //     {
        //         text: "Add New Purchase",
        //         icon: 'bi bi-people',
        //         modelId: 'add-fabricPurchase',
        //         handler: saveButtonHandler
        //     }
        // ]
    }
  return (
    <>
    <Breadcrumb option={breadcrumbOption}></Breadcrumb>
    <TableView option={tableOption}></TableView>
    </>
  )
}
