<template>
<v-form>
    <v-row>
        <v-col cols="8">
            <v-card>
                <v-card-text>
                    <v-row>

                        <v-col>
                            <v-text-field hide-details="auto" label="First Name" v-model="form.firstname" outlined dense></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field hide-details="auto" label="Last Name" v-model="form.lastname" outlined dense></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field hide-details="auto" label="Specialist On" v-model="form.specialist" outlined dense></v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col>
                            <!-- <ckeditor :editor="editor" v-model="form.about" :config="editorConfig"></ckeditor> -->
                            <text-editor :editorData="form.about"></text-editor>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card height="400" class="py-6">

                <image-upload @removeimage="form.profile = ''" :files="form.profile" @onUpload="onUpload"></image-upload>

            </v-card>
        </v-col>

    </v-row>
    <v-divider></v-divider>
    <v-row justify="end" class="mt-6">
        <v-btn color="secondary" outlined @click.stop="submit">Update</v-btn>
    </v-row>
</v-form>
</template>

<script>
import TextEditor from '~/components/ui/TextEditor'
import ImageUpload from '~/components/ui/ImageUpload'
import {
    mapActions,
    mapState
} from 'vuex';
import types from "~/types/index";
export default {
    components: {
        'image-upload': ImageUpload,
        'text-editor': TextEditor
    },
    data: () => ({
        editorData: '<p>Tell Something About Yourself.</p>',
        
        files: null,
        form: {
            firstname: '',
            lastname: '',
            about: '',
            specialist: '',
            profile: null
        }
    }),
    mounted() {
        this.getProfile()
        // console.log(object)
    },
    computed: {
        ...mapState('profile', ['profile'])
    },
    methods: {
        ...mapActions('profile', {
            'updateProfile': types.profile.updateProfile,
            'getProfile': types.profile.getProfile
        }),
        onUpload(data) {
            console.log('data', data);
            this.form.profile = data;
        },
        submit() {
            console.log(this.form)
            this.updateProfile(this.form)
        }
    },
    watch: {
        profile: function (v) {
            Object.keys(v).forEach(key => {
                if (key in this.form) {
                    let dd = v[key]
                    
                    if (dd) this.form[key] = JSON.parse(JSON.stringify(dd));
                }
            });
        }
    },
}
</script>

<style>

</style>
