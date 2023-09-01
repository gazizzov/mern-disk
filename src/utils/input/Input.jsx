import React from 'react';
import './input.css';

const Input = ({type, placeholder, onChange}) => {
    return (
        <input onChange={(e) => onChange(e)} type={type} placeholder={placeholder}/>
    );
};

export default Input;