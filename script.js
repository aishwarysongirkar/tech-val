// detect mobile (important for iPhone safari sizing)
if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  document.body.classList.add("mobile");
}

/* ----------- TYPING INTRO ----------- */

const introText = "Hello Aarya...\nI’ve been meaning to ask you something...";
const mainText = document.getElementById("mainText");

let index = 0;
mainText.innerHTML = "";

function typeWriter() {
  if (index < introText.length) {
    if (introText.charAt(index) === "\n") {
      mainText.innerHTML += "<br>";
    } else {
      mainText.innerHTML += introText.charAt(index);
    }
    index++;
    setTimeout(typeWriter, 40);
  } else {
    setTimeout(showQuestion, 900);
  }
}

window.onload = typeWriter;

function showQuestion() {
  mainText.innerHTML = "Will you go on a date with me this Sunday? ❤️";
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

  noSize -= 0.18;
  if (noSize < 0.35) noSize = 0.35;
  noBtn.style.transform = `scale(${noSize})`;

  yesSize += 0.22;
  yesBtn.style.transform = `scale(${yesSize})`;

  if (navigator.vibrate) navigator.vibrate(80);
}

/* ----------- YES BUTTON ----------- */

function sheSaidYes() {

  const sub = document.getElementById("subText");
  sub.style.display = "none";

  // Shinchan dancing GIF
  document.getElementById("memeArea").innerHTML =
    `<img src="https://media.tenor.com/0AVbKGY_MxMAAAAC/shinchan-dance.gif"
      style="width:160px; margin-top:10px; border-radius:12px;">`;

  mainText.innerHTML = "YAYYY ❤️ I knew you would say yes!";

  startHeartsRain();

  // Proper iPhone compatible encoding
  const message = encodeURIComponent(
`Heyy 😄

I just opened your surprise… and okay fine,
yes — I’ll go on a date with you this Sunday ❤️

10:30 works for me 🙂
And you better not be late.`
  );

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
  this.size = Math.random() * 18 + 10;
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
  ctx.bezierCurveTo(x + s*2, y + s*2, x + s*2, y - s, x, y + s);
  ctx.fill();
};

Heart.prototype.update = function () {
  this.y += this.speed;
};

function startHeartsRain() {
  setInterval(() => {
    hearts.push(new Heart());
  }, 180);

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
