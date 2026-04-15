// =======================
// DATA USER (ROLE)
// =======================
const users = [
{ username: "admin", password: "12345", role: "admin" },
{ username: "user", password: "12345", role: "viewer" }
];

// =======================
// LOGIN
// =======================
function login() {
let userInput = document.getElementById("username").value;
let passInput = document.getElementById("password").value;

let foundUser = users.find(u =>
u.username === userInput && u.password === passInput
);

if (foundUser) {
localStorage.setItem("isLogin", "true");
localStorage.setItem("role", foundUser.role);

```
window.location.href = "dashboard.html";
```

} else {
alert("Username atau password salah!");
}
}

// =======================
// CEK LOGIN (PROTEKSI)
// =======================
function checkLogin() {
let isLogin = localStorage.getItem("isLogin");
if (!isLogin) {
window.location.href = "index.html";
}
}

// =======================
// LOGOUT
// =======================
function logout() {
localStorage.clear();
window.location.href = "index.html";
}

// =======================
// LOAD DATA (HANYA DI DASHBOARD)
// =======================
function loadData() {
let table = document.querySelector("#dataTable tbody");

if (!table) return; // biar tidak error di halaman login

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTPECeaQ5IECbtg7YXmvWUJzxEBAl2t5dcLc25GsFPGJtoob1x62gESzV7D7WyviIUBfFaUdCYDIz56/pub?output=csv")
.then(res => res.text())
.then(data => {
let rows = data.split("\n").slice(1);

```
  rows.forEach(row => {
    let cols = row.split(",");
    let tr = document.createElement("tr");

    cols.forEach(col => {
      let td = document.createElement("td");
      td.innerText = col;
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });
});
```

}

// =======================
// HANDLE ROLE DI DASHBOARD
// =======================
function handleRole() {
let role = localStorage.getItem("role");

let roleInfo = document.getElementById("roleInfo");
let adminBtn = document.getElementById("adminBtn");

if (roleInfo) {
roleInfo.innerText = "Login sebagai: " + role;
}

if (adminBtn && role === "admin") {
adminBtn.style.display = "inline-block";
}
}

// =======================
// AUTO JALAN SAAT HALAMAN LOAD
// =======================
window.onload = function () {
checkLogin();
loadData();
handleRole();
};
