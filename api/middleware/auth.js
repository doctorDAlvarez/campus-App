'use strict';
const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');
// Authentication function using Basic Schema.

exports.authenticateUser = async (req, res, next) => {
    //parsing credentials received.
    const credentials = auth(req);
    let errormessage;

    if (credentials) {
        const user = await User.findOne({
            where: {
                emailAddress: credentials.name
            }
        });
        if (user) {
            const authenticated = bcrypt
                .compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`Auth for ${user.emailAddress} OK!`);
                req.currentUser = user;
            } else {
                errormessage = `Authentication failed for: ${user.emailAddress}`; 
            }
        } else {
            errormessage = `User ${credentials.name} not found on database`;
        }
    } else {
        errormessage = 'Auth header not found';
    }
    if (errormessage) {
        console.warn(errormessage);
        res.status(401).json({message: 'Access Denied'});
    } else {
        next();
    }
}