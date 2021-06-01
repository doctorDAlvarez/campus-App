import React from 'react';
import {Redirect} from 'react-router-dom';



export default function Signout(props) {
    props.setPass(null);
    props.setAuth(null);

    return (
        <Redirect to="/" />
    );
}