const express = require('express')
let app = express()
// var url = require('url')

const todayWeathers = [
  {
    cityId: '01',
    weather: 'sunny',
    temp: 25,
    minTemp: 22,
    maxTemp: 27
  },
  {
    cityId: '02',
    weather: 'rain',
    temp: 18,
    minTemp: 17,
    maxTemp: 22
  },
  {
    cityId: '03',
    weather: 'snow',
    temp: 12,
    minTemp: -1,
    maxTemp: 12
  },
  {
    cityId: '04',
    weather: 'thunderStorm',
    temp: 19,
    minTemp: 19,
    maxTemp: 24
  }
]

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/application/index.html')
})

app.use('/application', express.static('application'))

// api
app.get('/api/getWeather/:cityId', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let data = {}
  if (!req.params.cityId) {
    data = {
      code: '0',
      msg: 'error: invalid parameter'
    }
    res.end(JSON.stringify(data))
  }
  let weatherInfo = todayWeathers.find(item => item.cityId === req.params.cityId)
  if (weatherInfo) {
    data = {
      code: '1',
      msg: 'success',
      data: Object.assign({}, weatherInfo)
    }
  } else {
    data = {
      code: '0',
      msg: 'error: city weather info not found'
    }
  }
  res.end(JSON.stringify(data))
})

let server = app.listen(8888, '127.0.0.1', () => {
  let host = server.address().address
  let port = server.address().port
  // console.log(server.address())
  console.log('Server starts at http://' + host + ':' + port)
})