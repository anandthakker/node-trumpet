var trumpet = require('../');
var test = require('tape');
var concat = require('concat-stream');
var fs = require('fs');

test('no selectors', function (t) {
    t.plan(1);

    var tr = trumpet();

    fs.createReadStream(__dirname + '/abort.html').pipe(tr).pipe(concat(function(b){
      t.ok(b.toString().indexOf('AFTER') > -1);
    }));
});


test('select something', function (t) {
    t.plan(1);

    var tr = trumpet();
    tr.selectAll('.part1', function(e){
      rs = e.createReadStream();
      ws = e.createWriteStream();
      rs.pipe(ws);
    });

    fs.createReadStream(__dirname + '/abort.html').pipe(tr).pipe(concat(function(b){
      t.ok(b.toString().indexOf('AFTER') > -1);
    }));
});



