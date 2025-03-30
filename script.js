// js logic

// access key
const accessKey = "GGicNmSGumGSeKDB6ZRAxslNyNGWWE-mOGEyFF4ruW0";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

// search image function
async function searchImages() {
    // assign search box value to keyword
    keyword = searchBox.value;
    // url
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    // clear old search result
    if (page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    // showing results
    results.map((result) => {
        // create image 
        const image = document.createElement("img");
        image.src = result.urls.small;
        // create anchor tag
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        // to open image in new tab
        imageLink.target = "_blank";

        // img under a tag
        imageLink.appendChild(image);
        // add images
        searchResult.appendChild(imageLink);
    })

    // display show more button
    showMoreBtn.style.display = "block";
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