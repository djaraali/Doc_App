<template>
<div class="image__upload">
    <div class="file__upload" v-if="files == '' || files == null">
        <div class="con">
            <input type="file" @input="onChange" id="myfile" name="myfile" class="input--file">
            <span class="input--file--after">
                <!-- <loading-icon class="upload"></loading-icon> -->
                <div class="images">
                    <!-- <upload-icon class="upload"></upload-icon> -->
                    <p class="text">Add Image</p>
                </div>
            </span>
        </div>
    </div>
    <div v-else class="preview">
        <label for="myfile" class="label"></label>
        <div class="preview__images">
            <img :src="files" alt="" class="preview__images__show">
            <!-- <button class="preview__images__delete" @click.prevent="remove">remove</button> -->
        </div>
    </div>

    <button v-if="files != null && files != ''" @click.stop="removeImg" class="remove-img"> Remove </button>
</div>
</template>

<script>
export default {
    props: ['files'],
    methods: {
        onChange(image) {
            console.log("image",image.target.files[0])
            if (image) {
                var formData = new FormData();
                formData.append('file', image.target.files[0], 'genesys.jpg')
                console.log(this.$store)
                this.uploadImage(formData)
            } else {

            }
        },
        async uploadImage(payload) {
            try {
                this.$store.dispatch("start", this.uploadLoading, {
                    root: true
                });
                let f = await this.$axios.$post(`/files`, payload);
                let newFile = f.url;
                this.$emit('onUpload', newFile)

            } catch (e) {
                this.$store.dispatch("handleErrors", e, {
                    root: true
                });
            } finally {
                this.$store.dispatch("end", this.uploadLoading, {
                    root: true
                });
            }
        },
        removeImg() {
            this.$emit('removeimage')
        }
    }
}
</script>

<style lang="scss" scoped>

.image__upload {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.image__upload, .file__upload {
    height: 300px;
}

.con {
    position: relative;
    padding: 20px;
    height: 100%;
}

.input--file {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: transparent;
    // background-color: var(--form-input-background);
    border: 3px dashed #ffff;
    background-color: transparent;
    border-radius: 5px;
    position: relative;
    z-index: 3;
    cursor: pointer;

    &::-webkit-file-upload-button {
        display: none;
    }

    &--after {
        position: absolute;
        top: 0%;
        left: 0%;
        display: grid;
        box-sizing: border-box;
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        background-color: none;
        // border: 3px dashed var(--form-background);
        border-radius: 5px;
        cursor: pointer;
        // background-image: url("/images/icons/upload.svg");
        // background-image: url("/images/icons/spinner.svg");
        // background-repeat: no-repeat;
        z-index: 0;
        background-color: #ededee;

        .images {
            place-self: center;

            .text {
                font-size: 12px;
                color: #000;
                font-weight: 700;
                letter-spacing: 3px;
                margin-top: 10px;
            }
        }

        .upload {
            width: 40px;
            height: 40px;
            fill: #eeee;
            display: block;
            margin: auto;
        }

        // background-position: 50% 50%;
    }

    &:hover {
        &~.input--file--after {
            .upload {
                fill: #000;
            }

            .images {
                .text {
                    color: #000;
                }
            }
        }
    }
}

.preview {
    &__images {
        &__show {
            width: 100%;
            object-fit: contain;
            height: 280px;
            background: grey;
        }
    }
}

.remove-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #d93f3f;
    color: #fff;
    cursor: pointer;
    padding: 5px 10px;
}
</style>
