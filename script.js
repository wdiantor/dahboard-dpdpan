function login() {
let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if (user === "admin" && pass === "12345") {
window.location.href = "dashboard.html";
} else {
alert("Login gagal!");
}
}
fetch("LINK_CSV_KAMU")
.then(res => res.text())
.then(data => {
let rows = data.split("\n").slice(1);

```
let table = document.querySelector("#dataTable tbody");

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
```

});

function logout() {
window.location.href = "index.html";
}
