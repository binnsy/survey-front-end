const store = require('../store.js')
const two = require('../twos/events.js')
const api = require('./api.js')
const ui = require('../surveys/ui.js')
const sur = require('../surveys/api.js')
const Chart = require('chart.js')
const chartUpdate = require('../lib/chart')
const surveyChart = require('../lib/chart')
// const surveyEvents = require('../surveys/events.js')

const onCreateOneSuccess = (response) => {
//   store.one = response.one
//   two.onCreateTwo()
// }
  store.one = response.one
  sur.createSurvey()
    .then(ui.onCreateSurveySuccess)
    .catch(ui.failure)
}
const failure = (response) => {
  $('.user-message').text('Sorry, something went wrong. Please try again.')
}
const onUpdateOneSuccess = (response) => {
  $('.user-message').text('Update successful')
}
const onDeleteOneSuccess = (response) => {
  $('.user-message').text('Delete successful')
}
const onVotedSuccess = (response) => {
  $('.user-message').text('Thanks for your vote!')
  api.getOne(store.voteOne)
    .then(votedCount)
    .catch()
}
const votedCount = (response) => {
  // console.log('response for votedCount', response)
  store.voteOneCount = response.one.count
  // console.log('store voteOneCount', store.voteOneCount)
  let idOne = response.one._id
  // $('#see-all-survey-content').click(function () {
  //   chart.data.data[0] = store.voteOneCount
  // })
  // chart.render()
  let survey = store.surveys.find(function (survey) {
    return survey.one._id === idOne
  })


  survey.one.count = response.one.count
  console.log('survey 1: ', survey)
  console.log('survey.one.count in ones.ui: ', survey.one.count)
  console.log('+++++++')
  // if (myChart) {
  //   myChart.destroy()
  // }
  // if (surveyChart) {
  //   surveyChart.destroy()
  // }
  // if (window.surveyChart !== undefined || window.surveyChart !== null) {
  //   console.log('hi')
  // window.surveyChart.destroy()
  if (surveyChart !== undefined || surveyChart !== null) {
    console.log('hi')
  }

  // $('#chart-wrapper').empty()
//   document.getElementById("chart-wrapper").innerHTML = '&nbsp;'
// document.getElementById("chart-wrapper").innerHTML = '<canvas id="bar-chart bar-chart-{{survey.one.title}}" width="100%" height="30px"></canvas>'
// let chartUpdate = document.getElementById("bar-chart").getContext("2d")
  chartUpdate(store.surveys)
}
// const updateChart1 = (Chart) => {
//   Chart.data.datasets.data[0] = 1
//   Chart.update()
// }




module.exports = {
  onCreateOneSuccess,
  failure,
  onUpdateOneSuccess,
  onDeleteOneSuccess,
  onVotedSuccess,
  votedCount
  // updateChart1
}
