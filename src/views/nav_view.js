const PubSub = require('../helpers/pub_sub.js');

const NavView = function (element) {
  this.element = element;
}

NavView.prototype.bindEvents = function () {
  this.element.addEventListener('click', e => {
    PubSub.publish('NavView:navigation', e.srcElement.innerHTML);
  })
}

module.exports = NavView;
