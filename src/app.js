const Films = require('./models/films.js')
const FilmView = require('./views/film_view.js')
const ChartView = require('./views/chart_view.js')

document.addEventListener('DOMContentLoaded', () => {

  const filmViewElement = document.querySelector('#film-info');
  const filmView = new FilmView(filmViewElement);
  filmView.bindEvents();

  const chartViewElement = document.querySelector('#film-chart');
  const chartView = new ChartView(chartViewElement);
  chartView.bindEvents();

  const films = new Films();
  films.bindEvents();
})
