function initSearch() {
    var searchbar = document.getElementById("search");
    
    searchbar.addEventListener("focus", searchFocus);
    searchbar.addEventListener("blur", searchBlur);
}
function searchBlur() {
    var container = document.getElementById("search-container");
    container.classList.remove("active");
}
function searchFocus() {
    var container = document.getElementById("search-container");
    container.classList.add("active");
}

window.addEventListener("load", initSearch);