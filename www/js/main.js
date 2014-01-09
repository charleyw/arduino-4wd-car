/*jslint browser: true, undef: true, evil: false,
 onevar: true, debug: false, on: false, eqeqeq: true */
/*global require */
require.config({
    paths: {

        // Core Libraries
        "jquery": "libs/jquery-1.9.1.min",
        "jquerymobile": "libs/jquery.mobile/jquery.mobile-1.4.0.min",
        "underscore": "libs/underscore-min"
    }
});

// Includes File Dependencies
require([ "jquery", "jquerymobile", "index" ], function( $, Mobile, app ) {

    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
    app.initialize();
} );