const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const FilmDetailsView = function (element) {
  this.element = element;
}

FilmDetailsView.prototype.render = function (film) {
  createAppend('h2', film.title, this.element);
  const list = createAppend('ul', '', this.element);
  const listItems = ['director', 'producer', 'release_date', 'rt_score'];
  listItems.forEach(item => {
    createAppend('li', `${item}: ${film[item]}`, list);
  });
  createAppend('p', film.description, this.element);
}

module.exports = FilmDetailsView;
