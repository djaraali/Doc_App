import colors from "vuetify/es5/util/colors";

import Patients from "~/components/icons/Patients.vue";
import Notification from "~/components/icons/Notification.vue";
import Library from "~/components/icons/Library.vue";
import Sentences from "~/components/icons/Sentences.vue";
import Medicines from "~/components/icons/Medicines.vue";
import Appointments from "~/components/icons/Appointments.vue";
import Home from "~/components/icons/Home.vue";
import Message from "~/components/icons/Message.vue";
import Settings from "~/components/icons/Settings.vue";
import Drawings from "~/components/icons/Drawings.vue";

export default {
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: colors.purple.base,
        accent: colors.grey.darken3,
        secondary: colors.indigo,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      },
      light: {
        primary: "#2C3248",
        primaryDark: "#192033",
        primaryLight: "#F0F3FF",
        secondary: "#FF4C6A",

        ternary: "#00a8ff",

        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: '#ee5253',
        success: '#10ac84'
      }
    }
  },
  icons: {
    values: {
      patient: {
        component: Patients
      },
      notification: {
        component: Notification
      },
      library: {
        component: Library
      },
      sentences: {
        component: Sentences
      },
      medicines: {
        component: Medicines
      },
      appointments: {
        component: Appointments
      },
      home: {
        component: Home
      },
      message: {
        component: Message
      },
      settings: {
        component: Settings
      },
      drawings: {
        component: Drawings
      }
    }
  }
  // icons: {
  //   values: {
  //     product: {
  //       component: Patients, // you can use string here if component is registered globally
  //     //   props: { // pass props to your component if needed
  //     //     name: 'product',
  //     //   },
  //     },
  //   },
  // },
};
