import React, { useState, useEffect } from 'react'
import TableView from '../Table/TableView'
import Breadcrumb from '../Common/Breadcrumb';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { headerFormat } from '../Utility/tableHeaderFormat';
import AddContainer from './AddContainer';
import ContainerCheckinModel from './ContainerCheckinModel';
import ContainerTracker from './ContainerTracker';
import CloseContainerModel from './CloseContainerModel';
import { common } from '../Utility/common';
import Inputbox from '../Common/Inputbox';
import ButtonBox from '../Common/ButtonBox';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';

export default function ContainerDetail() {
    const date = new Date();
    const currYear = date.getFullYear();
    const containerFilterTemplate = {
        fromDate: common.getHtmlDate(new Date(date.setFullYear(currYear - 1))),
        toDate: common.getHtmlDate(new Date())
    }
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedContainerId, setSelectedContainerId] = useState("")
    const [closeContainerId, setCloseContainerId] = useState("")
    const [containerFilter, setContainerFilter] = useState(containerFilterTemplate);

    useEffect(() => {
        Api.Get(apiUrls.containerController.getAll + `?pageNo=${pageNo}&PageSize=${pageSize}&fromDate=${containerFilter.fromDate}&toDate=${containerFilter.toDate}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption({ ...tableOptionTemplet });
            })
    }, [pageNo, pageSize])

    const handleSearch = (searchTerm) => {
        if (searchTerm.length > 0 && searchTerm.length < 3)
            return;
        Api.Get(apiUrls.containerController.search + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}&fromDate=${containerFilter.fromDate}&toDate=${containerFilter.toDate}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption({ ...tableOptionTemplet });
            });
    }

    const handleDelete = (id) => {
        
        Api.Delete(apiUrls.containerController.delete + `${id}?note=""`)
            .then(res => {
                if(res.data){
                    toast.success(toastMessage.deleteSuccess);
                    handleSearch('');
                }
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
            view: {
                icon: 'fa-solid fa-shoe-prints',
                title: 'Track Container',
                modelId: 'containerTracking',
                showModel: true,
                handler: (id) => {
                    setSelectedContainerId(id);
                }
            },
            delete:{
                handler:handleDelete,
                showButton: (id, data) => {
                    return !data?.isClosed;
                }
            },
            showEdit: false,
            showPrint:true,
            buttons: [
                {
                    icon: 'fa-solid fa-box text-danger',
                    title: 'Close Container',
                    modelId: 'containerCloseModel',
                    showModel: true,
                    handler: (id) => {
                        setCloseContainerId(id);
                    },
                    showButton: (id, data) => {
                        return !data?.isClosed;
                    }
                }
            ]
        }
    };
    const saveButtonHandler = () => {

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
                text: "Check-in/out",
                icon: 'fa-solid fa-right-to-bracket',
                modelId: 'add-container-check-in',
                handler: saveButtonHandler
            }
        ]
    }

    const handleTextChange = (e) => {
        var { name, value } = e.target;
        setContainerFilter({ ...containerFilter, [name]: value });
    }
    return (
        <>
            <div className='my-2'>
                <Breadcrumb option={breadcrumbOption}></Breadcrumb>
                <div className='d-flex justify-content-end my-2'>
                    <div className='mx-2'>
                        <Inputbox type="date" showLabel={false} title="From Date" className="form-control-sm mx-2" value={containerFilter.fromDate} name="fromDate" onChangeHandler={handleTextChange} />
                    </div>
                    <div className='mx-2'>
                        <Inputbox type="date" showLabel={false} title="To Date" className="form-control-sm mx-2" value={containerFilter.toDate} name="toDate" onChangeHandler={handleTextChange} />
                    </div>
                    <div className='mx-2'>
                        <ButtonBox type="go" className="btn-sm" onClickHandler={e => { handleSearch("") }} />
                    </div>
                </div>
                <TableView option={tableOption}></TableView>
            </div>
            <AddContainer handleSearch={handleSearch}></AddContainer>
            <ContainerCheckinModel></ContainerCheckinModel>
            <ContainerTracker containerId={selectedContainerId}></ContainerTracker>
            <CloseContainerModel containerId={closeContainerId} />
        </>
    )
}
