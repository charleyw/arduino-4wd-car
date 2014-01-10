var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    paths: {
        // Core Libraries
        "jquery": "js/libs/jquery-1.9.1.min",
        "jquerymobile": "js/libs/jquery.mobile/jquery.mobile-1.4.0.min",
        "underscore": "js/libs/underscore-min",
        "jasminejquery": "test/helper/jasmine-jquery"
    },
    shim: {
        "jasminejquery":{
            deps: ["jquery"]
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});