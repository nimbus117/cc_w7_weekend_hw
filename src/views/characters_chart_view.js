const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

const CharactersChartView = function (element) {
  this.element = element;
}

CharactersChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Characters:types', e => {
    this.render(e.detail.gender, 'Gender')
    this.render(e.detail.species, 'Species')
  });
}

CharactersChartView.prototype.render = function (type, title) {
  const element = createAppend('div', '', this.element);
  Highcharts.chart(element, {
    chart: {
      borderWidth: 1,
      backgroundColor: '#ECC27C'
    },
    title: {
      text: title
    },
    series: [{
      name: 'number of characters',
      type: 'pie',
      data: type,
      showInLegend: false,
    }],
    plotOptions: {
      pie: {
        cursor: 'pointer',
        events: {
          click: function (event) {
            const payload = {type: title.toLowerCase(), value: event.point.name}
            PubSub.publish('CharactersChartView:type', payload);
            console.log(payload)
          }
        }
      }
    },
  });
}

module.exports = CharactersChartView;
