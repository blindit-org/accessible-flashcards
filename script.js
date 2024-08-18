document.addEventListener('DOMContentLoaded', function() {
    // Get the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file') || 'data1';  // Default to 'data1.json' if no parameter is provided
    
    // Replace hyphens with spaces for display
    const formattedFilename = file.replace(/-/g, ' ');  // Replace hyphens with spaces

    // Display the JSON filename in the heading
    const heading = document.getElementById('json-filename-heading');
    heading.textContent = formattedFilename;

    // Fetch the appropriate JSON file
    fetch(`${file}.json`)
        .then(response => response.json())
        .then(flashcards => {
            const flashcardsContainer = document.getElementById("flashcards");
            const accessibleList = document.querySelector('.accessible-view ul');

            flashcards.forEach(cardData => {
                const cardElement = createCard(cardData);
                flashcardsContainer.appendChild(cardElement);
                accessibleList.appendChild(createListItem(cardData));
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));

    function createCard(cardData) {
        const container = document.createElement("div");
        container.className = "card-container";
        container.setAttribute("tabindex", "0");

        const card = document.createElement("div");
        card.className = "card";

        const front = document.createElement("div");
        front.className = "front";
        front.setAttribute("role", "button");
        front.innerHTML = `<p>${cardData.question}</p>`;

        const back = document.createElement("div");
        back.className = "back";
        back.setAttribute("role", "button");
        back.setAttribute("aria-hidden", "true");
        back.innerHTML = `<p>${cardData.answer}</p>`;

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
        listItem.innerHTML = `<strong>Q:</strong> ${cardData.question}<br><strong>A:</strong> ${cardData.answer}`;
        return listItem;
    }
});
