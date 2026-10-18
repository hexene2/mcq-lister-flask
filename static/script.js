let toggleThemeBTN = document.getElementById("toggleTheme");

console.log("JavaScript is working!");

// Load saved theme
if (localStorage.getItem("dark") === "active") {
    document.body.classList.add("dark");
}

toggleThemeBTN.addEventListener("click", toggleTheme);

function toggleTheme() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("dark", "active");
    } else {
        localStorage.setItem("dark", "inactive");
    }
}