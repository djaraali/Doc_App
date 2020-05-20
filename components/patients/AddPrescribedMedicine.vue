
<template>
  <v-dialog v-model="dialog" scrollable max-width="900px" persistent transition="dialog-transition">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Medicine</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="8">
              <v-row>
                <v-col>
                  <v-combobox
                    v-model="prescribedMedicine.medicine_name"
                    :items="medicines"
                    item-text="medicine_name"
                    item-value="medicine_name"
                    :search-input.sync="medicineSearch"
                    hide-selected
                    label="Add medicine"
                    :hide-no-data="true"
                    :clearable="true"
                    :return-object="false"
                    hide-details="auto"
                    persistent-hint
                    open-on-clear
                    dense
                    outlined
                    :error-messages="medicineNameErrors"
                    @input="$v.prescribedMedicine.medicine_name.$touch()"
                    @blur="$v.prescribedMedicine.medicine_name.$touch()"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>No Data</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-combobox
                    v-model="prescribedMedicine.medicine_type"
                    :items="medicines"
                    item-text="medicine_type"
                    item-value="medicine_type"
                    :search-input.sync="medicineTypeSearch"
                    hide-selected
                    label="Add medicine Type"
                    :hide-no-data="true"
                    :clearable="true"
                    hide-details="auto"
                    persistent-hint
                    open-on-clear
                    dense
                    outlined
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>No Data</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-combobox
                    v-model="prescribedMedicine.medicine_strength"
                    :items="strengthOptions"
                    :search-input.sync="medicineStrengthSearch"
                    hide-selected
                    label="Add medicine Strength"
                    :hide-no-data="true"
                    :clearable="true"
                    hide-details="auto"
                    persistent-hint
                    open-on-clear
                    dense
                    outlined
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>No Data</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    hide-details="auto"
                    :error-messages="medicineDoseErrors"
                    @input="$v.prescribedMedicine.dose.$touch()"
                    @blur="$v.prescribedMedicine.dose.$touch()"
                    v-model="prescribedMedicine.dose"
                    label="Dose"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-combobox
                    v-model="prescribedMedicine.frequency"
                    :items="frequencyOptions"
                    :search-input.sync="frequencySearch"
                    hide-selected
                    label="Frequency"
                    :hide-no-data="true"
                    :clearable="true"
                    hide-details="auto"
                    persistent-hint
                    open-on-clear
                    dense
                    outlined
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>No Data</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
            </v-col>
            <v-col sm="4">
              <image-upload
                @removeimage="prescribedMedicine.image = ''"
                :files="prescribedMedicine.image"
                @onUpload="onUpload"
              ></image-upload>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-time-picker v-model="timePicker" :ampm-in-title="true" dense></v-time-picker>
            </v-col>
            <v-col>
              <h2 class="body-1 font-weight-black mb-4">Medicine Time</h2>
              <v-row v-for="(t, index) in prescribedMedicine.medicine_times" :key="index">
                <v-col class="d-flex align-center">
                  <span class="mr-4">{{ t.time }}</span>
                  <img class="img-icon" v-if="t.day_time == 'morning'" src="/images/sunrise.svg" alt="morning">
                  <img class="img-icon" v-if="t.day_time == 'noon'" src="/images/sun.svg" alt="noon">
                  <img class="img-icon" v-if="t.day_time == 'night'" src="/images/moon.svg" alt="night">
                  <div class="ml-auto">
                    <v-btn @click="deleteMedicineTime(index)" icon color="red">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="addTime">Add Time</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-radio-group v-model="prescribedMedicine.beforeEat">
              <v-radio label="Before Eating" :value="true"></v-radio>
              <v-radio label="After Eating" :value="false"></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="prescribedMedicine.duration"
                    label="Continure for"
                    readonly
                    outlined
                    dense
                    v-on="on"
                    hide-details="auto"
                    :clearable="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="prescribedMedicine.duration" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="12">
              <v-textarea
                outlined
                name="input-7-4"
                label="Note"
                hide-details="auto"
                v-model="prescribedMedicine.note"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click.stop="close">Close</v-btn>
        <v-btn color="blue darken-1" @click.stop="save" text>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import types from "~/types/index";
import ImageUpload from "~/components/ui/ImageUpload";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  props: {
    dialog: {
      type: Boolean
    },
    prescribedMedicine: {
      type: Object
    }
  },

  components: {
    "image-upload": ImageUpload
  },

  data: () => ({
    search: "",
    newImage: null,

    menu2: false,
    afterEating: "",
    timePicker: "",

    medicineSearch: null,
    medicineTypeSearch: null,
    medicineStrengthSearch: null,
    frequencySearch: null,

    strengthOptions: [],
    frequencyOptions: [
      "If required",
      "Immediately",
      "Once a day",
      "Twice daily",
      "Thrice daily",
      "Four times a day",
      "Every hour",
      "Every night at bedtime",
      "Everyday",
      "Every outher day",
      "Every four hours",
      "Once a week",
      "Three times a week"
    ]
  }),

  validations: {
    prescribedMedicine: {
      medicine_name: {
        required
      },
      dose: {
        required
      }
    }
  },

  computed: {
    ...mapState("medicines", ["medicines"]),
    medicineNameErrors() {
      const errors = [];
      if (!this.$v.prescribedMedicine.medicine_name.$dirty) return errors;
      !this.$v.prescribedMedicine.medicine_name.required &&
        errors.push("Medicine Name is required.");
      return errors;
    },
    medicineDoseErrors() {
      const errors = [];
      if (!this.$v.prescribedMedicine.dose.$dirty) return errors;
      !this.$v.prescribedMedicine.dose.required &&
        errors.push("Medicine dose is required.");
      return errors;
    }
  },

  methods: {
    ...mapActions("medicines", {
      getMedicineList: types.medicines.getMedicineList
    }),
    onUpload(data) {
      this.prescribedMedicine.image = data;
    },
    close() {
      this.$emit("close");
    },
    save() {
      this.$v.$touch();
      if (!this.$v.prescribedMedicine.$invalid) {
        this.$emit("save");
        this.close();
      }
    },
    addTime() {
      let p = this.timePicker;
      if (p) {
        console.log(p.split(":")[0])
        let hour = parseInt(p.split(":")[0]);
        let day_time;
        console.log(day_time)
        if (hour < 12 && hour > 5) {
          day_time = 'morning'
        } else if (hour >= 12 && hour <= 18) {
          day_time = 'noon'
        } else {
          day_time = 'night'
        }
        console.log(day_time);
        this.prescribedMedicine.medicine_times.push({
          time: p,
          day_time
        });
      }
      this.timePicker = '';
    },
    deleteMedicineTime(i) {
      this.prescribedMedicine.medicine_times.splice(i, 1);
    }
  },

  watch: {
    "prescribedMedicine.medicine_name": function(value) {
      let itm = null;
      if (value) {
        itm = this.medicines.find(med => med.medicine_name == value);
        if (itm && itm.medicine_type) {
          this.prescribedMedicine.medicine_type = itm.medicine_type;
          this.strengthOptions = itm.strength;
          if (itm.image) {
            this.prescribedMedicine.image = itm.image;
          }
        } else {
          this.prescribedMedicine.medicine_type = "";
          this.strengthOptions = [];
        }
      }
    }
  },

  mounted() {
    this.getMedicineList();
  }
};
</script>

<style lang="scss" scoped>
.img-icon {
  width: 25px;
}
</style>