import React, {useState} from 'react';
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import {NavLink} from "react-router-dom";
import user from '../../store/User';
import {observer} from "mobx-react-lite";
import fileStore from '../../store/File';
import appStore from "../../store/appStore";
import avatarLogo from '../../assets/img/defaultAvatar.svg';
import {API_URL} from "../../config";

const Navbar = observer(() => {
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const avatar = user.currentUser.avatar ? (API_URL + user.currentUser.avatar) : avatarLogo;



    function searchHandler(e) {
        setSearchName(e.target.value);
        appStore.showLoader();
        if (searchTimeout != false) {
            clearTimeout(searchTimeout);
        }
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {fileStore.searchFile(e.target.value)}, 500, e.target.value))
        } else {
            fileStore.getFiles(fileStore.currentDir)
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__blocks">
                    <img src={Logo} alt="" className="navbar__logo"/>
                    <div className="navbar__header">MERN CLOUD</div>
                </div>
                <div className="navbar__blocks">
                    {user.isAuth && <input value={searchName} onChange={searchHandler} className='navbar__search' type="text" placeholder='Название файла...'/>}
                    {!user.isAuth ? <div><NavLink to='login'>Войти</NavLink></div> : <></>}
                    {!user.isAuth ?  <div className="navbar__registrate"><NavLink to='registration'>Регистрация</NavLink></div> : <></>}
                    {user.isAuth ?  <div><NavLink to='login' onClick={() => user.logout()}>Выйти</NavLink></div> : <></>}
                    {user.isAuth && <NavLink to ='profile'><img src={avatar} alt="" className='navbar__avatar'/></NavLink>}
                </div>
            </div>
        </div>
    );
});

export default Navbar;