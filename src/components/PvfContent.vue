<template>
  <v-container>
    <v-col>
      <v-row cols="12" class="mt-0">
        <v-card-text class="text-center">
          Por favor seleccione una ubicación y un día de pronóstico.
        </v-card-text>
      </v-row>
      <v-row cols="12" class="mb-4">
        <v-col>
          <v-select :items="items" label="Ubicación seleccionada"></v-select>
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="200"
          />

          <v-card>
            <v-card-title>Forecasting Lima</v-card-title>
            <v-card-text class="text-left">
              Este modelo fue entrenado en Lima
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="text-center">
          <v-date-picker
            v-model="date"
            :allowed-dates="allowedDates"
            class="mt-4"
            min="2016-06-15"
            max="2018-03-20"
            locale="es-MX"
            color="primary"
          ></v-date-picker>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-row cols="12" class="mt-5">
        <v-col align="center" cols="12">
          <v-card-title class="justify-center">
            Predicción de Pac generado
          </v-card-title>
          <v-card-text class="text-center">
            Se realizan una predicción para cada hora entre las 4 a. m. y las 5
            p. m. del día seleccionado
          </v-card-text>
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            width="300"
          />
        </v-col>
      </v-row>

      <v-row class="mt-3 mb-3">
        <v-col cols="6" align="right">
          <v-card align="center" width="200">
            <v-icon size="50px" class="mt-3"> mdi-chart-areaspline</v-icon>
            <v-card-title class="justify-center">122</v-card-title>
            <v-card-text class="text-center"> RMSE de predicción </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" align="left">
          <v-card align="center" width="200">
            <v-icon size="50px" class="mt-3"> mdi-chart-areaspline</v-icon>
            <v-card-title class="justify-center">123</v-card-title>
            <v-card-text class="text-center">
              RMSE del día anterior
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "PvfContent",

  data: () => ({
    //
  }),
};
</script>
