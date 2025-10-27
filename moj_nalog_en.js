document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("rezervacijeContainer");
  const rezervacije = JSON.parse(localStorage.getItem("rezervacije")) || [];
  const ocene = JSON.parse(localStorage.getItem("ocene")) || {};
  const proseci = JSON.parse(localStorage.getItem("proseci")) || {};
  const ocenePoRez = JSON.parse(localStorage.getItem("ocene_po_rez")) || {};
  const currentLang = document.documentElement.lang || "en";

  if (rezervacije.length === 0) {
    container.innerHTML = `<p class="text-center text-muted mt-4">No active reservations.</p>`;
    return;
  }

  const danas = new Date();
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const enToSr = {
    "Paris": "Pariz",
    "Maldives": "Maldivi",
    "Lapland": "Laponija",
    "Santorini": "Santorini",
    "Egypt": "Egipat",
    "Barcelona": "Barselona",
    "Jahorina": "Jahorina",
    "Rome": "Rim",
    "Colmar": "Kolmar"
  };

  const srToEn = {
    "Pariz": "Paris",
    "Maldivi": "Maldives",
    "Laponija": "Lapland",
    "Santorini": "Santorini",
    "Egipat": "Egypt",
    "Barselona": "Barcelona",
    "Jahorina": "Jahorina",
    "Rim": "Rome",
    "Kolmar": "Colmar"
  };

  function prikaziDestinaciju(orig, lang) {
    if (lang === "sr") {
      if (enToSr[orig]) return enToSr[orig];
      return orig;
    } else {
      if (srToEn[orig]) return srToEn[orig];
      return orig;
    }
  }

  rezervacije.forEach((rez, index) => {
    const pocetak = new Date(rez.datumPolaska);
    const kraj = new Date(rez.datumPovratka);

    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";

    const isEn = currentLang === "en";
    const key = `${rez.destinacija}|${rez.datumPolaska}|${rez.datumPovratka}|${rez.hotel}`;
    const prikazDest = prikaziDestinaciju(rez.destinacija, currentLang);

    const canCancel = pocetak.getTime() - danas.getTime() >= 5 * MS_PER_DAY;
    const isPast = kraj < danas;

    const cancelText = "Cancel";
    const rateText = "Rate";
    const removeText = "Remove Rating";
    const hotelText = "Hotel";
    const periodText = "Period";
    const priceText = "Price";

    card.innerHTML = `
      <div class="card h-100">
        <div class="card-header">${prikazDest}</div>
        <div class="card-body">
          <p><strong>${hotelText}:</strong> ${rez.hotel}</p>
          <p><strong>${periodText}:</strong> ${rez.datumPolaska} - ${rez.datumPovratka}</p>
          <p><strong>${priceText}:</strong> €${rez.cena}</p>
          <div class="text-center mt-3">
            ${isPast ? "" : (canCancel ? `<button class="btn btn-cancel">${cancelText}</button>` : "")}
            ${isPast ? `<button class="btn btn-rate">${rateText}</button>` : ""}
          </div>
          <div class="rating mt-2 d-none"></div>
        </div>
      </div>
    `;

    container.appendChild(card);

    function skiniGlasZaDestinaciju(dest, vrednost) {
      if (ocene[dest] && ocene[dest].length) {
        const idx = ocene[dest].indexOf(vrednost);
        if (idx !== -1) ocene[dest].splice(idx, 1);
        if (ocene[dest].length) {
          const avg = ocene[dest].reduce((a, b) => a + b, 0) / ocene[dest].length;
          proseci[dest] = avg.toFixed(2);
        } else {
          delete ocene[dest];
          delete proseci[dest];
        }
        localStorage.setItem("ocene", JSON.stringify(ocene));
        localStorage.setItem("proseci", JSON.stringify(proseci));
      }
    }

    const cancelBtn = card.querySelector(".btn-cancel");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        if (ocenePoRez[key] !== undefined) {
          const saved = parseInt(ocenePoRez[key]);
          delete ocenePoRez[key];
          localStorage.setItem("ocene_po_rez", JSON.stringify(ocenePoRez));
          skiniGlasZaDestinaciju(rez.destinacija, saved);
        }
        rezervacije.splice(index, 1);
        localStorage.setItem("rezervacije", JSON.stringify(rezervacije));
        location.reload();
      });
    }

    const rateBtn = card.querySelector(".btn-rate");
    const ratingDiv = card.querySelector(".rating");

    function renderStars(selected) {
      ratingDiv.classList.remove("d-none");
      ratingDiv.innerHTML = Array.from({ length: 5 }, (_, i) => `<span data-star="${i + 1}">★</span>`).join("");
      const stars = ratingDiv.querySelectorAll("span");
      stars.forEach((s, idx) => {
        if (selected && idx < selected) s.classList.add("active");
        else s.classList.remove("active");
      });
      return stars;
    }

    if (isPast && ocenePoRez[key]) {
      const saved = parseInt(ocenePoRez[key]);
      const stars = renderStars(saved);
      if (rateBtn) rateBtn.disabled = true;
      const removeBtn = document.createElement("button");
      removeBtn.className = "btn btn-secondary mt-2";
      removeBtn.textContent = removeText;
      ratingDiv.parentElement.appendChild(removeBtn);
      removeBtn.addEventListener("click", () => {
        delete ocenePoRez[key];
        localStorage.setItem("ocene_po_rez", JSON.stringify(ocenePoRez));
        skiniGlasZaDestinaciju(rez.destinacija, saved);
        if (rateBtn) rateBtn.disabled = false;
        removeBtn.remove();
        ratingDiv.classList.add("d-none");
      });
    }

    if (rateBtn) {
      rateBtn.addEventListener("click", () => {
        if (ocenePoRez[key]) {
          alert("You have already rated this trip.");
          return;
        }
        const stars = renderStars(0);
        stars.forEach(star => {
          star.addEventListener("click", () => {
            const ocena = parseInt(star.dataset.star);
            stars.forEach((s, idx) => {
              if (idx < ocena) s.classList.add("active");
              else s.classList.remove("active");
            });
            ocene[rez.destinacija] = ocene[rez.destinacija] || [];
            ocene[rez.destinacija].push(ocena);
            const sveOcene = ocene[rez.destinacija];
            const avg = sveOcene.reduce((a, b) => a + b, 0) / sveOcene.length;
            proseci[rez.destinacija] = avg.toFixed(2);
            localStorage.setItem("ocene", JSON.stringify(ocene));
            localStorage.setItem("proseci", JSON.stringify(proseci));
            ocenePoRez[key] = ocena;
            localStorage.setItem("ocene_po_rez", JSON.stringify(ocenePoRez));
            alert(`You rated ${prikazDest} with ${ocena} ★`);
            rateBtn.disabled = true;
            const removeBtn = document.createElement("button");
            removeBtn.className = "btn btn-secondary mt-2";
            removeBtn.textContent = removeText;
            ratingDiv.parentElement.appendChild(removeBtn);
            removeBtn.addEventListener("click", () => {
              delete ocenePoRez[key];
              localStorage.setItem("ocene_po_rez", JSON.stringify(ocenePoRez));
              skiniGlasZaDestinaciju(rez.destinacija, ocena);
              alert("Rating removed.");
              rateBtn.disabled = false;
              removeBtn.remove();
              ratingDiv.classList.add("d-none");
            });
          });
        });
      });
    }
  });
});
