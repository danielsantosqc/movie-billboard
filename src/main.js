// data ++++++++++++++++

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: API_KEY,
  },
})

function likedMoviesList() {
  const likedMovies = JSON.parse(localStorage.getItem('liked_movies')) || {}
  return likedMovies
}

function likeMovie(movie) {
  console.log(movie)
  const likedMovies = likedMoviesList()
  if (likedMovies[movie.id]) {
    console.log('ya estaba, y lo borramos')
    delete likedMovies[movie.id] // delete id and value from object
  } else {
    likedMovies[movie.id] = movie // add id and value to object
    console.log('no estaba, y lo agregamos')
  }
  localStorage.setItem('liked_movies', JSON.stringify(likedMovies))

  console.log(JSON.parse(localStorage.getItem('liked_movies'))) // localStorage data
}

// utils and render ++++++++++++++++

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-src')
      entry.target.setAttribute('src', url)
      lazyLoader.unobserve(entry.target)
      console.log(entry.target.getAttribute('alt') + '  --> Cargada') // movie title --> Loaded
    }
  })
})

function createMovies(
  movies,
  container,
  { lazyLoad = false, clear = true } = {}
) {
  if (clear) {
    container.innerHTML = ''
  }
  // console.log(movies)
  movies.forEach((movie) => {
    if (movie.poster_path) {
      const movieContainer = document.createElement('div')
      movieContainer.classList.add('movie-container')
      const movieImg = document.createElement('img')
      movieImg.classList.add('movie-img')
      movieImg.setAttribute('alt', movie.title)
      movieImg.setAttribute(
        // "src",
        // 'data-src',
        lazyLoad ? 'data-src' : 'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path
      )
      movieImg.addEventListener('click', () => {
        location.hash = `#movie=${movie.id}-${movie.title}`
      })
      movieImg.addEventListener('error', (e) => {
        e.target.src = 'https://via.placeholder.com/300x450'
        console.log('hubo un error')
      })

      if (lazyLoad) {
        lazyLoader.observe(movieImg)
      }
      const movieButton = document.createElement('button')
      const likedMovies = likedMoviesList()
      if (likedMovies[movie.id]) {
        movieButton.classList.add('movie-button--liked')
        console.log('verde!!!')
      }
      movieButton.classList.add('movie-button')
      movieButton.addEventListener('click', (e) => {
        movieButton.classList.toggle('movie-button--liked')
        likeMovie(movie)
        getLikedMovies()
        e.stopPropagation()
      })
      movieContainer.appendChild(movieImg)
      movieContainer.appendChild(movieButton)

      container.appendChild(movieContainer)
    }
  })
}

function createCategories(categories, container) {
  container.innerHTML = ''

  categories.forEach((category) => {
    const categoryContainer = document.createElement('div')
    categoryContainer.classList.add('category-container')

    const categoryTitle = document.createElement('h3')
    categoryTitle.classList.add('category-title')
    categoryTitle.setAttribute('id', 'id' + category.id)
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`
    })
    const categoryTitleText = document.createTextNode(category.name)

    categoryTitle.appendChild(categoryTitleText)
    categoryContainer.appendChild(categoryTitle)
    container.appendChild(categoryContainer)
  })
}

//  Api calls and render ++++++++++
async function getMovieDetails(id) {
  const { data: movie } = await api('movie/' + id)
  const categories = movie.genres
  const movieImgPath = 'https://image.tmdb.org/t/p/w500' + movie.poster_path

  headerSection.style.background = `
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.35) 19.27%, 
      rgba(0, 0, 0, 0) 29.17%
      ),
    url(${movieImgPath})
  `

  movieDetailTitle.textContent = movie.title
  movieDetailDescription.textContent = movie.overview
  movieDetailScore.textContent = movie.vote_average.toFixed(1)

  createCategories(categories, movieDetailCategoriesList)
  getRelatedMoviesId(id)
  // console.log(movie)
}

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`)
  const relatedMovies = data.results
  createMovies(relatedMovies, relatedMoviesContainer)
}

async function getTrendingMoviesPreview() {
  const { status, data } = await api.get('trending/movie/day')
  if (status == 200) {
    // console.log("Bien");
    // console.log(data);
    const movies = data.results
    createMovies(movies, trendingMoviesPreviewList, {
      lazyLoad: true,
      clear: true,
    })
  } else {
    console.log('error')
  }
}

// # trending
async function getTrendingMovies() {
  const { status, data } = await api.get('trending/movie/day')
  if (status == 200) {
    // console.log("Bien");
    // console.log(data);
    const movies = data.results
    // genericListSection.classList.remove('inactive')
    createMovies(movies, genericListSection, { lazyLoad: true, clear: false })
    // add new element button html to the createMovies.
    const buttonMore = document.createElement('button')
    buttonMore.textContent = 'More...'
    buttonMore.style.minWidth = '100%'
    buttonMore.style.height = '2rem'
    buttonMore.addEventListener('click', () => {
      // console.log('click')
      getTrendingMoviesPaginated()
      buttonMore.remove()
    })
    genericListSection.appendChild(buttonMore)
  } else {
    console.log('error')
  }
}
let paginationTrending = 1
async function getTrendingMoviesPaginated() {
  paginationTrending++
  // console.log(pagination)
  const { status, data } = await api('trending/movie/day', {
    params: {
      page: paginationTrending,
    },
  })
  if (status == 200) {
    // console.log("Bien");
    // console.log(data);
    const movies = data.results
    createMovies(movies, genericListSection, { lazyLoad: true, clear: false })

    // add new element button html to the createMovies.
    const buttonMore = document.createElement('button')
    buttonMore.textContent = 'More...'
    buttonMore.style.minWidth = '100%'
    buttonMore.style.height = '2rem'
    buttonMore.addEventListener('click', () => {
      // console.log('click')
      getTrendingMoviesPaginated()
      buttonMore.remove()
    })
    genericListSection.appendChild(buttonMore)
  } else {
    console.log('error')
  }
}

// #categories
async function getMoviesByCategory(id) {
  const { status, data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  })
  if (status == 200) {
    console.log('movies by category')
    // console.log(data)

    const movies = data.results

    createMovies(movies, genericListSection, { lazyLoad: true, clear: true })
    // add new element button html to the createMovies.
    const buttonMore = document.createElement('button')
    buttonMore.textContent = 'More...'
    buttonMore.style.minWidth = '100%'
    buttonMore.style.height = '2rem'
    buttonMore.addEventListener('click', () => {
      // console.log('click')
      getMoviesByCategoryPaginated(id)
      buttonMore.remove()
    })
    genericListSection.appendChild(buttonMore)
  } else {
    console.log('error')
  }
}
let paginationCategory = 1
async function getMoviesByCategoryPaginated(id) {
  paginationCategory++
  // console.log(pagination)
  const { status, data } = await api('discover/movie', {
    params: {
      with_genres: id,
      page: paginationCategory,
    },
  })
  if (status == 200) {
    console.log('movies by category')
    // console.log(data)

    const movies = data.results

    createMovies(movies, genericListSection, { lazyLoad: true, clear: false })

    // add new element button html to the createMovies.
    const buttonMore = document.createElement('button')
    buttonMore.textContent = 'More...'
    buttonMore.style.minWidth = '100%'
    buttonMore.style.height = '2rem'
    buttonMore.addEventListener('click', () => {
      // console.log('click')
      getMoviesByCategoryPaginated(id)
      buttonMore.remove()
    })
    genericListSection.appendChild(buttonMore)
  }
}

// #search
async function getMoviesBySearch(query) {
  const { status, data } = await api('search/movie', {
    params: {
      // query: query,
      query,
    },
  })
  if (status == 200) {
    console.log('movies by category')
    // console.log(data)

    const movies = data.results

    createMovies(movies, genericListSection, { lazyLoad: true, clear: true })

    // add new element button html to the createMovies.
    const buttonMore = document.createElement('button')
    buttonMore.textContent = 'More...'
    buttonMore.style.minWidth = '100%'
    buttonMore.style.height = '2rem'
    buttonMore.addEventListener('click', () => {
      // console.log('click')
      getMoviesBySearchPaginated(query)
      buttonMore.remove()
    })
    genericListSection.appendChild(buttonMore)
  } else {
    console.log('error')
  }
}
let paginationSearch = 1
async function getMoviesBySearchPaginated(query) {
  paginationSearch++
  // console.log(pagination)
  const { status, data } = await api('search/movie', {
    params: {
      query,
      page: paginationSearch,
    },
  })
  if (status == 200) {
    console.log('movies by category')
    // console.log(data)

    const movies = data.results

    createMovies(movies, genericListSection, { lazyLoad: true, clear: false })

    // add new element button html to the createMovies.
    const buttonMore = document.createElement('button')
    buttonMore.textContent = 'More...'
    buttonMore.style.minWidth = '100%'
    buttonMore.style.height = '2rem'
    buttonMore.addEventListener('click', () => {
      // console.log('click')
      getMoviesBySearchPaginated(query)
      buttonMore.remove()
    })
    genericListSection.appendChild(buttonMore)
  } else {
    console.log('error')
  }
}

async function getCategoriesMoviesPreview() {
  const { data, status } = await api('genre/movie/list')
  if (status == 200) {
    console.log('categorias ')
    // console.log(data)

    const categories = data.genres
    createCategories(categories, categoriesPreviewList)
  } else {
    console.log('algo salio mal')
  }
}

function getLikedMovies() {
  const likedMovies = likedMoviesList()
  const movies = Object.values(likedMovies)
  if (movies.length > 0) {
    likedMoviesSection.classList.remove('inactive')
    likedMoviesListArticle.innerHTML = ''
    createMovies(movies, likedMoviesListArticle, {
      lazyLoad: true,
      clear: true,
    })
    // console.log('movies favoritos')
    // console.log(movies)
  } else {
    likedMoviesSection.classList.add('inactive')
  }
}
