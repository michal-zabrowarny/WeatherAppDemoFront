# Weather Forecast Frontend (Vue + Leaflet)

This project is a frontend web application built with Vue 3 that displays a 7-day weather forecast using data fetched from a backend REST API powered by Spring Boot.  
It features an interactive map with Leaflet and a responsive forecast table.

## Features

- Displays 7-day weather forecast for selected coordinates
- Interactive map with location pin using Leaflet
- Responsive data table with:
  - Date
  - Weather icon
  - Max/Min temperature
  - Estimated solar energy production
- Uses Axios for API integration
- Styled with Bootstrap 5

## Backend Integration

The app connects to a backend API endpoint:

### `GET /weather/forecast`

#### Example request:
```
https://weatherappdemo-596h.onrender.com/weather/forecast?latitude=52.23&longitude=21.01
```

#### Expected response:
```json
[
  {
    "date": "2025-06-29",
    "minTemperature": 20.5,
    "maxTemperature": 26.7,
    "solarEnergyKWh": 0.35,
    "weatherCode": 3
  },
  ...
]
```

> Note: The base API URL is configured via `.env` file using `VITE_API_URL`.

## Technologies Used

- Vue 3
- Vite or Vue CLI (depending on setup)
- Leaflet
- Axios
- Bootstrap 5
- FontAwesome

## Project Setup

### Install dependencies
```bash
npm install
```

### Compile and hot-reload for development
```bash
npm run serve
```

### Compile and minify for production
```bash
npm run build
```

### Environment config
Create `.env.production`:
```
VITE_API_URL=https://weatherappdemo-596h.onrender.com
```




