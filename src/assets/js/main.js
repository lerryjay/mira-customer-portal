// ICON TOGGLE
(function () {

    "use strict";

    let toggles = document.querySelectorAll("a > li > .fa-chevron-left");

    for (let i = toggles.length - 1; i >= 0; i--) {
        let toggle = toggles[i];
        toggleHandler(toggle);
    };

    function toggleHandler(toggle) {
        toggle.addEventListener("mouseenter", function (e) {
            e.preventDefault();

            if (this.classList.contains("fa-chevron-left") === true) {
                this.classList.remove("fa-chevron-left");
                this.classList.add("fa-chevron-right");
            }
            else if (this.classList.contains("fa-chevron-right") === true) {
                this.classList.remove("fa-chevron-right");
                this.classList.add("fa-chevron-left");
            }
        });
        toggle.addEventListener("mouseleave", function (e) {
            e.preventDefault();

            if (this.classList.contains("fa-chevron-right") === true) {
                this.classList.remove("fa-chevron-right");
                this.classList.add("fa-chevron-left");
            }
        });
    }

})();

// Make Form Editable
let edit = document.querySelector('#edit');
let input = document.getElementsByTagName('input');


for (let d = input.length - 1; d >= 0; d--) {
    edit.addEventListener("click", function (e) {
        input[d].removeAttribute("disabled");
    });
};

//Toggle Dark/Light mode
const btn = document.querySelector("#btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");
const home = document.querySelector(".home")
const homeChart = document.querySelector(".home-chart");
const tableCard = document.querySelector("#table.card");
const tableborder = document.querySelector("#table .table-bordered");
const tableText = document.querySelector("#text");
const moon = document.querySelector(".fa-moon");
const sun = document.querySelector(".fa-sun");

moon.addEventListener("click", () => {

    moon.classList.add("sr-only");
    sun.classList.remove("sr-only");
});
sun.addEventListener("click", () => {
    moon.classList.remove("sr-only");
    sun.classList.add("sr-only");
});
if (currentTheme == "dark") {
    home.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
    home.classList.toggle("light-theme");
}

moon.addEventListener("click", function () {
    if (prefersDarkScheme.matches) {
        home.classList.toggle("light-theme");
        homeChart.classList.toggle("light-theme");
        tableCard.classList.toggle("light-theme");
        tableborder.classList.toggle("light-theme");
        tableText.classList.toggle("text-white");
        let theme = home.classList.contains("light-theme") ? "light" : "dark";
    } else {
        home.classList.toggle("dark-theme");
        homeChart.classList.toggle("dark-theme");
        tableCard.classList.toggle("dark-theme");
        tableborder.classList.toggle("dark-theme");
        let theme = home.classList.contains("dark-theme") ? "dark" : "light";
    }
    localStorage.setItem("theme", home);
});

sun.addEventListener("click", function () {
    if (prefersDarkScheme.matches) {
        home.classList.toggle("light-theme");
        homeChart.classList.toggle("light-theme");
        tableCard.classList.toggle("light-theme");
        tableborder.classList.toggle("light-theme");
        tableText.classList.toggle("text-white");
        let theme = home.classList.contains("light-theme") ? "light" : "dark";
    } else {
        home.classList.toggle("dark-theme");
        homeChart.classList.toggle("dark-theme");
        tableCard.classList.toggle("dark-theme");
        tableborder.classList.toggle("dark-theme");
        let theme = home.classList.contains("dark-theme") ? "dark" : "light";
    }
    localStorage.setItem("theme", home);
});

