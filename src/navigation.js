// aqui se carga la función navigator

let counterSearchPage = 0
let counterTrendsPage = 0
let counterCategoryPage = 0

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

arrowBtn.addEventListener('click', (e) => {
  window.history.back()
})
searchFormBtn.addEventListener(
  'click',
  () => (location.hash = '#search=' + searchFormInput.value)
)
trendingBtn.addEventListener('click', () => (location.hash = '#trends'))

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  })
}

function navigator() {
  console.log({ location })
  location.hash.startsWith('#trends')
    ? trendsPage()
    : location.hash.startsWith('#search=')
    ? searchPage()
    : location.hash.startsWith('#movie=')
    ? movieDetailsPage()
    : location.hash.startsWith('#category=')
    ? categoryPage()
    : homePage()

  //scroll to top
  //   window.scroll({
  //   top: 0,
  //   behavior: 'smooth'
  // });
}

function homePage() {
  console.log('#Home!!!')

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''

  searchForm.classList.remove('inactive')

  arrowBtn.classList.add('inactive')
  arrowBtn.classList.remove('header-arrow--white')

  headerTitle.classList.remove('inactive')
  headerCategoryTitle.classList.add('inactive')

  trendingPreviewSection.classList.remove('inactive')
  categoriesPreviewSection.classList.remove('inactive')
  // likedMoviesSection.classList.remove('inactive')

  genericListSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive')

  getTrendingMoviesPreview()
  getCategoriesMoviesPreview()
  getLikedMovies()

  scrollToTop()
  counterCategoryPage = 0
  counterTrendsPage = 0
  counterSearchPage = 0
}

function trendsPage() {
  console.log('#Trends!!')

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''

  searchForm.classList.add('inactive')

  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')

  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  likedMoviesSection.classList.add('inactive')

  genericListSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  if (counterTrendsPage === 0) {
    getTrendingMovies()
    scrollToTop()
    counterTrendsPage++
    console.log(counterTrendsPage)
  }
  headerCategoryTitle.textContent = 'Tendencias'
}

function searchPage() {
  console.log('#Search!!')
  console.log(searchFormInput.value)

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''

  searchForm.classList.remove('inactive')

  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')

  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  likedMoviesSection.classList.add('inactive')

  genericListSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')
  if (counterSearchPage === 0) {
    const [_, query] = location.hash.split('=') //['#search', 'string']
    console.log(query)
    genericListSection.innerHTML = ''
    if (query) {
      getMoviesBySearch(query)
    }
    counterSearchPage++
  }
}

function movieDetailsPage() {
  console.log('#Movie!!')

  headerSection.classList.add('header-container--long')
  headerSection.style.background = ''

  searchForm.classList.add('inactive')

  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.add('header-arrow--white')

  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  likedMoviesSection.classList.add('inactive')

  genericListSection.classList.add('inactive')
  movieDetailSection.classList.remove('inactive')

  const [_, movieData] = location.hash.split('=') //['#movie', 'id-name']
  console.log(movieData)

  const [movie_id, movieName] = movieData.split('-') //['#id', 'name']
  console.log(movie_id)
  console.log(movieName)

  const categoryNameDecode = decodeURI(movieName) //por si el nombre tiene espacio

  getMovieDetails(movie_id)
  scrollToTop()
}

function categoryPage() {
  console.log('#Category page!!')

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''

  searchForm.classList.add('inactive')

  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')

  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  likedMoviesSection.classList.add('inactive')

  genericListSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  const [_, categoryData] = location.hash.split('=') //['#category', 'id-name']
  console.log(categoryData)
  const [categoryId, categoryName] = categoryData.split('-') //['#id', 'name']
  console.log(categoryId)
  console.log(categoryName)
  const categoryNameDecode = decodeURI(categoryName) //por si el nombre tiene espacio

  if (counterCategoryPage === 0) {
    genericListSection.innerHTML = ''
    getMoviesByCategory(categoryId)
    // scrollToTop()
    counterCategoryPage++
  }

  headerCategoryTitle.textContent = categoryNameDecode
}
