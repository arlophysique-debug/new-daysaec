// script.js (install-free version)
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if(users.find(u => u.email === email)){
    alert("User already exists");
    return;
  }

  users.push({ email, password, history: [] });
  localStorage.setItem("users", JSON.stringify(users));
  alert("User Registered!");
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if(!user){
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", email);
  window.location.href = "index.html";
}

function saveSearch() {
  const query = document.getElementById("searchBox").value;
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let currentUser = localStorage.getItem("currentUser");

  users = users.map(u => {
    if(u.email === currentUser){
      u.history.push(query);
    }
    return u;
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("Search saved!");
}

function loadHistory() {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let currentUser = localStorage.getItem("currentUser");
  const user = users.find(u => u.email === currentUser);
  if(user){
    console.log(user.history);
  }
}