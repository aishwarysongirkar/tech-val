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
        } else if(callback){
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
                    placeNoInitial();
                }
            );
        },700);
    }
);


/* ---------------- BUTTON GAME ---------------- */

let noScale = 1;
let yesScale = 1;

/* initial position inside box */
function placeNoInitial(){
    noBtn.style.left = "60%";
    noBtn.style.top = "20px";
}

/* when she tries to press NO */
function escapeNo(){

    const padding = 20;

    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    /* move button randomly */
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    /* shrink NO */
    noScale -= 0.09;
    if(noScale < 0.28) noScale = 0.28;
    noBtn.style.transform = `scale(${noScale})`;

    /* grow YES */
    yesScale += 0.12;
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.boxShadow = "0 0 22px rgba(255,46,122,0.6)";
    yesBtn.style.zIndex = "5";
}

/* works on both laptop & iPhone */
noBtn.addEventListener("mouseenter", escapeNo);
noBtn.addEventListener("touchstart", escapeNo);


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
    },170);
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
