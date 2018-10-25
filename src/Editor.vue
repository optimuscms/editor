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

            id: String,
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

<style lang="scss">
    $border-radius: config('borderRadius.default');

    .mce-tinymce {
        box-shadow: none !important;
        border-radius: $border-radius !important;
        border-color: config('colors.grey-light') !important;
    }

    .mce-toolbar-grp {
        border-radius: $border-radius $border-radius 0 0 !important;
    }

    .mce-statusbar {
        border-radius: 0 0 $border-radius $border-radius !important;
    }

    .mce-top-part {
        &:before {
            box-shadow: none !important;
        }
    }

    .mce-panel {
        border-color: config('colors.grey-light') !important;
    }

    #mce-modal-block {
        z-index: 40 !important;
    }

    .mce-window {
        z-index: 41 !important;
    }

    td,
    th {
        font-size: inherit;
        font-family: inherit;
    }
</style>
