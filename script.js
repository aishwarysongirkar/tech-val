const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const question = document.getElementById("question");
const memeArea = document.getElementById("memeArea");

let noScale = 1;

/* ---------- NO BUTTON RUNS AWAY ---------- */

function moveNoButton() {

  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  // shrink button each attempt
  noScale -= 0.08;
  if(noScale < 0.35) noScale = 0.35;

  noBtn.style.transform = `scale(${noScale})`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);



/* ---------- HEART RAIN ---------- */

function startHearts(){
  setInterval(() => {

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random()*2+3) + "s";

    document.body.appendChild(heart);

    setTimeout(()=> heart.remove(),5000);

  },180);
}



/* ---------- YES BUTTON ---------- */

yesBtn.addEventListener("click", () => {

  document.querySelector(".honest").style.display = "none";

  question.innerHTML = "YAYYY ❤️ I knew it!!!";

  /* SHINCHAN VIDEO (iPhone compatible) */
  memeArea.innerHTML =
  `
  <video
    autoplay
    muted
    loop
    playsinline
    webkit-playsinline
    style="
      width:230px;
      margin-top:18px;
      border-radius:18px;
      box-shadow:0 10px 28px rgba(0,0,0,0.28);
    "
  >
    <source src="shinchan.mp4" type="video/mp4">
  </video>
  `;

  startHearts();

  /* WhatsApp message (natural tone) */
  const message = `Hey 😄

I saw your surprise…
okay fine, you win.

I’d love to go out with you this Sunday 💛
Pick me up at 10:30.`;

  setTimeout(() => {
    window.location.href =
      "https://wa.me/918329115026?text=" + encodeURIComponent(message);
  }, 6000);

});
