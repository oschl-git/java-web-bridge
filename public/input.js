const socket = new WebSocket("ws://" + location.host);
const output = document.getElementById("output");
const ansi_up = new AnsiUp();
ansi_up.use_classes = true;

let inputLine = document.createElement("input");
inputLine.setAttribute("id", "input-line");
inputLine.setAttribute("autocomplete", "off");

inputLine.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = inputLine.value;
    socket.send(command);
    output.appendChild(document.createTextNode(command)); // Display the command

    output.appendChild(document.createElement("br")); // Break line

    inputLine.value = "";
    inputLine.remove();

    output.appendChild(inputLine);
    inputLine.focus();
    scrollToBottom();
  }
});

function scrollToBottom() {
  output.scrollTop = output.scrollHeight;
}

socket.onmessage = function (event) {
  const html = ansi_up.ansi_to_html(event.data);
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  while (tempDiv.firstChild) {
    output.appendChild(tempDiv.firstChild);
  }

  if (inputLine.parentNode) {
    inputLine.parentNode.removeChild(inputLine);
  }

  output.appendChild(inputLine);
  inputLine.focus();
  scrollToBottom();
};

window.addEventListener("click", () => inputLine.focus());
