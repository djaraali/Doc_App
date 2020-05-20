<template>
    <v-dialog v-model="dialog" scrollable max-width="900px" persistent transition="dialog-transition">
        <v-card>
            <v-card-title>
                <span class="headline">Edit Medicine</span>
            </v-card-title>
            <v-card-text>
                <v-container fluid>
                    <v-row> 
                        <v-col cols="12" sm="4"> 
                            <image-upload  @removeimage="form.image = ''" :files="form.image" @onUpload="onUpload"></image-upload>
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
                            </v-row>
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

import { mapActions } from 'vuex'
import types from "~/types/index"
import ImageUpload from '~/components/ui/ImageUpload'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    props: ['form', 'dialog', 'items', 'medicineType'],

    components: {
        'image-upload': ImageUpload
    },

    data: () => ({
        search: '',
        newImage: null
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
        ...mapActions( 'medicines', {
            updateMedicine: types.medicines.updateMedicine
        }),
        close() {
            this.$emit('closeDialog');
        },
        save() {
            let { medicine_name, medicine_type, strength, image } = this.form;
            this.updateMedicine({id: this.form._id, data: { medicine_name, medicine_type, strength, image }});
            this.$emit('closeDialog');
        },
        onUpload(data) {
            this.form.image = data;
        },
    }
}
</script>

<style>

</style>
