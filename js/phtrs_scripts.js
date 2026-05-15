const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");
const filters = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("[data-category]");
const contactToggle = document.querySelector("[data-toggle-contact]");
const contactPanel = document.querySelector("[data-contact-panel]");
const copyButtons = document.querySelectorAll("[data-copy]");

function activateTab(tabName) {
    tabs.forEach((tab) => {
        tab.classList.toggle("is-active", tab.dataset.tab === tabName);
    });

    panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.panel === tabName);
    });
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        activateTab(tab.dataset.tab);
        history.replaceState(null, "", `#${tab.dataset.tab}`);
    });
});

filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        const category = filter.dataset.filter;

        filters.forEach((item) => item.classList.toggle("is-active", item === filter));
        projects.forEach((project) => {
            const categories = project.dataset.category.split(" ");
            project.classList.toggle("is-hidden", category !== "all" && !categories.includes(category));
        });
    });
});

if (contactToggle && contactPanel) {
    contactToggle.addEventListener("click", () => {
        const isOpen = contactPanel.classList.toggle("is-open");
        contactToggle.textContent = isOpen ? "Hide Contacts" : "Show Contacts";
    });
}

copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const originalText = button.textContent;

        try {
            await navigator.clipboard.writeText(button.dataset.copy);
            button.textContent = "Copied";
            setTimeout(() => {
                button.textContent = originalText;
            }, 1400);
        } catch (error) {
            window.location.href = `mailto:${button.dataset.copy}`;
        }
    });
});

const initialTab = window.location.hash.replace("#", "");
if (initialTab && document.querySelector(`[data-tab="${initialTab}"]`)) {
    activateTab(initialTab);
}

let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (!slides.length) {
        return;
    }

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i += 1) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i += 1) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";

    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Email copied to clipboard!");
    }).catch((error) => {
        console.error("Failed to copy: ", error);
    });
}

showSlides(slideIndex);
