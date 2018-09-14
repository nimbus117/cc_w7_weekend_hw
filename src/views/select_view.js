const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const SelectView = function (element, subChannel, pubChannel) {
  this.element = element;
  this.subChannel =subChannel;
  this.pubChannel =pubChannel;
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe(this.subChannel, e => {
    // console.log(e.detail);
    e.detail.forEach((item, index) => {
      const option = createAppend('option', item, this.element);
      option.value = index;
    })

    this.element.addEventListener('change', e => {
      // console.log(e.target.value)
      PubSub.publish(this.pubChannel, e.target.value);
    })
  })
}

module.exports = SelectView;
