import React, {useState, useEffect} from 'react';
import Header from './Components/Header.js';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import CreateCourse from './Components/CreateCourse';
import PrivateRoute from './Components/PrivateRoute';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import UpdateCourse from './Components/UpdateCourse';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ProvideAuth } from './Components/use-auth';
import Unauthorized from './Components/Unauthorized.js';
import UnhandledError from './Components/UnhandledError';


function App() {
  return (
    <ProvideAuth>
      <Router>
      <Header />
        <Switch>
          
          <Route exact path='/' component={Courses} />
          
          <PrivateRoute path='/courses/create'>
            <CreateCourse />
          </PrivateRoute>
          
          <PrivateRoute path='/courses/:id/update'>
            <UpdateCourse />
          </PrivateRoute>
          
          <Route path='/courses/:id'>
            <CourseDetail />
          </Route>
          
          <Route path='/signin'>
            <SignIn />
          </Route>
          
          <Route path='/forbidden'>
            <Forbidden />
          </Route>

          <Route path='/error'>
            <UnhandledError />
          </Route>

          <Route path='/Unauthorized'>
            <Unauthorized />
          </Route>
          
          <Route path='/signup'>
            <SignUp />
          </Route>
          
          <Route path='/notfound'>
            <NotFound />
          </Route>

          <Route>
            <NotFound />
          </Route>
        
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
