const Nav = require('./models/nav.js');
const NavView = require('./views/nav_view.js');
const FilmDetailsView = require('./views/film_details_view.js');
const FilmChartView = require('./views/film_chart_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const navElement = document.querySelector('#nav-list');
  const mainElement = document.querySelector('#main');
  const detailsElement = document.querySelector('#details');

  const nav = new Nav(mainElement, detailsElement);
  nav.bindEvents();

  const navView = new NavView(navElement);
  navView.bindEvents();

  const filmChartView = new FilmChartView(mainElement);
  filmChartView.bindEvents();

  const filmDetailsView = new FilmDetailsView(detailsElement);
  filmDetailsView.bindEvents();

})
