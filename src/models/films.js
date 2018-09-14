const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Films = function () {
  this.data = [];
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
      this.data = data;
      // console.log(this.data);
      const titles = this.getTitles(this.data)
      // console.log(titles);
      PubSub.publish('Films:titles', titles);
    })
    .catch(error => {
      console.error(error)
    });
}

Films.prototype.getTitles = function (films) {
  return films.map(film => film.title);
}

Films.prototype.filmDetails = function (index) {
  this.currentFilm = this.data[index];
  // console.log(this.currentFilm);
  return this.currentFilm; 
}

module.exports = Films;
