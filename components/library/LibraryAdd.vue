<template>
<v-layout row wrap>
    <v-flex>
        <v-form ref="form">
            <v-card class="pa-4 pt-8">
                <v-radio-group hide-details="auto" row v-model="mainCategory" :error-messages="categoryError" @input="$v.mainCategory.$touch()" @blur="$v.mainCategory.$touch()">
                    <v-radio label="Consultation" value="Consultation"></v-radio>
                    <v-radio label="Diagnose" value="Diagnose"></v-radio>
                    <v-radio label="Treatment" value="Treatment"></v-radio>
                    <!-- <v-radio label="Prescription" value="Prescription"></v-radio> -->
                </v-radio-group>

                <v-row>
                    <v-col cols="12">
                        <v-combobox hide-details="auto" :items="categoryList" @change="show" v-model="form.category" :error-messages="subCategoryError" @input="$v.form.category.$touch()" @blur="$v.form.category.$touch()" outlined dense label="Sub Category" cache-items="">

                        </v-combobox>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field hide-details="auto" label="Library Name" :error-messages="nameErrors" @input="$v.form.name.$touch()" @blur="$v.form.name.$touch()" v-model="form.name" dense outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="d-flex mb-6">
                            <v-combobox v-model="defaultSentence" :items="sentenceList" :search-input.sync="search" hide-selected label="Add default sentense" :hide-no-data="true" :clearable="true" hide-details="auto" persistent-hint open-on-clear dense outlined ref="addSentenceEl" @keyup.enter="addSentence" @blur="onBlur">
                                <template v-slot:no-data>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                No Data
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-combobox>

                            <v-btn depressed outlined color="secondary" class="ml-3 mr-3" @click.stop="addSentence">Add</v-btn>
                            <v-btn depressed outlined @click.stop="addAndSaveSentence" color="secondary">Add & Save</v-btn>
                        </div>
                        <!-- <ckeditor :editor="editor" v-model="form.details" @input="$v.form.details.$touch()" @blur="$v.form.details.$touch()" :config="editorConfig"></ckeditor> -->
                        <text-editor :editorData="form.details" @input="$v.form.details.$touch()" @blur="$v.form.details.$touch()"></text-editor>
                        <span v-for="(error,i) in detailsError" :key="i" class="secondary--text caption font-weight-medium px-4">{{error}}</span>
                    </v-col>
                </v-row>
                <!-- <v-row>
                    <v-col>
                        <ckeditor :editor="editor" v-model="form.details" @input="$v.form.details.$touch()" @blur="$v.form.details.$touch()" :config="editorConfig"></ckeditor>
                        <span v-for="(error,i) in detailsError" :key="i" class="secondary--text">{{error}}</span>
                    </v-col>
                </v-row> -->
                <v-divider></v-divider>
                <v-row class="mt-3">
                    <v-spacer></v-spacer>
                    <!-- <v-btn color="warning" outlined="" class="mr-3" @click.stop="dialog= false">Close</v-btn> -->
                    <v-btn color="secondary" outlined="" v-if="$route.query.id && $route.query.type" class="mr-3" @click.stop="submit">Update To Library</v-btn>
                    <v-btn color="secondary" outlined="" v-else class="mr-3" @click.stop="submit">Save To Library</v-btn>

                </v-row>

            </v-card>
        </v-form>

    </v-flex>

</v-layout>
</template>

<script>
import TextEditor from '~/components/ui/TextEditor'
import {
    mapActions,
    mapState
} from 'vuex'
import types from "~/types/index";
import {
    validationMixin
} from 'vuelidate'
import {
    required,
    maxLength
} from 'vuelidate/lib/validators'
export default {
    mixins: [validationMixin],
    components: {
        'text-editor': TextEditor
    },
    data: () => ({
        
        mainCategory: '',
        defaultSentence: '',
        search: null,
        form: {
            category: '',
            details: '',
            name: ''
        }
    }),
    validations: {
        mainCategory: {
            required
        },
        form: {
            category: {
                required
            },
            details: {
                required
            },
            name: {
                required
            }
        }
    },
    mounted() {
        this.getSentencesList()
        this.getCategory()

        if (this.$route.query.type == "Consultation") {
            this.mainCategory = "Consultation"
            this.getConsultation({
                id: this.$route.query.id
            })
        }
        if (this.$route.query.type == "Diagnose") {
            this.mainCategory = "Diagnose"
            this.getDiagnose({
                id: this.$route.query.id
            })
        }
        if (this.$route.query.type == "Treatment") {
            this.mainCategory = "Treatment"
            this.getTreatment({
                id: this.$route.query.id
            })
        }
    },
    computed: {
        ...mapState('sentences', ['sentences']),
        ...mapState('library', ['category', 'consultation', 'treatment', 'diagnose']),

        sentenceList() {
            let list = [];
            if (this.sentences) {
                this.sentences.map(sen => {
                    list.push(sen.sentence)
                })
            }
            return list;
        },
        categoryList() {
            let list = [];
            if (this.category && this.category.length > 0) {
                list = this.category.map(itm => itm.title);
            }
            return list;
        },
        nameErrors() {
            const errors = []
            if (!this.$v.form.name.$dirty) return errors;
            !this.$v.form.name.required && errors.push('Library Name is required.');
            return errors;
        },
        subCategoryError() {
            const errors = []
            if (!this.$v.form.category.$dirty) return errors;
            !this.$v.form.category.required && errors.push('A SubCategory Must be Created or Selected');
            return errors;
        },
        detailsError() {
            const errors = []
            if (!this.$v.form.details.$dirty) return errors;
            !this.$v.form.details.required && errors.push('This Field is Required');
            return errors;
        },
        categoryError() {
            const errors = []
            if (!this.$v.mainCategory.$dirty) return errors;
            !this.$v.mainCategory.required && errors.push('One of the Category Must Be Selected');
            return errors;
        },
    },
    methods: {
        ...mapActions('sentences', {
            addNewSentence: types.sentences.addNewSentence,
            getSentencesList: types.sentences.getSentencesList,
        }),
        ...mapActions('library', {
            'addConsultation': types.library.addConsultation,
            'addTreatment': types.library.addTreatment,
            'addDiagnose': types.library.addDiagnose,
            'getCategory': types.library.getCategory,
            'getConsultation': types.library.getConsultation,
            'getTreatment': types.library.getTreatment,
            'getDiagnose': types.library.getDiagnose,
            'updateConsultation': types.library.updateConsultation,
            'updateTreatment': types.library.updateTreatment,
            'updateDiagnose': types.library.updateDiagnose,

            // 'addTreatment':  types.library.addTreatment,
        }),
        submit() {
            this.$v.$touch()
            if (!this.$v.form.$invalid) {
                if (this.mainCategory == 'Consultation') {
                    if (this.$route.query.id) {
                        this.updateConsultation({
                            id: this.$route.query.id,
                            data: {
                                details: this.form.details,
                                category: this.form.category,
                                name: this.form.name,
                                library: true
                            }
                        })
                    } else {
                        this.addConsultation({
                            details: this.form.details,
                            category: this.form.category,
                            name: this.form.name,
                            library: true
                        })
                    }

                    this.mainCategory = ''
                    this.form = {
                        category: '',
                        details: '',
                        name: ''
                    }
                    this.$router.push('/library')
                } else if (this.mainCategory == 'Diagnose') {
                    if (this.$route.query.id) {
                        this.updateDiagnose({
                            id: this.$route.query.id,
                            data: {
                                details: this.form.details,
                                category: this.form.category,
                                name: this.form.name,
                                library: true
                            }
                        })
                    } else {
                        this.addDiagnose({
                            details: this.form.details,
                            category: this.form.category,
                            name: this.form.name,
                            library: true
                        })
                    }
                    this.mainCategory = ''
                    this.form = {
                        category: '',
                        details: '',
                        name: ''
                    }
                    this.$router.push('/library')

                } else if (this.mainCategory == 'Treatment') {
                    if (this.$route.query.id) {
                        this.updateTreatment({
                            id: this.$route.query.id,
                            data: {
                                details: this.form.details,
                                category: this.form.category,
                                name: this.form.name,
                                library: true
                            }
                        })
                    } else {
                        this.addTreatment({
                            details: this.form.details,
                            category: this.form.category,
                            name: this.form.name,
                            library: true
                        })
                    }
                    this.mainCategory = ''
                    this.form = {
                        category: '',
                        details: '',
                        name: ''
                    }
                    this.$router.push('/library')

                }
                this.$v.$reset()
                setTimeout(() => {
                    this.clear();
                }, 100);
            }

        },
        addSentence() {
            setTimeout(() => {
                if (this.defaultSentence) {
                    this.form.details += `<p> ${this.defaultSentence} </p>`
                    this.defaultSentence = '';
                    this.$refs.addSentenceEl.blur()
                }
            }, 50);
            // this.editorData.insertHTML
        },
        addAndSaveSentence() {
            setTimeout(() => {
                if (this.defaultSentence) {
                    this.form.details += `<p> ${this.defaultSentence} </p>`
                    this.addNewSentence({
                        sentence: this.defaultSentence
                    })
                    this.defaultSentence = '';
                    this.$refs.addSentenceEl.blur()
                }
            }, 50);
        },
        onBlur(e) {
            console.log(this.defaultSentence)
        },
        show() {
            console.log(this.form.category)
        }
    },
    watch: {
        consultation: function (v) {
            Object.keys(v).forEach(key => {
                if (key in this.form) {
                    let dd = v[key]
                    if (dd) this.form[key] = JSON.parse(JSON.stringify(dd));
                }
            });
        },
        diagnose: function (v) {
            Object.keys(v).forEach(key => {
                if (key in this.form) {
                    let dd = v[key]
                    if (dd) this.form[key] = JSON.parse(JSON.stringify(dd));
                }
            });
        },
        treatment: function (v) {
            Object.keys(v).forEach(key => {
                if (key in this.form) {
                    let dd = v[key]
                    if (dd) this.form[key] = JSON.parse(JSON.stringify(dd));
                }
            });
        }
    }
}
</script>

<style>

</style>
