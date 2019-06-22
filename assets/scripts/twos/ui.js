const store = require('../store.js')
const sur = require('../surveys/api.js')
const ui = require('../surveys/ui.js')
const api = require('./api.js')
const Chart = require('chart.js')
const surveyChart = require('../lib/chart')
const chartUpdate = require('../lib/chart')

const onCreateTwoSuccess = (response) => {
  store.two = response.two
  sur.createSurvey()
    .then(ui.onCreateSurveySuccess)
    .catch(ui.failure)
}

const failure = (response) => {
  $('.user-message').text('Sorry, something went wrong. Please try again.')
}

const onUpdateTwoSuccess = (response) => {
  $('.user-message').text('Update successful')
}

const onDeleteTwoSuccess = (response) => {
  $('.user-message').text('Delete successful')
}

const onVotedSuccess = (response) => {
  $('.user-message').text('Thanks for your vote!')
  api.getTwo(store.voteTwo)
    .then(votedCount)
    .catch()
}
const votedCount = (response) => {
  store.voteTwoCount = response.two.count

  let idTwo = response.two._id

  let survey = store.surveys.find(function (survey) {
    return survey.two._id === idTwo
  })

  survey.two.count = response.two.count
  console.log('survey 2:', survey)
  console.log('survey.two.count in twos.ui: ', survey.two.count)

  // if (chartUpdate) {
  //   chartUpdate.destroy()
  // }
//   if (surveyChart) {
//     surveyChart.destroy()
// }
  // $('#chart-wrapper').empty()
  // chartUpdate.destroy()
  // surveyChart.destroy()
  if (surveyChart !== undefined || surveyChart !== null) {
    console.log('hi')
  }
  // Chart.destroy()
  chartUpdate(store.surveys)
}

module.exports = {
  onCreateTwoSuccess,
  failure,
  onUpdateTwoSuccess,
  onDeleteTwoSuccess,
  onVotedSuccess,
  votedCount
}
