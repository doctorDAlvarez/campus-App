import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './use-auth';


export default function CreateCourse() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [time, setTime] = useState('');
    const [materials, setMaterials] = useState('');
    const [errors, setErrors] = useState([]);
    let history = useHistory();
    let auth = useAuth();
    
    const handleCancel = () => {
        history.push('/');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            title: title,
            description: desc,
            estimatedTime: time,
            materialsNeeded: materials
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth.credentials}`,
            },
            body: JSON.stringify(body)
        }
        fetch(`http://localhost:5000/api/courses`, options)
            .then(res => {
                if (res.status === 201) {
                    res.json().then(res => history.push(`${res.redirectUrl}`));
                } else if (res.status === 400) {
                    res.json().then(err => setErrors(err.errors));
                } else if (res.status === 500) {
                    history.push('/error');         
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
                history.push('/error');
            });
    }
    return (
        <div className="wrap">
                <h2>Create Course</h2>
                { errors.length !== 0 ? 
                (
                    <div className="validation--errors">
                     <h3>Validation Errors</h3>
                     <ul>
                       {errors.map((error, index) => <li key={index}>{error}</li>)}
                     </ul>
                    </div>
               )
               :
               null
                }
                <form onSubmit={handleSubmit}> 
                    <div className="main--flex">
                        <div>
                            <label>Course Title</label>
                            <input onChange={(e) => setTitle(e.target.value)} id="courseTitle" name="courseTitle" type="text" value={title}></input>

                            <p>By {`${auth.user.firstName} ${auth.user.lastName}`}</p>

                            <label>Course Description</label>
                            <textarea onChange={(e) => setDesc(e.target.value)} id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label>Estimated Time</label>
                            <input onChange={(e) => setTime(e.target.value)} id="estimatedTime" name="estimatedTime" type="text" value={time}></input>

                            <label>Materials Needed</label>
                            <textarea onChange={(e) => setMaterials(e.target.value)} id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><button type="button" className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>  
    )
}