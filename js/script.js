/* ─── AFRAH PORTFOLIO — script.js ─── */

/* 1 ─ TYPED TEXT EFFECT */
const phrases = [
  "Business Analyst",
  "Data Analyst",
  "Web Developer",
  "Problem Solver",
  "CS Student"
];
let pIndex = 0, cIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typedText");

function type() {
  if (!typedEl) return;
  const current = phrases[pIndex];
  typedEl.textContent = isDeleting
    ? current.slice(0, cIndex--)
    : current.slice(0, cIndex++);

  let delay = isDeleting ? 55 : 90;
  if (!isDeleting && cIndex > current.length) {
    delay = 1800; isDeleting = true;
  } else if (isDeleting && cIndex < 0) {
    isDeleting = false; pIndex = (pIndex + 1) % phrases.length; delay = 300;
  }
  setTimeout(type, delay);
}
type();

/* 2 ─ NAVBAR SCROLL STYLE */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

/* 3 ─ MOBILE MENU */
const menuBtn  = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* 4 ─ SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* 5 ─ SCROLL REVEAL */
const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
const observer  = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

/* 6 ─ CONTACT FORM */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim() || "Portfolio Contact";
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) return;

    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailtoLink = `mailto:afrahmohammed.bh@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoLink;

    const btn = form.querySelector(".btn-send");
    const textEl = btn.querySelector(".btn-send-text");
    const iconEl = btn.querySelector(".btn-send-icon");
    textEl.textContent = "Opening email…";
    iconEl.textContent = "✅";
    btn.disabled = true;
    setTimeout(() => {
      textEl.textContent = "Send Message";
      iconEl.textContent = "✈️";
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* 7 ─ ACTIVE NAV LINK ON SCROLL */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.background = a.getAttribute("href") === `#${current}` ? "var(--rose-soft)" : "";
    a.style.color = a.getAttribute("href") === `#${current}` ? "var(--rose-deep)" : "";
  });
});
