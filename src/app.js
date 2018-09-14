const Films = require('./models/films.js')
const FilmDetailsView = require('./views/film_view.js')
const FilmChartView = require('./views/chart_view.js')

document.addEventListener('DOMContentLoaded', () => {

  const filmDetailsElement = document.querySelector('#film-details');
  const filmDetailsView = new FilmDetailsView(filmDetailsElement);
  filmDetailsView.bindEvents();

  const filmChartElement = document.querySelector('#film-chart');
  const filmChartView = new FilmChartView(filmChartElement);
  filmChartView.bindEvents();

  const films = new Films();
  films.bindEvents();
})
