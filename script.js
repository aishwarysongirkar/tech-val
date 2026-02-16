const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const question = document.getElementById("question");

let noScale = 1;

/* -------- NO BUTTON ESCAPES -------- */

function moveNoButton(){

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    // slightly shrink every attempt
    noScale -= 0.05;
    if(noScale < 0.45) noScale = 0.45;

    noBtn.style.transform = `scale(${noScale})`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);


/* -------- YES CLICK -------- */

yesBtn.addEventListener("click", () => {

    document.querySelector(".sub").innerHTML =
        "Okay… now you’re committed 😌";

    question.innerHTML =
        "See you on Sunday.";

    const message = `Hi 😄

I just opened your page…
and yes — I’m in for Sunday.

10:30 pick-up works for me.`;

    setTimeout(() => {
        window.location.href =
        "https://wa.me/918329115026?text=" + encodeURIComponent(message);
    }, 1400);

});
