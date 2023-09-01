import React, {useState} from 'react';
import './authorization.css';
import Input from "../../utils/input/Input";
import user from '../../store/User';
import {observer} from "mobx-react-lite";

const Login = observer(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className='authorization'>
            <div className="authorization__header">Вход</div>
            <Input value={email} onChange={onChangeEmail} type='text' placeholder='Введите email...'/>
            <Input value={password} onChange={onChangePassword} type='password' placeholder='Введите пароль...'/>
            <button className="authorization__btn" onClick={() => user.login(email, password)}>Войти</button>
        </div>
    );
})

export default Login;