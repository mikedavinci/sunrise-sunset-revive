<template>
  <v-app>
    <v-app-bar app :color="darkMode ? '' : 'primary'"  dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import "@/assets/css/styles.css";
export default {
  name: 'App',

  data (){
   return {
    darkMode: false
  }
    //
  },
  mounted () {
    this.checkDayNightMode();
  },
  methods: {
    checkDayNightMode () {
      const time = new Date().getHours();
      if(time >= 13){
        this.darkMode = true
      }else {
        this.darkMode = false
        
      }
    }
  }
};
</script>
