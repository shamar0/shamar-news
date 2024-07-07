// Initialize the button
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
const nextKeywords = ["next page", "next", "forward"];
const previousKeywords = ["previous page", "previous", "back"];
const refreshKeywords = ["refresh", "reload", "restart page"];
const scrollDownKeywords = ["scroll down", "down"];
const scrollUpKeywords = ["scroll up", "up"];

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
        } else if (nextKeywords.some(keyword => transcript.includes(keyword))) {
            const nextButtons = Array.from(document.querySelectorAll("button"));
            const nextButton = nextButtons.find(button => button.textContent.trim().toLowerCase() === "next");
            if (nextButton) {
                nextButton.click();
                console.log("Next page triggered.");
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
            window.scrollBy(0, -window.innerHeight);
            console.log("Scrolled up.");
        }
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
if (isListening) {
    btn.setAttribute("listening", true);
    btn.textContent = "Stop Listening";
    btn.classList.add("blinking");
    startListening();
} else {
    btn.textContent = "Start Listening";
}
