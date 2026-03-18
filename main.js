/* ===== DIRECTIONAL PAGE TRANSITION ===== */

document.addEventListener("DOMContentLoaded", function () {

    const curtain = document.querySelector(".page-curtain");
    const navLinks = document.querySelectorAll("nav a");

    // Reveal page on load
    window.addEventListener("load", () => {
        curtain.style.transform = "translateX(100%)";

        setTimeout(() => {
            curtain.style.display = "none";
        }, 700);
    });

    navLinks.forEach((link, index) => {

        const href = link.getAttribute("href");

        if (href && href.endsWith(".html")) {

            link.addEventListener("click", function (e) {
                e.preventDefault();

                curtain.style.display = "block";

                // Determine direction based on position
                const total = navLinks.length;
                const middle = total / 2;

                if (index < middle) {
                    // Left side navigation → slide from left
                    curtain.style.transform = "translateX(-100%)";
                    requestAnimationFrame(() => {
                        curtain.style.transform = "translateX(0)";
                    });
                } else {
                    // Right side navigation → slide from right
                    curtain.style.transform = "translateX(100%)";
                    requestAnimationFrame(() => {
                        curtain.style.transform = "translateX(0)";
                    });
                }

                setTimeout(() => {
                    window.location.href = href;
                }, 700);
            });

        }

    });

});
/* ================= CLEAN PAGE SLIDE TRANSITION ================= */

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll("a").forEach(link => {

        const href = link.getAttribute("href");

        // Only apply to internal html pages
        if (href && href.endsWith(".html")) {

            link.addEventListener("click", function (e) {
                e.preventDefault();

                document.body.classList.add("slide-out");

                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            });

        }

    });

});


/* ================= SCROLL FADE FOR .hidden ================= */

const sections = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));


/* ================= TYPING EFFECT ================= */

const text = "Creative Designer & Video Editor";
const typingElement = document.getElementById("typing-text");

let index = 0;

function typeEffect() {
    if (typingElement && index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 60);
    }
}

window.addEventListener("load", typeEffect);


/* ================= HERO PARALLAX ================= */

window.addEventListener("scroll", function () {

    const scrollValue = window.scrollY;
    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollValue * 0.2}px)`;
    }

});


/* ================= CUSTOM CURSOR ================= */

const cursor = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {

    if (cursor) {
        currentX += (mouseX - currentX) * 0.2;
        currentY += (mouseY - currentY) * 0.2;

        cursor.style.left = currentX + "px";
        cursor.style.top = currentY + "px";
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* Cursor Expand on Hover */

document.querySelectorAll("a, button").forEach(el => {

    el.addEventListener("mouseenter", () => {
        if (cursor) {
            cursor.style.width = "45px";
            cursor.style.height = "45px";
        }
    });

    el.addEventListener("mouseleave", () => {
        if (cursor) {
            cursor.style.width = "28px";
            cursor.style.height = "28px";
        }
    });

});


/* ================= HEADER HIDE ON SCROLL ================= */

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    const currentScroll = window.pageYOffset;

    if (header) {
        if (currentScroll > lastScroll && currentScroll > 50) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }
    }

    lastScroll = currentScroll;

});


/* ================= ABOUT CARD REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-fade"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));


/* ================= GSAP ABOUT ANIMATION ================= */

if (typeof gsap !== "undefined") {

    gsap.registerPlugin(ScrollTrigger);

    const aboutTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
            toggleActions: "play reverse play reverse"
        }
    });

    aboutTimeline.from("#about .about-title", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power4.out"
    });

    aboutTimeline.from("#about .about-text p", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
    }, "-=0.6");

}
/* ===== ACTIVE NAV DETECTION ===== */

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll("nav a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

});


const gifs = document.querySelectorAll(".gif-hover");

gifs.forEach(img => {
    const original = img.src;
    const gif = img.getAttribute("data-gif");

    img.addEventListener("mouseenter", () => {
        img.src = gif;
    });

    img.addEventListener("mouseleave", () => {
        img.src = original;
    });
});

