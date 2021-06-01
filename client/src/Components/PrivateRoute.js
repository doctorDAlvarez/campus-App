import React from 'react';
import {
    Route,
    Redirect,
  } from 'react-router-dom';
import { useAuth } from './use-auth';

export default function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          {if (auth.user) {
            return (
            children
          )
          } else {
            return (
              <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
            )
          }
        }}
      />
    );
  }