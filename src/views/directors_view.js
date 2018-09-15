const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const DirectorsView = function (element) {
  this.element = element;
}

DirectorsView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:directors', e => {
    e.detail.forEach(director => createAppend('h2', director, this.element));
  })
}

module.exports = DirectorsView;
