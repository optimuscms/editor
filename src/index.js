import { mapGetters} from 'vuex';
import * as values from './values';
import BaseEditor from '@tinymce/tinymce-vue';

export default function install(Vue, options = {}) {
    Vue.component('editor', {
        template: `<base-editor :api-key="apiKey" v-model="content" :init="init"></base-editor>`,

        components: { BaseEditor },
        
        props: {
            value: String,
            height: Number,
            toolbar: String,
            plugins: String
        },

        data() {
            return {
                apiKey: process.env.MIX_TINYMCE_API_KEY,
                content: this.value
            }
        },

        computed: {
            ...mapGetters({
                getMedia: 'media/getActiveMedia',
                imageExtensions: 'media/imageExtensions'
            }),

            init() {
                return {
                    branding: false,
                    menubar: options.menubar || false,
                    height: this.height || options.height || 500,
                    body_class: options.body_class || 'content p-3',
                    content_css : options.content_css || '/css/front/app.css',
                    style_formats: options.style_formats || values.styleFormats,
                    plugins: this.plugins || options.plugins || 'image link lists paste table',

                    toolbar: this.toolbar || options.toolbar || `
                        undo redo removeformat | 
                        styleselect | 
                        bold italic | 
                        alignleft aligncenter alignright | 
                        bullist numlist | 
                        table link image | 
                    `,

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

        watch: {
            value(value) {
                this.content = value;
            },

            content(value) {
                this.$emit('input', value);
            }
        }
    });

}

export * from './values';