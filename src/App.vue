<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink ml-1 mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="25"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 ml-1 hidden-sm-and-down"
          contain
          min-width="150"
          src="@/assets/pv-forecasting-name.png"
          width="100"
          padding-left="300"
        />
      </div>

      <v-spacer></v-spacer>

      <v-chip label outlined class="mr-2"> {{ currentDate }} </v-chip>
      <v-chip label outlined class="mr-1"> {{ currentTime }}</v-chip>
      <!-- <v-chip label outlined class="mr-2" color="secondary" text-color="white"> 10:44 P.M. </v-chip> -->

      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <!-- <HelloWorld /> -->
      <PvfContent />
      <PvfFooter />
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import PvfContent from "./components/PvfContent";
import PvfFooter from "./components/PvfFooter";

export default {
  name: "App",

  components: {
    // HelloWorld,
    PvfContent,
    PvfFooter,
  },

  data: () => ({
    currentTime: "00:00 a. m.",
    currentDate: "Lunes, 0 de enero de 2020",
    months: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    // days: [
    //   "",
    //   "Lunes",
    //   "Martes",
    //   "Miércoles",
    //   "Jueves",
    //   "Viernes",
    //   "Sábado",
    // ],
  }),

  methods: {
    updateDatetime: function () {
      let datetime = new Date();
      datetime.setFullYear(datetime.getFullYear() - 1);

      let hora = datetime.getHours();
      let minutos = datetime.getMinutes();
      let segundos = datetime.getSeconds();

      let ampm = " a. m.";
      if (hora > 12) {
        hora -= 12;
        ampm = " p. m.";
      }
      if (hora < 10) {
        hora = "0" + hora;
      }
      if (minutos < 10) {
        minutos = "0" + minutos;
      }
      if (segundos < 10) {
        segundos = "0" + segundos;
      }

      // let day = this.days[datetime.getDay()];
      let date = datetime.getDate();
      let month = this.months[datetime.getMonth()];
      let year = datetime.getFullYear();

      this.currentTime = hora + ":" + minutos + ":" + segundos + ampm;
      this.currentDate = date + " de " + month + " de " + year;
      // this.currentDate = day + ", " + date + " de " + month + " de " + year;
    },
  },

  mounted: function () {
    this.updateDatetime();
    setInterval(this.updateDatetime, 500);
  },
};
</script>
