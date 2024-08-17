document.addEventListener('DOMContentLoaded', function() {
    const flashcards = [
        { question: "Why might users receive errors when populating a custom picklist field in Salesforce?", answer: "Due to contradicting validation rules." },
        { question: "What allows quick access to auto-numbering system identifiers in Universal Containers?", answer: "Auto-response Rules and Self-service Portal." },
        { question: "What happens to time-dependent actions if criteria are no longer met?", answer: "They are automatically removed from the queue." },
        { question: "How can an administrator configure Salesforce for different sales teams?", answer: "Create specific Page Layouts, Sales Processes, and Record Types." },
        { question: "What is the best practice for tracking user and customer issues?", answer: "Use Record Types and Support Processes." },
        { question: "What type of access can sharing rules provide?", answer: "Read Only and Read/Write." },
        { question: "How should a Salesforce Chatter user send a private message?", answer: "Use the 'Post Private Message' feature." },
        { question: "What tool tracks configuration changes?", answer: "Setup Audit Trail." },
        { question: "How should cases be assigned based on product category?", answer: "Use Assignment Rules based on picklist values." },
        { question: "What considerations are there when setting product prices?", answer: "Consider different list prices in different price books." },
        // Add additional flashcards as needed
    ];

    // Move focus to the hidden instruction region
    const instructionRegion = document.querySelector('.visually-hidden');
    instructionRegion.focus();

    const flashcardsContainer = document.getElementById("flashcards");
    const accessibleList = document.querySelector('.accessible-view ul');

    flashcards.forEach(cardData => {
        const cardElement = createCard(cardData);
        flashcardsContainer.appendChild(cardElement);
        accessibleList.appendChild(createListItem(cardData));
    });

    function createCard(cardData) {
        const container = document.createElement("div");
        container.className = "card-container";
        container.setAttribute("tabindex", "0"); // Make focusable

        const card = document.createElement("div");
        card.className = "card";

        const front = document.createElement("div");
        front.className = "front";
        front.setAttribute("role", "button");
        front.innerHTML = `<p>${cardData.question}</p>`; // Only question on front

        const back = document.createElement("div");
        back.className = "back";
        back.setAttribute("role", "button");
        back.setAttribute("aria-hidden", "true");
        back.innerHTML = `<p>${cardData.answer}</p>`; // Only answer on back

        card.appendChild(front);
        card.appendChild(back);
        container.appendChild(card);

        container.addEventListener("click", () => toggleCard(card));
        container.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleCard(card);
            }
        });

        return container;
    }

    function toggleCard(card) {
        const isFlipped = card.classList.toggle('flipped');
        const front = card.querySelector('.front');
        const back = card.querySelector('.back');
        front.setAttribute('aria-hidden', isFlipped);
        back.setAttribute('aria-hidden', !isFlipped);
    }

    function createListItem(cardData) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>Q:</strong> ${cardData.question}<br><strong>A:</strong> ${cardData.answer}`; // Adjusted format
        return listItem;
    }
});
