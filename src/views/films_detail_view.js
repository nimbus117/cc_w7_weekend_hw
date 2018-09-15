const PubSub = require('../helpers/pub_sub.js');
const FilmDetailsView = require('./film_details_view.js');

const FilmsDetailView = function (element) {
  this.element = element;
}

FilmsDetailView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:film-details', e => this.render(e.detail));
}

FilmsDetailView.prototype.render = function (film) {
  this.element.innerHTML = '';
  const filmDetailsView = new FilmDetailsView(this.element);
  filmDetailsView.render(film);
}

module.exports = FilmsDetailView;
