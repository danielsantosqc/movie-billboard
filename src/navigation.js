// aqui se carga la funcion navigator
window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

arrowBtn.addEventListener("click", () => window.history.back())
searchFormBtn.addEventListener("click", () => (location.hash = "#search="+searchFormInput.value));
trendingBtn.addEventListener("click", () => (location.hash = "#trends"));

function navigator() {
  console.log({ location });
  location.hash.startsWith("#trends")
    ? trendsPage()
    : location.hash.startsWith("#search=")
    ? searchPage()
    : location.hash.startsWith("#movie=")
    ? movieDetailsPage()
    : location.hash.startsWith("#category=")
    ? categoryPage()
    : homePage();

    //scrool to top 
    window.scroll({
    top: 0,
    behavior: 'smooth'
  });
}

function homePage() {
  console.log("#Home!!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  searchForm.classList.remove("inactive");

  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");

  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericListSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesMoviesPreview();
}

function trendsPage() {
  console.log("#Trends!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  searchForm.classList.add("inactive");

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");

  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericListSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview(genericListSection);
  headerCategoryTitle.textContent = 'Tendencias';

}

function searchPage() {
  console.log("#Search!!");
  console.log(searchFormInput.value);

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  searchForm.classList.remove("inactive");

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");

  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericListSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split('=');//['#search', 'string']
  console.log(query);
  genericListSection.innerHTML = "";
  if(query){
    getMoviesBySearch(query);
  }
}

function movieDetailsPage() {
  console.log("#Movie!!");

  headerSection.classList.add("header-container--long");
  headerSection.style.background = "";

  searchForm.classList.add("inactive");

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");

  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericListSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [_, movieData] = location.hash.split('=');//['#movie', 'id-name']
  console.log(movieData)

  const [movie_id, movieName] = movieData.split('-');//['#id', 'name']
  console.log(movie_id)
  console.log(movieName)

  const categoryNameDecode = decodeURI(movieName)//por si el nombre tiene espacio

  getMovieDetails(movie_id)

}

function categoryPage() {
  console.log("#Category page!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  searchForm.classList.add("inactive");

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");

  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericListSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split('=');//['#category', 'id-name']
  console.log(categoryData)
  const [categoryId, categoryName] = categoryData.split('-');//['#id', 'name']
  console.log(categoryId)
  console.log(categoryName)
  const categoryNameDecode = decodeURI(categoryName)//por si el nombre tiene espacio

  getMoviesByCategory(categoryId);

  headerCategoryTitle.textContent = categoryNameDecode;
  
}
