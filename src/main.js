const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

function createMovies(movies, container) {
  container.innerHTML = "";
  console.log(movies);
  movies.forEach((movie) => {
    if(movie.poster_path){
      const movieContainer = document.createElement("div");
      movieContainer.classList.add("movie-container");
  
      const movieImg = document.createElement("img");
      movieImg.classList.add("movie-img");
      movieImg.setAttribute("alt", movie.title);
      movieImg.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w300" + movie.poster_path
      );
      movieImg.addEventListener("click", () => {
        location.hash = `#movie=${movie.id}-${movie.title}`;
      });
      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    }
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

async function getMovieDetails(id) {
  const { data: movie } = await api("movie/" + id);
  const categories = movie.genres;
  const movieImgPath = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

  headerSection.style.background = `
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.35) 19.27%, 
      rgba(0, 0, 0, 0) 29.17%
      ),
    url(${movieImgPath})
  `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average.toFixed(1);

  createCategories(categories, movieDetailCategoriesList);
  getRelatedMoviesId(id);
  console.log(movie);
}

async function getRelatedMoviesId(id){
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;
  createMovies(relatedMovies,relatedMoviesContainer)
}

async function getTrendingMoviesPreview(container = trendingMoviesPreviewList) {
  const { status, data } = await api("trending/movie/day");
  if (status == 200) {
    // console.log("Bien");
    // console.log(data);
    const movies = data.results;
    createMovies(movies, container);
  } else {
    console.log("error");
  }
}

async function getMoviesByCategory(id) {
  const { status, data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  if (status == 200) {
    console.log("movies by category");
    console.log(data);

    const movies = data.results;

    createMovies(movies, genericListSection);
  } else {
    console.log("error");
  }
}

async function getMoviesBySearch(query) {
  const { status, data } = await api("search/movie", {
    params: {
      // query: query,
      query,
    },
  });
  if (status == 200) {
    console.log("movies by category");
    console.log(data);

    const movies = data.results;

    createMovies(movies, genericListSection);
  } else {
    console.log("error");
  }
}

async function getCategoriesMoviesPreview() {
  const { data, status } = await api("genre/movie/list");
  if (status == 200) {
    console.log("categorias ");
    console.log(data);

    const categories = data.genres;
    createCategories(categories, categoriesPreviewList);
  } else {
    console.log("algo salio mal");
  }
}
