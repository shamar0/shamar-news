
let body = document.querySelector('body');

let btn = document.createElement("button");
btn.setAttribute("class", "start-btn");
btn.textContent = "Start Listening";
btn.addEventListener("click", toggleListening);
body.appendChild(btn);

function toggleListening() {
    if (!btn.hasAttribute("listening")) {
        btn.setAttribute("listening", true);
        btn.textContent = "Stop Listening";
        btn.classList.add("blinking");
        isListening = true;
        localStorage.setItem('isListening', true);
        startListening();
        console.log("Voice control activated.");
    } else {
        btn.removeAttribute("listening");
        btn.textContent = "Start Listening";
        isListening = false;
        localStorage.setItem('isListening', false);
        btn.classList.remove("blinking");
        stopListening();
        console.log("Voice control deactivated.");
    }
}

let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.lang = "en-in";
speechRecognition.interimResults = false;

let isListening = JSON.parse(localStorage.getItem('isListening')) || false;

// Define arrays for different commands
const startKeywords = ["hey start", "start", "restart", "begin", "activate"];
const stopKeywords = ["stop", "pause", "deactivate"];
const loadKeywords = ["load more", "load", "more", "next", "forward"];
const previousKeywords = ["previous page", "previous", "back"];
const refreshKeywords = ["refresh", "reload", "restart page"];
const scrollDownKeywords = ["scroll down","scroll dawn", "down"];
const scrollUpKeywords = ["scroll up","scroll app", "up"];
const politicsKeywords = ["go to politics", "open politics section","politics section", "open politics"];  // New keywords for politics
const educationKeywords = ["go to education", "open education section","education section", "open education"]; 
const healthKeywords = ["go to health", "open health section","health section", "open health"];  
const sportsKeywords = ["go to sports", "open sports section","sports section", "open sports"];  
const businessKeywords = ["go to business", "open business section","business section", "open business"];  
const techKeywords = ["go to tech", "open tech section","tech section", "open tech"];  
const trendingKeywords = ["go to trending", "open trending section","trending section", "open trending"];  
const entertainmentKeywords = ["go to entertainment", "open entertainment section","entertainment section", "open entertainment"];  
const itKeywords = ["go to it", "open it section","it section", "open it"];  
const sceinceenviromentKeywords = ["go to sceince enviroment", "open sceince enviroment section","sceince enviroment section", "open sceince enviroment"];  
const evKeywords = ["go to ev", "open ev section","ev section", "open ev"];  
const sceinceKeywords = ["go to sceince", "open sceince section","sceince section", "open sceince"];  


function startListening() {
    console.log("Starting to listen...");
    speechRecognition.start();
}

function stopListening() {
    console.log("Stopping listening...");
    speechRecognition.stop();
}

speechRecognition.onresult = function(event) {
    let transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    console.log("Heard:", transcript);

    if (!isListening) {
        if (startKeywords.some(keyword => transcript.includes(keyword))) {
            isListening = true;
            localStorage.setItem('isListening', true);
            console.log("Voice control activated.");
        }
    } else {
        if (stopKeywords.some(keyword => transcript.includes(keyword))) {
            isListening = false;
            localStorage.setItem('isListening', false);
            stopListening();
            console.log("Voice control deactivated.");
        } else if (loadKeywords.some(keyword => transcript.includes(keyword))) {
            const loadButtons = Array.from(document.querySelectorAll("button"));
            const loadButton = loadButtons.find(button => button.textContent.trim().toLowerCase() === "load more");
            if (loadButton) {
                loadButton.click();
                console.log("load more button triggered.");
            }
        } else if (previousKeywords.some(keyword => transcript.includes(keyword))) {
            const prevButtons = Array.from(document.querySelectorAll("button"));
            const prevButton = prevButtons.find(button => button.textContent.trim().toLowerCase() === "previous");
            if (prevButton) {
                prevButton.click();
                console.log("Previous page triggered.");
            }
        } else if (refreshKeywords.some(keyword => transcript.includes(keyword))) {
            window.location.reload();
            console.log("Page reloaded.");
        } else if (scrollDownKeywords.some(keyword => transcript.includes(keyword))) {
            window.scrollBy(0, window.innerHeight);
            console.log("Scrolled down.");
        } else if (scrollUpKeywords.some(keyword => transcript.includes(keyword))) {
            const scrollupButton = document.querySelector(".scroll-to-top-btn");
            if (scrollupButton) {
                scrollupButton.click(); // This simulates a click on the button
            }
        } else if (politicsKeywords.some(keyword => transcript.includes(keyword))) {  // Navigate to politics section
            window.location.href = "https://shamar.co.in/category/politics";
            console.log("Navigated to politics section.");
        }
        // else if (scrollUpKeywords.some(keyword => transcript.includes(keyword))) {
        //     window.scrollBy(0, -window.innerHeight);
        //     console.log("Scrolled up.");
        // }
    }
};

speechRecognition.onend = function() {
    console.log("Recognition ended.");
    if (isListening) {
        startListening();
    }
};

speechRecognition.onerror = function(event) {
    console.error("Speech recognition error detected:", event.error);
    if (isListening) {
        startListening();
    }
};

// Start initial listening based on localStorage state
// if (isListening) {
//     btn.setAttribute("listening", true);
//     btn.textContent = "Stop Listening";
//     btn.classList.add("blinking");
//     startListening();
// } else {
//     btn.textContent = "Start Listening";
// }
