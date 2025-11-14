// js logic
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const loadingText = document.getElementById("loading-text");

let keyword = "";
let page = 1;

// search image function
async function searchImages() {
    keyword = searchBox.value;

    // SHOW loading text
    loadingText.style.display = "block";

    try {
        const response = await fetch(`https://image-search-engine-1.onrender.com/search?query=${keyword}&page=${page}`);
        const data = await response.json();
        console.log(data);

        // clear old search result
        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        // show more button
        showMoreBtn.style.display = "block";
    }
    catch (error) {
        loadingText.innerText = "Error loading images. Try again.";
    }
    finally {
        // HIDE loading text
        loadingText.style.display = "none";
    }
}

// search functionality
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

// show more functionality
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
})