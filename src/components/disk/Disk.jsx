import React, {useEffect, useState} from 'react';
import File from './../../store/File';
import {observer} from "mobx-react-lite";
import './disk.css';
import FileList from './fileList/FileList.jsx';
import Popup from "./Popup";
import {autorun} from "mobx";
import refreshIcon from '../../assets/img/refresh.png';
import login from "../authoriztion/Login";
import Input from "../../utils/input/Input";
import Uploader from "./uploader/Uploader";
import appStore from "../../store/appStore";

const Disk = observer(() => {
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('name');

    useEffect(() => autorun( () => {
        File.getFiles(File.currentDir, sort);
        console.log(sort);
    }), [sort])


    function createhandler() {
        File.setPopupDisplay('flex');
    }

    function refresh() {
        File.getFiles(File.currentDir, sort);
    }

    function backClickHandler() {
        const backDirId = File.dirStack.pop();
        File.setCurrentDir(backDirId);
    }



    async function fileUploadHandler(e, sort) {
        const files = [...e.target.files];
        for (let i = 0; i < files.length; i++) {
            await File.uploadFile(files[i], File.currentDir);
        }
        refresh();
    }

    function dragEnterHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true);
    }

    function dragOverHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true);
    }

    function dragleaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false);
    }

    function dropHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let files = [...e.dataTransfer.files];
        files.forEach(file => File.uploadFile(file, File.currentDir));
        setDragEnter(false);
    }

    if (appStore.loader === true) {
        return (
            <div className='loader'>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

    return (
        !dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragleaveHandler} onDragOver={dragOverHandler}>
            <div className="wrapper">
                <div className="disk__btns">
                    <button className="disk__back" onClick={backClickHandler}>Назад</button>
                    <button onClick={() => createhandler()} className="disk__create">Создать папку</button>
                    <img onClick={refresh} className="disk__refresh" width="30"  height="30" src={refreshIcon} alt="awdad"/>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                        <input multiple={true} onChange={(e) => fileUploadHandler(e)} id='disk__upload-input' className="disk__upload-input" type='file' />
                    </div>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className='disk__select'>
                        <option value="name">По имени</option>
                        <option value="type">По типу</option>
                        <option value="date">По дате</option>
                    </select>
                    <button onClick={() => File.setView('plate')} className="disk__plate"></button>
                    <button onClick={() => File.setView('list')} className="disk__list"></button>
                </div>
                <FileList />
                <Popup refresh={refresh}></Popup>
                <Uploader />
            </div>
        </div>
        :
            <div className="wrapper">
                <div className='drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragleaveHandler} onDragOver={dragOverHandler}>
                    Перетащите файлы сюда
                </div>
            </div>
    );
})

export default Disk;