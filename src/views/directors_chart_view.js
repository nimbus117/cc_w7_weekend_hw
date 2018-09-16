const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

const DirectorsChartView = function (element) {
  this.element = element;
}

DirectorsChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:directors', e => this.render(e.detail));
}

DirectorsChartView.prototype.render = function (directors) {
  Highcharts.chart(this.element, {
    chart: {
      borderWidth: 1,
      backgroundColor: '#ECC27C'
    },
    title: {
      text: 'Films By Director'
    },
    xAxis: {
      categories: directors.map(d => d.name)
    },
    yAxis: {
      title: {
        text: 'Number of Films'
      },
      tickInterval: 1
    },
    series: [{
      name: 'number of films',
      type: 'bar',
      data: directors,
      showInLegend: false,
    }],
    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: function (event) {
            PubSub.publish('DirectorsChartView:director-index', event.point.index);
          }
        }
      }
    },
  });
}

module.exports = DirectorsChartView;
