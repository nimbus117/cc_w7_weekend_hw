const Films = require('./models/films.js')
const SelectView = require('./views/select_view.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const filmElement = document.querySelector('#select-films')
  const filmSelect = new SelectView(filmElement, 'Films:titles', 'SelectView:title-index');
  filmSelect.bindEvents();

  const films = new Films();
  films.bindEvents();
})
