const $ = (id) => document.querySelector(id);

// header-Section---------
const headerSection = $('#header');
const searchForm = $('#searchForm');//Lists & Containers

//trending-section---------
const trendingPreviewSection = $('#trendingPreview');
const trendingMoviesPreviewList = $('.trendingPreview-movieList');//Lists & Containers

//category-section
const categoriesPreviewSection = $('#categoriesPreview');
const categoriesPreviewList = $('.categoriesPreview-list');//Lists & Containers

//liked-section
const likedMoviesSection = $('#liked');
const likedMoviesListArticle = $('.liked-movieList');//Lists & Containers


//generic-section
const genericListSection = $('#genericList');

const movieDetailCategoriesList = $('#movieDetail .categories-list');//Lists & Containers


//details-section
const movieDetailSection = $('#movieDetail');
const relatedMoviesContainer = $('.relatedMovies-scrollContainer');//Lists & Containers


// Elements---
const arrowBtn = $('.header-arrow');
const headerTitle = $('.header-title');
const headerCategoryTitle = $('.header-title--categoryView');

//elements-buttons and links
const searchFormInput = $('#searchForm input');
const searchFormBtn = $('#searchBtn');
const trendingBtn = $('.trendingPreview-btn');

//elements-titles
const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('.movieDetail-score');