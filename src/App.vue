<template>
  <div id="app">
    <div class="main-layout">
      <div class="left-panel">
        <LeafletMap @location-updated="updateCoordinates" />
      </div>

      <div class="right-panel">
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <div>
          <h2>7-Day Weather Forecast</h2>
          <WeatherForecastTable :forecastData="forecastData" :loading="loading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeafletMap from "./components/LeafletMap.vue";
import WeatherForecastTable from "./components/ForecastTable.vue";
import { fetchWeatherForecast } from "./services/weatherService.js";

export default {
  name: "App",
  components: {
    LeafletMap,
    WeatherForecastTable,
  },
  data() {
    return {
      latitude: 52.2297,
      longitude: 21.0122,
      forecastData: [],
      errorMessage: "",
      loading: true,
    };
  },
  mounted() {
    this.getUserLocation();
  },
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              this.latitude = latitude;
              this.longitude = longitude;
              this.loadWeatherData(latitude, longitude);
            },
            () => {
              this.handleDefaultLocation("Unable to fetch your location. Using default (Cracow).");
            }
        );
      } else {
        this.handleDefaultLocation("Geolocation not supported. Using default (Cracow).");
      }
    },
    handleDefaultLocation(message) {
      console.warn(message);
      this.errorMessage = message;

      setTimeout(() => {
        this.errorMessage = "";
        this.loadWeatherData(this.latitude, this.longitude);
      }, 3000);
    },
    async loadWeatherData(lat, lon) {
      this.loading = true;
      try {
        const forecast = await fetchWeatherForecast(lat, lon);
        this.forecastData = forecast;
      } catch (error) {
        this.errorMessage = "Failed to fetch weather data.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    updateCoordinates({ latitude, longitude }) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.loadWeatherData(latitude, longitude);
    },
  },
};
</script>

<style scoped>
#app {
  background: linear-gradient(to bottom, #e0e0e0, #cce6ff);;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-message {
  color: red;
  font-size: 1.2rem;
  text-align: center;
}

.main-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  max-width: 1300px;
}

.left-panel {
  flex: 1.3;
  padding-right: 20px;
  height: 100%;
}

.right-panel {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

</style>