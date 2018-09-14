const Films = require('./models/films.js')
document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const films = new Films();
  films.bindEvents();
})
