window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

arrowBtn.addEventListener('click', ()=> location.hash = '#home')
searchFormBtn.addEventListener('click', ()=> location.hash = '#search=')
trendingBtn.addEventListener('click', ()=> location.hash = '#trends' )

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
}

function homePage() {
  console.log("Home!!!");

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
  getGenresMoviesPreview();
}

function trendsPage() {
  console.log("Trends!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  searchForm.classList.add("inactive");

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericListSection.classList.remove ("inactive");
  movieDetailSection.classList.add("inactive");
}

function searchPage() {
  console.log("Search!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  searchForm.classList.remove("inactive");

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericListSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
}

function movieDetailsPage() {
  console.log("Movie!!");
 
  headerSection.classList.add("header-container--long");
  // headerSection.style.background = "";

  searchForm.classList.add("inactive");

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");

  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericListSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");
}

function categoryPage() {
  console.log("Category!!");

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
}
