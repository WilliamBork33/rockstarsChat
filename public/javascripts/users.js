module.exports = function(io) {
  //////
  var users = {};
  var messages = [];

  io.on("connection", function(socket) {
    // Create User
    if (!users.hasOwnProperty(socket.id)) {
      users[socket.id] = {};
    }

    socket.emit("new-connection", {
      id: socket.id,
      messages: messages
    });

    socket.on("chat-message", function(msg) {
      console.log("message received on backend:", msg);
      a = JSON.stringify(msg);
      console.log(a);
      messages.push(msg);
      io.emit("chat-message", msg);
      //io.emit("chat-message", messages);
    });
  });
};
