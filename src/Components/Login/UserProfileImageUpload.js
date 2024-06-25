import React,{useState} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Api } from '../../API/API';
import ButtonBox from '../Common/ButtonBox';
import Inputbox from '../Common/Inputbox';
import { apiUrls } from '../../API/ApiUrl';

export default function UserProfileImageUpload () {  
    const [image, setImage] = useState(null);
    const [cropper, setCropper] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validExtensions.includes(files[0].type)) {
            setError('Only .png, .jpg, and .jpeg files are allowed.');
            return;
        }
        if (files[0].size > 200000) {
            setError('File size should be less than 200KB.');
            return;
        }
        setError('');
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        setFileName(files[0].name); 
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== 'undefined') {
            cropper.getCroppedCanvas().toBlob((blob) => {
                const formData = new FormData();
                const file = new File([blob], fileName, { type: blob.type });
                formData.append('file', file);

                // If there's an existing profile image, delete it first
                if (profileImage) {
                    const fileName = profileImage.split('/').pop();
                    Api.Delete(`/api/upload/${fileName}`).then(() => {
                        // After deletion, upload the new image
                        uploadImage(formData);
                    }).catch((error) => {
                        console.error(error);
                    });
                } else {
                    // If no existing image, just upload the new one
                    uploadImage(formData);
                }
            });
        }
    };

    //  onUploadProgress: (progressEvent) => {
    //             const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //             setUploadProgress(progress);
    //         },
    const uploadImage = (formData) => {
        Api.FileUploadPost(apiUrls.authController.updateUserProfileImage,formData)
        .then((response) => {
            setProfileImage(response.data.path);
            setUploadProgress(0);
        }).catch((error) => {
            console.error(error);
            setUploadProgress(0);
        });
    };

    const removeImage = () => {
        if (profileImage) {
            const fileName = profileImage.split('/').pop();
            Api.Delete(`/api/upload/${fileName}`).then(() => {
                setProfileImage(null);
            }).catch((error) => {
                console.error(error);
            });
        }
    };
    return (
        <>
            <div id="userProfileImageUploadModel" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="userProfileImageUploadModelLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Upload Profile Image</h5>
                            <button type="button" className="btn-close" id='closePopupUserProfileImageUploadModel' data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title" id="userProfileImageUploadModelLabel"></h4>
                        </div>
                        <div className="modal-body">
                            <div>
                                <Inputbox showLabel={false} type="file" className="form-control-sm" onChangeHandler={onChange} />
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <Cropper
                                    style={{ height: 400, width: '100%',marginBottom:'10px',marginTop:'10px' }}
                                    initialAspectRatio={1}
                                    src={image}
                                    viewMode={1}
                                    guides={true}
                                    minCropBoxHeight={10}
                                    minCropBoxWidth={10}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false}
                                    onInitialized={(instance) => {
                                        setCropper(instance);
                                    }}
                                />
                               
                                {uploadProgress > 0 && <progress value={uploadProgress} max="100">{uploadProgress}%</progress>}
                                {profileImage && (
                                    <div>
                                        <img src={profileImage} alt="Profile" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
                                        <ButtonBox onClickHandler={removeImage} type="remove"/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                        <ButtonBox className="btn-sm" onClickHandler={getCropData} type="upload"/>
                            <ButtonBox type="cancel" className="btn-sm" modelDismiss={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
