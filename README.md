# Weather Forecast Frontend (Vue + Leaflet)

This project is a frontend web application built with **Vue 3** that displays a 7-day weather forecast using data fetched from a backend REST API powered by Spring Boot.  
It features an interactive map with Leaflet and a responsive forecast table.

## Features

- Displays 7-day weather forecast for selected coordinates
- Interactive map with location pin using **Leaflet**
- Responsive data table with:
  - Date
  - Weather icon
  - Max/Min temperature
  - Estimated solar energy production
- Uses **Axios** for API integration
- Styled with **Bootstrap 5**

## Application Preview

![App Screenshot](./screenshot.png)

## Backend Integration

The app connects to a backend API endpoint:

### `GET /weather/forecast`

#### Example request:
