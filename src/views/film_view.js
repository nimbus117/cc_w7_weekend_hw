const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const FilmView = function (element) {
  this.element = element;
}

FilmView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:film-details', e => {
    // console.log(e.detail);
    this.element.innerHTML = '';
    const film = e.detail;
    createAppend('h2', film.title, this.element);
    const list = createAppend('ul', '', this.element);
    const listItems = ['director', 'producer', 'release_date', 'rt_score']
    listItems.forEach(item => {
      createAppend('li', `${item}: ${film[item]}`, list);
    })
    createAppend('p', film.description, this.element);
  })
}

module.exports = FilmView;
