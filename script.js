const text = document.getElementById("text");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const reaction = document.getElementById("reactionText");

let noClicks = 0;

/* ---------------- TYPING INTRO ---------------- */

const introLines = [
"Hello Aarya…",
"Kashi ahes ?? Good Morning !!! I’ve been meaning to ask you something…",
"Will you go on a date with me this Sunday?"
];

let line = 0;
let char = 0;

function typeLine(){
    if(line >= introLines.length){
        document.querySelector(".buttons").style.display="block";
        return;
    }

    if(char < introLines[line].length){
        text.innerHTML += introLines[line].charAt(char);
        char++;
        setTimeout(typeLine,35);
    }else{
        text.innerHTML += "<br><br>";
        line++;
        char=0;
        setTimeout(typeLine,700);
    }
}

typeLine();

/* ---------------- NO BUTTON BEHAVIOUR ---------------- */

const lines = [
"Are you sure? 😌",
"Try again...",
"That's not the correct answer.",
"Aarya… be honest 😂",
"You’re literally chasing it now",
"Okay this is suspicious",
"I think you want to press Yes…"
];

noBtn.addEventListener("click",()=>{

    noClicks++;

    document.body.classList.add("pulse");
    setTimeout(()=>document.body.classList.remove("pulse"),120);

    updateReaction();
    growYes();
    moveNo();
});

function updateReaction(){
    if(noClicks-1 < lines.length){
        reaction.innerText = lines[noClicks-1];
    }
}

function growYes(){
    let scale = 1 + (noClicks*0.18);
    yesBtn.style.transform = `scale(${scale})`;
    yesBtn.style.boxShadow = `0 0 ${15+noClicks*6}px rgba(255,80,140,0.7)`;
}

function moveNo(){

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const x = Math.random()*maxX;
    const y = Math.random()*maxY;

    noBtn.style.position="fixed";
    noBtn.style.left=x+"px";
    noBtn.style.top=y+"px";

    if(noClicks===3) noBtn.style.transform="rotate(20deg)";
    if(noClicks===4) noBtn.style.transform="scale(.7)";
    if(noClicks===6){
        noBtn.style.animation="shake .3s infinite";
        noBtn.innerText="okay fine 😭";
    }

    if(noClicks>=7){
        noBtn.style.opacity="0";
        setTimeout(()=>noBtn.style.opacity="1",900);
    }
}

/* ---------------- YES CLICK ---------------- */

yesBtn.addEventListener("click",()=>{

    text.innerHTML="Yay!! I knew it 😊";
    reaction.innerText="";
    noBtn.style.display="none";
    yesBtn.style.display="none";

    startHearts();
    downloadCalendar();
});

/* ---------------- HEART ANIMATION ---------------- */

function startHearts(){
    setInterval(()=>{
        createHeart();
    },220);
}

function createHeart(){
    const heart=document.createElement("div");
    heart.className="heart";
    heart.innerHTML="💖";

    heart.style.left=Math.random()*window.innerWidth+"px";
    heart.style.fontSize=(18+Math.random()*22)+"px";

    document.body.appendChild(heart);

    setTimeout(()=>heart.remove(),2800);
}

/* ---------------- CALENDAR INVITE ---------------- */

function downloadCalendar(){

const event=`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Date with Aishwary ☕
DESCRIPTION:Brunch + Drive + Walk :)
LOCATION:Your Favorite Cafe
DTSTART:20260222T050000Z
DTEND:20260222T073000Z
END:VEVENT
END:VCALENDAR`;

const blob=new Blob([event],{type:"text/calendar"});
const link=document.createElement("a");
link.href=URL.createObjectURL(blob);
link.download="date.ics";
link.click();
}
