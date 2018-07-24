<template>
    <editor :api-key="apiKey" v-model="content" :init="options"></editor>
</template>

<script>
    import { mapGetters} from 'vuex';
    import Editor from '@tinymce/tinymce-vue';

    export default {
        components: {
            Editor
        },

        props: {
            value: String,

            height: {
                type: Number,
                default: 500
            },

            headings: {
                type: Object,
                default() {
                    return {
                        title: 'Headings',
                        items: [
                            { title: 'Heading 1', block: 'h1' },
                            { title: 'Heading 2', block: 'h2' },
                            { title: 'Heading 3', block: 'h3' },
                            { title: 'Heading 4', block: 'h4' },
                            { title: 'Heading 5', block: 'h5' },
                            { title: 'Heading 6', block: 'h6' },
                            { title: 'Paragraph', block: 'p' }
                        ]
                    }
                }
            },

            heading_styles: {
                type: Object,
                default() {
                    return {
                        title: 'Heading Styles',
                        items: [
                            {
                                title: 'Title',
                                classes: 'title',
                                selector: 'h1,h2,h3,h4,h5,h6'
                            },
                            {
                                title: 'Subtitle',
                                classes: 'subtitle',
                                selector: 'h1,h2,h3,h4,h5,h6'
                            }
                        ]
                    }
                }
            },

            inline_styles: {
                type: Object,
                default() {
                    return {
                        title: 'Inline Styles',
                        items: [
                            {
                                title: 'Button',
                                classes: 'button is-primary',
                                selector: 'a'
                            }
                        ]
                    }
                }
            },

            image_styles: {
                type: Object,
                default() {
                    return {
                        title: 'Image Styles',
                        items: [
                            {
                                title: 'Image left',
                                classes: 'is-left',
                                selector: 'img'
                            },
                            {
                                title: 'Image right',
                                classes: 'is-right',
                                selector: 'img'
                            }
                        ]
                    }
                }
            }
        },

        computed: {
            ...mapGetters({
                getMedia: 'media/getActiveMedia',
                imageExtensions: 'media/imageExtensions'
            }),

            options() {
                return {
                    menubar: false,
                    branding: false,
                    height: this.height,
                    body_class: 'content p-3',
                    content_css : '/css/front/app.css',
                    plugins: 'image link lists paste table',

                    style_formats: [
                        this.headings,
                        this.heading_styles,
                        this.inline_styles,
                        this.image_styles
                    ],

                    formats: {
                        alignleft: {
                            classes: '',
                            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,table,img'
                        },
                        aligncenter: {
                            classes: 'has-text-centered',
                            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,table,img'
                        },
                        alignright: {
                            classes: 'has-text-right',
                            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,table,img'
                        }
                    },

                    toolbar: `
                        undo redo removeformat | 
                        styleselect | 
                        bold italic | 
                        alignleft aligncenter alignright | 
                        bullist numlist | 
                        table link image | 
                    `,

                    table_responsive_width: true,
                    table_appearance_options: false,
                    table_default_styles: {
                        width: '100%'
                    },
                    table_default_attributes: {
                        border: 0,
                        class: 'table is-bordered'
                    },

                    file_picker_types: 'image',
                    file_picker_callback: (callback, value, meta) => {
                        eventBus.$emit('media-manager-open', {
                            limit: 1,
                            accept: this.imageExtensions
                        });

                        eventBus.$on('media-selected', mediaIds => {
                            callback(this.getMedia(mediaIds)[0].url, {
                                alt: this.getMedia(mediaIds)[0].name
                            });
                        });
                    }
                }
            }
        },

        data() {
            return {
                apiKey: process.env.MIX_TINYMCE_API_KEY,
                content: ''
            }
        },

        watch: {
            value(value) {
                this.content = value;
            },

            content(value) {
                this.$emit('input', value);
            }
        },

        mounted() {
            this.content = this.value;
        }
    }
</script>
