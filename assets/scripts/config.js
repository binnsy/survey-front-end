'use strict'

let apiUrl
const apiUrls = {
  production: 'hhttps://fast-sierra-71372.herokuapp.com',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
