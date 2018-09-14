const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

const ChartView = function (element) {
  this.element = element;
}

ChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:score', e => {
    const filmChart = Highcharts.chart(this.element, {
      title: {
        text: 'Rotten Tomatoes Scores'
      },
      xAxis: {
        categories: e.detail.map(film => film.title)
      },
      yAxis: {
        title: {
          text: 'Score'
        },
        max: 100
      },
      series: [{
        name: 'score',
        type: 'column',
        data: e.detail.map(film => parseInt(film.rt_score)),
        showInLegend: false,
      }],
      plotOptions: {
        series: {
          cursor: 'pointer',
          events: {
            click: function (event) {
              PubSub.publish('ChartView:title-index', event.point.index);
            }
          }
        }
      },
    });
  })
}

module.exports = ChartView;
