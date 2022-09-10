const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

async function getTrendingMoviesPreview() {
  const { status, data } = await api("trending/movie/day");
  if (status == 200) {
    // console.log("Bien");
    // console.log(data);
    trendingMoviesPreviewList.innerHTML = "";

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
      trendingMoviesPreviewList.appendChild(movieContainer);
    });
  } else {
    console.log("error");
  }
}

async function getGenresMoviesPreview() {
  const { data, status } = await api("genre/movie/list");
  if (status == 200) {
    // console.log("ok ");
    // console.log(data);
    categoriesPreviewList.innerHTML = "";

    data.genres.forEach((genre) => {
      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("category-container");

      const categoryTitle = document.createElement("h3");
      categoryTitle.classList.add("category-title");
      categoryTitle.setAttribute("id", "id" + genre.id);
      const categoryTitleText = document.createTextNode(genre.name);
      
      categoryTitle.appendChild(categoryTitleText)
      categoryContainer.appendChild(categoryTitle);
      categoriesPreviewList.appendChild(categoryContainer);
    });
  } else {
    console.log("algo salio mal");
  }
}
