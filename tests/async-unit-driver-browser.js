(function () {
  "use strict";

  var au = require('async-unit')
    , emitter
    ;

  au.addTest('My Test',function() {
    this.complete(true);
  }, 1000);

  au.addTest('My Other Test',function() {
    this.complete(true);
  }, 1000);

  $(function () {
    $('<div id="ajax_unit_test"><span id="aut_num_tests"></span></div>').appendTo("body");

    emitter = au.runTests();

    emitter.on('start', function (item) {
      $("<div id='"+item.lname+"'></div>").appendTo("#ajax_unit_test").html('"'+item.name+'"<span style=\'color:orange\'> running...</span>');
      $('#aut_num_tests').html(num_tests + ' tests running...');
    });

    emitter.on('progress', function (item, status) {
      status = status && "<span style='color:green;'>Passed</span>" || "<span style='color:red;'>Failed</span>"
      $('#'+item.lname).html('"'+item.name+'" ' + status);
    });
  });

}());
