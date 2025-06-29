<template>
  <div class="forecast-table-container">
    <p v-if="loading">Loading forecast data...</p>
    <p v-else-if="!forecastData || forecastData.length === 0">No forecast data available.</p>

    <div v-else>
      <div class="d-none d-md-block table-wrapper">
        <table class="forecast-table">
          <thead>
          <tr>
            <th>Date</th>
            <th>Weather Icon</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
            <th>Estimated Energy (kWh)</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="day in forecastWithIcons" :key="day.date">
            <td>{{ formatDate(day.date) }}</td>
            <td><i :class="day.weatherIcon"></i></td>
            <td>{{ formatTemp(day.maxTemperature) }}</td>
            <td>{{ formatTemp(day.minTemperature) }}</td>
            <td>{{ formatEnergy(day.solarEnergyKWh) }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="d-md-none card-wrapper">
        <div class="forecast-card" v-for="day in forecastWithIcons" :key="day.date">
          <div class="card-header">{{ formatDate(day.date) }}</div>
          <div class="card-body">
            <p><strong>Weather:</strong> <i :class="day.weatherIcon"></i></p>
            <p><strong>Max Temp:</strong> {{ formatTemp(day.maxTemperature) }} °C</p>
            <p><strong>Min Temp:</strong> {{ formatTemp(day.minTemperature) }} °C</p>
            <p><strong>Energy:</strong> {{ formatEnergy(day.solarEnergyKWh) }} kWh</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const WEATHER_ICONS = {
  0: "fas fa-sun",
  1: "fas fa-cloud",
  2: "fas fa-cloud",
  3: "fas fa-cloud",
  45: "fas fa-smog",
  48: "fas fa-smog",
  51: "fas fa-cloud-rain",
  53: "fas fa-cloud-rain",
  55: "fas fa-cloud-showers-heavy",
  56: "fas fa-cloud-rain",
  57: "fas fa-cloud-showers-heavy",
  61: "fas fa-cloud-showers-heavy",
  63: "fas fa-cloud-showers-heavy",
  65: "fas fa-cloud-showers-heavy",
  66: "fas fa-cloud-showers-heavy",
  67: "fas fa-cloud-showers-heavy",
  71: "fas fa-snowflake",
  73: "fas fa-snowflake",
  75: "fas fa-snowflake",
  77: "fas fa-snowflake",
  80: "fas fa-cloud-showers-heavy",
  81: "fas fa-cloud-showers-heavy",
  82: "fas fa-cloud-showers-heavy",
  85: "fas fa-snowflake",
  86: "fas fa-snowflake",
  95: "fas fa-bolt",
  96: "fas fa-bolt",
  99: "fas fa-bolt",
};

export default {
  name: "WeatherForecastTable",
  props: {
    forecastData: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    forecastWithIcons() {
      return this.forecastData.map((day) => ({
        ...day,
        weatherIcon: WEATHER_ICONS[day.weatherCode] || "fas fa-question",
      }));
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    formatTemp(value) {
      return Number(value).toFixed(1);
    },
    formatEnergy(value) {
      return value != null ? Number(value).toFixed(2) : "--";
    },
  },
};
</script>

<style scoped>
.forecast-table-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  padding: 16px;
  box-sizing: border-box;
}

.table-wrapper {
  flex: 1;
  overflow-y: auto;
  height: 100%;
}

.forecast-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: white;
  color: #333;
  font-family: Arial, sans-serif;
}

th,
td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ccc;
}

th {
  background-color: #ddd;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: inherit !important;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.forecast-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
</style>
