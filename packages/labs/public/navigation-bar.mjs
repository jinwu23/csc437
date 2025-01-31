import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <nav id="navbar">
        <div id="header_menu_div">
            <h1 id="header_text">Jin Wu</h1>
            <div>
                <label id="color_toggle_mobile">
                    <input type="checkbox" autocomplete="off" />
                    Dark mode
                </label>
                <button id="menu_button"> Menu </button>
            </div>
        </div>   
        <a class="nav_link hidden" id="home_link" href="./index.html">Home</a>
        <a class="nav_link hidden" id="hobbies_link" href="./hobbies.html">Hobbies</a>
        <label id="color_toggle_desktop">
            <input type="checkbox" autocomplete="off" />
            Dark mode
        </label>
    </nav>

    <style>
        #navbar {
            margin: 0rem;
            padding: 0rem 1rem;
            background-color: var(--color-background-navbar);
        }

        #header_menu_div {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        h1, a, button, label {
            color: var(--color-text-primary);
            font-family: var(--font-family-primary), var(--font-family-generic);
            font-weight: 550;
        }

        button {
            border: 0;
            background-color: var(--color-button-background);
        }

        #header_text {
            font-size: var(--heading1-font-size);
            color: var(--color-text-primary-dark);
            margin-right: 2rem;
        }

        a{
            font-size: 1.25rem;
            display: block;
            text-decoration: none;
        }

        #hobbies_link{
            margin-top: 1rem;
            padding-bottom: 1rem;
        }

        .nav_link {
            margin-right: 0.625rem;
        }

        .active{
            text-decoration: underline;
        }

        #menu_button {
            border-radius: 0.65rem;
            padding: 0.75rem 1.5rem;
        }

        .hidden {
            display: none;
        }
        
        #color_toggle_mobile {
            margin-right: 1rem;
        }

        #color_toggle_desktop {
            display: none;
        }

        @media only screen and (min-width: 768px) {
            #menu_button {
                display: none;
            }
            #navbar {
                display: flex;
                align-items: baseline;
                gap: 1rem;
            }
            .nav_link {
                display: block;
            }
            #color_toggle_mobile {
                display: none;
            }
            #color_toggle_desktop {
                display: block;
                margin-left: auto;
            }
        }
    </style>
`;

class NavigationBar extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);
        this.addDocumentEventListener(shadowRoot);
        this.setActiveNavbarLink(shadowRoot);
        this.addButtonEventListener(shadowRoot);
        this.addColorToggleEventListener(shadowRoot);

        // Sync page with dark-mode in local store
        this.syncWithDarkMode();
    }

    // Adds class "active" to current page link in navbar
    setActiveNavbarLink(shadowRoot) {
        const currentPage = getCurrentPage();
        const navLinks = shadowRoot.querySelectorAll('.nav_link');

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const linkPage = extractPageName(linkHref);
            if (linkPage === currentPage) {
                link.classList.add("active");
            }
        })
    }

    // Adds event listener to document
    addDocumentEventListener(shadowRoot) {
        const navLinks = shadowRoot.querySelectorAll('.nav_link');

        document.addEventListener("click", (event) => {
            // Check if click was outside navbar
            if (!event.target.closest("navigation-bar")) {
                // Check if already hidden 
                navLinks.forEach(link => {
                    if (!link.classList.contains('hidden')) {
                        this.toggleMenuVisibility(shadowRoot);
                    }
                });
            }
        })
    }

    // Adds event listener to button 
    addButtonEventListener(shadowRoot) {
        const button = this.shadowRoot.getElementById("menu_button");
        button.addEventListener("click", () => {
            this.toggleMenuVisibility(shadowRoot);
        })
    }

    // adds and removes the class .hidden to nav links
    toggleMenuVisibility(shadowRoot) {
        const navLinks = shadowRoot.querySelectorAll('.nav_link');
        navLinks.forEach(link => {
            link.classList.toggle('hidden');
        })
    }

    // Adds event listener to color toggles
    addColorToggleEventListener(shadowRoot) {
        const mobile_toggle = this.shadowRoot.getElementById("color_toggle_mobile");
        const desktop_toggle = this.shadowRoot.getElementById("color_toggle_desktop");

        mobile_toggle.addEventListener("change", () => {
            this.toggleDarkMode();
        })

        desktop_toggle.addEventListener("change", () => {
            this.toggleDarkMode();
        })
    }

    toggleDarkMode() {
        const body = document.body;
        let darkMode = localStorage.getItem("dark-mode");

        // Toggle the Dark Mode 
        if (darkMode === "true") {
            body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "false");
        } else {
            body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "true");
        }

        // Sync both mobile and desktop toggles
        const mobileToggle = this.shadowRoot.getElementById("color_toggle_mobile").querySelector("input");
        const desktopToggle = this.shadowRoot.getElementById("color_toggle_desktop").querySelector("input");
        darkMode = localStorage.getItem("dark-mode");
        mobileToggle.checked = (darkMode === "true");
        desktopToggle.checked = (darkMode === "true");
    }

    syncWithDarkMode() {
        const body = document.body;
        let darkMode = localStorage.getItem("dark-mode");

        // Sync the Dark Mode 
        if (darkMode === "true") {
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
        }

        // Sync both mobile and desktop toggles
        const mobileToggle = this.shadowRoot.getElementById("color_toggle_mobile").querySelector("input");
        const desktopToggle = this.shadowRoot.getElementById("color_toggle_desktop").querySelector("input");
        darkMode = localStorage.getItem("dark-mode");
        mobileToggle.checked = (darkMode === "true");
        desktopToggle.checked = (darkMode === "true");
    }
    
}

function getCurrentPage() {
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname.endsWith('/')) {
        return 'index.html';
    }
    return pathname.split("/").pop();
};

function extractPageName(href) {
    return href.split("?")[0].split("#")[0].split("/").pop();
}

customElements.define("navigation-bar", NavigationBar);