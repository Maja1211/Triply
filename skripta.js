
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const cards = document.querySelectorAll(".kartica");


function filterCards() {
  const searchTerm = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector("h4, h3").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function sortCards() {
  const sortType = sortSelect.value;
  const containerSections = document.querySelectorAll(".aranzmani .row");

  containerSections.forEach(section => {
    const cardArray = Array.from(section.children);

    if (sortType === "naziv") {
      cardArray.sort((a, b) => {
        const nameA = a.querySelector("h4, h3").textContent.toLowerCase();
        const nameB = b.querySelector("h4, h3").textContent.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else if (sortType === "cena") {
      cardArray.sort((a, b) => {
        const priceA = parseInt(a.querySelector(".cena, span").textContent);
        const priceB = parseInt(b.querySelector(".cena, span").textContent);
        return priceA - priceB;
      });
    }


    cardArray.forEach(card => section.appendChild(card));
  });
}

searchInput.addEventListener("input", filterCards);
sortSelect.addEventListener("change", sortCards);
