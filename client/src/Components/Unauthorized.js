import React from 'react';

export default function Unauthorized() {
    return(
        <div className="wrap">
            <h2>Authentication Error</h2>
            <p>Failed to authenticate user.</p>
        </div>
    )
}