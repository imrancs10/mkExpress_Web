import React, { useState } from 'react'
import Inputbox from '../Common/Inputbox'
import ButtonBox from '../Common/ButtonBox'

export default function ContainerCheckinModel() {
  const containerModelTemplate = {
    containerNo: '',
    containerId: '',
    containerJourneyId: ''
  }
  const [containerError, setContainerError] = useState();
  const [containerModel, setContainerModel] = useState(containerModelTemplate);
  const [errors, setErrors] = useState();

  const validateContainer = () => {

  }

  const handleSave=()=>{
    
  }

  const handleTextChange = (e) => {
    var { value, name, type } = e.target;
    setContainerModel({ ...containerModel, [name]: value });
    if (!!errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }
  return (
    <>
      <div id="add-container-check-in" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Container Check-In</h5>
              <button type="button" className="btn-close" id='closePopupContainerCheckIn' data-bs-dismiss="modal" aria-hidden="true"></button>
              <h4 className="modal-title" id="myModalLabel"></h4>
            </div>
            <div className="modal-body">
              <div className='row'>
                <div className="col-12">
                  <div style={{ position: 'relative' }}>
                    <Inputbox type="text" labelText="Scan Shipment" errorMessage={containerError} name="containerNo" className="form-control-sm" value={containerModel.containerNo} onChangeHandler={handleTextChange} />
                    <ButtonBox type="add" className="btn-sm" icon="fa-solid fa-plus" style={{ position: 'absolute', top: '27px', right: '3px' }} onClickHandler={validateContainer} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <ButtonBox text="Check-In" type="save" onClickHandler={handleSave} className="btn-sm" />
              <ButtonBox type="cancel" className="btn-sm" modelDismiss={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}