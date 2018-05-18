import Quill from 'quill';

// Utilities
import '../util/icons';

// Formats
import '../formats/align';
import '../formats/button';
import '../formats/style';

// Plugins
import Tooltip from '../plugins/tooltip';

// Components
import Icon from '@fortawesome/vue-fontawesome';

export default {
    components: {
        Icon
    },

    props: {
        value: String
    },

    data() {
        return {
            content: '',

            formats: {},

            toolbar: {
                headers: [
                    {
                        value: 1,
                        label: 'Header 1',
                        element: 'h1'
                    },
                    {
                        value: 2,
                        label: 'Header 2',
                        element: 'h2'
                    },
                    {
                        value: 3,
                        label: 'Header 3',
                        element: 'h3'
                    },
                    {
                        value: false,
                        label: 'Normal',
                        element: 'p'
                    }
                ],

                align: [
                    {
                        value: false,
                        label: 'Align left',
                        icon: 'align-left'
                    },
                    {
                        value: 'right',
                        label: 'Align right',
                        icon: 'align-right'
                    },
                    {
                        value: 'centered',
                        label: 'Align center',
                        icon: 'align-center'
                    }
                ]
            }
        }
    },

    watch: {
        value(value) {
            if (this.quill) {
                if (value && value !== this.content) {
                    this.quill.pasteHTML(value);
                } else if (! value) {
                    this.quill.setText('');
                }
            }
        }
    },

    mounted() {
        this.quill = new Quill(this.$refs.editor, {
            toolbar: this.$refs.toolbar
        });

        this.tooltip = new Tooltip(this.quill, this.$refs.bounds);

        if (this.value) {
            this.quill.pasteHTML(this.value);
        }

        this.quill.on('editor-change', () => {
            var range = this.quill.getSelection();

            if (range) {
                this.formats = this.quill.getFormat(range);
            }
        });

        this.quill.on('text-change', () => {
            this.content = this.quill.root.innerHTML;
            this.$emit('input', this.content);
        });
    },

    methods: {
        hasFormat(name) {
            return this.formats.hasOwnProperty(name);
        },

        getFormat(name) {
            return this.hasFormat(name) ? this.formats[name] : false;
        },

        applyFormat(name, value) {
            this.quill.format(name, value);
        },

        toggleFormat(name, value = true) {
            if (this.getFormat(name) === value) {
                this.applyFormat(name, false);
                return;
            }

            this.applyFormat(name, value);
        }
    }
}
