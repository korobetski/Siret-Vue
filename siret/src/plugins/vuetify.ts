/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          /*
          primary: '#03a9f4',
          secondary: '#3f51b5',
          accent: '#673ab7',
          error: '#e91e63',
          warning: '#cddc39',
          info: '#8bc34a',
          success: '#009688'
          */
        },
      },
    },
  },
})
