<template>
    <base-editor
        :id="id"
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

            id: {
                type: String,
                required: true
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
