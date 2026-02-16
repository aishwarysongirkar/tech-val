// detect mobile
if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  document.body.classList.add("mobile");
}

/* ----------- TYPING INTRO ----------- */

const introText = "Hello Aarya… I’ve been meaning to ask you something…";
const mainText = document.getElementById("mainText");

let index = 0;
mainText.innerText = "";

function typeWriter() {
  if (index < introText.length) {
    mainText.innerText += introText.charAt(index);
    index++;
    setTimeout(typeWriter, 45);
  } else {
    setTimeout(showQuestion, 900);
  }
}

window.onload = typeWriter;

function showQuestion() {
  mainText.innerText = "Will you go on a date with me this Sunday? ❤️";
}

/* ----------- NO BUTTON GAME ----------- */

let noSize = 1;
let yesSize = 1.1;

function moveNoButton() {

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  const maxX = window.innerWidth - 120;
  const maxY = window.innerHeight - 80;

  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = randX + "px";
  noBtn.style.top = randY + "px";

  // shrink NO
  noSize -= 0.18;
  if (noSize < 0.35) noSize = 0.35;
  noBtn.style.transform = `scale(${noSize})`;

  // grow YES
  yesSize += 0.22;
  yesBtn.style.transform = `scale(${yesSize})`;

  // vibration on phone
  if (navigator.vibrate) navigator.vibrate(80);
}

/* ----------- YES BUTTON ----------- */

function sheSaidYes() {

  mainText.innerText = "YAYYYY ❤️ I’m really happy!!!";

  startHeartsRain();

  // message from her side
  const message =
    "Hey 😄%0A%0A" +
    "I just opened your surprise… and yes ❤️%0A" +
    "I’d love to go on a date with you this Sunday!%0A%0A" +
    "Pick me up at 10:30 ☕🚗";

  setTimeout(() => {
    window.location.href =
      "https://wa.me/918329115026?text=" + message;
  }, 2500);
}

/* ----------- HEART RAIN ----------- */

const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = -10;
  this.size = Math.random() * 20 + 12;
  this.speed = Math.random() * 2 + 1.5;
}

Heart.prototype.draw = function () {

  ctx.fillStyle = "#ff4d6d";

  let x = this.x;
  let y = this.y;
  let s = this.size / 2;

  ctx.beginPath();
  ctx.moveTo(x, y + s);
  ctx.bezierCurveTo(x - s*2, y - s, x - s*2, y + s*2, x, y + s*3);
  ctx.b
