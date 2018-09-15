const PubSub = require('../helpers/pub_sub.js');
const FilmDetailsView = require('./film_details_view.js');

const DirectorsFilmsView = function (element) {
  this.element = element;
}

DirectorsFilmsView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:directors-films', e => this.render(e.detail));
}

DirectorsFilmsView.prototype.render = function (director) {
  this.element.innerHTML = '';
  director.films.forEach(film => {
    const filmDetailsView = new FilmDetailsView(this.element);
    filmDetailsView.render(film);
  })
}

module.exports = DirectorsFilmsView;
