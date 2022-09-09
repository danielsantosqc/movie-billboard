window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  console.log({ location });
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviePage();
  } else if (location.hash.startsWith("#category=")) {
    categoryPage();
  } else {
    homePage();
  }
}

function homePage() {
  console.log("Estamos en el Home!!!");

  getTrendingMoviesPreview();
  getGenresMoviesPreview();
}

function trendsPage() {
  console.log("Estamos en trends!!");
}

function searchPage() {
  console.log("Estamos en Busqueda!!");
}

function moviePage() {
  console.log("Estamos en Movie!!");
}

function categoryPage() {
  console.log("Estamos en categorias!!");
}
