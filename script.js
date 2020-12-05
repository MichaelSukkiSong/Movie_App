/* **************************
6. Movie App
- https://uidesigndaily.com/posts/photoshop-movie-app-mobile-day-193
- list of movies
- movie info
- fav movie
- actors
************************** */

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

elements = {
    cardContainer: document.querySelector(".card-container"),
    movieMark: document.querySelector(".movie-mark"),
    searchInput: document.querySelector(".search-input"),
    searhForm: document.querySelector(".search-form"),
}

const getMovieData = async () => {
    const result = await fetch(APIURL);
    const data = await result.json();
    const moviesData = data.results;
    // console.log(moviesData)
    return moviesData;
}

const searchMovie = async (query) => {
    console.log(query)
    const result = await fetch(SEARCHAPI+query);
    const data = await result.json();
    const searchResult = data.results;
    console.log(searchResult);
    return searchResult;
}

const voteNumColor = (num) => {
    if (num <6) {
        //red
        return 'red';
    } else if (num >=6 && num <7.5) {
        //yellow
        return 'yellow';
    } else {
        //bright green
        return 'green';
    }
}

const displayMovies = (data) => {
    let new_html = '';
    for (let i=0; i < data.length; i++) {
        const color = voteNumColor(data[i].vote_average);
        const html = `
            <div class="card">
                <div class="card-top">
                    <a href="#">
                    <img src=${IMGPATH}${data[i].poster_path} alt=${data[i].title}>
                    </a>
                </div>
                <div class="card-bottom">
                    <a href="#">
                       <span class="movie-title">${data[i].title}</span>
                    </a>
                    <div class="movie-mark-container">
                        <div class="movie-mark ${color}">${data[i].vote_average}</div>
                    </div>
                </div>
            </div>
            `;
            new_html += html;
    }
    elements.cardContainer.insertAdjacentHTML("beforeend", new_html);
}

const constrolSearch = () => {
    // get input
    const input = elements.searchInput.value;
    console.log(input);
    // search query from api and return data
    // display data
    searchMovie(input).then(data => displayMovies(data));
}

const clearContainer = () => {
    elements.cardContainer.innerHTML = '';
}

const clearInputField = () => {
    elements.searchInput.value = '';
}

getMovieData().then(data => displayMovies(data));

/* search button */

elements.searhForm.addEventListener("submit", e => {
    e.preventDefault();
    // clear container
    clearContainer();
    // control search
    constrolSearch();
    // claer input field
    clearInputField();
})

