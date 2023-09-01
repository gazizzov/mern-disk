import React from 'react';
import userStore from './../../store/User';

const Profile = () => {

    async function changeHandler(e) {
        const file = e.target.files[0];
        await userStore.uploadAvatar(file);
        console.log(userStore.currentUser.name)
    }

    return (
        <div className='wrapper'>
            <button onClick={() => {
                userStore.deleteAvatar();
                console.log(userStore.currentUser.avatar)}}>Удалить аватар</button>
            <input accept='image/*' onChange={changeHandler} type="file" placeholder='Загрузить аватар'/>
        </div>
    );
};

export default Profile;