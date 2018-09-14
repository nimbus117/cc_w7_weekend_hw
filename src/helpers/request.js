const Request = function (url) {
  this.url = url;
}

Request.prototype.get = function () {
  return fetch(this.url)
    .then(response => response.json())
    .catch(error => {console.log(error)});
}

module.exports = Request;
