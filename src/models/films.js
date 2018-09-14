const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Films = function () {
  this.films = [];
}

Films.prototype.bindEvents = function () {
  this.getData();
  PubSub.subscribe('FilmChartView:film-index', e => {
    PubSub.publish('Films:film-details', this.films[e.detail])
  })
}

Films.prototype.getData = function () {
  const url = 'https://ghibliapi.herokuapp.com/films';
  const request = new Request(url);
  request.get()
    .then(data => {
      this.films = data;
      this.publishScore()
    })
    .catch(error => console.error(error));
}

Films.prototype.publishScore = function () {
  const scores = this.films.map(film => {
    return {title: film.title, rt_score: film.rt_score}
  });
  PubSub.publish('Films:scores', scores);
}

module.exports = Films;
