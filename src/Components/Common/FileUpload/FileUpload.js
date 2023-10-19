import React, { useState, useEffect } from 'react'
import '../../../css/admin.css';
import ErrorLabel from './ErrorLabel';
import ButtonBox from './ButtonBox';
import { common } from '../../../utils/common';
import { Api } from '../../../apis/Api';
import { apiUrls } from '../../../apis/ApiUrls';
import DeleteConfirmation from './DeleteConfirmation';
import { toast } from 'react-toastify';
import { toastMessage } from '../../../constants/ConstantValues';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function FileUpload({
    fileType = "image",
    fileLimit,
    fileSize,
    moduleName = 0,
    imageRemark = "",
    moduleId = 0,
    id = "filUpload1",
    disable = false
}) {

    const [images, setImages] = useState([]);
    const [selectedFileList, setSelectedFileList] = useState()
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [existingImage, setExistingImage] = useState([]);
    const [removeImageIndex, setRemoveImageIndex] = useState(-1);
    const [uploadProgress, setUploadProgress] = useState({
        total: 0,
        loaded: 0,
        percentage: 0
    });

    const removeImage = (removeIndex) => {

        let newModel = [];
        images?.forEach((ele, ind) => {

            if (ind !== removeIndex) {

                newModel.push(ele);

            }
            else {
                if (ele?.id !== undefined) {
                    Api.Delete(apiUrls.fileUploadController.deleteImage + ele?.id)
                        .then(res => {
                            if (res.data === true)
                                toast.success(toastMessage.deleteSuccess);
                            else {
                                toast.warn(toastMessage.deleteError);
                                newModel.push(ele);
                            }
                        })
                        .catch(err => {
                            newModel.push(ele);
                        });
                }
            }
        });
        setImages([...newModel]);
    }

    const onImageChange = (event) => {
        var urls = []
        let files = event.target.files;
        if (files && files.length > 0) {
            if (checkFile(files)) {
                for (let index = 0; index < files.length; index++) {
                    urls.push({
                        localUrl: URL.createObjectURL(files[index]),
                        file: files[index]
                    });

                }
                setImages([...urls, ...mapServerImageUrl()]);
                setSelectedFileList(event.target.files);
            }
        }
    }

    function checkFile(files) {
        let validator = fileValidator();
        let FLAG = true;

        for (let index = 0; index < files.length; index++) {
            var fileExtension = "";
            if (files[index].name?.lastIndexOf(".") > 0) {
                fileExtension = files[index].name?.substring(files[index].name?.lastIndexOf(".") + 1, files[index].name?.length);
            }
            if (!validator?.ext.includes(fileExtension.toLowerCase())) {
                setError(`${files[index].name} is invalid file! Allowed extension are ${validator.ext}`);
                FLAG = false;
            }
            else if (files.length > validator.limit) {
                setError(`maximum ${validator.limit} files are allowed at a time`);
                FLAG = false;
            }
            else if (files[index].size > (validator.size * 1024 * 1024)) {
                setError(`${files[index].name} is invalid file! Allowed file size is ${validator.size} MB`);
                FLAG = false;
            }

        }
        if (FLAG) {
            setError("");
        }
        return FLAG;
    }

    const fileValidator = () => {
        var e = process.env.REACT_APP_IMAGE_FILE_EXT;
        let ALLOWED_EXT = JSON.parse(process.env.REACT_APP_IMAGE_FILE_EXT ?? "[]");
        let ALLOWED_FILE_SIZE = parseFloat(process.env.REACT_APP_IMAGE_FILE_SIZE_MB);
        let ALLOWED_FILE_LIMIT = parseFloat(process.env.REACT_APP_IMAGE_FILE_LIMIT);
        if (fileType?.toLowerCase() === 'audio') {
            ALLOWED_EXT = JSON.parse(process.env.REACT_APP_AUDIO_FILE_EXT);
            ALLOWED_FILE_SIZE = parseFloat(process.env.REACT_APP_AUDIO_FILE_SIZE_MB);
            ALLOWED_FILE_LIMIT = parseFloat(process.env.REACT_APP_AUDIO_FILE_LIMIT);
        }
        else if (fileType?.toLowerCase() === 'video') {
            ALLOWED_EXT = JSON.parse(process.env.REACT_APP_VIDEO_FILE_EXT);
            ALLOWED_FILE_SIZE = parseFloat(process.env.REACT_APP_VIDEO_FILE_SIZE_MB);
            ALLOWED_FILE_LIMIT = parseFloat(process.env.REACT_APP_VIDEO_FILE_LIMIT);
        }
        else if (fileType?.toLowerCase() === 'file') {
            ALLOWED_EXT = JSON.parse(process.env.REACT_APP_FILE_EXT);
            ALLOWED_FILE_SIZE = parseFloat(process.env.REACT_APP_VIDEO_FILE_SIZE_MB);
            ALLOWED_FILE_LIMIT = parseFloat(process.env.REACT_APP_VIDEO_FILE_LIMIT);
        }
        else if (fileType?.toLowerCase() === '360degreeimage') {
            ALLOWED_EXT = JSON.parse(process.env.REACT_APP_IMAGE_FILE_EXT ?? "[]");
            ALLOWED_FILE_SIZE = parseFloat(process.env.REACT_APP_IMAGE_FILE_SIZE_MB);
            ALLOWED_FILE_LIMIT = parseFloat(process.env.REACT_APP_IMAGE_FILE_LIMIT);
        }
        else if (fileType?.toLowerCase() === '360degreevideo') {
            ALLOWED_EXT = JSON.parse(process.env.REACT_APP_VIDEO_FILE_EXT);
            ALLOWED_FILE_SIZE = parseFloat(process.env.REACT_APP_VIDEO_FILE_SIZE_MB);
            ALLOWED_FILE_LIMIT = parseFloat(process.env.REACT_APP_VIDEO_FILE_LIMIT);
        }
        return {
            ext: ALLOWED_EXT,
            size: ALLOWED_FILE_SIZE,
            limit: ALLOWED_FILE_LIMIT
        }
    }
    const onUploadProgressHandler = (e) => {
        const { loaded, total } = e;
        let percentage = parseInt((loaded * 100) / total);
        if (percentage < 95) {
            setUploadProgress({
                ...{
                    total: total,
                    loaded: loaded,
                    percentage: percentage
                }
            });
        }
    }
    const uploadFiles = () => {
        if (!selectedFileList || selectedFileList?.length === 0)
            return;
        let url = apiUrls.fileUploadController.uploadFiles + `?ModuleId=${moduleId}&ModuleName=${moduleName}&CreateThumbnail=true&Remark=t${imageRemark}&SequenceNo=0&imageType=${fileType}`
        setIsUploading(true);
        let data = new FormData();
        for (let index = 0; index < selectedFileList?.length; index++) {
            data.append('files', selectedFileList[index], selectedFileList[index].name);
        }

        Api.FileUploadPost(url, data, { onUploadProgress: onUploadProgressHandler })
            .then(res => {
                setIsUploading(false);
                if (res?.data[0]?.id > 0) {
                    setImages([...mapServerImageUrl(res.data)]);
                    toast.success(toastMessage.fileUploadSuccess);
                }
                else {
                    toast.warn(toastMessage.fileUploadError)
                }
                setUploadProgress({
                    ...{
                        total: 0,
                        loaded: 0,
                        percentage: 100
                    }
                });
            })
            .catch(err => {
                toast.error(toastMessage.fileUploadError);
            })
    }

    useEffect(() => {
        Api.Get(apiUrls.fileUploadController.getImageByModNameModId + `?moduleName=${moduleName}&moduleId=${moduleId}&imageType=${fileType}`)
            .then(res => {
                if (res.data.length > 0) {
                    setExistingImage(res.data);
                    setImages([...images, ...mapServerImageUrl(res.data)]);
                }
            });
    }, []);

    const mapServerImageUrl = (data) => {
        data = data === undefined ? existingImage : data;
        var model = [];
        (data ?? []).forEach(ele => {
            model.push({
                localUrl: ele?.thumbPath ?? ele?.filePath,
                filePath: ele?.filePath,
                onServer: true,
                id: ele?.id
            });
        });
        return model;
    }

    const mapImageUrl = (url) => {
        if (url?.indexOf('blob') > -1)
            return url;
        else
            return process.env.REACT_APP_API_URL + url;
    }
    return (
        <>
            <input
                type="file"
                className="form-control form-control-sm"
                multiple={true}
                id={id}
                disabled={disable ? "disabled" : ""}
                onChange={e => onImageChange(e)}
            />
            <ErrorLabel message={error} />
            <div className="d-flex align-items-start bd-highlight mb-3 file-upload-container">
                {
                    images?.map((res, index) => {
                        return <div key={index} className="bd-highlight">
                            <div className='close text-danger' data-bs-toggle="modal" data-bs-target="#deleteImagePopup"><i onClick={e => setRemoveImageIndex(pre => index)} className="fa-solid fa-xmark"></i></div>
                            {res.id === undefined && <div className='new-badge'>New</div>}

                            {(fileType === 'image' || fileType === 'barcode' || fileType === 'banner' || fileType === '360degreeimage') && <LazyLoadImage effect='blur' className='image' title={res?.file?.name} alt='Selected Image' src={mapImageUrl(res?.localUrl)} />}
                            {fileType === "audio" && <div className='non-img-container'>
                                <i className="fa-solid fa-file-audio"></i>
                            </div>}
                            {(fileType === "video" || fileType === '360degreevideo') && <div className='non-img-container'>
                                <i className="fa-solid fa-file-video"></i>
                            </div>}
                            <div className="d-flex justify-content-between">
                                <span title={res?.file?.name} className='file-name'>{res?.file?.name}</span>
                                {res.id === undefined && <span className='file-size'>{common.printDecimal(res?.file?.size / 1024 / 1024)} MB</span>}
                            </div>
                        </div>
                    })
                }

            </div>
            <div className='row'>
                <div className='col-sm-9 col-md-10'>
                    {isUploading && <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-info" style={{ width: uploadProgress.percentage + '%' }} role="progressbar" aria-valuenow={uploadProgress.percentage} aria-valuemin="0" aria-valuemax="100">{uploadProgress.percentage + '%'}</div>
                    </div>
                    }
                </div>
                <div className='col-sm-3 col-md-2'>
                    {images.length > 0 && <div className="d-flex justify-content-end">
                        <ButtonBox onClickHandler={uploadFiles} disabled={isUploading || disable} type="upload" className="btn-sm"></ButtonBox>
                    </div>
                    }
                </div>
            </div>
            {!disable && <DeleteConfirmation modelId="deleteImagePopup" deleteHandler={removeImage} dataId={removeImageIndex} message="You want to delete file! Are you sure." title="Delete Image Confirmation!" />}
        </>
    )
}