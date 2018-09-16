const Nav = require('./models/nav.js');
const NavView = require('./views/nav_view.js');
const FilmsDetailView = require('./views/films_detail_view.js');
const FilmsChartView = require('./views/films_chart_view.js');
const DirectorsChartView = require('./views/directors_chart_view.js')
const DirectorsFilmsView = require('./views/directors_films_view.js')
const CharactersChartView = require('./views/characters_chart_view.js')

document.addEventListener('DOMContentLoaded', () => {
  const navElement = document.querySelector('#nav-list');
  const mainElement = document.querySelector('#main');
  const detailsElement = document.querySelector('#details');

  const nav = new Nav(mainElement, detailsElement);
  nav.bindEvents();

  const navView = new NavView(navElement);
  navView.bindEvents();

  const filmsChartView = new FilmsChartView(mainElement);
  filmsChartView.bindEvents();

  const filmsDetailView = new FilmsDetailView(detailsElement);
  filmsDetailView.bindEvents();

  const directorsChartView = new DirectorsChartView(mainElement);
  directorsChartView.bindEvents()

  const directorsFilmsView = new DirectorsFilmsView(detailsElement);
  directorsFilmsView.bindEvents()

  const charactersChartView = new CharactersChartView(mainElement);
  charactersChartView.bindEvents()
})
