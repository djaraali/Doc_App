<template>
<v-layout row class="mb-8">
    <v-flex>
        <v-form>
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <image-upload @removeimage="form.image = ''" :files="form.image" @onUpload="onUpload"></image-upload>
                        </v-col>
                        <v-col cols="12" sm="8">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field hide-details="auto" :error-messages="nameErrors" @input="$v.form.medicine_name.$touch()" @blur="$v.form.medicine_name.$touch()" label="Medicine Name" v-model="form.medicine_name" outlined required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select hide-details="auto" :error-messages="medicineTypeError" @input="$v.form.medicine_type.$touch()" @blur="$v.form.medicine_type.$touch()" :items="medicineType" label="Medicine type" v-model="form.medicine_type" outlined required></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-combobox v-model="form.strength" :items="items" :search-input.sync="search" hide-selected label="Add Strength" multiple persistent-hint small-chips outlined hide-details="auto">
                                        <template v-slot:no-data>
                                            <v-list-item>
                                                <span class="subheading">Create</span>
                                                <v-chip label>
                                                    {{ search }}
                                                </v-chip>
                                            </v-list-item>
                                        </template>
                                        <template v-slot:selection="{ attrs, item, parent, selected }">
                                            <v-chip v-bind="attrs" :input-value="selected">
                                                <span class="pr-2">
                                                    {{ item }}
                                                </span>
                                                <v-icon small @click="parent.selectItem(item)">close</v-icon>
                                            </v-chip>
                                        </template>
                                    </v-combobox>
                                </v-col>
                                <v-col cols="12">
                                    <v-container>
                                    <v-row justify="end">
                                        <v-btn color="secondary" depressed @click.stop="submit">Save</v-btn>
                                    </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-form>
    </v-flex>
</v-layout>
</template>

<script>

import types from "~/types/index";
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import ImageUpload from '~/components/ui/ImageUpload'

export default {
    mixins: [validationMixin],

    props: ['items', 'medicineType'],

    components: {
        'image-upload': ImageUpload
    },

    data: () => ({
        newPower: '',
        activator: null,
        attach: null,
        editing: null,
        index: -1,
        nonce: 1,
        menu: false,
        model: [],
        search: null,
        form: {
            medicine_name: '',
            medicine_type: '',
            strength: [],
            image: ''
        }
    }),

    validations: {
        form: {
            medicine_name: {
                required
            },
            medicine_type: {
                required
            }
        }
    },

    computed: {
        nameErrors() {
            const errors = []
            if (!this.$v.form.medicine_name.$dirty) return errors;
            !this.$v.form.medicine_name.required && errors.push('Medicine Name is required.');
            return errors;
        },
        medicineTypeError() {
            const errors = []
            if (!this.$v.form.medicine_type.$dirty) return errors;
            !this.$v.form.medicine_type.required && errors.push('Medicine Type is required.');
            return errors;
        }
    },

    methods: {
        ...mapActions('medicines', {
            addNewMedicine: types.medicines.addNewMedicine
        }),
        addMedicinePower() {
            console.log(this.newPower)
            this.form.strength.push(this.newPower);
            this.newPower = ''
        },
        removeMedicinePower(index) {
            this.form.strength.splice(index, 1)
        },
        onUpload(data) {
            this.form.image = data;
        },
        submit() {
            this.$v.$touch()
            console.log(this.form)
            if (!this.$v.form.$invalid) {
                this.addNewMedicine(this.form);
                this.$v.$reset()
                setTimeout(() => {
                    this.clear();
                }, 100);
            }
        },
        clear() {
            this.form.medicine_name = '';
            this.form.medicine_type = '';
            this.form.strength = [];
            this.form.image = '';
        },
    },

    watch: {
        'form.strength'(val, prev) {
            if (val.length === prev.length) return;
            this.form.strength = val.map(v => {
                if (typeof v === 'string') {
                    this.items.push(v)
                    this.nonce++
                }
                return v
            })
        },
    },
}
</script>

<style>
#fileInput {
    display: none;
}

.img-up {
    width: 200px;
    height: 200px;
    background: #ededed;
}
</style>
