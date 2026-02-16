// ===== Elements =====
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const questionText = document.getElementById("questionText");
const subText = document.getElementById("subText");
const memeArea = document.getElementById("memeArea");

// your number
const yourNumber = "918329115026";

// ===== MOBILE DETECT =====
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// ===== NO BUTTON RUN AWAY (SUPER FAST) =====
let noSize = 1;
let speed = 1;

function moveNoButton() {

    const padding = 30;

    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    // shrink the button each time
    noSize -= 0.08;
    if (noSize < 0.35) noSize = 0.35;

    noBtn.style.transform = `scale(${noSize})`;

    // speed increases
    speed += 0.2;
}

// Desktop hover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile touch
noBtn.addEventListener("touchstart", moveNoButton);

// ===== HEART RAIN =====
function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = Math.random() * 18 + 18 + "px";
    heart.style.animation = "fall 3s linear forwards";
    heart.style.zIndex = "9999";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
}

function startHearts() {
    setInterval(createHeart, 120);
}

// ===== YES CLICKED =====
yesBtn.addEventListener("click", sheSaidYes);

function sheSaidYes() {

    // remove subtext
    subText.style.display = "none";

    // change main text
    questionText.innerHTML = "Yayyyy!! ❤️ I knew you'd say yes 😄";

    // Shinchan dancing GIF
    memeArea.innerHTML =
      `<img src="https://media.tenor.com/BT9N6y0tS4gAAAAC/shinchan-shin-chan.gif"
        style="width:190px; margin-top:12px; border-radius:14px; box-shadow:0 6px 18px rgba(0,0,0,0.25);">`;

    // start hearts
    startHearts();

    // WhatsApp message (human sounding)
    const message =
`Hey 😊
I just saw your surprise…

and okay… yes ❤️

Sunday date it is.
Pick me up at 10:30 😌`;

    // encode for iphone compatibility
    const encoded = encodeURIComponent(message);

    // open WhatsApp after 2.5 sec
    setTimeout(() => {

        if (isMobile) {
            window.location.href = `https://wa.me/${yourNumber}?text=${encoded}`;
        } else {
            window.open(`https://web.whatsapp.com/send?phone=${yourNumber}&text=${encoded}`, "_blank");
        }

    }, 2500);
}
