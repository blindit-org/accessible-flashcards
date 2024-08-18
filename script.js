/*
Copyright (c) 2024 Dustin Lewis and Mark Opatow. All rights reserved.
This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
You may not use this file except in compliance with this license. Commercial use is prohibited without prior authorization.
*/

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder') || '';
    const file = urlParams.get('file') || 'data1';

    // Construct the correct file path
    const filePath = folder ? `json/${folder}/${file}.json` : `json/${file}.json`;

    // Replace hyphens with spaces for display
    const formattedFilename = file.replace(/-/g, ' ');  // Replace hyphens with spaces

    // Display the JSON filename in the heading
    const heading = document.getElementById('json-filename-heading');
    heading.textContent = formattedFilename;

    console.log('Fetching from:', filePath);

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(flashcards => {
            const flashcardsContainer = document.getElementById("flashcards");
            const accessibleList = document.querySelector('.accessible-view ul');

            flashcards.forEach(cardData => {
                const cardElement = createCard(cardData);
                flashcardsContainer.appendChild(cardElement);
                accessibleList.appendChild(createListItem(cardData));
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
            // Additional handling if needed, such as displaying an error message to the user
        });
});

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
