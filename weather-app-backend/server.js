const express = require('express')
// NOTE using database
const mysql = require('mysql')
const sqlConfig = {
  host: 'localhost',
  user: 'test',
  password: '123456',
  database: 'weather-app'
}
let app = express()
// var url = require('url')
app.set('views', './views')
app.set('view engine', 'pug')

// NOTE using local mock data
// const todayWeathers = [
//   {
//     cityId: '01',
//     weather: 'sunny',
//     temp: 25,
//     minTemp: 22,
//     maxTemp: 27
//   },
//   {
//     cityId: '02',
//     weather: 'rain',
//     temp: 18,
//     minTemp: 17,
//     maxTemp: 22
//   },
//   {
//     cityId: '03',
//     weather: 'snow',
//     temp: 12,
//     minTemp: -1,
//     maxTemp: 12
//   },
//   {
//     cityId: '04',
//     weather: 'thunderStorm',
//     temp: 19,
//     minTemp: 19,
//     maxTemp: 24
//   }
// ]

app.get('/', (req, res) => {
  res.render('landing', { title: 'App Start Up' })
})

app.get('/weather.html', (req, res) => {
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
    return
  }
  const connection = mysql.createConnection(sqlConfig)
  connection.connect()
  connection.query('SELECT * FROM CITY_WEATHER WHERE id=' + req.params.cityId, (error, results, fields) => {
    if (error) {
      connection.end()
      data = {
        code: '0',
        msg: 'error: database error'
      }
      res.end(JSON.stringify(data))
      return
    }
    results = JSON.parse(JSON.stringify(results))
    if (!results || !results.length) {
      connection.end()
      data = {
        code: '0',
        msg: 'error: city weather info not found'
      }
      res.end(JSON.stringify(data))
      return
    }
    data = {
      code: '1',
      msg: 'success',
      data: results[0]
    }
    // console.log('data', data)
    res.end(JSON.stringify(data))
    connection.end()
  })
})

let server = app.listen(8888, '127.0.0.1', () => {
  let host = server.address().address
  let port = server.address().port
  // console.log(server.address())
  console.log('Server starts at http://' + host + ':' + port)
})