import React, { useState} from 'react';
import { Link , useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './use-auth';


export default function SignUp() {
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmed, setConfirmed] = useState('');
    const [errors, setErrors] = useState([]);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };
    const auth = useAuth();

    const handleCancel = () => {
        history.push('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmed) {
            setErrors(["Passwords don't match"]);
        } else {
            auth.signup(firstName, lastName, email, password)
              .then(errors => {
                    if (errors.length !== 0) {
                        setErrors(errors);
                    } else {
                        auth.signin(email, password, () => history.replace(from))
                    }  
              }) 
        }
    }
    
    return (
        <div className="form--centered">
                <h2>Sign Up</h2>
                { errors.length !== 0 ? 
                (
                    <div className="validation--errors">
                     <h3>Validation Errors</h3>
                     <ul>
                       {errors.map((error, index) => <li key={index}>{error}</li>)}
                     </ul>
                    </div>
                ) :
                    null
                }
                <form onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input onChange={(e) => setFirst(e.target.value)}id="firstName" name="firstName" type="text" value={firstName}></input>
                    <label>Last Name</label>
                    <input onChange={(e) => setLast(e.target.value)}id="lastName" name="lastName" type="text" value={lastName}></input>
                    <label>Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)}id="emailAddress" name="emailAddress" type="email" value={email}></input>
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)}id="password" name="password" type="password" value={password}></input>
                    <label>Confirm Password</label>
                    <input onChange={(e) => setConfirmed(e.target.value)}id="confirmPassword" name="confirmPassword" type="password" value={confirmed}></input>
                    <button className="button" type="submit">Sign Up</button><button type="button" className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            <p>Already have a user account? Click here to <Link to='/signin'>sign in!</Link></p>
        </div>
    )
}