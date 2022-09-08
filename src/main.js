console.log(API_KEY);
const ULR_API =
  "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY;

console.log(ULR_API);

async function getTrendingMoviesPreview() {
  try {
    const res = await fetch(ULR_API);
    const data = await res.json();
    if ((res.status = 200)) {
      const trendingPreviweMoviesContainer = document.querySelector(
        "#trendingPreview .trendingPreview-movieList"
      );
      console.log("Biesssn");
      console.log(data);
      data.results.forEach((movie) => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");

        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
          "src",
          "https://image.tmdb.org/t/p/w300" + movie.poster_path
        );
        movieContainer.appendChild(movieImg);
        trendingPreviweMoviesContainer.appendChild(movieContainer);
      });
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
}
getTrendingMoviesPreview();
