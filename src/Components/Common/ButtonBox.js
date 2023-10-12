import React,{useState} from 'react'
import axios from 'axios';
import { common } from '../Utility/common';
export default function ButtonBox({
    text,
    onClickHandler,
    onClickHandlerData,
    className,
    btnList,
    icon,
    type,
    id,
    modelDismiss,
    modalId,
    disabled,
    style,
    showLoader
}) {
    btnList = common.defaultIfEmpty(btnList, []);
    showLoader = common.defaultIfEmpty(showLoader, false);
    type = common.defaultIfEmpty(type, "button");
    id = common.defaultIfEmpty(id, "");
    text = common.defaultIfEmpty(text, "");
    modelDismiss = common.defaultIfEmpty(modelDismiss, false);
    modalId = common.defaultIfEmpty(modalId, "");
    className = common.defaultIfEmpty(className, "");
    onClickHandler = common.defaultIfEmpty(onClickHandler, () => { });
    var modifiedData = modifyOnType(type, text, className,icon);
    text = modifiedData.text;
    className = modifiedData.className;
    disabled = common.defaultIfEmpty(disabled, false);
    icon = modifiedData.icon;
    btnList.forEach(res => {
        var typeData = modifyOnType(res.type, res.text, res.className,res.icon);
        res.text = typeData.text;
        res.className = typeData.className;
        res.icon = typeData.icon;
    });

    const [isLoading, setIsLoading] = useState(false);
    axios.interceptors.response.use(
        (res) => {
            setIsLoading(false);
            return res;
        },
        (err) => {
            setIsLoading(false);
            return Promise.reject(err);
        }
    );

    axios.interceptors.request.use(
        (req) => {
            setIsLoading(true);
            return req;
        }
    )

    return (
        <>
            {btnList.length === 0 && <button
                type={type}
                id={id}
                onClick={e => onClickHandler(e, onClickHandlerData)}
                disabled={disabled?"disabled":""}
                data-bs-dismiss={modelDismiss ? "modal" : ""}
                className={'btn ' + className}
                data-bs-toggle={modalId === "" ? "" : "modal"}
                data-bs-target={modalId === "" ? "" : modalId} style={style}><i className={icon}></i> {text} {showLoader && isLoading && <i className="fa-solid fa-spinner fa-spin" style={{color: '#e22c9f'}}></i>}</button>}

            {btnList.length > 0 &&
                <div className="btn-group" role="group" aria-label="Basic example">
                    {
                        btnList.map((ele, index) => {
                            return <button
                                key={index}
                                type={type}
                                style={{cursor:(ele?.disabled??false)?"not-allowed":"pointer"}}
                                id={id}
                                onClick={e => ele.onClickHandler(e)}
                                data-bs-dismiss={modelDismiss}
                                disabled={ele?.disabled??false}
                                className={'btn ' + ele.className}
                                data-bs-toggle={ele.modalId === "" ? "" : "modal"}
                                data-bs-target={ele.modalId === "" ? "" : ele.modalId}
                            ><i className={ele.icon}></i> {ele.text} {ele?.showLoader && isLoading && <i className="fa-solid fa-spinner fa-spin" style={{color: '#e22c9f'}}></i>}</button>
                        })
                    }

                </div>
            }
        </>
    )
}

const modifyOnType = (type, text, className,icon) => {
    type = common.defaultIfEmpty(type, "")
    text = common.defaultIfEmpty(text, "");
    icon = common.defaultIfEmpty(icon, "");
    className = common.defaultIfEmpty(className, "");

    if (type.toLowerCase() === "save") {
        return {
            icon: icon===""?"fa-solid fa-floppy-disk":icon,
            text: text === "" ? "Save" : text,
            className: className += " btn-info"
        }
    }
   else if (type.toLowerCase() === "cancel") {
        return {
            icon:icon===""?"fa-solid fa-xmark":icon,
            text: text === "" ? "Cancel" : text,
            className: className += " btn-danger"
        }
    }
   else if (type.toLowerCase() === "delete") {
        return {
            icon: icon===""?"fa-solid fa-trash-can":icon,
            text: text === "" ? "Delete" : text,
            className: className += " btn-warning"
        }
    }
   else if (type.toLowerCase() === "update") {
        return {
            icon: icon===""?"fa-solid fa-pen-to-square":icon,
            text: text === "" ? "Update" : text,
            className: className += " btn-warning"
        }
    }
   else if (type.toLowerCase() === "reset") {
        return {
            icon: icon===""?"fa-solid fa-arrow-rotate-left":icon,
            text: text === "" ? "Reset" : text,
            className: className += " btn-success"
        }
    }
   else if (type.toLowerCase() === "yes") {
        return {
            icon: icon===""?"fa-regular fa-circle-check":icon,
            text: text === "" ? "Reset" : text,
            className: className += " btn-success"
        }
    }
   else if (type.toLowerCase() === "upload") {
        return {
            icon: icon===""?"fa-solid fa-upload":icon,
            text: text === "" ? "Upload" : text,
            className: className += " btn-warning"
        }
    }
   else if (type.toLowerCase() === "print") {
        return {
            icon: icon===""?"fa-solid fa-print":icon,
            text: text === "" ? "Print" : text,
            className: className += " btn-warning"
        }
    }
   else if (type.toLowerCase() === "go") {
        return {
            icon: icon===""?"fa-brands fa-golang":icon,
            text: text === "" ? "Go" : text,
            className: className += " btn-success"
        }
    }
   else if (type.toLowerCase() === "back") {
        return {
            icon: icon===""?"fa-solid fa-backward-fast":icon,
            text: text === "" ? "Back" : text,
            className: className += " btn-secondary"
        }
    }
   else if (type.toLowerCase() === "add") {
        return {
            icon: icon===""?"fa-solid fa-cart-plus":icon,
            text: text === "" ? "Add" : text,
            className: className += " btn-info"
        }
    }
   else if (type.toLowerCase() === "view") {
        return {
            icon: icon===""?"fa-solid fa-eye":icon,
            text: text === "" ? "View" : text,
            className: className += " btn-primary"
        }
    }
    else if (type.toLowerCase() === "check-success") {
        return {
            icon: icon===""?"fa-solid fa-check":icon,
            text: text === "" ? "View" : text,
            className: className += " btn-success"
        }
    }
    else if (type.toLowerCase() === "check-danger") {
        return {
            icon: icon===""?"fa-solid fa-check":icon,
            text: text === "" ? "View" : text,
            className: className += " btn-danger"
        }
    }
    return {
        text, className,icon
    }
}