// ═══════════════════════════════════════
// COUNTDOWN TIMER
// Set your launch date here
// ═══════════════════════════════════════
var LAUNCH_DATE = new Date(2026, 4, 15, 0, 0, 0); // May 15, 2026

var daysEl = document.getElementById("days");
var hoursEl = document.getElementById("hours");
var minutesEl = document.getElementById("minutes");
var secondsEl = document.getElementById("seconds");

function updateCountdown() {
  var now = new Date();
  var diff = LAUNCH_DATE - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);

  var newDays = String(days).padStart(2, "0");
  var newHours = String(hours).padStart(2, "0");
  var newMinutes = String(minutes).padStart(2, "0");
  var newSeconds = String(seconds).padStart(2, "0");

  if (daysEl.textContent !== newDays) {
    daysEl.classList.add("flip");
    setTimeout(function() { daysEl.classList.remove("flip"); }, 600);
  }
  if (hoursEl.textContent !== newHours) {
    hoursEl.classList.add("flip");
    setTimeout(function() { hoursEl.classList.remove("flip"); }, 600);
  }
  if (minutesEl.textContent !== newMinutes) {
    minutesEl.classList.add("flip");
    setTimeout(function() { minutesEl.classList.remove("flip"); }, 600);
  }
  secondsEl.classList.add("flip");
  setTimeout(function() { secondsEl.classList.remove("flip"); }, 600);

  daysEl.textContent = newDays;
  hoursEl.textContent = newHours;
  minutesEl.textContent = newMinutes;
  secondsEl.textContent = newSeconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ═══════════════════════════════════════
// IMAGE SLIDESHOW
// ═══════════════════════════════════════
var slides = document.querySelectorAll(".slide");
var indicatorsContainer = document.getElementById("indicators");
var currentSlide = 0;
var SLIDE_INTERVAL = 7000;

slides.forEach(function(_, i) {
  var dot = document.createElement("div");
  dot.className = "indicator" + (i === 0 ? " active" : "");
  dot.addEventListener("click", function() { goToSlide(i); });
  indicatorsContainer.appendChild(dot);
});

function goToSlide(index) {
  slides[currentSlide].classList.remove("active");
  indicatorsContainer.children[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  indicatorsContainer.children[currentSlide].classList.add("active");
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

setInterval(nextSlide, SLIDE_INTERVAL);

// ═══════════════════════════════════════
// FLOATING PARTICLES
// ═══════════════════════════════════════
var particlesContainer = document.getElementById("particles");

function createParticle() {
  var particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.width = (Math.random() * 3 + 1) + "px";
  particle.style.height = particle.style.width;
  particle.style.animationDuration = (Math.random() * 10 + 8) + "s";
  particle.style.animationDelay = (Math.random() * 5) + "s";
  particlesContainer.appendChild(particle);
  setTimeout(function() { particle.remove(); }, 20000);
}

for (var i = 0; i < 15; i++) {
  setTimeout(createParticle, i * 400);
}
setInterval(createParticle, 1500);

// ═══════════════════════════════════════
// EMAIL NOTIFICATION FORM
// ═══════════════════════════════════════
document.getElementById("notifyForm").addEventListener("submit", function(e) {
  e.preventDefault();
  var form = this;
  var input = form.querySelector("input");
  var btn = form.querySelector("button");
  var success = document.getElementById("notifySuccess");
  var email = input.value.trim();
  
  if (!email) return;
  
  // Show loading
  btn.textContent = "SENDING...";
  btn.disabled = true;
  
  // Send to Google Sheets via GET
  var url = "https://script.google.com/macros/s/AKfycbzd2Oum6LkTELm8iKJ7c-SXpOgdLJLKQ_nALUMNs9gCTbVJrrD0FfW4rk8-ubvM/exec?email=" + encodeURIComponent(email);
  
  fetch(url, { method: "GET", mode: "no-cors" })
    .then(function() {
      form.style.display = "none";
      success.style.display = "block";
    })
    .catch(function() {
      form.style.display = "none";
      success.style.display = "block";
    });
});
