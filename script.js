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
const userInput = document.getElementById("username").value;
const passInput = document.getElementById("password").value;

const foundUser = users.find(u =>
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
const isLogin = localStorage.getItem("isLogin");

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
// LOAD DATA (GOOGLE SHEETS)
// =======================
function loadData() {
const table = document.querySelector("#dataTable tbody");

// supaya tidak error di halaman login
if (!table) return;

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTPECeaQ5IECbtg7YXmvWUJzxEBAl2t5dcLc25GsFPGJtoob1x62gESzV7D7WyviIUBfFaUdCYDIz56/pub?output=csv")
.then(res => res.text())
.then(data => {
const rows = data.split("\n").slice(1);

```
  rows.forEach(row => {
    if (!row.trim()) return; // skip baris kosong

    const cols = row.split(",");
    const tr = document.createElement("tr");

    cols.forEach(col => {
      const td = document.createElement("td");
      td.innerText = col;
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });
})
.catch(err => {
  console.error("Gagal load data:", err);
});
```

}

// =======================
// HANDLE ROLE
// =======================
function handleRole() {
const role = localStorage.getItem("role");

const roleInfo = document.getElementById("roleInfo");
const adminBtn = document.getElementById("adminBtn");

if (roleInfo) {
roleInfo.innerText = "Login sebagai: " + role;
}

if (adminBtn && role === "admin") {
adminBtn.style.display = "inline-block";
}
}

// =======================
// AUTO LOAD HALAMAN
// =======================
window.onload = function () {
// hanya jalan di dashboard
if (window.location.pathname.includes("dashboard.html")) {
checkLogin();
loadData();
handleRole();
}
};
