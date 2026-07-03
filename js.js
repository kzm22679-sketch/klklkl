const chatArea = document.getElementById('chatArea');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const assistantPrompt = document.getElementById('assistantPrompt');
const customRules = document.getElementById('customRules');
const applyBehaviorBtn = document.getElementById('applyBehaviorBtn');
const clearChatBtn = document.getElementById('clearChatBtn');

let behavior = assistantPrompt.value.trim();
let rules = parseRules(customRules.value);

function parseRules(text) {
    const lines = text.split('\n');
    const parsed = [];
    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;
        const parts = line.split(':');
        if (parts.length >= 2) {
            const keyword = parts[0].trim();
            const response = parts.slice(1).join(':').trim();
            if (keyword && response) {
                parsed.push({ keyword, response });
            }
        }
    }
    return parsed;
}

function appendMessage(text, sender) {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.textContent = text;
    chatArea.appendChild(message);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function generateReply(userText) {
    const lowerText = userText.toLowerCase();
    for (const rule of rules) {
        if (lowerText.includes(rule.keyword.toLowerCase())) {
            return rule.response;
        }
    }

    const assistantBase = `${behavior}\n????????: ${userText}`;
    const genericReply = `???? ??????. ??? ????? ?????? ?????? ????? ???? ??? ????????? ????????. ????? ????? ???? ??????? ?????? ?????? ?? ?????? ??????.`;

    if (lowerText.includes('???') || lowerText.includes('????') || lowerText.includes('?????') || lowerText.includes('???')) {
        return `??? ????: ${userText}\n${genericReply}`;
    }
    if (lowerText.includes('?????') || lowerText.includes('????') || lowerText.includes('????')) {
        return `?????! ${genericReply}`;
    }
    return genericReply;
}

chatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const userText = messageInput.value.trim();
    if (!userText) return;
    appendMessage(userText, 'user');
    messageInput.value = '';

    const assistantText = generateReply(userText);
    setTimeout(() => {
        appendMessage(assistantText, 'assistant');
    }, 300);
});

applyBehaviorBtn.addEventListener('click', function () {
    behavior = assistantPrompt.value.trim();
    rules = parseRules(customRules.value);
    appendMessage('?? ????? ???? ??????? ????????.', 'assistant');
});

clearChatBtn.addEventListener('click', function () {
    chatArea.innerHTML = '';
    appendMessage('?? ??? ????????. ???? ????? ????? ??? ???.', 'assistant');
});

appendMessage('?????! ???? ?????? ????? ?????? ?????? ????? ???? ??????? ?? ?????? ??????.', 'assistant');
