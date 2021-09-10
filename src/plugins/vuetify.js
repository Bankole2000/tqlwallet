import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: '#007BFF',
        primary: "#5553ff",
        // secondary: '#424242',
        // accent: '#82B1FF',
        // error: '#FF5252',
        // info: '#2196F3',
        // success: '#4CAF50',
        // warning: '#FFC107', 
        // primary: '#2EB4FF',
        secondary: '#FF377F',
        accent: '#FF7D6D',
        error: '#FF3030',
        info: '#2196F3',
        success: '#2DC369',
        warning: '#FFD353'
      },
    },
  },
});
