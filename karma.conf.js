// Karma configuration
// Generated on Tue Jan 07 2014 22:22:51 GMT+0800 (CST)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: 'www',


        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
//        'js/libs/jquery-1.9.1.min.js','js/libs/jquery.mobile/jquery.mobile-1.4.0.min.js', 'js/*.js', 'test/**/*spec.js', 'test/helper/*.*',
            { pattern: 'js/libs/**/*.js', included: false },
            { pattern: 'js/*.js', included: false },
            { pattern: 'test/**/*spec.js', included: false },
            'test/helper/*.js',
            'test/test-main.js'
        ],


        // list of files to exclude
        exclude: [
            '**/*.swp',
            'js/main.js'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};