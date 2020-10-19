
## Database

This project uses local mock data in Nodejs server as default.

To test with database, change the value of `let useDatabase = false` in file `weather-app-backend/server.js`.

> You may need to use your database account

> Database is using MySQL table `weather-app`, database dump file is located in `weather-app-backend/weather-app_2020-10-19.sql`.

## How To Use

1. `cd weather-app-backend`
2. `npm i && npm start`
3. visit `http://0.0.0.0:8888/`

> The front end page files are already included in `weather-app-backend`. if you want to deploy some changes, move new built files to path `weather-app-backend/application`

## How To Build Front End Files

Refer README in `weather-app-front`
