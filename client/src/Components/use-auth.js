import React, {useState, useContext, createContext} from 'react';
import Cookies from 'js-cookie';
const authContext = createContext();

// Provider component that wraps the app and makes auth object...
// ...available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state

function useProvideAuth() {
    const [user, setUser] = useState(Cookies.getJSON('authenticatedUser'));
    const [credentials, setCredentials] = useState(Cookies.getJSON('credentials'));
    
    const signin = (email, password, cb) => {
        const encodedCredentials = btoa(`${email}:${password}`)
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`,
            }
        }
        
        
    return fetch(`http://localhost:5000/api/users`, options)
            .then(res => {
              if (res.status === 200) {
                      res.json().then(data => {
                      setUser(data);
                      setCredentials(encodedCredentials);
                      cb();
                      Cookies.set('authenticatedUser', JSON.stringify(data), {expires: 1});
                      Cookies.set('credentials', JSON.stringify(encodedCredentials), {expires: 1});
                      return null;
                  });
              }
              else if (res.status === 401) {
                  return res.json().then(error => error.message);
              } 
              else {
                  throw new Error();
              }
            })  
    }

    const signup = (firstName, lastName, email, password) => {
        const body = {
            firstName,
            lastName,
            emailAddress: email,
            password
        };
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        return fetch('http://localhost:5000/api/users', options)
            .then(res => {
                if (res.status === 400) {
                    return res.json().then(errors => errors.errors)
                } else {
                    return [];
                }
            })

    }

    const signout = () => {
        Cookies.remove('authenticatedUser');
        Cookies.remove('credentials');
        return setUser(false);
            
    };


    return {
        user,
        credentials,
        signin,
        signout,
        signup,
    };
}


