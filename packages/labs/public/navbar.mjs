import { toHtmlElement } from "./toHtmlElement.mjs";

const navbar =
    `<nav id = "navbar">
        <h1 id="header_text">Jin Wu</h1>
        <a class="nav_link" href="./index.html">Home</a>
        <a class="nav_link" href="./hobbies.html">Hobbies</a>
    </nav>`;

function getCurrentPage() {
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname.endsWith('/')) {
        return 'index.html';
    }
    return pathname.split("/").pop();
};

console.log(`Running mj on ${getCurrentPage()}`);

window.addEventListener("DOMContentLoaded", () => {
    // Get current navbar 
    const currNavbar = document.getElementById("navbar");
    if (!currNavbar) {
        console.error("Navbar container with id 'navbar' not found");
        return;
    }
    // Get new navbar and current page
    const newNavbar = toHtmlElement(navbar);
    const currentPage = getCurrentPage();
    // Select all <a> with class of 'nav_link' 
    const navLinks = newNavbar.querySelectorAll('.nav_link');
    // Compare each link with current page
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split("/").pop();
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
    // Replace current navbar with new one 
    currNavbar.parentNode.replaceChild(newNavbar, currNavbar);
});

