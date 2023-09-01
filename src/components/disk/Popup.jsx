import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import File from './../../store/File';
import {observer} from "mobx-react-lite";

const Popup = observer(({refresh}) => {
    const [dirName, setDirName] = useState(' ');
    function onChange(e) {
        setDirName(e.target.value);
    }

    function closePopup() {
        File.setPopupDisplay('none');
        refresh();
    }

    async function createHandler() {
        await File.createDir(File.currentDir, dirName);
        closePopup();
        setDirName('');
    }

    return (

        <div className='popup' onClick={closePopup} style={{display: File.popupDisplay}}>
            <div className="popup__content" onClick={(e) => e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button onClick={closePopup} className="popup__close">X</button>
                </div>
                <Input type='text' value={dirName} placeholder='Введите название папки...' onChange={onChange}/>
                <button onClick={createHandler} className="popup__create">Создать</button>
            </div>
        </div>
    );
})

export default Popup;