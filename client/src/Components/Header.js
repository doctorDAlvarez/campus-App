import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './use-auth.js';

function Header() {
    // Get auth state and re-render anytime it changes
    const auth = useAuth();

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to='/'>Courses</Link></h1>
                <nav>
                {
                    auth.user ? (
                        <React.Fragment>
                        <ul className="header--signedout">
                            <span>Welcome  {`${auth.user.firstName} ${auth.user.lastName}`}</span>
                            <Link to='/' onClick={auth.signout}> Sign Out</Link>
                        </ul> 
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        <ul className="header--signedout">
                          <li><Link to='/signup'>Sign Up</Link></li>
                          <li><Link to='/signin'>Sign In</Link></li>
                        </ul> 
                        </React.Fragment>
                    )
                }     
            </nav>
        </div>
        </header>
    )
}

export default Header;