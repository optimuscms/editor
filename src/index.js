import config from './config';
import Editor from './Editor';

export default function install(Vue, options = {}) {
    Vue.component('editor', Vue.extend({
        extends: Editor,

        data() {
            return {
                apiKey: options.apiKey,
            }
        },

        computed: {
            defaultConfig() {
                return options.hasOwnProperty('config')
                    ? options.config
                    : config.defaults();
            },

            init() {
                return { ...this.defaultConfig, ...this.config };
            }
        }
    }));
}

export { config };
