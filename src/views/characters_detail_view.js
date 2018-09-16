const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const CharactersDetailView = function (element) {
  this.element = element;
}

CharactersDetailView.prototype.bindEvents = function () {
  PubSub.subscribe('Characters:characters', e => this.render(e.detail));
}

CharactersDetailView.prototype.render = function (characters) {
  this.element.innerHTML = '';
  characters.forEach(character => {
    createAppend('h2', character.name, this.element);
    const list = createAppend('ul', '', this.element);
    const listItems = ['species', 'gender', 'age'];
    listItems.forEach(item => {
      createAppend('li', `${item}: ${character[item]}`, list);
    });
  })
}

module.exports = CharactersDetailView;
