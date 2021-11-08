<template>
  <v-footer dark padless>
    <v-card width="100%">
      <v-card flat tile class="secondary lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <a :href="links[icon]" class="white--text">
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </a>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          Aplicación de Aprendizaje Profundo para el pronóstico del rendimiento
          energético en sistemas fotovoltaicos conectados a la red en diferentes
          regiones del Perú <br />
          {{(new Date).getFullYear()}} — Daniel Ibáñez Rodríguez
        </v-card-text>
      </v-card>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-github", "mdi-linkedin"],
    links: {
      "mdi-github": "https://github.com/Leinadh/PV-Forecasting-App",
      "mdi-linkedin": "https://www.linkedin.com/in/daniel-ibanez/",
    },
  }),
};
</script>