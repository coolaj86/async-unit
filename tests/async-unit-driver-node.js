(function () {
  "use strict";

  var au = require('../lib')
    , emitter
    ;


  function doSomethingAsync(cb) {
    setTimeout(function () {
      cb(true);
    }, 112);
  }

  // add the tests
  au.addTest('My Test',function() {
    doSomethingAsync(this.complete);
  }, 1000);

  au.addTest('Mine Othern Test',function() {
    this.complete(true);
  }, 100);

  au.addTest('Mine Other Othern Test',function() {
    this.complete(true);
  }, 1000);


  // run the tests
  console.log('[   PREP  ]');

  au.runTests(function (emitter) {
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
