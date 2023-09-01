import React from 'react';
import './fileList.css';
import file from "../../../store/File";
import File from "./file/File";
import {observer} from "mobx-react-lite";
import fileStore from "../../../store/File";
import {TransitionGroup, CSSTransition} from "react-transition-group";


const FileList = observer(() => {
    const files = file.files;

    if (files.length === 0) {
        return (
            <div className='loader'>Файлы не найдены</div>
        )
    }

    if (fileStore.view === 'plate') {
        return (
            <div className="filePlate">
                {files.map(file =>
                    <File key={file._id} file={file}/>
                )}
            </div>
        );
    }


    if (fileStore.view === 'list') {
        return (
            <div className="fileList">
                <div className="fileList__header">
                    <div className="fileList__name">Название</div>
                    <div className="fileList__date">Дата</div>
                    <div className="fileList__size">Размер</div>
                </div>
                <TransitionGroup>
                    {files.map(file =>
                        <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
                            <File file={file}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        );
    }

})

export default FileList;