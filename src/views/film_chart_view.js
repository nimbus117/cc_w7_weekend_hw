const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

const FilmChartView = function (element) {
  this.element = element;
}

FilmChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:scores', e => this.render(e.detail))
}

FilmChartView.prototype.render = function (scores) {
  Highcharts.chart(this.element, {
    chart: {
      borderWidth: 1,
      backgroundColor: '#ECC27C'
    },
    title: {
      text: 'Rotten Tomatoes Scores'
    },
    xAxis: {
      categories: scores.map(film => film.title)
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
      data: scores.map(film => parseInt(film.rt_score)),
      showInLegend: false,
    }],
    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: function (event) {
            PubSub.publish('FilmChartView:film-index', event.point.index);
          }
        }
      }
    },
  });
}
module.exports = FilmChartView;
