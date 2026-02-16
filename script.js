const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const success = document.getElementById("success");
const card = document.querySelector(".card");

let scale = 1;

// YES button grows
noBtn.addEventListener("mouseover", () => {

    // move NO button randomly
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 80);

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    // grow YES button
    scale += 0.15;
    yesBtn.style.transform = `scale(${scale})`;
});

// clicking YES
yesBtn.addEventListener("click", () => {
    card.classList.add("hidden");
    success.classList.remove("hidden");
});
