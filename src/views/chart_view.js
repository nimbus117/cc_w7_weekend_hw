var Highcharts = require('highcharts');
const PubSub = require('../helpers/pub_sub.js');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

const ChartView = function (element) {
  this.element = element;
}

ChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:score', e =>{
    const filmChart = Highcharts.chart(this.element, {
      title: {
        text: 'Rotten Tomatoes Scores'
      },
      // subtitle: {
      //   text: 'Subtitle?????'
      // },
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
      }]
    });
  })
}

module.exports = ChartView;
