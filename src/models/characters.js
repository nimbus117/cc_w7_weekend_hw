const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Characters = function () {
  this.people = [];
  this.species = [];
  this.characters = [];
}

Characters.prototype.bindEvents = function () {
  this.getPeople();
  this.getSpecies();
  PubSub.subscribe('CharactersChartView:type', e => {
    PubSub.publish('Characters:characters', this.filterCharacters(e.detail))
  });
}

Characters.prototype.getPeople = function () {
  const url = 'https://ghibliapi.herokuapp.com/people/';
  const request = new Request(url);
  request.get()
    .then(data => {
      this.people = data;
      // console.log(data)
    })
    .catch(error => console.error(error));
}

Characters.prototype.getSpecies = function () {
  const url = 'https://ghibliapi.herokuapp.com/species/';
  const request = new Request(url);
  request.get()
    .then(data => {
      this.species = data;
      // console.log(data)
    })
    .catch(error => console.error(error));
}

Characters.prototype.getCharacterSpecies = function (speciesId) {
  const id = speciesId.replace('https://ghibliapi.herokuapp.com/species/','');
  return this.species.find(species => species.id === id).name;
}

Characters.prototype.getCharacters = function () {
  this.characters = this.people.map(c => {
    return {
      name: c.name,
      gender: c.gender,
      age: c.age,
      species: this.getCharacterSpecies(c.species),
    }
  })
  console.log(this.characters);
}

Characters.prototype.getTypesCount = function (property) {
  const pSum = {}
  this.characters.map(c => c[property]).forEach(p => pSum[p] = (pSum[p] || 0)+1);
  const sumArray = [];
  for (p in pSum) {sumArray.push({name: p, y: pSum[p]})}
  return sumArray;
}

Characters.prototype.publishCharacterTypes = function () {
  this.getCharacters();
  const speciesArr = this.getTypesCount('species');
  const genderArr = this.getTypesCount('gender');
  console.log({species: speciesArr, gender: genderArr})
  PubSub.publish('Characters:types', {species: speciesArr, gender: genderArr})
}

Characters.prototype.filterCharacters = function (payload) {
  const characters = this.characters.filter(c => c[payload.type] === payload.value);
  console.log(characters);
  return characters;
}

module.exports = Characters;
