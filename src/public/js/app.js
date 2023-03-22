const msgList = document.querySelector("ul");
const msgForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

//메세지 받기
socket.addEventListener("open", () => {
  console.log("connected to browser 🫠");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  msgList.append(li);
  console.log("new message:", message.data);
});

socket.addEventListener("close", () => {
  console.log("Dissconnected from server 😈");
});

setTimeout(() => {
  socket.send("hello from the browser");
}, 10000);

const hendleSubmit = (e) => {
  e.preventDefault();
  const input = msgForm.querySelector("input");
  socket.send(input.value);
  console.log(input.value);
  input.value = "";
};

const handleNickSubmit = (e) => {
  e.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(input.value);
};
msgForm.addEventListener("submit", hendleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
