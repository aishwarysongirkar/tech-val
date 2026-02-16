const codeLines = [
"Booting LoveOS v1.0...",
"Starting romantic protocol...",
"Connecting to her heart ❤️",
"Connection established ✔",
"",
"class PersonYouLike {",
"   constructor(name){",
"       this.name = name;",
"       this.isCute = true;",
"       this.makesMeHappy = true;",
"   }",
"}",
"",
"const you = new PersonYouLike('Someone Special');",
"",
"while(true){",
"   care();",
"   respect();",
"   makeHerSmile();",
"}",
"",
"// compiling feelings...",
"// no errors found ❤️"
];

let index = 0;
let charIndex = 0;
const speed = 35;
const codeDiv = document.getElementById("code");

function typeCode(){
    if(index < codeLines.length){
        if(charIndex < codeLines[index].length){
            codeDiv.innerHTML += codeLines[index].charAt(charIndex);
            charIndex++;
            setTimeout(typeCode, speed);
        }else{
            codeDiv.innerHTML += "\n";
            index++;
            charIndex = 0;
            setTimeout(typeCode, 350);
        }
    }else{
        document.getElementById("popup").classList.remove("hidden");
        typeFinal();
    }
}

const finalMessage = "Maybe I am not perfect… but with you, I really want to try. Will you stay with me?";

let finalIndex = 0;

function typeFinal(){
    const text = document.getElementById("finalText");
    if(finalIndex < finalMessage.length){
        text.innerHTML += finalMessage.charAt(finalIndex);
        finalIndex++;
        setTimeout(typeFinal, 40);
    }
}

function showHeart(){
    document.getElementById("heart").classList.remove("hidden");
}

typeCode();
