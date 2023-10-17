import React,{useState,useEffect} from 'react'
import ButtonBox from '../Common/ButtonBox'
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import SearchableDropdown from '../Common/SearchableDropdown/SearchableDropdown';

export default function AssignForPickup({shipmetIds}) {
    const modelTemplate={
        memberId:""
    }
    const [model, setModel] = useState(modelTemplate);
    const [memberList, setMemberList] = useState([]);
    useEffect(() => {
    Api.Get(apiUrls.memberController.getByRole+`?role=courier`)
    .then(res=>{
        setMemberList(res.data);
    })
    }, []);
    const handleTextChange=(e)=>{
        var {name,value}=e.target;
        setModel({...model,[name]:value});
    }
    return (
        <>
            <div className="modal fade" id="modalAssignForPickup" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalAssignForPickupLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalAssignForPickupLabel">Assign For Pickup</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <SearchableDropdown options={memberList} value={model.memberId} name="memberId" defaultText="Select Courier Person..." handleChange={handleTextChange} elementValue="firstName"></SearchableDropdown>
                        </div>
                        <div className="modal-footer">
                            <div className='d-flex justify-content-end w-50'>
                                {/* <Dropdown className="form-control form-control-sm"></Dropdown>
                                <Dropdown className="form-control form-control-sm mx-2"></Dropdown> */}
                                <ButtonBox type="save" style={{width:'100px'}} className="btn btn-sm"></ButtonBox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
