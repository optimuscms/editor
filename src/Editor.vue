<template>
    <base-editor
        :init="init"
        v-model="content"
        :api-key="apiKey"
    ></base-editor>
</template>

<script>
    import BaseEditor from '@tinymce/tinymce-vue';

    export default {
        components: { BaseEditor },
        
        props: {
            config: {
                type: Object,
                default: () => {}
            },

            value: String
        },

        data() {
            return {
                content: this.value
            }
        },

        watch: {
            value(value) {
                this.content = value;
            },

            content(value) {
                this.$emit('input', value);
            }
        }
    }
</script>

<style>
    #mce-modal-block {
        z-index: 110 !important;
    }

    .mce-window {
        z-index: 111 !important;
    }
</style>
