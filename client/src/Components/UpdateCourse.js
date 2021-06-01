import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from './use-auth';


export default function UpdateCourse() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [time, setTime] = useState('');
    const [materials, setMaterials] = useState('');
    const [errors, setErrors] = useState([]);
    let history = useHistory();
    let auth = useAuth();
    let { id } = useParams();

    const handleCancel = () => {
        history.push(`/courses/${id}`);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
        .then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                    setTitle(res.title);
                    setDesc(res.description);
                    setTime(res.estimatedTime);
                    setMaterials(res.materialsNeeded);
                })
            } else if (res.status === 404) {
                history.push('/NotFound');         
            } else if (res.status === 500) {
                history.push('/error');         
            } 
        })
        .catch(err => history.push('/error'))
    },[])  

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(auth);
        const body = {
            title: title,
            description: desc,
            estimatedTime: time,
            materialsNeeded: materials
        };
        const options = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth.credentials}`
            }
        }
        
        fetch(`http://localhost:5000/api/courses/${id}`, options)
            .then(res => {
                if (res.status === 400) {
                    res.json().then(err => setErrors(err.errors));
                } else if (res.status === 403) {
                    history.push('/Forbidden')
                } else {
                    history.push(`/courses/${id}`);
                }
            });
            
    }
    return (
        <div className="wrap">
          <h2>Update Course</h2>
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
                        <input onChange={(e) => setTitle(e.target.value)} id="courseTitle" name="courseTitle" type="text" value={title || ''}></input>
    
                        <p>By {`${auth.user.firstName} ${auth.user.lastName}`}</p>
    
                        <label>Course Description</label>
                        <textarea onChange={(e) => setDesc(e.target.value)} id="courseDescription" name="courseDescription" value={desc || ''}></textarea>
                    </div>
                    <div>
                        <label>Estimated Time</label>
                        <input onChange={(e) => setTime(e.target.value)} id="estimatedTime" name="estimatedTime" type="text" value={time || ''}></input>
    
                        <label>Materials Needed</label>
                        <textarea onChange={(e) => setMaterials(e.target.value)} id="materialsNeeded" name="materialsNeeded" value={materials || ''}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button><button type="button" className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            
          
        </div>
     )
}