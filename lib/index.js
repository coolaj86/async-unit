(function() {
  "use strict";

  var JSUnit = module.exports
    , EventEmitter = require('events').EventEmitter
    , emitter = new EventEmitter()
    , tests = {}
    , runableTests = []
    , num_tests = 0
    , num_over = 0
    , num_passed = 0
    , completeTest
    , addTest
    , runTests
    ;

  completeTest = function (status) {
    var item = this
      ;

    if (undefined === item.result) {
      num_over += 1;
      clearTimeout(item.timeout);
    } else {
      emitter.emit('postTimeout', item, status);
    }

    item.result = status;
    if (true == item.result) {
      num_passed += 1;
    }

    emitter.emit('progress', item, status);

    if (num_over === runableTests.length) {
      setTimeout(function () {
        emitter.emit('end');
      }, 10);
    }
  };

  addTest = function(name, func, wait) {
    var lname = name.toLowerCase().replace(/\W/g,'_')
      , i = runableTests.length
      , testItem
      , complete
      ;

    wait = wait || 10000; // 10s is perhaps even too reasonable of a default limit
    
    num_tests += 1;
    testItem = {};
    testItem.result = undefined;
    testItem.lname = lname;
    testItem.name = name;
    testItem.wait = wait;
    runableTests.push(testItem);

    testItem.complete = function (result) {
      completeTest.call(testItem, result);
    }

    testItem.func = function() {
      func.call({
        complete: testItem.complete
      });
    }
  };

  runTests = function(cb) {
    if (cb) {
      cb(emitter);
    }

    runableTests.forEach(function (item) {
      setTimeout(function () {
        item.timeout = setTimeout(function() {
          num_over += 1;
          item.complete(false);
        }, item.wait);

        emitter.emit('start', item);

        try {
          item.func();
        } catch(ignore) {
          clearTimeout(item.timeout);
          item.complete(false);
        }
      }, 10);
    });

    return emitter;
  };
  
  JSUnit.addTest = addTest;
  JSUnit.runTests = runTests;
}());
