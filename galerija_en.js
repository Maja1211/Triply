const galleryData = [
  {
    name: "Barcelona",
    category: "evropski",
    images: [
      "img/evropski_gradovi/barselona/barselonaslika1.jpeg",
      "img/evropski_gradovi/barselona/barselonaslika2.jpeg",
      "img/evropski_gradovi/barselona/barselonaslika3.jpeg",
      "img/evropski_gradovi/barselona/barselonaslika4.jpeg"
    ],
    video: "https://www.youtube.com/embed/a_bSBKWtFUE?si=YQF096urvNeT2SNN"
  },
  {
    name: "Paris",
    category: "evropski",
    images: [
      "img/evropski_gradovi/pariz/parizslika1.jpeg",
      "img/evropski_gradovi/pariz/parizslika3.jpeg",
      "img/evropski_gradovi/pariz/parizslika2.jpeg",
      "img/evropski_gradovi/pariz/parizslika4.jpeg"
    ],
    video: "https://www.youtube.com/embed/fbjXddLyacA?si=HqticmWW2evNAwPD"
  },
  {
    name: "Rome",
    category: "evropski",
    images: [
      "img/evropski_gradovi/rim/rimslika1.jpeg",
      "img/evropski_gradovi/rim/rimslika2.jpeg",
      "img/evropski_gradovi/rim/rimslika3.jpeg",
      "img/evropski_gradovi/rim/rimslika4.jpeg"
    ],
    video: "https://www.youtube.com/embed/XBbzOKhG1bQ?si=YJ8Vh4JeN33rOHHQ"
  },
  {
    name: "Egypt",
    category: "leto",
    images: [
      "img/leto/egipat/egipat1.jpeg",
      "img/leto/egipat/egipat2.jpeg",
      "img/leto/egipat/egipat3.jpeg",
      "img/leto/egipat/egipat4.jpeg",
      "img/leto/egipat/egipat5.jpeg"
    ],
    video: "https://www.youtube.com/embed/BwNyfylA7do?si=q9sDmRE-jgPvEagq"
  },
  {
    name: "Maldives",
    category: "leto",
    images: [
      "img/leto/maldivi/maldivi1.jpg",
      "img/leto/maldivi/maldivi2.jpg",
      "img/leto/maldivi/maldivi3.jpg",
      "img/leto/maldivi/maldivi4.jpg",
      "img/leto/maldivi/maldivi5.jpg"
    ],
    video: "https://www.youtube.com/embed/Z755vZBf9oM?si=7rgqmlVNm029f8yR"
  },
  {
    name: "Santorini",
    category: "leto",
    images: [
      "img/leto/santorini/santorini1.jpeg",
      "img/leto/santorini/santorini2.jpeg",
      "img/leto/santorini/santorini3.jpg",
      "img/leto/santorini/santorini4.jpg",
      "img/leto/santorini/santorini5.jpg"
    ],
    video: "https://www.youtube.com/embed/4zAEDLwl9HI?si=1zwjgb664cmqp242"
  },
  {
    name: "Colmar",
    category: "zima",
    images: [
      "img/zima/colmar/colmarslika3.jpeg",
      "img/zima/colmar/colmarslika2.jpeg",
      "img/zima/colmar/colmarslika1.jpeg",
      "img/zima/colmar/colmarslika4.jpeg"
    ],
    video: "https://www.youtube.com/embed/gUrTP2IsY8I?si=xu0o7kqPd8p0S6qB"
  },
  {
    name: "Jahorina",
    category: "zima",
    images: [
      "img/zima/jahorina/jahorina1.jpg",
      "img/zima/jahorina/jahorina2.jpg",
      "img/zima/jahorina/jahorina3.jpg",
      "img/zima/jahorina/jahorina4.jpg",
      "img/zima/jahorina/jahorina5.jpeg"
    ],
    video: "https://www.youtube.com/embed/0dwFnOuXFHU?si=vwVVXDKbI7ONDukV"
  },
  {
    name: "Lapland",
    category: "zima",
    images: [
      "img/zima/lapland/finska1.jpg",
      "img/zima/lapland/finska2.jpg",
      "img/zima/lapland/finska3.jpg",
      "img/zima/lapland/finska4.jpg",
      "img/zima/lapland/finska5.jpg"
    ],
    video: "https://www.youtube.com/embed/5Y45L5lYVuo?si=BGDVDD9tVEB5XVmS"
  }
];

const destinationContainer = document.getElementById("destinationContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const isYouTube = url => /(?:youtube\.com|youtu\.be)/i.test(url);
const slug = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();

function renderDestinations(destinations) {
  destinationContainer.innerHTML = "";
  destinations.forEach(dest => {
    const row = document.createElement("div");
    row.className = "row mb-4 align-items-center";
    const carouselId = `carousel-${slug(dest.name)}`;
    const videoHtml = isYouTube(dest.video)
      ? `
        <div class="ratio ratio-16x9" style="height: 200px;">
          <iframe
            src="${dest.video}"
            title="${dest.name} video"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            style="width:100%; height:100%; border:0;">
          </iframe>
        </div>`
      : `<video src="${dest.video}" class="w-100" style="height: 200px; object-fit: cover;" controls></video>`;
    row.innerHTML = `
      <div class="col-12 mb-2">
        <h4 class="text-center">${dest.name}</h4>
      </div>
      <div class="col-md-6">
        <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${dest.images.map((imgSrc, index) => `
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${imgSrc}" class="d-block w-100" alt="${dest.name} ${index+1}" style="height: 200px; object-fit: cover;">
              </div>
            `).join('')}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-md-6">
        ${videoHtml}
      </div>
    `;
    destinationContainer.appendChild(row);
  });
}

renderDestinations(galleryData);

categoryFilter.addEventListener("change", () => {
  const category = categoryFilter.value;
  const filteredData = category === "all" ? galleryData : galleryData.filter(dest => dest.category === category);
  renderDestinations(filteredData);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredData = galleryData.filter(dest => dest.name.toLowerCase().includes(query));
  renderDestinations(filteredData);
});

const toggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleBtn.textContent = currentTheme === "light" ? "🌞" : "🌙";
}
toggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggleBtn.textContent = newTheme === "light" ? "🌞" : "🌙";
});

const isEnglishPage = window.location.href.includes('_en.html');
const defaultLang = isEnglishPage ? 'en' : 'sr';
let currentLang = localStorage.getItem('lang') || defaultLang;
document.getElementById('currentLang').textContent = currentLang.toUpperCase();

if ((currentLang === 'en' && !isEnglishPage) || (currentLang === 'sr' && isEnglishPage)) {
  const newUrl = currentLang === 'en' ? window.location.href.replace('.html', '_en.html') : window.location.href.replace('_en.html', '.html');
  window.location.href = newUrl;
}

document.querySelectorAll('.dropdown-item[data-lang]').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    currentLang = e.target.getAttribute('data-lang');
    localStorage.setItem('lang', currentLang);
    document.getElementById('currentLang').textContent = currentLang.toUpperCase();
    const newUrl = currentLang === 'en' ? window.location.href.replace('.html', '_en.html') : window.location.href.replace('_en.html', '.html');
    window.location.href = newUrl;
  });
});
