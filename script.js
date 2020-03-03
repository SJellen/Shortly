


const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector("nav");

function toggleMenu() {
    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
    } else {
        menu.classList.add("open");
    }
}

hamburger.addEventListener('click', toggleMenu);