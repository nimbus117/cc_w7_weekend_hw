const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const SelectView = function (element, channel) {
  this.element = element;
  this.channel = channel;
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe(this.channel, e => {
    // console.log(e.detail);
    e.detail.forEach((item, index) => {
      const option = createAppend('option', item, this.element);
      option.value = index;
    })
  })
}

module.exports = SelectView;
