import React from 'react';
import './uploader.css';
import UploadFile from "./UploadFile";
import uploadFileStore from "../../../store/uploadFileStore";
import {observer} from "mobx-react-lite";

const Uploader = observer(() => {
    const files = uploadFileStore.files;

    function closeClickHandler() {
        uploadFileStore.hideUploader();
    }

    return ( uploadFileStore.isVisible &&
        <div className='uploader'>
            <div className="uploader__header">
                <div className="uploader__title">Загрузка</div>
                <div onClick={closeClickHandler} className="uploader__close">Х</div>
            </div>
            {files.map(file => <UploadFile file={file} key={file.id}></UploadFile>)}
        </div>
    );
})

export default Uploader;