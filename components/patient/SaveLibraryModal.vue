<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<v-card>
				<v-card-title>
					<span class="headline">Save to Library</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-text-field label="File Name" :error-messages="filenameErrors" @input="$v.filename.$touch()" @blur="$v.filename.$touch()" v-model="filename" required outlined></v-text-field>
						<v-combobox outlined :error-messages="categoryErrors" @input="$v.category.$touch()" @blur="$v.category.$touch()" v-model="category" :items="categoryOptions" label="Category"></v-combobox>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click.stop="close">Close</v-btn>
					<v-btn color="blue darken-1" text @click.stop="save">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>

import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators'

export default {
	props: {
		dialog: {
			type: Boolean
		},
		details: {
			type: String
		},
		function: {
			type: Function
		},
        type: {
		    type: String
        },
        prescriptionData: {
		    type: Object
        }
	},

	mixins: [validationMixin],

	data: () => ({
		categoryOptions: ['Lunge', 'Legs', 'Heart'],

		filename: 'file-' + Date.now(),
		category: ''
	}),

	validations: {
		filename: {
			required
		},
		category: {
			required
		}
    },

	methods: {
		close() {
			this.$emit('close');
		},
		save() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
			    if (this.type === 'prescription') {
			        this.function({
                        drugs: this.prescriptionData.drugs,
                        instructions: this.prescriptionData.instructions,
                        name: this.filename,
                        category: this.category,
                        library: true
                    })
                } else {
                    this.function({
                        details: this.details,
                        category: this.category,
                        name: this.filename,
                        library: true
                    })
                }

				this.close();
			}
		}
	},

	computed: {
		filenameErrors() {
            const errors = []
            if (!this.$v.filename.$dirty) return errors;
            !this.$v.filename.required && errors.push('File Name is required.');
            return errors;
        },
		categoryErrors() {
            const errors = []
            if (!this.$v.category.$dirty) return errors;
            !this.$v.category.required && errors.push('Category Name is required.');
            return errors;
        },
	}
};
</script>

<style lang="scss" scoped>
</style>
