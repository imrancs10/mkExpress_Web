import React,{useState,useEffect} from 'react'
import Inputbox from '../Common/Inputbox';
import ButtonBox from '../Common/ButtonBox';
import Dropdown from '../Common/Dropdown';
import Label from '../Common/Label';
import ErrorLabel from '../Common/ErrorLabel';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { validationMessage } from '../Utility/ValidationMessage';
import { toast } from 'react-toastify';
import { toastMessage } from '../Utility/ConstantValues';
import { common } from '../Utility/common';

export default function AddMemberModal({isRecordSaving,setMemberModel,memberModel,handleSearch}) {
    const [roleList, setRoleList] = useState([]);
    const [errors, setErrors] = useState({});
    const [stationList, setStationList] = useState([]);

    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getByMasterDataTypes + `?masterDataTypes=role&masterDataTypes=station`)
            .then(res => {
                setRoleList(res?.data?.filter(x => x.masterDataTypeCode === 'role'));
                setStationList(res?.data?.filter(x => x.masterDataTypeCode === 'station'));
            });
    }, []);
    const handleTextChange = (e) => {
        var { value, name, type } = e.target;
        if (type === 'number' || name === "gender") {
            value = parseInt(value);
        }
        if (value !== undefined && (name === 'firstName' || name === 'lastName')) {
            value = value.toUpperCase();
        }
        setMemberModel({ ...memberModel, [name]: value });
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
        let data = memberModel;
        if (isRecordSaving) {
            Api.Put(apiUrls.memberController.add, data).then(res => {
                if (common.validateGuid(res.data.id)) {
                    common.closePopup('closePopupMembers');
                    toast.success(toastMessage.saveSuccess);
                    handleSearch('');
                }
            }).catch(err => {
                toast.error(toastMessage.saveError);
            });
        }
        else {
            Api.Post(apiUrls.memberController.update, data).then(res => {
                if (common.validateGuid(res.data.id)) {
                    common.closePopup('closePopupMembers');
                    toast.success(toastMessage.updateSuccess);
                    handleSearch('');
                }
            }).catch(err => {
                toast.error(toastMessage.updateError);
            });
        }
    }
    const validateError = () => {
        const { firstName, email, mobile, idNumber, gender, roleId, stationId, password } = memberModel;
        const newError = {};
        if (!firstName || firstName === "") newError.firstName = validationMessage.reqName;
        if (!email || email === "") newError.email = validationMessage.reqEmail;
        if (!roleId || !common.validateGuid(roleId)) newError.roleId = validationMessage.reqRole;
        if (!stationId || !common.validateGuid(stationId)) newError.stationId = validationMessage.reqStation;
        if (!gender || (gender > 2 || gender < 0)) newError.gender = validationMessage.reqGender;
        if (!idNumber || idNumber === "") newError.idNumber = validationMessage.reqIdNumber;
        if (!mobile || mobile === "") newError.mobile = validationMessage.reqContactNo;
        if (!password || password === "") newError.password = validationMessage.reqPassword;
        return newError;
    }
    return (
        <>
            <div id="add-member" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Member Details</h5>
                            <button type="button" className="btn-close" id='closePopupMembers' data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="myModalLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal form-material">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12 col-md-6">
                                                <Inputbox labelText="First Name" isRequired={true} errorMessage={errors?.firstName} name="firstName" value={memberModel.firstName} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Inputbox labelText="Last Name" name="lastName" value={memberModel.lastName} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Inputbox labelText="Email" isRequired={true} errorMessage={errors?.email} name="email" value={memberModel.email} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Inputbox labelText="Mobile" isRequired={true} errorMessage={errors?.mobile} name="mobile" value={memberModel.mobile} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Inputbox labelText="Personal Phone" name="phone" value={memberModel.phone} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Inputbox labelText="ID Number" name="idNumber" errorMessage={errors?.idNumber} value={memberModel.idNumber} type="text" className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Label text="Gender" isRequired={true} />
                                                <Dropdown data={common.genderList} name="gender" defaultText="Select Gender" defaultValue="-1" value={memberModel.gender} className="form-control form-control-sm" onChange={handleTextChange} />
                                                <ErrorLabel message={errors?.gender} />
                                            </div>
                                            {isRecordSaving && <div className="col-12 col-md-6">
                                                <Inputbox labelText="Password" type="password" isRequired={true} name="password" errorMessage={errors?.password} value={memberModel.password} className="form-control form-control-sm" onChangeHandler={handleTextChange} />
                                            </div>
                                            }
                                            <div className="col-12">
                                                <Label text="Role" isRequired={true} />
                                                <Dropdown data={roleList} name="roleId" defaultText="Select Role" value={memberModel.roleId} className="form-control form-control-sm" onChange={handleTextChange} />
                                                <ErrorLabel message={errors?.roleId} />
                                            </div>
                                            <div className="col-12">
                                                <Label text="Station" isRequired={true} />
                                                <Dropdown data={stationList} name="stationId" defaultText="Select Station" value={memberModel.stationId} className="form-control form-control-sm" onChange={handleTextChange} />
                                                <ErrorLabel message={errors?.stationId} />
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
