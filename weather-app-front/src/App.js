import React, { useState, useMemo } from 'react';
import axios from 'axios'
// import logo from './logo.svg';
import './App.css';
import IconLeftArrow from './assets/arrow_left.png'
import IconRightArrow from './assets/arrow_right.png'
import IconRefresh from './assets/refresh.png'
import IconSunny from './assets/sunny.png'
import IconRain from './assets/rain.png'
import IconCloudy from './assets/cloudy.png'
import IconSnow from './assets/snow.png'
import IconThunderStorm from './assets/thunder_storm.png'

const weatherMap = new Map([
  ['sunny', IconSunny],
  ['rain', IconRain],
  ['cloudy', IconCloudy],
  ['snow', IconSnow],
  ['thunderStorm', IconThunderStorm]
])

function App() {
  // state
  let [cities, setCities] = useState([
    {
      cityId: '01',
      cityName: 'Sydney',
      fetched: false,
      weather: '',
      temp: null,
      minTemp: null,
      maxTemp: null
    },
    {
      cityId: '02',
      cityName: 'Melbourne',
      fetched: false,
      weather: '',
      temp: null,
      minTemp: null,
      maxTemp: null
    },
    {
      cityId: '03',
      cityName: 'Brisbane',
      fetched: false,
      weather: '',
      temp: null,
      minTemp: null,
      maxTemp: null
    },
    {
      cityId: '04',
      cityName: 'Wuhan',
      fetched: false,
      weather: '',
      temp: null,
      minTemp: null,
      maxTemp: null
    },
  ])
  let [currentCityIndex, setCityIndex] = useState(0)
  let [loading, setLoading] = useState(false)

  let weatherInfo = useMemo(() => {
    return cities[currentCityIndex]
  }, [currentCityIndex, cities])
  let weatherIcon = useMemo(() => {
    return weatherMap.get(weatherInfo.weather)
  }, [weatherInfo.weather])

  // method
  const handleRefresh = () => {
    console.log('refresh')
    if (loading) {
      return
    }
    setLoading(true)
    axios.get('http://127.0.0.1:8888/api/getWeather/' + cities[currentCityIndex].cityId).then(res => {
      setLoading(false)
      if (res.data.code === '1') {
        // success
        const result = res.data.data || {}
        let { weather, temp, minTemp, maxTemp } = result
        setCities(() => {
          let info = cities[currentCityIndex]
          info = Object.assign({}, info, {
            weather,
            temp,
            minTemp,
            maxTemp,
            fetched: true
          })
          cities.splice(currentCityIndex, 1, info)
          return [...cities]
        })
        console.log(weatherInfo)
      } else {
        window.alert(res.data.msg || 'Fetching weather data failed!')
      }
    }).catch(err => {
      setLoading(false)
      window.alert(err)
    })
  }

  const switchCity = (change) => {
    let targetIndex = currentCityIndex + change
    if (targetIndex > cities.length - 1) {
      // target index overflow, fix it
      targetIndex = (targetIndex + 1) % cities.length - 1
    } else if (targetIndex < 0) {
      // target index negative overflow
      do {
        targetIndex += cities.length
      } while (targetIndex < 0)
    }
    setCityIndex(targetIndex)
  }

  // component
  const WeatherArea = () => {
    if (weatherInfo.fetched) {
      return <div className="current-weather">
        <img className="weather-icon" src={weatherIcon} alt={weatherInfo.weather} style={{ display: 'block' }} />
        <div className="current-temp">{weatherInfo.temp}°</div>
      </div>
    } else {
      return <img className={loading ? 'icon-btn spin' : 'icon-btn'} src={IconRefresh} alt="refresh" title="refresh" onClick={() => handleRefresh()} />
    }
  }

  return (
    <div className="App">
      <header className="city">
        {weatherInfo.cityName}
      </header>

      <div className="box-weather-info">
        <div className="box-main">
          <img className="icon-btn" src={IconLeftArrow} alt="previous" title="previous" onClick={() => switchCity(-1)} />
          <WeatherArea></WeatherArea>
          <img className="icon-btn" src={IconRightArrow} alt="next" title="next" onClick={() => switchCity(1)} />
        </div>
        <div className="box-sub">
          {weatherInfo.fetched &&
            <div className="temp-detail">
              <div className="temp">
                {weatherInfo.minTemp}°&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{weatherInfo.maxTemp}°
              </div>
              <div className="weather-detail">
                {weatherInfo.weather}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
