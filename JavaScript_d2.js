// Fully automatic slider (no dots, no arrows, no clicks)
window.onload = function () {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    if (slides.length === 0) return;
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    showSlide(0);
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 3000);
};
function searchMenu() {
    const input = document.getElementById("menuSearch");
    const results = document.getElementById("searchResults");
    const filter = input.value.toLowerCase().trim();
    const menuItems = document.querySelectorAll(".navbar li");
    const uniqueItems = new Set();
    menuItems.forEach(item => {
        const text = item.childNodes[0].textContent.trim();
        if (text) {
            uniqueItems.add(text);
        }
    });
    results.innerHTML = "";
    if (filter === "") {
        results.style.display = "none";
        return;
    }
    let matches = 0;
    uniqueItems.forEach(text => {
        if (text.toLowerCase().includes(filter)) {
            const div = document.createElement("div");
            div.className = "search-item";
            div.textContent = text;
            div.onclick = function () {
                input.value = text;
                results.style.display = "none";
            };
            results.appendChild(div);
            matches++;
        }
    });
    results.style.display = matches > 0 ? "block" : "none";
}
function toggleChatbot() {
    const chatbot = document.getElementById("chatbotWindow");
    const mascot = document.querySelector(".chatbot-container");
    chatbot.classList.toggle("active");
    if (chatbot.classList.contains("active")) {
        mascot.style.display = "none";
    } else {
        mascot.style.display = "block";
    }
}
window.onload = function () {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        showSlide(0);
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 3000);
    }
    initializeChatbot();
};
function searchMenu() {
    const input = document.getElementById("menuSearch");
    const results = document.getElementById("searchResults");
    const filter = input.value.toLowerCase().trim();
    const menuItems = document.querySelectorAll(".navbar li");
    const uniqueItems = new Set();
    menuItems.forEach(item => {
        const text = item.childNodes[0]?.textContent?.trim();
        if (text) uniqueItems.add(text);
    });
    results.innerHTML = "";
    if (filter === "") {
        results.style.display = "none";
        return;
    }
    let matches = 0;
    uniqueItems.forEach(text => {
        if (text.toLowerCase().includes(filter)) {
            const div = document.createElement("div");
            div.className = "search-item";
            div.textContent = text;
            div.onclick = function () {
                input.value = text;
                results.style.display = "none";
            };
            results.appendChild(div);
            matches++;
        }
    });
    results.style.display = matches > 0 ? "block" : "none";
}
function toggleChatbot() {
    const chatbot = document.getElementById("chatbotWindow");
    const mascot = document.querySelector(".chatbot-container");
    if (chatbot.classList.contains("active")) {
        chatbot.classList.remove("active");
        mascot.style.display = "block";
    } else {
        chatbot.classList.add("active");
        mascot.style.display = "none";
    }
}
function initializeChatbot() {
    const input = document.querySelector(".chatbot-footer input");
    const button = document.querySelector(".chatbot-footer button");
    if (!input || !button) return;
    button.addEventListener("click", sendMessage);
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}
function sendMessage() {
    const input = document.querySelector(".chatbot-footer input");
    const chatBody = document.querySelector(".chatbot-body");
    const userText = input.value.trim();
    if (userText === "") return;
    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.textContent = userText;
    chatBody.appendChild(userMsg);
    input.value = "";
    const botReply = getBotResponse(userText);
    const botMsg = document.createElement("div");
    botMsg.className = "bot-message";
    botMsg.textContent = botReply;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
}
function getBotResponse(question) {
    const q = question.toLowerCase().trim();
    const paths = [];
    function extractPaths(ul, parents = []) {
        const items = ul.querySelectorAll(':scope > li');
        items.forEach(li => {
            let text = '';
            for (const node of li.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    text += node.textContent;
                }
            }
            text = text.trim();
            if (!text) return;
            const currentPath = [...parents, text];
            paths.push({
                path: currentPath,
                element: li
            });
            const childUl = li.querySelector(':scope > ul');
            if (childUl) {
                extractPaths(childUl, currentPath);
            }
        });
    }
    const mainNav = document.querySelector('.navbar > ul');
    if (mainNav) {
        extractPaths(mainNav);
    }
    let matches = [];
    for (const item of paths) {
        const pathText = item.path.join(' ').toLowerCase();
        const lastItem = item.path[item.path.length - 1].toLowerCase();
        if (
            lastItem.includes(q) ||
            q.includes(lastItem) ||
            pathText.includes(q)
        ) {
            matches.push(item);
        }
    }
    if (matches.length > 0) {
        let response = `📍 I found the following related locations:\n\n`;
        matches.forEach(match => {
            const pathText = match.path.join(' → ');
            const lastItem = match.path[match.path.length - 1];
            const link = match.element.querySelector(':scope > a');
            const href = link ? link.getAttribute('href') : null;
            response += `🏠 ${lastItem}\n`;
            response += `${pathText}\n`;
            if (href && href !== '#') {
                response += `🔗 ${href}\n`;
            }
            response += `\n`;
        });
        return response;
    }
    return `🐶 I couldn't find that information. Try searching for terms such as:
• Hostels
• Registrar
• Dean
• Colleges
• Admission
• Contact`;
}


const collegeItems = document.querySelectorAll(".college-item");

const deptPanels = document.querySelectorAll(".dept-panel");

const infoPanels = document.querySelectorAll(".college-info-panel");

const departmentsColumn = document.querySelector(".departments-column");

const previewColumn = document.querySelector(".college-preview-column");


collegeItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        const target = item.dataset.target;

        // show right columns
        departmentsColumn.style.display = "block";
        previewColumn.style.display = "block";

        // remove active
        deptPanels.forEach(panel => {
            panel.classList.remove("active");
        });

        infoPanels.forEach(panel => {
            panel.classList.remove("active");
        });

        collegeItems.forEach(college => {
            college.classList.remove("active");
        });

        // activate current
        item.classList.add("active");

        document
            .getElementById(target + "-panel")
            .classList.add("active");

        document
            .getElementById(target + "-info")
            .classList.add("active");

    });

});

