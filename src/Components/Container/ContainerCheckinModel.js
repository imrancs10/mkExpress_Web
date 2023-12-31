import React, { useState, useEffect } from 'react'
import Inputbox from '../Common/Inputbox'
import ButtonBox from '../Common/ButtonBox'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { headerFormat } from '../Utility/tableHeaderFormat';
import TableView from '../Table/TableView';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';
import Label from '../Common/Label';
import { common } from '../Utility/common';
export default function ContainerCheckinModel() {
  const containerModelTemplate = {
    containerNo: '',
    containerId: '',
    containerJourneyId: ''
  }
  const [containerModel, setContainerModel] = useState(containerModelTemplate);

  const tableOptionTrackingTemplet = {
    headers: headerFormat.containerCheckInOut,
    showPagination: false,
    showTableTop: false,
    showSerialNo:true,
    data: [],
    totalRecords: 0,
    showFooter: false,
    searchHandler: () => { },
    showAction: false
  };

  const [tableOptionTracking, setTableOptionTracking] = useState(tableOptionTrackingTemplet);


  const validateContainer = () => {
    Api.Get(apiUrls.containerController.getContainerJourney + containerModel.containerNo)
      .then(res => {
        var sortedData = res.data?.containerJourneys?.sort((a, b) => a.sequenceNo - b.sequenceNo);
        tableOptionTrackingTemplet.data = sortedData;
        tableOptionTrackingTemplet.totalRecords = sortedData?.length;
        setTableOptionTracking(tableOptionTrackingTemplet);
        setContainerModel({ ...res.data });
      });
  }

  const resetForm = () => {
    setContainerModel({ ...containerModelTemplate });
    tableOptionTrackingTemplet.data = [];
    tableOptionTrackingTemplet.totalRecords = 0;
    setTableOptionTracking(tableOptionTrackingTemplet);
  }
  const handleTextChange = (e) => {
    var { value, name } = e.target;
    setContainerModel({ ...containerModel, [name]: value });
  }
  return (
    <>
      <div id="add-container-check-in" data-bs-backdrop="static" data-bs-keyboard="false" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Container Check-In/Out</h5>
              <button type="button" className="btn-close" onClick={e => { resetForm() }} id='closePopupContainerCheckIn' data-bs-dismiss="modal" aria-hidden="true"></button>
              <h4 className="modal-title" id="myModalLabel"></h4>
            </div>
            <div className="modal-body">
              <div className='row'>
                <div className="col-12">
                  <div style={{ position: 'relative' }}>
                    <Inputbox type="text" labelText="Scan Container" name="containerNo" className="form-control-sm" value={containerModel?.containerNo} onChangeHandler={handleTextChange} />
                    {containerModel.containerNo !== '' &&
                      <ButtonBox type="add" className="btn-sm" text="Scan" id="btnScanContainerCheckIn" icon="fa-solid fa-plus" style={{ position: 'absolute', top: '27px', right: '3px' }} onClickHandler={validateContainer} />
                    }
                  </div>
                </div>
                <div className='col-12 d-flex justify-content-between my-3'>
                  <Label bold={true} text={`Container No: ${containerModel?.containerNo ?? "Not Selected"}`} />
                  <Label bold={true} text={`Closed On: ${containerModel?.closedOn===null || containerModel?.closedOn===undefined?"Not Selected": common.getHtmlDate(containerModel?.closedOn, 'ddmmyyyyhhmmss', 12)}`} />
                  <Label bold={true} text={`Created On: ${containerModel?.createdAt===null || containerModel?.createdAt===undefined?"Not Selected" :common.getHtmlDate(containerModel?.createdAt, 'ddmmyyyyhhmmss', 12)}`} />
                </div>
                <div className='col-12 my-2'>
                  <TableView option={tableOptionTracking} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <ButtonBox type="cancel" className="btn-sm" onClickHandler={resetForm} modelDismiss={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const CheckInStation = (e, data) => {
  Api.Post(apiUrls.containerController.checkIn + `${data?.containerId}/${data?.id}`, {})
    .then(res => {
      if (res.data === true) {
        toast.success(toastMessage.saveSuccess);
        window.document.getElementById('btnScanContainerCheckIn').click();
      }
    });
}

const CheckOutStation = (e, data) => {
  Api.Post(apiUrls.containerController.checkOut + `${data?.containerId}/${data?.id}`, {})
    .then(res => {
      if (res.data === true) {
        toast.success(toastMessage.saveSuccess);
        window.document.getElementById('btnScanContainerCheckIn').click();
      }
    });
}

export { CheckInStation, CheckOutStation }