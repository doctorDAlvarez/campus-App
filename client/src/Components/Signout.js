import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './use-auth';



export default function Signout() {
    const auth = useAuth();
    
    useEffect(() => {
        auth.signout();
    })
    
    return <Redirect to='/' />
}