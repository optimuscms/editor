import defaultConfig from './config';
import Editor from './Editor';

export default function install(Vue, { apiKey }) {
    Vue.component('editor', Vue.extend({
        extends: Editor,

        data() {
            return {
                apiKey: apiKey,
            }
        },

        computed: {
            init() {
                return Object.assign({}, defaultConfig, this.config);
            }
        }
    }));
}

export { defaultConfig as config };
