const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Films = function () {
  this.films = [];
  this.directors = [];
}

Films.prototype.bindEvents = function () {
  this.getData();
  PubSub.subscribe('FilmChartView:film-index', e => {
    PubSub.publish('Films:film-details', this.films[e.detail])
  })
  PubSub.subscribe('DirectorsChartView:director-index', e => {
    PubSub.publish('Films:directors-films', this.directors[e.detail])
  })
}

Films.prototype.getData = function () {
  const url = 'https://ghibliapi.herokuapp.com/films';
  const request = new Request(url);
  request.get()
    .then(data => {
      this.films = data;
      this.filmsByDirector();
    })
    .catch(error => console.error(error));
}

Films.prototype.filmsByDirector = function () {
  this.directors = this.films
    .map(film => film.director)
    .filter((director, index, directors) => directors.indexOf(director) === index)
    .map(director => {
      return {
        name: director,
        films: this.films.filter(film => film.director === director)
      }
    })
    .sort((a,b) => b.films.length - a.films.length);
}

Films.prototype.publishScores = function () {
  const scores = this.films.map(film => {
    return {title: film.title, rt_score: film.rt_score}
  });
  PubSub.publish('Films:scores', scores);
}

Films.prototype.publishDirectors = function () {
  const directors = this.directors
    .map(director => {
      return {
        name: director.name,
        y: director.films.length
      }
    });
  PubSub.publish('Films:directors', directors);
}

module.exports = Films;
