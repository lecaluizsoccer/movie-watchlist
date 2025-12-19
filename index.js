const mainContainer = document.querySelector(".main-container")
const body = document.querySelector("body")
const inputValue = document.querySelector("input")
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
let currentMovie = null;

body.addEventListener("click", (e) => {
   
    if(e.target.classList.contains("btn")){
       
        apiMovie(inputValue.value);

        inputValue.value = ""
       
    }
    if(e.target.classList.contains("my-watchlist")){
        mainContainer.innerHTML = ""
        watchlist.forEach((data) => {
        mainContainer.innerHTML += `<div class="movie-box">
        <div class="img-div">
            <img src="${data.Poster}" alt="">
        </div>
        <div class="movie-details">
            <h2 class="movie-title">${data.Title}<span class="star">★</span> <span class="ratings">${data.Ratings[0].Value}</h2></span>
            <div class="movieInfo-container">
                <p class="movie-info">${data.Runtime} ${data.Genre}</p>
                <div class="watchlist-div">
                    <p class="minus-sign" data-id="${data.imdbID}">-</p>
                    <p>Watchlist</p>
                </div>
            </div>
            <p class="movie-description">
                ${data.Plot}
            </p>
        </div>
        
    </div>
    <hr class="line-below">`;
    })}


    if (e.target.classList.contains("minus-sign")) {
          const movieId = e.target.dataset.id;
          removeFromWatchlistById(movieId);
          
          renderWatchlist();

    }
    else if(e.target.classList.contains("plus-sign")){
        addToWatchlist(currentMovie)
        saveWatchlist()
    }

})


async function apiMovie(movie) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=85d6dea4&t=${movie}`)

    const data = await response.json()

    currentMovie = data;

          mainContainer.innerHTML = `<div class="movie-box">
                    <div class="img-div">
                        <img src="${data.Poster}" alt="">
                    </div>
                    <div class="movie-details">
                        <h2 class="movie-title">${data.Title}<span class="star">★</span> <span class="ratings">${data.Ratings[0].Value}</h2></span>
                        <div class="movieInfo-container">
                            <p class="movie-info">${data.Runtime} ${data.Genre}</p>
                            <div class="watchlist-div">
                                <p class="plus-sign">﹢</p>
                                <p>Watchlist</p>
                            </div>
                        </div>
                        <p class="movie-description">
                            ${data.Plot}
                        </p>
                    </div>
                    
                </div>`

                return data
                
}

function addToWatchlist(movie) {
  const exists = watchlist.some((item) => item.imdbID === movie.imdbID);

  if (exists) {
    alert("Movie already in watchlist");
    return;
  }

  watchlist.push(movie);
  console.log("Watchlist:", watchlist);

}


function saveWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function removeFromWatchlistById(id) {
  watchlist = watchlist.filter((movie) => movie.imdbID !== id);
  saveWatchlist();
}


function renderWatchlist(){
    
    mainContainer.innerHTML = ""
    watchlist.forEach(data => { 
        mainContainer.innerHTML +=`<div class="movie-box">
        <div class="img-div">
            <img src="${data.Poster}" alt="">
        </div>
        <div class="movie-details">
            <h2 class="movie-title">${data.Title}<span class="star">★</span> <span class="ratings">${data.Ratings[0].Value}</h2></span>
            <div class="movieInfo-container">
                <p class="movie-info">${data.Runtime} ${data.Genre}</p>
                <div class="watchlist-div">
                    <p class="minus-sign" data-id="${data.imdbID}">-</p>
                    <p>Watchlist</p>
                </div>
            </div>
            <p class="movie-description">
                ${data.Plot}
            </p>
        </div>
        
    </div>
    <hr class="line-below">`;
})}



