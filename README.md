AsyncUnit
===

A trivial asynchronous unit test suite.

The important thing is that "this.complete(true||false)" is called at some point before the timeout occurs.

Installation
===

    npm install 'async-unit@*'
    ender build 'async-unit@*'
    pkmanager build 'async-unit@*'

Usage
===

Just add functions using `addTest` and make sure that they call `this.complete(true | false)` (which you can pass in as a callback) before the timeout you set.

Synchronous Example:

    AsyncUnit.addTest('My Test',function() {
      this.complete(true);
    }, 1000);

Asynchronous Example:

    function doSomethingAsync(cb) {
      setTimeout(function () {
        cb(true);
      }, 200);
    }

    AsyncUnit.addTest('My Test',function() {
      doSomethingAsync(this.complete);
    }, 100);

Listening to Events:

    AsyncUnit.runTests(function (emitter) {
      emitter.on('progress', function (item, status) {
        console.log('[ COMPLETE ]', item.name, status);
      }); 
    });

Full Example:

    (function () {
      "use strict";

      var AU = require('async-unit')
        , emitter
        ;

      //
      // Add tests
      //
      AU.addTest('My Test',function() {
        this.complete(true);
      }, 1000);

      AU.addTest('Mine Othern Test',function() {
        this.complete(true);
      }, 100);

      AU.addTest('Mine Other Othern Test',function() {
        this.complete(true);
      });


      //
      // Run and Report
      //
      AU.runTests(function (emitter) {
        emitter.on('start', function (item) {
          console.log('[ TESTING ]', item.name);
        }); 

        emitter.on('progress', function (item, status) {
          console.log('[COMPLETED]', item.name, status);
        }); 

        emitter.on('postTimeout', function (item, status) {
          console.log('[ SECONDED]', item.name, status);
        }); 

        emitter.on('end', function () {
          console.log('[   END   ]');
        }); 
      });

    }());

API
===

  * AsyncUnit.addTest(name, fn, timeout=750);
  * AsyncUnit.runTests(function (emitter) {});
    * start
    * progress
    * postTimeout
    * end

TODO
====

  * Practice my friend's XUnit Kata again
  * Write tests to test the framework itself
  * Add fixtures
