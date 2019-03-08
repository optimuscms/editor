import config from './config';
import Editor from './Editor';

export default function install(Vue, options = {}) {
    let defaultOptions = {
        config: options.config || config,
        componentName: options.componentName || 'editor'
    };

    Vue.component(defaultOptions.componentName, Vue.extend({
        extends: Editor,

        data() {
            return {
                apiKey: options.apiKey,
            }
        },

        created() {
            if (config.hasOwnProperty('onCreated')) {
                config.onCreated();
            }
        },

        mounted() {
            if (config.hasOwnProperty('onMounted')) {
                config.onMounted();
            }
        },

        beforeDestroy() {
            if (config.hasOwnProperty('onBeforeDestroy')) {
                config.onBeforeDestroy();
            }
        },

        computed: {
            init() {
                return Object.assign({},
                    defaultOptions.config,
                    this.config
                );
            }
        }
    }));
}

export { config };
