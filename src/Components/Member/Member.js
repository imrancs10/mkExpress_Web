import React, { useState, useEffect } from 'react'
import TableView from '../Table/TableView'
import Breadcrumb from '../Common/Breadcrumb';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { headerFormat } from '../Utility/tableHeaderFormat'
import { common } from '../Utility/common';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';
import { validationMessage } from '../Utility/ValidationMessage';
import AddMemberModal from './AddMemberModal';
import MemberChangePassword from './MemberChangePassword';

export default function Member() {
    const memberModelTemplate = {
        id: common.guid(),
        firstName: "",
        lastName: "",
        gender: 1,
        mobile: "",
        phone: "",
        password: "",
        roleId: "",
        stationId: '',
        email: "",
        password: "",
        idNumber: ""
    }
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isRecordSaving, setIsRecordSaving] = useState(true);
    const [memberModel, setMemberModel] = useState(memberModelTemplate);
   
    const [selectedMemberId, setSelectedMemberId] = useState({});

    useEffect(() => {
        Api.Get(apiUrls.memberController.getAll)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalRecords;
                setTableOption(tableOptionTemplet);
            })
    }, [pageNo, pageSize]);

    const handleSearch = (searchTerm) => {
        if (searchTerm.length > 0 && searchTerm.length < 3)
            return;
        Api.Get(apiUrls.memberController.search + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm}`).then(res => {
            tableOptionTemplet.data = res.data.data;
            tableOptionTemplet.totalRecords = res.data.totalRecords;
            setTableOption({ ...tableOptionTemplet });
        }).catch(err => {

        });
    }
    const handleEdit = (customerId) => {
        Api.Get(apiUrls.memberController.get + customerId).then(res => {
            if (res.data.id !== null) {
                setMemberModel(res.data);
                setIsRecordSaving(false);
            }
        }).catch(err => {
            toast.error(toastMessage.getError);
        })
    }
    const handleDelete = (id) => {
        Api.Delete(apiUrls.memberController.delete + id).then(res => {
            if (res.data > 0) {
                handleSearch('');
                toast.success(toastMessage.deleteSuccess);
            }
        }).catch(err => {
            toast.error(toastMessage.deleteError);
        });
    }
    const tableOptionTemplet = {
        headers: headerFormat.memberDetails,
        data: [],
        totalRecords: 0,
        pageSize: pageSize,
        showFooter: false,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        actions: {
            showView: false,
            popupModelId: "add-member",
            delete: {
                handler: handleDelete
            },
            edit: {
                handler: handleEdit
            },
            buttons: [
                {
                    title: "Change Password",
                    icon: 'fa-solid fa-key',
                    modelId: 'memberChangePassword',
                    showModel:true,
                    handler: (id,data)=>{
                        setSelectedMemberId({...data});
                    }
                }
            ]
        }
    };
    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    const saveButtonHandler = () => {
        setMemberModel({ ...memberModelTemplate });
        setIsRecordSaving(true);
    }
    
    const breadcrumbOption = {
        title: 'Members',
        items: [
            {
                title: "Members",
                icon: "fa-solid fa-people-arrows",
                isActive: false,
            }
        ],
        buttons: [
            {
                text: "Add New Member",
                icon: 'fa-solid fa-people-arrows',
                modelId: 'add-member',
                handler: saveButtonHandler
            }
        ]
    }

   
    useEffect(() => {
        if (isRecordSaving) {
            setMemberModel({ ...memberModelTemplate });
        }
    }, [isRecordSaving]);

    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <TableView option={tableOption}></TableView>
          <AddMemberModal isRecordSaving={isRecordSaving} setMemberModel={setMemberModel} memberModel={memberModel} handleSearch={handleSearch}></AddMemberModal>
          <MemberChangePassword data={selectedMemberId}></MemberChangePassword>
        </>
    )
}
