<template>
  <div class="map-wrapper">
    <l-map
        :zoom="zoom"
        :center="center"
        style="height: 80vh; width: 100%"
        @click="onMapClick"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
      />
      <l-marker :lat-lng="center" />
    </l-map>
  </div>
</template>

<script>
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

export default {
  name: 'LeafletMap',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  setup(_, { emit }) {
    const center = ref([52.2297, 21.0122]);
    const zoom = ref(10);

    const onMapClick = (event) => {
      const latlng = event.latlng;
      center.value = [latlng.lat, latlng.lng];
      emit('location-updated', {
        latitude: latlng.lat,
        longitude: latlng.lng
      });
    };

    return {
      center,
      zoom,
      onMapClick
    };
  }
};
</script>

<style scoped>

.map-wrapper {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  padding: 10px;
  box-sizing: border-box;
}

</style>