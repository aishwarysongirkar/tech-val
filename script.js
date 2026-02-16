const text1 = "Kashi ahes? Good Morning!! I’ve wanted to ask you something...";
let i = 0;

const typingElement = document.getElementById("typingText");
const helloText = document.getElementById("helloText");
const questionText = document.getElementById("questionText");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const successMsg = document.getElementById("successMsg");


// Typing effect
function typeWriter(){
    if(i < text1.length){
        typingElement.innerHTML += text1.charAt(i);
        i++;
        setTimeout(typeWriter,40);
    }
    else{
        setTimeout(showQuestion,1200);
    }
}
typeWriter();


// Hide hello
setTimeout(()=>{
    helloText.style.opacity="0";
    setTimeout(()=>helloText.style.display="none",600);
},3500);


// Show question
function showQuestion(){
    questionText.style.display="block";
    setTimeout(()=>{
        buttons.style.display="block";
    },600);
}


// YES button
let yesScale=1;

yesBtn.addEventListener("click",()=>{

    buttons.style.display="none";
    questionText.style.display="none";
    typingElement.style.display="none";

    successMsg.style.display="block";
    successMsg.innerHTML=
    `Yaaayyyy 💖<br><br>
    Excited for Sunday!<br>
    Be prepared at <b>10:30 AM</b> 😌<br>
    This calendar invite will help you not forget it!`;

    createHearts();
    downloadICS();
});


// NO button escape
let noSize=1;

noBtn.addEventListener("mouseover",()=>{

    const x=Math.random()*(window.innerWidth-100);
    const y=Math.random()*(window.innerHeight-100);

    noBtn.style.position="fixed";
    noBtn.style.left=x+"px";
    noBtn.style.top=y+"px";

    noSize-=0.1;
    if(noSize<0.4) noSize=0.4;
    noBtn.style.transform=`scale(${noSize})`;

    yesScale+=0.15;
    yesBtn.style.transform=`scale(${yesScale})`;
});


// Hearts
function createHearts(){
    setInterval(()=>{
        const heart=document.createElement("div");
        heart.className="heart";
        heart.innerHTML="❤️";
        heart.style.left=Math.random()*100+"vw";
        heart.style.fontSize=(18+Math.random()*22)+"px";
        document.body.appendChild(heart);

        setTimeout(()=>heart.remove(),4000);
    },200);
}


// Calendar invite
function downloadICS(){

const icsData=`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Date with Aishwary ❤️
DESCRIPTION:Sunday Brunch Date
LOCATION:Pune
DTSTART:20260222T050000Z
DTEND:20260222T080000Z
END:VEVENT
END:VCALENDAR`;

const blob=new Blob([icsData],{type:'text/calendar'});
const link=document.createElement('a');
link.href=URL.createObjectURL(blob);
link.download="Sunday_Date.ics";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

