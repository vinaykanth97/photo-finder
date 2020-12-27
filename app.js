const auth = "563492ad6f9170000100000185b19bdbd1054727b602a4850f6809bb";
const searchBar = document.querySelector(".form-input");
const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
//   "https://api.pexels.com/v1/search?query=nature&per_page=1"
const moreBtn = document.querySelector(".more-btn .btn");
let searchValue;
let i = 0;
let fetchLink;
let currentSearch;

searchBar.addEventListener("input", searchStuffs);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

async function searchStuffs(e) {
  searchValue = e.target.value;
}

moreBtn.addEventListener("click", (e) => {
  fetchMore(e);
});
async function fetchApi(url) {
  let fetchPhoto = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  });
  let pexelData = await fetchPhoto.json();

  return pexelData;
}

function generateData(data) {
  data.photos.forEach((photos) => {
    let gallerImg = document.createElement("div");
    gallerImg.innerHTML = `
    <div class="gallery-info">
        <p>${photos.photographer}</p>
        <a href="${photos.src.original}" target="_blank">View Original</a>
    </div>
    <img src="${photos.src.large}"/>
    `;

    gallerImg.classList.add("gallery-img");

    gallery.appendChild(gallerImg);
  });
}

async function getPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  let pexelData = await fetchApi(fetchLink);
  generateData(pexelData);
}
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15`;
  let pexelData = await fetchApi(fetchLink);

  generateData(pexelData);
}

async function fetchMore(e) {
  i += 1;

  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=${i}`;
    let formatted = await fetchApi(fetchLink);
    generateData(formatted);
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${i}`;
    let formatted = await fetchApi(fetchLink);
    generateData(formatted);
  }
}

function clear() {
  gallery.innerHTML = "";
  searchBar.value = "";
}
getPhotos();
