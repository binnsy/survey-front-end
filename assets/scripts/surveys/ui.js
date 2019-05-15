const store = require('../store')
const getSurveysTemplate = require('../templates/get-surveys.handlebars')

const failure = () => {
  console.log('you fail bro!')
  // needs to display more places
  $('#display-my-surveys-message').text('Sorry. Something went wrong. Please try again.')
}
const oncreateSurveySuccess = function (response) {
  store.survey = response.survey
  console.log(response)
  console.log(store.survey)
  // needs to display somewhere
  $('#').text('You have successfully created a survey!')
}
const onUpdateSurveySuccess = (response) => {
  console.log(response)
  // needs to display somewhere
  $('#').text('You have successfully updated your survey!')
}
const onGetYourSurveysSuccess = (data) => {
  console.log(data)
  $('#display-my-surveys-message').text('Your serveys are displayed below:')
  const getSurveysHtml = getSurveysTemplate({ surveys: data.surveys })
  $('#my-survey-content').html(getSurveysHtml)
}
const onDeleteSurveySuccess = (response) => {
  console.log(response)
  // needs to display somewhere
  $('#').text('You have successfully deleted your survey!')
}

const clearSurveys = () => {
  $('.content').empty()
}

module.exports = {
  oncreateSurveySuccess,
  onGetYourSurveysSuccess,
  clearSurveys,
  failure,
  onUpdateSurveySuccess,
  onDeleteSurveySuccess
}
