import React from 'react';
import './file.css';
import DirLogo from './../../../../assets/img/folder.png';
import FileLogo from './../../../../assets/img/file.png';
import fileStore from './../../../../store/File';
import {observer} from "mobx-react-lite";
import sizeFormat from "../../../../utils/sizeFormat";

const File = observer(({file}) => {

    function openHandler(file) {
        if (file.type === 'dir') {
            fileStore.pushToStack(fileStore.currentDir)
            fileStore.setCurrentDir(file._id);
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation();
        fileStore.downloadFile(file);
    }

    function deleteClickHandler(e) {
        e.stopPropagation();
        fileStore.deleteFile(file);
    }

    if (fileStore.view === "list") {
        return (
            <>

                <div className='file' onClick={() => openHandler(file)}>
                    <img width="48" height="48" src={file.type === 'dir' ? DirLogo : FileLogo} alt="" className="file__img"/>
                    <div className="file__name">{file.name}</div>
                    <div className="file__date">{file.date.slice(0, 10)}</div>
                    <div className="file__size">{sizeFormat(file.size)}</div>

                    {file.type !== 'dir' ? <button onClick={downloadClickHandler} className='file__btn file__download'>download</button> : <></>}

                    <button onClick={deleteClickHandler} className='file__btn file__delete'>delete</button>

                </div>
            </>
        );
    }

    if (fileStore.view === "plate") {
        return (
            <>

                <div className='file-plate' onClick={() => openHandler(file)}>
                    <img width="48" height="48" src={file.type === 'dir' ? DirLogo : FileLogo} alt="" className="file-plate__img"/>
                    <div className="fil-plate__name">{file.name}</div>

                    <div className="file-plate__btns">
                        {file.type !== 'dir' ? <button onClick={downloadClickHandler} className='file-plate__btn file-plate__download'>download</button> : <></>}
                        <button onClick={deleteClickHandler} className='file-plate__btn file-plate__delete'>delete</button>
                    </div>

                </div>
            </>
        );
    }


});

export default File;