<template>
  <transition name="slide">
    <v-container class="align-center d-flex mt-10">
      <v-row class="text-center">
        <v-row justify="center" class="align-center flex-column">
          <h1 class="font-weight-bold mb-3">The About Page</h1>
        
            <h3>Sunrise: {{ sunrise }}</h3>
            <h3>Sunset: {{ sunset }}</h3>
        
        </v-row>
        <v-row>
          <v-col>
           
            <v-row justify="center" class="">
              <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :min="new Date().toISOString().substr(0, 10)"
        @change="save"
      ></v-date-picker>
    </v-menu>
            </v-row>
            <v-text-field v-model="lat" label="Latitude" />
            <v-text-field v-model="lng" label="Longitude" />
            <v-btn @click="getResults(lat, lng)">Submit</v-btn>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </transition>
</template>

<script>
import { useLookupStore } from '../store/sun';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';

export default {
  name: 'AboutComponent',

  setup() {
    const lookupStore = useLookupStore();

    return {
      lookupStore,
      lat: '',
      lng: '',
    };
  },
  data(){
    return {
      date:'',
    }
  },
  methods: {
   async getResults(lat, lng) {
      await this.lookupStore.getRes(lat, lng, this.date);
      let sunrise = DateTime.fromISO(this.lookupStore.results.sunrise);
      let sunset = DateTime.fromISO(this.lookupStore.results.sunset);

      Swal.fire({
        title: 'Sun Results',
        text: `Sunrise: ${sunrise} \nSunset: ${sunset}`,
        icon: 'success',
        confirmButtonColor: '#28a745',
        denyButtonColor: '#757575',
        confirmButtonText: 'Ok',
        showCancelButton: false,
      });
    },
    save (date) {
        this.$refs.menu.save(date)
      },
  },
  mounted() {
    this.lookupStore.getRes();
  },
  computed: {
   
    // ! ITS FOR FORMATTED
    sunrise() {
      const sunrise = DateTime.fromISO(this.lookupStore.results.sunrise);
      return sunrise.toLocaleString(DateTime.TIME_24_SIMPLE);
    },
    sunset() {
      const sunset = DateTime.fromISO(this.lookupStore.results.sunset);
      return sunset.toLocaleString(DateTime.TIME_24_SIMPLE);
    },

  },
  watch: {
    lat() {
      this.lookupStore.getRes(this.lat, this.lng);
    },
    lng() {
      this.lookupStore.getRes(this.lat, this.lng);
    },
    menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
  },
};
</script>
