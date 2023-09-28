import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import Breadcrumb from '../../Common/Breadcrumb';
import TableView from '../../Table/TableView';
import { Api } from '../../../API/API';
import { apiUrls } from '../../../API/ApiUrl';
import { toastMessage } from '../../Utility/ConstantValues';
import { common } from '../../Utility/common';
import { headerFormat } from '../../Utility/tableHeaderFormat';
import { validationMessage } from '../../Utility/ValidationMessage';
import Inputbox from '../../Common/Inputbox';
import ButtonBox from '../../Common/ButtonBox';


export default function CustomerDetails() {
  const customerModelTemplate = {
    id: common.guid(),
    name: "",
    contactNo: "",
    maxDeliveryAttempt: 1,
    confirmed: false,
    preferredPickupTime: "Immediately",
  };
  const [customerModel, setCustomerModel] = useState(customerModelTemplate);
  const [isRecordSaving, setIsRecordSaving] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [errors, setErrors] = useState({});
  const handleDelete = (id) => {
    Api.Delete(apiUrls.customerController.delete + id).then(res => {
      if (res.data === 1) {
        handleSearch('');
        toast.success(toastMessage.deleteSuccess);
      }
    }).catch(err => {
      toast.error(toastMessage.deleteError);
    });
  }
  const handleSearch = (searchTerm) => {
    if (searchTerm.length > 0 && searchTerm.length < 3)
      return;
    Api.Get(apiUrls.customerController.search + `?PageNo=${pageNo}&PageSize=${pageSize}&SearchTerm=${searchTerm.replace('+', "")}`).then(res => {
      tableOptionTemplet.data = res.data.data;
      tableOptionTemplet.totalRecords = res.data.totalRecords;
      setTableOption({ ...tableOptionTemplet });
    }).catch(err => {

    });
  }

  const handleTextChange = (e) => {
    var { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (value !== undefined && (name === 'name')) {
      value = value.toUpperCase();
    }
    setCustomerModel({ ...customerModel, [name]: value });
    if (!!errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }
  const handleSave = () => {
    const formError = validateError();
    if (Object.keys(formError).length > 0) {
      setErrors(formError);
      return
    }
    let data = customerModel;
    if (isRecordSaving) {
      Api.Put(apiUrls.customerController.add, data).then(res => {
        if (res.data.id !== null) {
          common.closePopup('closePopupCustomerDetails');
          toast.success(toastMessage.saveSuccess);
          handleSearch('');
        }
      }).catch(err => {
        toast.error(toastMessage.saveError);
      });
    }
    else {
      Api.Post(apiUrls.customerController.update, data).then(res => {
        if (res.data.id !== null) {
          common.closePopup('closePopupCustomerDetails');
          toast.success(toastMessage.updateSuccess);
          handleSearch('');
        }
      }).catch(err => {
        toast.error(toastMessage.updateError);
      });
    }
  }
  const handleEdit = (customerId) => {

    Api.Get(apiUrls.customerController.get + customerId).then(res => {
      if (res.data.id !==null) {
        setCustomerModel(res.data);
        setIsRecordSaving(false);
      }
    }).catch(err => {
      toast.error(toastMessage.getError);
    })
  }

  const tableOptionTemplet = {
    headers: headerFormat.customerDetail,
    data: [],
    showFooter: false,
    totalRecords: 0,
    pageSize: pageSize,
    pageNo: pageNo,
    setPageNo: setPageNo,
    setPageSize: setPageSize,
    searchHandler: handleSearch,
    actions: {
      showView: false,
      popupModelId: "add-customer",
      delete: {
        handler: handleDelete
      },
      edit: {
        handler: handleEdit
      }
    }
  }
  const saveButtonHandler = () => {
    setCustomerModel({ ...customerModelTemplate });
    setIsRecordSaving(true);
  }
  const [tableOption, setTableOption] = useState(tableOptionTemplet);

  const breadcrumbOption = {
    title: 'Customers',
    items: [
      {
        isActive: false,
        title: "Customer Details",
        icon: "fa-solid fa-person-military-pointing"
      }
    ],
    buttons: [
      {
        text: "Add Customer",
        icon: 'fa-soli fa-plus',
        modelId: 'add-customer',
        handler: saveButtonHandler
      }
    ]
  }

  useEffect(() => {
    setIsRecordSaving(true);
    Api.Get(apiUrls.customerController.getAll + `?PageNo=${pageNo}&PageSize=${pageSize}`).then(res => {
      tableOptionTemplet.data = res.data.data;
      tableOptionTemplet.totalRecords = res.data.totalRecords;
      setTableOption({ ...tableOptionTemplet });
    })
      .catch(err => {

      });
  }, [pageNo, pageSize]);

  useEffect(() => {
    if (isRecordSaving) {
      setCustomerModel({ ...customerModelTemplate });
    }
  }, [isRecordSaving])

  const validateError = () => {
    const { name, contactNo, maxDeliveryAttempt, preferredPickupTime } = customerModel;
    const newError = {};
    if (!name || name === "") newError.name = validationMessage.reqName;
    if (!contactNo || contactNo === "") newError.contactNo = validationMessage.reqContactNo;
    if (!maxDeliveryAttempt || maxDeliveryAttempt < 1) newError.maxDeliveryAttempt = validationMessage.reqDeliveryAttempt;
    if (!preferredPickupTime || preferredPickupTime === "") newError.preferredPickupTime = validationMessage.reqPreferredPickupTime;
    return newError;
  }
  return (
    <>
      <Breadcrumb option={breadcrumbOption}></Breadcrumb>
      <h6 className="mb-0 text-uppercase">Customer Details</h6>
      <hr />
      <TableView option={tableOption}></TableView>

      <div id="add-customer" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Customer Details</h5>
              <button type="button" className="btn-close" id='closePopupCustomerDetails' data-bs-dismiss="modal" aria-hidden="true"></button>
              <h4 className="modal-title" id="myModalLabel"></h4>
            </div>
            <div className="modal-body">
              <div className="form-horizontal form-material">
                <div className="card">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <Inputbox labelText="Name" isRequired={true} errorMessage={errors?.name} name="name" value={customerModel.name} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />

                      </div>
                      <div className="col-12 col-md-6">
                        <Inputbox labelText="Contact No" isRequired={true} errorMessage={errors?.contactNo} name="contactNo" value={customerModel.contactNo} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />

                      </div>
                      <div className="col-12">
                        <Inputbox labelText="Max Delivery Attempt" isRequired={true} errorMessage={errors?.maxDeliveryAttempt} name="maxDeliveryAttempt" value={customerModel.maxDeliveryAttempt} type="number" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                      </div>
                      <div className="col-12">
                        <Inputbox labelText="Preferred Pickup Time" errorMessage={errors?.preferredPickupTime} name="preferredPickupTime" value={customerModel.preferredPickupTime} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <ButtonBox text={isRecordSaving ? "Save" : "Update"} type="save" onClickHandler={handleSave} className="btn-sm" />
              <ButtonBox type="cancel" className="btn-sm" modelDismiss={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
