const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const store = require('../store.js')
const one = require('../ones/events.js')
const two = require('../twos/events.js')

const update = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const id = $(event.target).closest('form').data('id')
  const oneId = $(event.target).closest('form').data('one')
  const twoId = $(event.target).closest('form').data('two')
  store.updateSurvey = id
  store.updateOne = oneId
  store.updateTwo = twoId
  one.onUpdateOne(data.survey.answer)
  two.onUpdateTwo(data.survey.answer2)
  onUpdateSurvey(data.survey.title)
}

const onCreateSurvey = () => {
  api.createSurvey()
    .then(ui.onCreateSurveySuccess)
    .catch(ui.failure)
}
const onGetYourSurveys = () => {
  api.getYourSurveys()
    .then(ui.onGetYourSurveysSuccess)
    .catch(ui.failure)
}

const onGetAllSurveys = () => {
  api.getAllSurveys()
    .then(ui.onGetAllSurveysSuccess)
    .catch(ui.failure)
}

const onUpdateSurvey = (data) => {
  api.updateSurvey(data)
    .then(ui.onUpdateSurveySuccess)
    .catch(ui.failure)
}
const onDeleteSurvey = () => {
  const id = $(event.target).closest('button').data('id')
  api.deleteSurvey(id)
    .then(ui.onDeleteSurveySuccess)
    .catch(ui.failure)
}

const surveyHandlers = function () {
  $('#get-surveys').on('click', onGetYourSurveys)
  $('#my-survey-content').on('submit', '.update-survey', update)
  $('#index-surveys').on('click', onGetAllSurveys)
  $('#my-survey-content').on('click', '.btn-dark', onDeleteSurvey)
}

module.exports = {
  surveyHandlers,
  onCreateSurvey,
  onGetAllSurveys
}
