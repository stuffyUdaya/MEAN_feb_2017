// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
var server = app.listen(8000, function() {
  console.log("listening on port 8000");
});
// this is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
var io = require('socket.io').listen(server);
// // tell the express app to listen on port 8000
// app.listen(8000, function() {
//  console.log("listening on port 8000");
// })

// this selects our port and listens
// note that we're now storing our app.listen within
// a variable called server. this is important!!

// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);
  // If you don't know where this code is supposed to go reread the above info
socket.on("button_clicked", function (data){
    console.log('Someone clicked a button!  Reason: ' + data.reason);
    socket.emit('server_response', {response: "sockets are the best!"});
    // Emit: only the person who clicked
    // socket.emit('my_emit_event');
    // //  BROADCAST: all except the guy who clicked
    // socket.broadcast.emit("my_broadcast_event");
    // //  FULL BROADCAST:  all including the guy who clicked
    // io.emit("my_full_broadcast_event");
});

  //all the socket code goes in here!
});
