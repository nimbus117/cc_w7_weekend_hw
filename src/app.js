const Nav = require('./models/nav.js');
const NavView = require('./views/nav_view.js');
const Films = require('./models/films.js');
const FilmDetailsView = require('./views/film_details_view.js');
const FilmChartView = require('./views/film_chart_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const films = new Films();
  films.bindEvents();

  const nav = new Nav();
  nav.bindEvents();

  const navElement = document.querySelector('#nav-list');
  const navView = new NavView(navElement);
  navView.bindEvents();

  const filmChartElement = document.querySelector('#main');
  const filmChartView = new FilmChartView(filmChartElement);
  filmChartView.bindEvents();

  const filmDetailsElement = document.querySelector('#details');
  const filmDetailsView = new FilmDetailsView(filmDetailsElement);
  filmDetailsView.bindEvents();

})
