'use strict'

const Chart = require('chart.js')
const store = require('../store')

let surveyChart
$('#chart-wrapper').remove()

// if (surveyChart !== undefined || surveyChart !== null) {
//   console.log('hi')
// }
// surveyChart.destroy()

let chartUpdate = (surveys) => {
  // if (surveyChart !== undefined || surveyChart !== null) {
  //   // config.data.datasets.forEach(function(dataset, datasetIndex) {
  //   // dataset.data.shift()
  //   surveyChart.destroy()
  //   // surveyChart.clear()
  // }

  console.log('++++========+++')
  console.log(store)
  console.log('+++========++++')
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
    // surveyChart.destroy()
    // if (surveyChart.data.dataset !== 'undefined') {
    //   surveyChart.data.dataset.destroy()
    // }

    surveyChart.update()
    // if (surveyChart) {
    //   surveyChart.destroy()
    // }
  })
}

module.exports =
  chartUpdate
