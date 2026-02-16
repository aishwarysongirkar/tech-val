const line1 = document.getElementById("line1");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

/* -------- TYPING EFFECT -------- */

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

/* First line */
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
                }
            );
        },700);
    }
);


/* -------- NO BUTTON ESCAPE -------- */

let noScale = 1;

function moveNoButton(){
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const x = Math.random()*maxX;
    const y = Math.random()*maxY;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    noScale -= 0.07;
    if(noScale < 0.35) noScale = 0.35;

    noBtn.style.transform = `scale(${noScale})`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);


/* -------- HEART SHOWER -------- */

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


/* -------- YES CLICK -------- */

yesBtn.addEventListener("click", ()=>{

    question.innerHTML = "Yay… I was hoping you'd say that ❤️";
    buttons.style.display="none";

    startHearts();

    /* EMAIL INVITE */

    const subject = "Date on Sunday ☕";
    const body =
`Hi Aishwary,

I just opened your little surprise page 😄
So yes — I’m officially saying yes.

Sunday works.
10:30 pick-up confirmed.

– Aarya`;

    setTimeout(()=>{
        window.location.href =
        `mailto:aishwarysongirkar30@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },3500);
});
