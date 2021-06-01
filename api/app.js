'use strict';
// load modules
const express = require( 'express' );
const morgan = require( 'morgan' );
const {
  sequelize
} = require( './models' )
const routes = require( './Routes/routes' );
const cors = require('cors');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING ===
  'true';

// create the Express app
const app = express();

// Testing the connection and sync with database
( async () => {
  try {
    await sequelize.authenticate();
    console.log( "Connection Established with database" );
    await sequelize.sync();
    console.log('DATABASE SYNCED');
  } catch ( err ) {
    console.log( 'Error connecting', err );
  }
} )();

//Enabling CORS for all origins!.
app.use(cors());
// parsing body of request to json.
app.use( express.json() );

// setup morgan which gives us http request logging
app.use( morgan( 'dev' ) );

// adding routes to /api endpoints
app.use( '/api', routes );

// send 404 if no other route matched
app.use( ( req, res ) => {
  res.status( 404 )
    .json( {
      message: 'Route Not Found',
    } );
} );

// setup a global error handler
app.use( ( err, req, res, next ) => {
  if ( enableGlobalErrorLogging ) {
    console.error( `Global error handler: ${JSON.stringify(err.stack)}` );
  }
  res.status( err.status || 500 )
    .json( {
      message: err.message,
      error: err.status,
    } );
} );

// set our port
app.set( 'port', process.env.PORT || 5000 );

// start listening on our port
const server = app.listen( app.get( 'port' ), () => {
  console.log(
    `Express server is listening on port ${server.address().port}` );
} );

