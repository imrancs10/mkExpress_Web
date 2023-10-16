import React from 'react'
import { common } from '../Utility/common'
import DeleteConfirmation from './DeleteConfirmation';

export default function TableAction({ option, dataId, data, rowIndex }) {
    const optionTemplatObject = {
        showView: true,
        showEdit: true,
        showDelete: true,
        showPrint: false,
        view: {
            title: "View",
            handler: () => { },
            icon: 'fa-solid fa-eye'
        },
        edit: {
            title: "Edit",
            handler: () => { },
            icon: 'fa-solid fa-pen-to-square'
        },
        delete: {
            title: "Delete",
            handler: () => { },
            icon: 'fa-solid fa-trash-can',
            showModel: true
        },
        print: {
            title: "Print",
            handler: () => { },
            icon: 'fa-solid fa-print',
        },
        popupModelId: 'model',
        buttons: []
    }
    option = common.defaultIfEmpty(option, optionTemplatObject);
    option.edit = Object.assign(optionTemplatObject.edit, option.edit);
    option.view = Object.assign(optionTemplatObject.view, option.view);
    option.delete = Object.assign(optionTemplatObject.delete, option.delete);
    option.print = Object.assign(optionTemplatObject.print, option.print);
    option.buttons = Object.assign(optionTemplatObject.buttons, option.buttons);
    dataId = common.defaultIfEmpty(dataId, 0);
    option = Object.assign(optionTemplatObject, option);

    const showHideButtonOnCondition = (option, id, data) => {
        if (typeof option?.showButton === "boolean")
            return option?.showButton;
        else if (typeof option?.showButton === "function")
            return option?.showButton(id, data);
        else
            return true;
    }
    return (
        <>
            <div className="table-actions d-flex align-items-center gap-3 fs-6">
                {option.showPrint && showHideButtonOnCondition(option.print, dataId, data) && <div style={{ cursor: "pointer" }} onClick={e => option.print.handler(dataId, data)} className="text-success" data-bs-placement="bottom" title={option.print.title} data-toggle="tooltip" aria-label={option.print?.title} data-bs-toggle={option.print.modelId === undefined ? "" : "modal"} data-bs-target={"#" + (option.print.modelId === undefined ? "" : option.print.modelId)}><i className={option.print.icon}></i></div>}
                {option.showView && showHideButtonOnCondition(option.view, dataId, data) && option.view.modelId !== undefined && <div style={{ cursor: "pointer" }} onClick={e => option.view.handler(dataId, data)} className="text-primary" data-bs-placement="bottom" data-toggle="tooltip" aria-label={option.view?.title} data-bs-toggle="modal" data-bs-target={"#" + (option.view.modelId === undefined ? "" : option.view.modelId)}><i className={option.view.icon}></i></div>}
                {option.showView && showHideButtonOnCondition(option.view, dataId, data) && option.view.modelId === undefined && <div style={{ cursor: "pointer" }} onClick={e => option.view.handler(dataId, data)} className="text-primary" data-bs-placement="bottom" data-toggle="tooltip" aria-label={option.view?.title}><i className={option.view.icon}></i></div>}
                {option.showEdit && showHideButtonOnCondition(option.edit, dataId, data) && <div style={{ cursor: "pointer" }} onClick={e => option.edit.handler(dataId, data)} className="text-warning" data-bs-toggle="modal" data-bs-target={"#" + (option.edit.modelId === undefined ? option.popupModelId : option.edit.modelId)} title={option.edit?.title} data-toggle="tooltip" data-bs-placement="bottom" aria-label={option.edit?.title}><i className={option.edit.icon}></i></div>}
                {option.showDelete && showHideButtonOnCondition(option.delete, dataId, data) && <div style={{ cursor: "pointer" }} data-bs-toggle={option.delete.showModel ? "modal" : ""} onClick={e => !option.delete.showModel ? option.delete.handler(dataId, data, rowIndex) : () => { }} data-bs-target={option.delete.showModel ? "#delete-confirm-model-" + dataId : ""} className="text-danger" data-bs-placement="bottom" title={option.delete.title} data-toggle="tooltip" aria-label={option.delete?.title}><i className={option.delete.icon}></i></div>}
                {
                    option.buttons?.map((ele, index) => {
                        if (typeof ele?.showButton === "boolean" && ele?.showButton === false)
                            return <div key={index}></div>;
                        else if (typeof ele?.showButton === "function" && (ele?.showButton(dataId, data) === false))
                            return <div key={index}></div>;
                        else
                            return <div key={index}
                                style={{ cursor: "pointer !important", ...ele?.style }}
                                data-bs-toggle={ele?.showModel ? 'modal' : ""}
                                onClick={e => ele.handler(dataId, data)}
                                data-bs-target={ele?.showModel ? '#' + ele.modelId : ""}
                                className={!ele.className ? "text-primary" : ele.className}
                                data-bs-placement="bottom"
                                title={typeof ele.title === 'function' ? ele.title(dataId, data) : ele.title}
                                data-toggle="tooltip"
                                aria-label={ele?.title}>
                                <i className={typeof ele.icon === 'function' ? ele.icon(dataId, data) : ele.icon}></i>
                            </div>
                    })
                }
            </div>
            <DeleteConfirmation deleteHandler={option.delete.handler} dataId={dataId} ></DeleteConfirmation>
        </>
    )
}
