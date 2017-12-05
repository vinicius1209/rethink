
var express = require("express");
var sockio = require("socket.io");
var r = require("rethinkdb");

var app = express();
app.use(express.static(__dirname + "/public"));

var io = sockio.listen(app.listen(8099), {log: false});
console.log("Server started on port " + 8099);

r.connect({db: "rethinkdb_ex"}).then(function(c) {
  r.table("produtos").changes().run(c)
    .then(function(cursor) {
      cursor.each(function(err, item) {
        io.sockets.emit("stats", item);
      });
    });
});

io.sockets.on("connection", function(socket) {
  r.connect({db: "rethinkdb"}).then(function(c) {
    r.table("stats").changes().run(c)
    .then(function(cursor) {
      cursor.each(function(err, item) {
        io.sockets.emit("server_stats", item);
	  });
	});
  });
});

