const store = require('../store')
const getSurveysTemplate = require('../templates/get-surveys.handlebars')
const takeSurveysTemplate = require('../templates/take-surveys.handlebars')
// const CanvasJS = require('./canvasjs.min')
const Chart = require('chart.js')
const chartUpdate = require('../lib/chart')

const one = require('../ones/ui.js')
const two = require('../twos/ui.js')

const failure = () => {
  $('.user-message').text('Sorry, something went wrong. Please try again.')
}

const onCreateSurveySuccess = function(response) {
  store.survey = response.survey
  $('.collapse').collapse('hide')
  $('.user-message').text('You have successfully created a survey!')
  $('#create-survey .input-reset').val("")
}

const onUpdateSurveySuccess = (response) => {
  $('.user-message').text('You have successfully updated your survey!')
  $('.collapse').collapse('hide')
  $(".modal-backdrop").remove()
}

const onGetYourSurveysSuccess = (data) => {
  $('.user-message').text('Your surveys are displayed below:')
  const ownedSurveys = data.surveys.filter(survey => survey.owner === store.user._id)
  const getSurveysHtml = getSurveysTemplate({
    surveys: ownedSurveys
  })
  $('#my-survey-content').html(getSurveysHtml)
}

const onSurveyTaken = (data) => {
  console.log(data)
  let surveyTaken = false
  data.surveys.forEach((survey) => survey.response.forEach(response => {
    if (response.owner === store.user._id) {
      surveyTaken = true
      survey.taken = surveyTaken
    }
  }))
}
const onGetAllSurveysSuccess = (data) => {
  // console.log(data)
  $('.user-message').text('All surveys are displayed below:')
  const takeSurveysHtml = takeSurveysTemplate({
    surveys: data.surveys
  })
  // console.log(data.surveys)
  $('#see-all-survey-content').html(takeSurveysHtml)
  $('.displayResults').hide()

  // THEN I NEED THE CLICK TO TRIGGER THE UI.VOTEDCOUNT IN ONE FOLDER AND
  // THE UI.VOTEDCOUNT IN TWO FOLDER

  //   .then(one.votedCount)
  // console.log(one.votedCount)
  // console.log('ooooooooo')
  // console.log(votedCount)
  $('#see-all-survey-content').on('click', '.survey-btn', function() {
    // console.log('we need to show here')
    // console.log('data on click:', data)
    // console.log(store.voteOneCount)
    // $('.displayResults', this).show()
    // $(this).find('.displayResults').show()
    // let target = $(this).data('target')
    // let parent = $(this).closest('.displayResults')
    // parent.find('.div' + target).show()
    // $(event.target).show()
    // $(this).find('.displayResults').show()
    // $(this).prev('.displayResults').show()
    $(this).siblings('.displayResults').show()
    $(this).next('.displayResults').show()
  })
  // $('#see-all-survey-content').on('click', '.survey-answer-2', function () {
  //   $(this).first('.displayResults').show()
  // })
  //
  // let arr = data.surveys
  // for (let i = 0; i < arr.length; i++) {
  //   let arrOneCount = arr[i].one.count
  //   let arrId = arr[i]._id
  //   store.arrOneCount = arrOneCount
  //   store.arrId = arrId
  //   console.log('++++++++++')
  //   console.log(arrOneCount, arrId)
  //   console.log('++++++++++')
  // }
  // for (let i = 0; i < arr.length; i++) {
  //   let arrTwoCount = arr[i].two.count
  //   let arrId = arr[i]._id
  //   store.arrTwoCount = arrTwoCount
  //   store.arrId = arrId
  //   console.log(arrTwoCount, arrId)
  // }
  // console.log(data.surveys[1].one.count)
  //
  // let totalVotes1 = data.surveys[0].one.count
  // let totalVotes2 = data.surveys[0].two.count
  // console.log(totalVotes1)
  // console.log(totalVotes2)
  // let totalVotes = totalVotes1 + totalVotes2
  // console.log(totalVotes)
  // let percentTotalVotes1 = Math.round((totalVotes1 / totalVotes) * 100)
  // console.log(percentTotalVotes1)
  // store.percentTotalVotes1 = percentTotalVotes1 + '%'
  // let percentTotalVotes2 = Math.round((totalVotes2 / totalVotes) * 100)
  // store.percentTotalVotes2 = percentTotalVotes2 + '%'
  // console.log(percentTotalVotes2)

  store.surveys = data.surveys
  // chartUpdate(store.surveys)


  // $(".progress-bar").css("width", i + "%").text(i + " %");
  //
  //   let chart = new CanvasJS.Chart('chartContainer', {
  //   animationEnabled: true,
  //
  //   axisY: {
  //     title: "numper of people"
  //   },
  //   axisY2: {
  //     		gridColor: "rgba(1,77,101,.1)",
  //     		title: "Number of people"
  //   },
  //   data: [{
  //     type: "bar",
  //     name: "Question1",
  //     axisYType: "secondary",
  //     dataPoints: [
  //       {y: store.count, label: "Answer1" },
  //       {y: store.count, label: "Answer2" }
  //     ]
  //   }]
  // })
  // chart.render()
  // $('#chartContainer')
  //
  // if ($('#see-all-survey-content').on('click', '.survey-answer-2')) {
  //     console.log('data2 plus 1: ', data.surveys.two.count + 1)
  // }
  //
  // if ($('#see-all-survey-content').on('click', '.survey-answer-1')) {
  //     console.log('data1 plus 1: ', data.surveys.one.count + 1)
  // }
// console.log ('=========')
// console.log ('this is store', store)
// console.log ('=========')
//
//   data.surveys.forEach(survey => {
//     let surveyChart = new Chart(document.getElementById(`bar-chart-${survey.one.title}`), {
//       type: 'horizontalBar',
//       data: {
//         // Y axis label
//         labels: [survey.one.title, survey.two.title],
//         datasets: [{
//           label: '',
//           // colors of bars
//           backgroundColor: ['#76D7C4', '#287D9D'],
//           // data to display
//           data: [survey.one.count, survey.two.count]
//         }]
//       },
//       options: {
//         legend: {
//           display: false
//         },
//         scales: {
//           xAxes: [{
//             ticks: {
//               beginAtZero: true
//             }
//           }]
//         }
//       }
//     })
//   })
//
//   Chart.update()
}

const onDeleteSurveySuccess = (response) => {
  $('.user-message').text('You have successfully deleted your survey!')
  $('.collapse').collapse('hide')
}

module.exports = {
  onCreateSurveySuccess,
  onGetYourSurveysSuccess,
  failure,
  onUpdateSurveySuccess,
  onDeleteSurveySuccess,
  onGetAllSurveysSuccess,
  onSurveyTaken
}
