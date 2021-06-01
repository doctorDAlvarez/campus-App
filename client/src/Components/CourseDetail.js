import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAuth } from './use-auth';

const CourseDetail = (props) => {
    const [course, setCourse] = useState({});
    const [user, setUser] = useState({});
    let {id} = useParams();
    let auth = useAuth();
    let history = useHistory();
    //console.log(auth.user);
    
    useEffect(() => {
            fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setCourse(res);
                        setUser(res.User);
                    });
                } else if (res.status === 404) {
                    history.push('/NotFound');    
                } else if (res.status === 500) {
                    history.push('/error')
                }
            })
            .catch(err => history.push('/error'))
    },[])    

    const handleDelete = () => {
        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Basic ${auth.credentials}`},
        })
        .then(res => {
            if ( res.status === 204 ) {
                history.push('/');
            } else if ( res.status === 403) {
                history.push('/Forbidden');
            } else if ( res.status === 404) {
                history.push('/NotFound')
            } else if ( res.status === 401) {
                history.push('/Unauthorized')
            } else {
                history.push('/error')
            }
        });
    }

    return (
        <div> 
          <div className="actions--bar">
            {
            auth.user && user.id === auth.user.id ? 
            <div className="wrap">
                <Link to={`/courses/${course.id}/update`} className="button">Update Course</Link>
                <Link to='#' onClick={handleDelete} className="button">Delete Course</Link>
                <Link to='/' className="button button-secondary">Return to List</Link>
            </div> :
            <div className="wrap">
                <Link to='/' className="button button-secondary">Return to List</Link>
            </div>
            }
        </div>
        
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>{`by ${user.firstName} ${user.lastName}`}</p>
                        <ReactMarkdown>
                            {course.description}
                        </ReactMarkdown>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{course.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                            <ReactMarkdown>
                                {course.materialsNeeded}
                            </ReactMarkdown>
                          
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        </div>
    )
}

export default CourseDetail;