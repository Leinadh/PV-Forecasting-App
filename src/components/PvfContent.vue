<template>
  <v-container>
    <v-col>
      <v-row cols="12" class="mt-0">
        <v-card-text class="text-center">
          Por favor, seleccione una ubicación y un día de pronóstico.
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
          <v-img
            v-bind:src="imagen_ubicacion"
            class="my-3"
            contain
            height="200"
          />

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
            v-on:change="cambioGrafico"
            v-model="picker"
            class="mt-4"
            :min="fecha_min"
            :max="fecha_max"
            locale="es-MX"
            color="primary"
            :show-current="fecha_max"
          ></v-date-picker>
          <!-- <v-date-picker
            v-model="date"
            :allowed-dates="allowedDates"
            class="mt-4"
            min="2016-06-15"
            max="2018-03-20"
            locale="es-MX"
            color="primary"
          ></v-date-picker> -->
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-row cols="12" class="mt-5">
        <v-col align="center" cols="12">
          <v-card-title class="justify-center">
            Predicción de la potencia AC generada
          </v-card-title>
          <v-card-text class="text-center">
            Se realiza una predicción para cada hora entre las 6 a. m. y las 5
            p. m. del día seleccionado.
          </v-card-text>
          <!-- <v-card-text class="text-center">
            {{ picker }}
          </v-card-text> -->
          <v-img :src="img_grafico" class="my-3" contain width="500" />
        </v-col>
      </v-row>

      <v-row class="mt-3 mb-3">
        <v-card-text class="text-center"> Métricas </v-card-text>
        <v-col cols="6" align="right">
          <v-card align="center" width="200">
            <v-icon size="50px" class="mt-3"> mdi-chart-areaspline</v-icon>
            <v-card-title class="justify-center">{{
              rmse_previo
            }}</v-card-title>
            <v-card-text class="text-center">
              RMSE del día anterior
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" align="left">
          <v-card align="center" width="200">
            <v-icon size="50px" class="mt-3"> mdi-chart-areaspline</v-icon>
            <v-card-title class="justify-center">{{
              rmse_actual
            }}</v-card-title>
            <v-card-text class="text-center"> RMSE de predicción </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
// import PvfSelect from "@/components/PvfSelect";
// import { listarUbicaciones, getImagenUbicacion } from "@/services/index";
import {
  listarUbicaciones,
  getFechasLimite,
  listarGraficosMetricas,
} from "@/services/index";

export default {
  name: "PvfContent",
  components: {
    // PvfSelect,
  },
  data: () => ({
    // imagen_ubicacion: require("@/assets/images/ubicaciones/all.png"),
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScESJtxLLl9e12q9nTIgacSptopeZR1tAFbA&usqp",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR13g5pvUfHTTvC1Xgk80uhzSZHYXWydYWsg",
    // "https://www.minera-irl.com/wp-content/uploads/2015/05/mapa-peru.jpg",
    ubicacionDefault: { id_ubicacion_modelo: 0, texto_ubicacion: "" },
    img_grafico:
      "https://pvforecastingimages.s3.us-east-1.amazonaws.com/fondo_graficos.png",
    ubicaciones: [],
    // ubicaciones: [
    //   {
    //     id_ubicacion_modelo: 4,
    //     texto_ubicacion: "UNTRM - Chachapoyas, Amazonas (PERC)",
    //     model_name: "1D-CNN",
    //     description:
    //       "Este modelo fue entrenado con datos recolectado en las instalaciones de la Universidad Nacional Toribio Rodríguez de Mendoza de Amazonas en Chachapoyas, Amazonas.",
    //     image_path: "ubicaciones/u3-s.png",
    //     is_trasfered: 0,
    //     origin_system: null,
    //     technology: "PERC",
    //     label: "UNTRM",
    //     full_name:
    //       "Universidad Nacional Toribio Rodríguez de Mendoza de Amazonas",
    //     region: "Amazonas",
    //     city: "Chachapoyas",
    //   },
    // ],
    idUbicacion: 0,
    fecha_min: "",
    fecha_max: "",
    picker: "",
    s3_url: "https://pvforecastingimages.s3.amazonaws.com/",
    imagen_ubicacion:
      "https://pvforecastingimages.s3.amazonaws.com/ubicaciones/all-s.png",
    graficos_metricas: [],
    rmse_actual: "-",
    rmse_previo: "-",
  }),
  methods: {
    cambioUbicacion(ubicacion_seleccionada) {
      this.idUbicacion = ubicacion_seleccionada;
      let path = this.filtrarUbicaion(
        this.ubicaciones,
        ubicacion_seleccionada
      )[0].image_path;
      // this.imagen_ubicacion = require("@/assets/images/" + path);
      this.imagen_ubicacion = this.s3_url + path;
      this.cambioGrafico();
    },
    cambioGrafico() {
      // this.idUbicacion = ubicacion_seleccionada;
      let grafico = this.filtrarGrafico(this.graficos_metricas)[0];
      // this.imagen_ubicacion = require("@/assets/images/" + path);
      if (grafico != null) {
        if (grafico.date === this.fecha_max)
          this.img_grafico = this.s3_url + grafico.metric_image_path;
          // this.img_grafico = this.s3_url + grafico.metric_current_image_path;
        else this.img_grafico = this.s3_url + grafico.metric_image_path;
        this.rmse_actual = grafico.value;
        this.rmse_previo = grafico.previous_value;
      } else {
        this.img_grafico =
          "https://pvforecastingimages.s3.us-east-1.amazonaws.com/fondo_graficos.png";
        this.rmse_actual = "-";
        this.rmse_previo = "-";
      }
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
    filtrarGrafico(ubicaciones) {
      return ubicaciones.filter(
        (ubicacion) =>
          ubicacion.date === this.picker &&
          ubicacion.id_ubicacion_modelo === this.idUbicacion
      );
    },
  },
  mounted: function () {
    // this.cambioUbicacion("1");\

    //inicializar ubicaciones
    listarUbicaciones().then((response) => {
      this.ubicaciones = response.data;
      this.idUbicacion = this.ubicaciones[0].id_ubicacion_modelo;
      this.ubicacionDefault = this.filtrarUbicaion(
        this.ubicaciones,
        this.idUbicacion
      )[0];
      let path = this.filtrarUbicaion(this.ubicaciones, this.idUbicacion)[0]
        .image_path;
      this.imagen_ubicacion = this.s3_url + path;

      getFechasLimite().then((response) => {
        const fechas = response.data;
        this.fecha_min = fechas.min_date;
        this.fecha_max = fechas.max_date;
        this.picker = fechas.max_date;

        listarGraficosMetricas().then((response) => {
          this.graficos_metricas = response.data;
          this.cambioGrafico();
        });
      });
    });

    // getImagenUbicacion(1).then((response) => {
    //   const blob = new Blob([response.data], { type: "image/jpg" });
    //   this.imagen_ubicacion = URL.createObjectURL(blob);
    // });
  },
};
</script>
