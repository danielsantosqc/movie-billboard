const ULR_API_TRENDING =
  "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY;
const ULR_API_GENRES =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY;

async function getTrendingMoviesPreview() {
  const res = await fetch(ULR_API_TRENDING);
  const data = await res.json();
  if ((res.status = 200)) {
    console.log("Bien");
    console.log(data);

    const trendingPreviweMoviesContainer = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );

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
}

async function getGenresMoviesPreview() {
  const res = await fetch(ULR_API_GENRES);
  const data = await res.json();
  if (res.status == 200) {
    console.log("ok ");
    console.log(data);

    const previewCategorieseContainer = document.querySelector(
      "#categoriesPreview .categoriesPreview-list"
    );
    
    data.genres.forEach((genre) => {
      
      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("category-container")

      const categoryTitle = document.createElement("h3");
      categoryTitle.classList.add("category-title")
      categoryTitle.setAttribute("id", "id"+genre.id);
      categoryTitle.textContent = genre.name;
      categoryContainer.appendChild(categoryTitle);
      previewCategorieseContainer.appendChild(categoryContainer);
    });
  } else {
    console.log("algo salio mal");
  }
}

getTrendingMoviesPreview();
getGenresMoviesPreview();
