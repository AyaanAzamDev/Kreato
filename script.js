
// ========================================
// KREATO - AI CONTENT GENERATOR
// ========================================

const HISTORY_KEY = "kreatoContentHistory";

// ========================================
// MARKDOWN RENDERING
// ========================================

function renderMarkdown(content) {
    const cleanContent = content.replace(
        /\\([*_#`~>-])/g,
        "$1"
    );

    document.getElementById("result").innerHTML =
        DOMPurify.sanitize(marked.parse(cleanContent));
}

// ========================================
// GENERATE CONTENT
// ========================================

async function generateContent() {

    const topic = document.getElementById("topic").value.trim();
    const contentType = document.getElementById("contentType").value;
    const tone = document.getElementById("tone").value;
    const audience = document.getElementById("audience").value.trim();

    const result = document.getElementById("result");
    const button = document.getElementById("generateBtn");

    if (topic === "") {
        result.innerText = "Please enter a topic first!";
        return;
    }

    button.disabled = true;
    button.innerText = "Kreato is thinking...";

    result.innerText = "Creating your content. Please wait...";

    try {

        const response = await fetch("/api/generate", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                topic: topic,
                contentType: contentType,
                tone: tone,
                audience: audience
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Generation failed");
        }

        // Display generated content
        renderMarkdown(data.content);

        // Automatically save to history
        saveToHistory({
            topic: topic,
            contentType: contentType,
            tone: tone,
            audience: audience,
            content: data.content
        });

    } catch (error) {

        console.error(error);

        result.innerText =
            "Sorry! Something went wrong. Please try again.";

    } finally {

        button.disabled = false;
        button.innerText = "Generate Content ✨";

    }
}

// ========================================
// CONTENT HISTORY - LOCAL STORAGE
// ========================================

function getHistory() {

    try {
        return JSON.parse(
            localStorage.getItem(HISTORY_KEY)
        ) || [];
    } catch (error) {
        console.error("History loading error:", error);
        return [];
    }

}

function saveToHistory(item) {

    const history = getHistory();

    const newItem = {
        id: Date.now() + "-" + Math.random(),
        ...item,
        date: new Date().toLocaleString()
    };

    history.unshift(newItem);

    // Keep only the latest 20 generations
    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history.slice(0, 20))
    );

    renderHistory();

}

// ========================================
// DISPLAY HISTORY
// ========================================

function renderHistory() {

    const historyList = document.getElementById("historyList");

    if (!historyList) return;

    const history = getHistory();

    historyList.replaceChildren();

    if (history.length === 0) {

        const emptyMessage = document.createElement("p");
        emptyMessage.textContent =
            "No content history yet. Start creating!";

        historyList.appendChild(emptyMessage);
        return;
    }


    history.forEach(item => {

        const card = document.createElement("div");
        card.className = "history-card";

        const heading = document.createElement("h3");
        heading.textContent = item.topic;

        const details = document.createElement("p");
        details.textContent =
            item.contentType + " | " + item.tone;

        const date = document.createElement("small");
        date.textContent = item.date;

        const viewButton = document.createElement("button");
        viewButton.textContent = "View Content";
        viewButton.type = "button";

        viewButton.addEventListener("click", () => {
            viewHistoryItem(item.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            deleteHistoryItem(item.id);
        });

        card.append(
            heading,
            details,
            date,
            document.createElement("br"),
            viewButton,
            deleteButton
        );

        historyList.appendChild(card);

    });

}

// ========================================
// VIEW PREVIOUS CONTENT
// ========================================

function viewHistoryItem(id) {

    const history = getHistory();

    const item = history.find(entry => entry.id === id);

    if (!item) return;

    document.getElementById("topic").value = item.topic;
    document.getElementById("contentType").value = item.contentType;
    document.getElementById("tone").value = item.tone;
    document.getElementById("audience").value = item.audience;

    renderMarkdown(item.content);

    document.getElementById("result").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

// ========================================
// DELETE ONE HISTORY ITEM
// ========================================

function deleteHistoryItem(id) {

    const history = getHistory();

    const updatedHistory = history.filter(
        item => item.id !== id
    );

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(updatedHistory)
    );

    renderHistory();

}

// ========================================
// CLEAR ALL HISTORY
// ========================================

function clearHistory() {

    const confirmed = confirm(
        "Are you sure you want to delete all content history?"
    );

    if (!confirmed) return;

    localStorage.removeItem(HISTORY_KEY);

    renderHistory();

}

// ========================================
// COPY CONTENT
// ========================================

async function copyContent() {

    const result = document.getElementById("result");

    if (!result.innerText.trim() ||
        result.innerText.includes("Your AI-generated content will appear here.")) {

        alert("Please generate content first!");
        return;
    }

    try {

        await navigator.clipboard.writeText(result.innerText);
        alert("Content copied successfully!");

    } catch (error) {

        alert("Unable to copy content. Please try again.");

    }

}

// ========================================
// DOWNLOAD CONTENT
// ========================================

function downloadContent() {

    const result = document.getElementById("result");

    if (!result.innerText.trim() ||
        result.innerText.includes("Your AI-generated content will appear here.")) {

        alert("Please generate content first!");
        return;
    }

    const blob = new Blob([result.innerText], {
        type: "text/plain"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Kreato-Generated-Content.txt";

    link.click();

    URL.revokeObjectURL(url);

}

// ========================================
// REGENERATE CONTENT
// ========================================

async function regenerateContent() {

    const button = document.getElementById("regenerateBtn");

    button.disabled = true;
    button.innerText = "Regenerating...";

    try {

        await generateContent();

    } finally {

        button.disabled = false;
        button.innerText = "Regenerate Content ↻";

    }

}

// ========================================
// LOAD HISTORY WHEN PAGE OPENS
// ========================================

renderHistory();
