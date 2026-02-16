const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const success = document.getElementById("success");
const card = document.querySelector(".card");

let yesScale = 1;
let noScale = 1;

// --- NO BUTTON ESCAPE LOGIC ---
function moveNoButton(e){

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const rect = noBtn.getBoundingClientRect();

    const btnX = rect.left + rect.width/2;
    const btnY = rect.top + rect.height/2;

    const distance = Math.sqrt(
        Math.pow(mouseX - btnX,2) + Math.pow(mouseY - btnY,2)
    );

    // when cursor comes near
    if(distance < 150){

        // teleport randomly
        const x = Math.random() * (window.innerWidth - 120);
        const y = Math.random() * (window.innerHeight - 80);

        noBtn.style.position = "fixed";
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";

        // shrink NO
        noScale -= 0.08;
        if(noScale < 0.25) noScale = 0.25;
        noBtn.style.transform = `scale(${noScale})`;

        // grow YES
        yesScale += 0.12;
        yesBtn.style.transform = `scale(${yesScale})`;
    }
}

document.addEventListener("mousemove", moveNoButton);


// HEART RAIN
function createHeart(){
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";

    heart.style.left = Math.random()*100 + "vw";
    heart.style.animationDuration = (Math.random()*2 + 3) + "s";
    heart.style.fontSize = (Math.random()*20 + 20) + "px";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },5000);
}


// GOOGLE CALENDAR INVITE
function openCalendar(){

    const title = encodeURIComponent("Date with Me ❤️");
    const details = encodeURIComponent("You said yes... so now you officially owe me a date 😄");
    const location = encodeURIComponent("Coffee + Dessert (Surprise Place)");
    
    // 22 Feb 2026, 6 PM IST
    const start = "20260222T123000Z";
    const end = "20260222T143000Z";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${start}/${end}`;

    window.open(url,"_blank");
}


// YES CLICK
yesBtn.addEventListener("click", () => {
    card.classList.add("hidden");
    success.classList.remove("hidden");

    // hearts start
    setInterval(createHeart, 180);

    // open calendar after 2 sec
    setTimeout(openCalendar,2000);
});
