//
// Create WebSocket connection.
const sock = new WebSocket("ws://localhost:8080");
sock.onmessage = function(event) {
  var msg = event.data;
  var app = document.getElementById("app")
  app.innerHTML = render(msg)
}
function render(msg){
  var component = ""
  msg = msg.split("\n")
  for (let m of msg)
  {
    m = m.split("%")[0]
    component = component + `<div>${m}</div>`
  }
  return component;
}
