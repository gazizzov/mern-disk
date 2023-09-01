import {makeAutoObservable} from "mobx";

class uploadFileStore {
    isVisible = false;
    files = [];

    constructor() {
        makeAutoObservable(this)
    }

    showUploader() {
        this.isVisible = true;
    }

    hideUploader() {
        this.isVisible = false;
    }

    addUploadFile(file) {
        this.files.push({...file, id: this.files.length});
    }

    removeUploadFile(file) {
        this.files = [...this.files.filter(item => item.id != file.id)]
    }


    changeUploadProgress(fileId, percent) {
        this.files = this.files.map(file => {
            if (file.id === fileId) {
                return {...file, progress: percent};
            } else {
                return file;
            }
        })
    }
}

const a = new uploadFileStore();

export default a;