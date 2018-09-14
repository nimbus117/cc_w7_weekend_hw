const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Films = function () {
  this.data = null;
}

Films.prototype.bindEvents = function () {
  this.getData();
}

Films.prototype.getData = function () {
  const url = 'https://ghibliapi.herokuapp.com/films';
  const request = new Request(url);
  request.get()
    .then(data => {
      this.data = data;
      console.log(this.data);
    })
    .catch(error => {
      console.error(error)
    });
}

module.exports = Films;
