<template>
    <base-editor
        :id="id"
        v-model="content"
        :init="init"
        :api-key="apiKey"
    />
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

export default {
    components: { BaseEditor: Editor },

    props: {
        config: {
            type: Object,
            default: () => {},
        },

        id: {
            type: String,
            required: true,
        },

        value: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            content: this.value,
        };
    },

    watch: {
        value(value) {
            this.content = value;
        },

        content(value) {
            this.$emit('input', value);
        },
    },
};
</script>
