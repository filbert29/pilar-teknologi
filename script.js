
window.onload = function() {
    localStorage.removeItem("userId")
    userId = generateUserId();
    localStorage.setItem("userId", userId);
}

let userId = localStorage.getItem("userId");
if (!userId) {
    userId = generateUserId();
    localStorage.setItem("userId", userId);
}

function generateUserId() {
    return Math.random().toString(36).substring(2, 10);
}

let chatHistory = JSON.parse(localStorage.getItem("chatHistory"));
if (!chatHistory) {
    chatHistory = [];
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

function displayChatHistory() {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML = "";

    for (let i = 0; i < chatHistory.length; i++) {
        const message = chatHistory[i];
        const messageElement = document.createElement("div");
        messageElement.textContent = `${message.sender}: ${message.content}`;
        chatbox.appendChild(messageElement);
    }
}

window.addEventListener("storage", function(e) {
    if (e.key === "chatHistory") {
        chatHistory = JSON.parse(e.newValue);
        displayChatHistory();
    }
});

function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = {
        sender: userId,
        content: input.value
    };

    chatHistory.push(message);
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    displayChatHistory();

    input.value = "";
}

displayChatHistory();
