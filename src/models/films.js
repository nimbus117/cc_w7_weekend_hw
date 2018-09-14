const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Films = function () {
  this.films = [];
  this.currentFilm = null;
}

Films.prototype.bindEvents = function () {
  this.getData();
  PubSub.subscribe('SelectView:title-index', e => {
    PubSub.publish('Films:film-details', this.filmDetails(e.detail))
  })
}

Films.prototype.getData = function () {
  const url = 'https://ghibliapi.herokuapp.com/films';
  const request = new Request(url);
  request.get()
    .then(data => {
      this.films = data;
      this.publishTitles()
    })
    .catch(error => console.error(error));
}

Films.prototype.publishTitles = function () {
  const titles = this.films.map(film => film.title);
  PubSub.publish('Films:titles', titles);
}

Films.prototype.filmDetails = function (index) {
  this.currentFilm = this.films[index];
  return this.currentFilm; 
}

module.exports = Films;
