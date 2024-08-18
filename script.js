/*
Copyright (c) 2024 Dustin Lewis and Mark Opatow. All rights reserved.
This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
You may not use this file except in compliance with this license. Commercial use is prohibited without prior authorization.
*/

document.addEventListener('DOMContentLoaded', function() {
    // Get the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file') || 'data1';  // Default to 'data1.json' if no parameter is provided
    
    // Extract and format the JSON filename for display
    const filename = file + '.json';
    const formattedFilename = filename.split('_').join(' ').replace('.json', ''); // Replace underscores with spaces and remove the .json extension
    
    // Display the JSON filename in the heading
    const heading = document.getElementById('json-filename-heading');
    heading.textContent = formattedFilename;

    // Fetch the appropriate JSON file
    fetch(`${file}.json`)
        .then(response => response.json())
        .then(flashcards => {
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
        })
        .catch(error => console.error('Error fetching JSON:', error));

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
