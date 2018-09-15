const PubSub = require('../helpers/pub_sub.js');
const Films = require('./films.js');
const DirectorsView = require('../views/directors_view.js')

const Nav = function (mainElement, detailsElement) {
  this.mainElement = mainElement;
  this.detailsElement = detailsElement;
  this.films = new Films();
}

Nav.prototype.bindEvents = function () {
  this.films.bindEvents();
  const directorsView = new DirectorsView(this.mainElement);
  directorsView.bindEvents()
  PubSub.subscribe('NavView:navigation', e => {
    switch (e.detail) {
      case 'Films':
        this.renderFilms(); break;
      case 'Directors':
        this.renderDirectors(); break;
      case 'Characters': break;
    }
  })
}

Nav.prototype.renderDirectors = function () {
  this.clearElements();
  this.films.publishDirectors()
}

Nav.prototype.renderFilms = function () {
  this.clearElements();
  this.films.publishScores()
}

Nav.prototype.clearElements = function () {
  this.mainElement.innerHTML = '';
  this.detailsElement.innerHTML = '';
}

module.exports = Nav;
