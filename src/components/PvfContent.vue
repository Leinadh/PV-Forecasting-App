<template>
  <v-container>
    <v-col>
      <v-row cols="12" class="mt-0">
        <v-card-text class="text-center">
          Por favor, seleccione una ubicación y un día de pronóstico.'
          <!-- <br>
          Se mostrará una simulación de las predicciones exactamente hace un año. -->
        </v-card-text>
      </v-row>
      <v-row cols="12" class="mb-4">
        <v-col>
          <!-- <PvfSelect /> -->
          <v-select
            v-on:change="cambioUbicacion"
            v-model="ubicacionDefault"
            v-bind:items="ubicaciones"
            item-text="texto_ubicacion"
            item-value="id_ubicacion_modelo"
            label="Ubicación seleccionada"
          ></v-select>
          <!-- :src="require('../assets/logo.svg')" -->
          <v-img :src="imagen_ubicacion" class="my-3" contain height="200" />

          <v-card>
            <v-card-title>
              {{
                filtrarUbicaion(ubicaciones, idUbicacion).length > 0
                  ? obtenerTitulo(filtrarUbicaion(ubicaciones, idUbicacion)[0])
                  : ""
              }}
            </v-card-title>
            <v-card-text class="text-left">
              {{
                filtrarUbicaion(ubicaciones, idUbicacion).length > 0
                  ? obtenerDescripcion(
                      filtrarUbicaion(ubicaciones, idUbicacion)[0]
                    )
                  : ""
              }}
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
            Predicción del Pac generado
          </v-card-title>
          <v-card-text class="text-center">
            Se realiza una predicción para cada hora entre las 4 a. m. y las 5
            p. m. del día seleccionado.
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
        <v-card-text class="text-center"> Métricas </v-card-text>
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
// import PvfSelect from "@/components/PvfSelect";

export default {
  name: "PvfContent",
  components: {
    // PvfSelect,
  },
  data: () => ({
    imagen_ubicacion: 
      require("../assets/logo.svg"),
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScESJtxLLl9e12q9nTIgacSptopeZR1tAFbA&usqp",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR13g5pvUfHTTvC1Xgk80uhzSZHYXWydYWsg",
    // "https://www.minera-irl.com/wp-content/uploads/2015/05/mapa-peru.jpg",
    ubicacionDefault: { id_ubicacion_modelo: 0, texto_ubicacion: "" },
    ubicaciones: [
      {
        id_ubicacion_modelo: 1,
        texto_ubicacion: "PUCP - Lima, Lima (PERC)",
        model_name: "1D-CNN",
        description: "Descrip...",
        image: null,
        is_trasfered: 0,
        origin_system: null,
        technology: "PERC",
        label: "PUCP",
        full_name: "Pontificia Universidad Católica del Perú",
        region: "Lima",
        city: "Lima",
      },
      {
        id_ubicacion_modelo: 2,
        texto_ubicacion: "UNI - Lima, Lima (PERC)",
        model_name: "1D-CNN",
        description: "Descrip...",
        image: null,
        is_trasfered: 0,
        origin_system: null,
        technology: "PERC",
        label: "UNI",
        full_name: "Universidad Nacional de Ingeniería",
        region: "Lima",
        city: "Lima",
      },
      {
        id_ubicacion_modelo: 3,
        texto_ubicacion: "UNI - Lima, Lima (HIT)",
        model_name: "1D-CNN",
        description: "Descrip...",
        image: null,
        is_trasfered: 0,
        origin_system: null,
        technology: "HIT",
        label: "UNI",
        full_name: "Universidad Nacional de Ingeniería",
        region: "Lima",
        city: "Lima",
      },
    ],
    idUbicacion: 0,
  }),
  methods: {
    cambioUbicacion(ubicacion_seleccionada) {
      this.idUbicacion = ubicacion_seleccionada;
    },
    obtenerTitulo(ubicacion_seleccionada) {
      let transferido_texto = ubicacion_seleccionada.is_trasfered
        ? " (Transferido)"
        : " (No transferido)";
      return "Modelo " + ubicacion_seleccionada.model_name + transferido_texto;
    },
    obtenerDescripcion(ubicacion_seleccionada) {
      return ubicacion_seleccionada.description;
    },
    filtrarUbicaion(ubicaciones, ubicacion_id) {
      return ubicaciones.filter(
        (ubicacion) => ubicacion.id_ubicacion_modelo === ubicacion_id
      );
    },
  },
  mounted: function () {
    // this.cambioUbicacion("1");\

    //inicializar ubicaciones
    this.ubicacionDefault = this.ubicaciones[0];
    this.idUbicacion = 1;
  },
};
</script>
