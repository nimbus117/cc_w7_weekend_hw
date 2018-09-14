const Films = require('./models/films.js')
const SelectView = require('./views/select_view.js')
const FilmView = require('./views/film_view.js')
const FilmChart = require('./views/chart_view.js')

document.addEventListener('DOMContentLoaded', () => {

  const filmSelectElement = document.querySelector('#select-films');
  const filmSelect = new SelectView(filmSelectElement, 'Films:titles', 'SelectView:title-index');
  filmSelect.bindEvents();

  const filmViewElement = document.querySelector('#film-info');
  const filmView = new FilmView(filmViewElement);
  filmView.bindEvents();

  const filmChartElement = document.querySelector('#film-chart');
  const filmChart = new FilmChart(filmChartElement);
  filmChart.bindEvents();

  const films = new Films();
  films.bindEvents();
})
