var socket = io();

var submit = document.getElementById("btn");
var message = document.getElementById("messageBox");

submit.addEventListener("click", function(e) {
  socket.emit("chat-message", message.value);
  e.preventDefault();
});

socket.on("chat-message", function(msg) {
  let li = document.createElement("li");
  li.innerText = `User: ${socket.id} Message: ${msg}`;
  document.querySelector("ul#messages").appendChild(li);
  console.log(socket.id);
});
