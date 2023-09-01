import {makeAutoObservable} from "mobx";
import axios from "axios";
import React from "react";
import uploadFileStore from "./uploadFileStore";
import appStore from "./appStore";
import {API_URL} from "../config";


class File {
    files = [];
    currentDir =  null;
    popupDisplay = 'none';
    dirStack = [];
    view = 'list';


    constructor() {
        makeAutoObservable(this);
    }



    setPopupDisplay(text) {
        this.popupDisplay = text;
    }

    setCurrentDir(text) {
        this.currentDir = text;
    }

    setView(view) {
        this.view = view;
    }

    pushToStack(dirId) {
        this.dirStack.push(dirId)
    }

    async getFiles(dirId, sort) {
        try {
            appStore.showLoader();
            let url = `${API_URL}api/files`;

            if(dirId) {
                url = `${API_URL}api/files?parent=${dirId}`;
            }

            if (sort) {
                url = `${API_URL}api/files?sort=${sort}`;
            }

            if (dirId && sort) {
                url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`;
            }

            console.log(url)

            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            this.files = response.data;
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            appStore.hideLoader();
        }
    }

    async createDir(dirId, name) {
        try {
            const response = await axios.post(`${API_URL}api/files`, {
                name,
                parent: dirId,
                type: "dir"
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    async uploadFile(file, dirId) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId);
            }

            const uploadFile = {name: file.name, progress: 0};
            uploadFileStore.showUploader();
            uploadFileStore.addUploadFile(uploadFile)
            const uploadedFile = uploadFileStore.files.at(-1);

            const response = await axios.post(`${API_URL}api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    uploadFileStore.changeUploadProgress(uploadedFile.id, percentCompleted)
                }
            });
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    async downloadFile(file) {
        const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
        if (response.status === 200) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    }

    async deleteFile(file) {
        try {
            const response = await axios.delete(`${API_URL}api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            this.files = [...this.files.filter(item => item._id != file._id)];
            alert(response.data.message)

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    async searchFile(search) {
        try {
            const response = await axios.get(`${API_URL}api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            this.files = response.data;

        } catch (e) {
            alert(e.response.data.message)
        } finally {
            appStore.hideLoader();
        }
    }


}

const file = new File();

export default file;