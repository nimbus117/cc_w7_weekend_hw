const PubSub = require('../helpers/pub_sub.js');
const Films = require('./films.js');
const Characters = require('./characters.js');

const Nav = function (mainElement, detailsElement) {
  this.mainElement = mainElement;
  this.detailsElement = detailsElement;
  this.films = new Films();
  this.characters = new Characters();
}

Nav.prototype.bindEvents = function () {
  this.films.bindEvents();
  this.characters.bindEvents();
  PubSub.subscribe('NavView:navigation', e => {
    switch (e.detail) {
      case 'Films':
        this.renderFilms(); break;
      case 'Directors':
        this.renderDirectors(); break;
      case 'Characters':
        this.renderCharacters(); break;
    }
  })
}

Nav.prototype.renderCharacters = function () {
  this.clearElements();
  this.characters.publishCharacterTypes()
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
