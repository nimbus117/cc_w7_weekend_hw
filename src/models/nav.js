const PubSub = require('../helpers/pub_sub.js');

const Nav = function () {

}

Nav.prototype.bindEvents = function () {
  PubSub.subscribe('NavView:navigation', e => {
    switch (e.detail) {
      case 'Films':
        break;
      case 'Directors':
        break;
      case 'Characters':
        break;
    }
  })
}

module.exports = Nav;
