
// ========================================
// KREATO - AI CONTENT GENERATOR
// ========================================

const HISTORY_KEY = "kreatoContentHistory";
let currentFinalContent = "";

// ========================================
// MARKDOWN RENDERING
// ========================================

function renderMarkdown(content) {
    currentFinalContent = content || "";

    document.getElementById("result").innerHTML =
        DOMPurify.sanitize(marked.parse(content || ""));
}

// ========================================
// DISPLAY AI COMPARISON RESULTS
// ========================================

function renderComparison(data) {
    const result = document.getElementById("result");

    result.replaceChildren();

    // AI Model Comparison Heading
    const comparisonHeading = document.createElement("h2");
    comparisonHeading.textContent = "AI Model Comparison";
    result.appendChild(comparisonHeading);

    // Comparison Table
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "comparison-table-wrapper";

    const table = document.createElement("table");
    table.className = "comparison-table";

    // Table Header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    data.responses.forEach((item) => {
        const th = document.createElement("th");
        th.textContent = item.provider;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table Body
    const tbody = document.createElement("tbody");
    const contentRow = document.createElement("tr");

    data.responses.forEach((item) => {
        const td = document.createElement("td");

        if (item.success && item.content) {
            td.innerHTML = DOMPurify.sanitize(
                marked.parse(item.content)
            );
        } else {
            td.textContent =
                item.error || "Generation failed";
        }

        contentRow.appendChild(td);
    });

    tbody.appendChild(contentRow);
    table.appendChild(tbody);

    tableWrapper.appendChild(table);
    result.appendChild(tableWrapper);

    // ========================================
    // AI EVALUATION SCORES
    // ========================================

    if (data.evaluation?.scores?.length) {

        const evaluationHeading = document.createElement("h2");
        evaluationHeading.textContent = "AI Evaluation Scores";
        result.appendChild(evaluationHeading);

        data.evaluation.scores.forEach((score) => {

            const scoreCard = document.createElement("div");
            scoreCard.className = "score-card";

            const providerHeading = document.createElement("h3");
            providerHeading.textContent = score.provider;

            scoreCard.appendChild(providerHeading);

            const categories = [
                ["Creativity", score.creativity],
                ["Relevance", score.relevance],
                ["Engagement", score.engagement],
                ["Tone", score.tone],
                ["Structure", score.structure]
            ];

            categories.forEach(([label, value]) => {
                const paragraph = document.createElement("p");
                paragraph.textContent = `${label}: ${value}/10`;
                scoreCard.appendChild(paragraph);
            });

            const totalHeading = document.createElement("h3");
            totalHeading.textContent = `Total: ${score.total}/10`;
            scoreCard.appendChild(totalHeading);

            const reason = document.createElement("p");
            reason.textContent = score.reason || "";
            scoreCard.appendChild(reason);

            result.appendChild(scoreCard);
        });
    }

    // ========================================
    // FINAL OPTIMIZED CONTENT
    // ========================================

    const finalContent = data.finalContent ||
        data.responses.find(item => item.success)?.content;

    currentFinalContent = finalContent || "";

    if (finalContent) {

        const finalHeading = document.createElement("h2");
        finalHeading.textContent =
            "Kreato's Final Optimized Content";

        result.appendChild(finalHeading);

        const finalBox = document.createElement("div");
        finalBox.className = "final-content";

        finalBox.innerHTML = DOMPurify.sanitize(
            marked.parse(finalContent)
        );

        result.appendChild(finalBox);

        return finalContent;
    }

    result.appendChild(
        document.createTextNode(
            "No AI provider generated content successfully."
        )
    );

    return "";
}

// ========================================
// GENERATE CONTENT
// ========================================

async function generateContent(remarks = "") {

    const topic = document.getElementById("topic").value.trim();
    const contentType = document.getElementById("contentType").value;
    const tone = document.getElementById("tone").value;
    const audience = document.getElementById("audience").value.trim();

    const result = document.getElementById("result");
    const button = document.getElementById("generateBtn");

    if (!topic) {
        result.innerText = "Please enter a topic first!";
        return;
    }

    button.disabled = true;
    button.innerText = "Comparing AI Models...";

    result.innerText =
        "Kreato is generating and evaluating responses from three AI models. Please wait...";

    currentFinalContent = "";

    try {

        const response = await fetch("/api/compare", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic,
                contentType,
                tone,
                audience,
                remarks
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Comparison failed");
        }

        const finalContent = renderComparison(data);

        if (finalContent) {
            saveToHistory({
                topic,
                contentType,
                tone,
                audience,
                remarks,
                content: finalContent
            });
        }

    } catch (error) {

        console.error("Kreato comparison error:", error);

        currentFinalContent = "";

        result.innerText =
            "Sorry! Kreato could not complete the comparison. Please try again.";

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

    if (!currentFinalContent.trim()) {
        alert("Please generate content first!");
        return;
    }

    try {

        await navigator.clipboard.writeText(currentFinalContent);

        alert("Final content copied successfully!");

    } catch (error) {

        alert("Unable to copy content. Please try again.");
    }
}

// ========================================
// DOWNLOAD CONTENT
// ========================================

function downloadContent() {

    if (!currentFinalContent.trim()) {
        alert("Please generate content first!");
        return;
    }

    const blob = new Blob([currentFinalContent], {
        type: "text/plain"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Kreato-Final-Content.txt";

    link.click();

    URL.revokeObjectURL(url);
}

// ========================================
// REGENERATE CONTENT WITH USER FEEDBACK
// ========================================

// Show or hide the feedback panel
function toggleRegenerateOptions() {

    const panel = document.getElementById("regeneratePanel");

    panel.hidden = !panel.hidden;

    if (!panel.hidden) {

        panel.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
}

// ========================================
// REGENERATE WITHOUT REMARKS
// ========================================

async function regenerateWithoutRemarks() {

    const remarks = document.getElementById("remarks");

    remarks.value = "";

    await runRegeneration("");
}

// ========================================
// REGENERATE WITH REMARKS
// ========================================

async function regenerateWithRemarks() {

    const remarks = document.getElementById("remarks").value.trim();

    if (!remarks) {
        alert("Please enter your remarks first!");
        return;
    }

    await runRegeneration(remarks);
}

// ========================================
// COMMON REGENERATION FUNCTION
// ========================================

async function runRegeneration(remarks) {

    const panel = document.getElementById("regeneratePanel");

    const withoutBtn = document.getElementById(
        "regenerateWithoutRemarksBtn"
    );

    const withBtn = document.getElementById(
        "regenerateWithRemarksBtn"
    );

    const regenerateBtn = document.getElementById("regenerateBtn");

    if (withoutBtn.disabled || withBtn.disabled) {
        return;
    }

    withoutBtn.disabled = true;
    withBtn.disabled = true;

    if (regenerateBtn) {
        regenerateBtn.disabled = true;
    }

    panel.hidden = true;

    try {

        await generateContent(remarks);

    } finally {

        withoutBtn.disabled = false;
        withBtn.disabled = false;

        if (regenerateBtn) {
            regenerateBtn.disabled = false;
        }
    }
}

// ========================================
// LOAD HISTORY WHEN PAGE OPENS
// ========================================

renderHistory();
