import React, {useState} from 'react';
import './authorization.css';
import Input from "../../utils/input/Input";
import user from '../../store/User';
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function registrateHandler() {
        user.registration(email, password);
        navigate('/login');
    }

    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={email} onChange={onChangeEmail} type='text' placeholder='Введите email...'/>
            <Input value={password} onChange={onChangePassword} type='password' placeholder='Введите пароль...'/>
            <button className="authorization__btn" onClick={registrateHandler}>Регистрация</button>

        </div>
    );
};

export default Registration;