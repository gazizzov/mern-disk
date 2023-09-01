import React from 'react';
import './uploader.css';
import uploadFileStore from "../../../store/uploadFileStore";

const UploadFile = ({file}) => {


    function removeClickHandler() {
        uploadFileStore.removeUploadFile(file);
    }

    return (
        <div className='upload-file'>
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <div onClick={removeClickHandler} className="upload-file__remove">X</div>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: file.progress + '%'}}></div>
                <div className="upload-file__percent">{file.progress}</div>
            </div>
        </div>
    );
};

export default UploadFile;