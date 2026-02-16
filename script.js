// Detect mobile
if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  document.body.classList.add("mobile");
}

/* ---------------- NO BUTTON BEHAVIOUR ---------------- */

let noSize = 1;
let yesSize = 1.1;

function moveNoButton() {

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  // random screen movement (FAST)
  const maxX = window.innerWidth - 120;
  const maxY = window.innerHeight - 80;

  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = randX + "px";
  noBtn.style.top = randY + "px";

  // shrink NO button
  noSize -= 0.18;
  if (noSize < 0.35) noSize = 0.35;
  noBtn.style.transform = `scale(${noSize})`;

  // grow YES button
  yesSize += 0.22;
  yesBtn.style.transform = `scale(${yesSize})`;

  // phone vibration
  if (navigator.vibrate) navigator.vibrate(80);
}

/* ---------------- YES BUTTON ---------------- */

function sheSaidYes() {

  document.getElementById("mainText").innerText =
    "YAYYYY ❤️ I knew it!!!";

  startHeartsRain();

  const message =
    "Aarya said YES!!! ❤️%0A%0A" +
    "Date: Sunday 💫%0A" +
    "Pickup: 10:30 AM 🚗%0A" +
    "Brunch + Walk + Piano drop 🎹";

  // redirect to WhatsApp after celebration
  setTimeout(() => {
    window.location.href =
      "https://wa.me/918329115026?text=" + message;
  }, 2500);
}

/* ---------------- HEART RAIN ---------------- */

const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = -10;
  this.size = Math.random() * 20 + 10;
  this.speed = Math.random() * 2 + 1;
}

Heart.prototype.draw = function () {
  ctx.fillStyle = "#ff4d6d";
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.arc(this.x - this.size / 2, this.y, this.size / 2, 0, Math.PI, true);
  ctx.arc(this.x + this.size / 2, this.y, this.size / 2, 0, Math.PI, true);
  ctx.lineTo(this.x, this.y + this.size);
  ctx.fill();
};

Heart.prototype.update = function () {
  this.y += this.speed;
};

function startHeartsRain() {
  setInterval(() => {
    hearts.push(new Heart());
  }, 200);

  animateHearts();
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw();

    if (heart.y > canvas.height) hearts.splice(index, 1);
  });

  requestAnimationFrame(animateHearts);
}
