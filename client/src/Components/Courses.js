import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    let history = useHistory();
    
    useEffect(() => {
        fetch('http://localhost:5000/api/courses')
            .then(res => {
                if (res.status === 200) {
                    return res.json().then(res => setCourses(res));
                } else if (res.status === 500) {
                    history.push('/error');
                }
            })
            .catch(err => {
                console.log(err);
                //history.push('/error');
            })
    },[history])

    return (
        <main>
          <div className="wrap main--grid">
            { courses.length !== 0 ? courses.map(course => {
                return (
                <Link key={course.id} className="course--module course--link" to={`courses/${course.id}`}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
                )
            }) : null}
            <Link className="course--module course--add--module" to="/courses/create">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </Link>
          </div>
        </main>
    )
}

export default Courses;