const line1 = document.getElementById("line1");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

/* ---------------- TYPING EFFECT ---------------- */

function typeText(element, text, speed, callback){
    let i = 0;
    function typing(){
        if(i < text.length){
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }else if(callback){
            callback();
        }
    }
    typing();
}

typeText(
    line1,
    "Hello Aarya…",
    70,
    () => {
        setTimeout(()=>{
            typeText(
                question,
                "Will you go on a date with me this Sunday?",
                60,
                () => {
                    buttons.style.display = "block";
                    startNoMovement();
                }
            );
        },700);
    }
);


/* ---------------- NO BUTTON GAME LOGIC ---------------- */

let noScale = 1;
let yesScale = 1;
let velocityX = 3;
let velocityY = 2.5;
let posX = 120;
let posY = 40;
let moving = false;

/* Start continuous bouncing movement */
function startNoMovement(){
    if(moving) return;
    moving = true;
    requestAnimationFrame(animateNo);
}

function animateNo(){

    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    posX += velocityX;
    posY += velocityY;

    /* bounce from edges */
    if(posX <= 0 || posX >= maxX){
        velocityX *= -1;
    }
    if(posY <= 0 || posY >= maxY){
        velocityY *= -1;
    }

    noBtn.style.left = posX + "px";
    noBtn.style.top = posY + "px";

    requestAnimationFrame(animateNo);
}


/* When she tries to press NO */
function escapeAttempt(){

    /* shrink NO */
    noScale -= 0.12;
    if(noScale < 0.25) noScale = 0.25;
    noBtn.style.transform = `scale(${noScale})`;

    /* speed up */
    velocityX *= 1.18;
    velocityY *= 1.18;

    /* grow YES */
    yesScale += 0.12;
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.zIndex = "10";

    /* glow effect */
    yesBtn.style.boxShadow = "0 0 25px rgba(255,46,122,0.7)";
}

/* desktop + mobile */
noBtn.addEventListener("mouseenter", escapeAttempt);
noBtn.addEventListener("touchstart", escapeAttempt);


/* ---------------- HEART SHOWER ---------------- */

function startHearts(){
    setInterval(()=>{
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "💖";

        heart.style.left = Math.random()*100 + "vw";
        heart.style.animationDuration = (Math.random()*2+3)+"s";

        document.body.appendChild(heart);
        setTimeout(()=>heart.remove(),5000);
    },160);
}


/* ---------------- YES CLICK ---------------- */

yesBtn.addEventListener("click", ()=>{

    question.innerHTML = "Yay… I was hoping you'd say that ❤️";
    buttons.style.display="none";

    startHearts();

    const subject = "Sunday ☕";
    const body =
`Hi Aishwary,

I just opened your surprise… and yes 😄

Sunday works for me.
10:30 pick-up confirmed.

– Aarya`;

    setTimeout(()=>{
        window.location.href =
        `mailto:aishwarysongirkar30@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },3500);
});
