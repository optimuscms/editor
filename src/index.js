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

        computed: {
            init() {
                return {
                    ...defaultOptions.config,
                    ...this.config
                };
            }
        }
    }));
}

export { config };
