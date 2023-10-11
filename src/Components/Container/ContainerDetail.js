import React, { useState, useEffect } from 'react'
import TableView from '../Table/TableView'
import Breadcrumb from '../Common/Breadcrumb';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { headerFormat } from '../Utility/tableHeaderFormat';
import AddContainer from './AddContainer';
import ContainerCheckinModel from './ContainerCheckinModel';
import ContainerCheckoutModel from './ContainerCheckoutModel';
import ContainerTracker from './ContainerTracker';

export default function ContainerDetail() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedContainerId, setSelectedContainerId] = useState("")

    useEffect(() => {
        Api.Get(apiUrls.containerController.getAll + `?pageNo=${pageNo}&PageSize=${pageSize}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption({...tableOptionTemplet});
            })
    }, [pageNo, pageSize])

    const handleSearch = (searchTerm) => {
        if (searchTerm.length > 0 && searchTerm.length < 3)
            return;
        Api.Get(apiUrls.containerController.search + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption({ ...tableOptionTemplet });
            });
    }
    const tableOptionTemplet = {
        headers: headerFormat.containerDetail,
        data: [],
        totalRecords: 0,
        pageSize: pageSize,
        showFooter: false,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        actions: {
            view:{
                icon:'fa-solid fa-shoe-prints',
                title:'Track Container',
                modelId:'containerTracking',
                showModel:true,
                handler:(id)=>{
                    setSelectedContainerId(id);
                }
            },
            showDelete:false,
            showEdit:false
        }
    };
    const saveButtonHandler=()=>{

    }
    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    const breadcrumbOption = {
        title: 'Container',
        items: [
            {
                title: "Container",
                icon: "fa-solid fa-box-open",
                isActive: false,
            }
        ],
        buttons: [
            {
              text: "Add Container",
              icon: 'fa-solid fa-box-open',
              modelId: 'add-container',
              handler: saveButtonHandler
            },
            {
                text: "Check-in",
                icon: 'fa-solid fa-right-to-bracket',
                modelId: 'add-container-check-in',
                handler: saveButtonHandler
              },
              {
                text: "Check-out",
                icon: 'fa-solid fa-right-from-bracket',
                modelId: 'add-container-check-out',
                handler: saveButtonHandler
              }
          ]
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <TableView option={tableOption}></TableView>
            <AddContainer></AddContainer>
            <ContainerCheckinModel></ContainerCheckinModel>
            <ContainerCheckoutModel></ContainerCheckoutModel>
            <ContainerTracker containerId={selectedContainerId}></ContainerTracker>
        </>
    )
}
