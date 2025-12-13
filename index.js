// const key = `85d6dea4`
const mainContainer = document.querySelector(".main-container")
const body = document.querySelector("body")
const inputValue = document.querySelector("input")
const previewDiv = document.querySelector(".preview")

body.addEventListener("click", (e) => {

    if(e.target.classList.contains("btn")){
        // previewDiv.style.display = "none"
        apiMovie(inputValue.value);
    }
    
})


function apiMovie(movie) {
    fetch(`http://www.omdbapi.com/?apikey=85d6dea4&t=${movie}`)
      .then((response) => response.json())
      .then((data) =>
        console.log(data)(
          (mainContainer.innerHTML = `<div class="movie-box">
                    <img src="${data.Poster}" alt="">
                    <div class="movie-details">
                        <h2 class="movie-title">${data.Title}<span>★ ${data.Ratings[0].Value}</span></h2>
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
                </div>`)
        )
      );
}