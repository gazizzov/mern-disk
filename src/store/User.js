import {makeAutoObservable} from "mobx";
import axios from "axios";
import React from "react";
import {API_URL} from "../config";


class User {

    currentUser = {};
    isAuth = false;
    count = 0;
    constructor() {
        makeAutoObservable(this);
    }

    async registration(email, password) {
        try {
            const response = await axios.post('${API_URL}api/auth/registration', {
                email,
                password
            })
            alert(response.data.message)
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    async login (email, password)  {
    try {
        const response = await axios.post(`${API_URL}api/auth/login`, {
            email,
            password
        })
        this.currentUser = response.data.user;
        this.isAuth = true;
        localStorage.setItem("token", response.data.token);
        window.location.reload();
    } catch (e) {
        alert(e.response.data.message);
    }}

    logout () {
        this.currentUser = {};
        this.isAuth = false;
        localStorage.removeItem('token');
        localStorage.setItem('auth', "false");
    }

    async auth ()  {
        try {
            console.log(`Bearer ${localStorage.getItem('token')}` + 'ahahaahah')
            const response = await axios.get(`${API_URL}api/auth/auth`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

            localStorage.setItem("token", response.data.token);
            this.isAuth = true;
            localStorage.setItem('auth', 'true')
        } catch (e) {
            alert(e);
            localStorage.removeItem('token');
        }}

    async uploadAvatar (file)  {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${API_URL}api/files/avatar`, formData, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

            this.currentUser = response.data
        } catch (e) {
            alert(e);
        }}


    async deleteAvatar ()  {
        try {

            const response = await axios.delete(`${API_URL}api/files/avatar`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

            this.currentUser = response.data;
        } catch (e) {
            alert(e);
        }}

}

export default new User();