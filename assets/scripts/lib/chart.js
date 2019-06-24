'use strict'

const Chart = require('chart.js')
const store = require('../store')

let surveyChart
$('#chart-wrapper').remove()

const chartUpdate = (surveys) => {
  // console.log('++++========+++')
  // console.log(store)
  // console.log('+++========++++')
  // console.log('hello Ben')
  surveys.forEach(survey => {
    surveyChart = new Chart(document.getElementById(`bar-chart-${survey.one.title}`), {

      type: 'horizontalBar',
      data: {
        // Y axis label
        labels: [survey.one.title, survey.two.title],
        datasets: [{
          label: '',
          // colors of bars
          backgroundColor: ['#76D7C4', '#287D9D'],
          // data to display
          data: [survey.one.count, survey.two.count]
        }]
      },
      options: {
        // tooltips: {enabled: false},
        // hover: {mode: null},
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
    surveyChart.update()
  })
}

module.exports =
  chartUpdate
