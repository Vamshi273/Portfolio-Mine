// ===============================
// WHITE BORDER FLOATING BOXES
// ===============================

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const TOP_OFFSET = 300;   // area you want empty
canvas.style.position = "fixed";
canvas.style.top = TOP_OFFSET + "px";canvas.style.left = "0";
canvas.style.zIndex = "-1";

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - TOP_OFFSET;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - TOP_OFFSET;
});

let boxes = [];

class Box {
  constructor() {
    this.size = Math.random() * 60 + 20;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) {
      this.speedX *= -1;
    }

    if (this.y > canvas.height || this.y < 0) {
      this.speedY *= -1;
    }
  }

  draw() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, this.y, this.size, this.size);
  }
}

function init() {
  boxes = [];
  for (let i = 0; i < 40; i++) {
    boxes.push(new Box());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boxes.forEach(box => {
    box.update();
    box.draw();
  });

  requestAnimationFrame(animate);
}

init();
animate();
/* =========================
   TYPING ANIMATION
========================= */

document.addEventListener("DOMContentLoaded", function () {

    new Typed(".typing", {
        strings: [
            "Python Developer",
            "Web Developer",
            "Debugger",
            "Creative Coder"
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    sections.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;

        if (sectionTop < triggerPoint) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }

    });

});

// Initial state
sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.8s ease";
});


/* =========================
   ACTIVE NAV LINK ON SCROLL
========================= */

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop &&
            pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

});


/* =========================
   EMAILJS CONTACT FORM
========================= */

// ⚠️ REPLACE THESE WITH YOUR EMAILJS KEYS
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

(function () {
    emailjs.init(PUBLIC_KEY);
})();

document.getElementById("contact-form")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const status = document.getElementById("status");
        status.innerHTML = "Sending...";
        status.style.color = "#aaa";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
            .then(function () {

                status.innerHTML = "Message Sent Successfully 🚀";
                status.style.color = "lightgreen";

                document.getElementById("contact-form").reset();

            }, function (error) {

                status.innerHTML = "Failed to Send Message ❌";
                status.style.color = "red";

            });

    });
