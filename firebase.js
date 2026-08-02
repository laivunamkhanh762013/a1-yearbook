import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "DÁN_VÀO",
  authDomain: "DÁN_VÀO",
  databaseURL: "DÁN_VÀO",
  projectId: "DÁN_VÀO",
  storageBucket: "DÁN_VÀO",
  messagingSenderId: "DÁN_VÀO",
  appId: "DÁN_VÀO"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.sendMessage = function() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if(msg === "") return;

  push(ref(db, "chat"), {
    text: msg,
    time: Date.now()
  });

  input.value = "";
}

function loadMessages() {
  const box = document.getElementById("messages");

  onChildAdded(ref(db, "chat"), (snapshot) => {
    const data = snapshot.val();

    let div = document.createElement("div");
    div.innerText = data.text;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  });
}

window.handleKey = function(e) {
  if(e.key === "Enter") sendMessage();
}

loadMessages();