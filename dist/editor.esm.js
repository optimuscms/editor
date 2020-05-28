import Editor from '@tinymce/tinymce-vue';

var config = function config() {
  return {
    height: 500,
    menubar: false,
    branding: false,
    convert_urls: false,
    body_class: 'content p-4',
    content_css: '/front/css/app.css',
    plugins: 'code hr image link lists paste table media',
    toolbar: "\n            code |\n            undo redo |\n            styleselect |\n            bold italic underline |\n            alignleft aligncenter alignright |\n            bullist numlist hr blockquote |\n            table link image media |\n            removeformat |\n        ",
    formats: {
      alignleft: {
        classes: '',
        selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,table,img'
      },
      aligncenter: {
        classes: 'text-center',
        selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,table,img'
      },
      alignright: {
        classes: 'text-right',
        selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,table,img'
      }
    },
    style_formats: [{
      title: 'Headings',
      items: [{
        title: 'Heading 1',
        block: 'h1'
      }, {
        title: 'Heading 2',
        block: 'h2'
      }, {
        title: 'Heading 3',
        block: 'h3'
      }, {
        title: 'Heading 4',
        block: 'h4'
      }, {
        title: 'Heading 5',
        block: 'h5'
      }, {
        title: 'Heading 6',
        block: 'h6'
      }, {
        title: 'Paragraph',
        block: 'p'
      }]
    }, {
      title: 'Heading Styles',
      items: [{
        title: 'Title',
        classes: 'title',
        selector: 'h1,h2,h3,h4,h5,h6'
      }, {
        title: 'Subtitle',
        classes: 'subtitle',
        selector: 'h1,h2,h3,h4,h5,h6'
      }]
    }, {
      title: 'Inline Styles',
      items: [{
        title: 'Button',
        classes: 'button',
        selector: 'a'
      }]
    }, {
      title: 'Image Styles',
      items: [{
        title: 'Image left',
        classes: 'image-left',
        selector: 'img'
      }, {
        title: 'Image right',
        classes: 'image-right',
        selector: 'img'
      }, {
        title: 'Image centered',
        classes: 'image-center',
        selector: 'img'
      }]
    }],
    table_responsive_width: true,
    table_appearance_options: false,
    table_default_styles: {
      width: '100%'
    },
    table_default_attributes: {
      border: 0
    },
    media_url_resolver: function media_url_resolver(data, resolve, reject) {
      var matches = data.url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtu.be\/|youtube\.com\/(?:watch(?:\/|\/?\?(?:\S*&)?v=)|embed\/))([\w\d-]+)/);

      if (matches !== null && matches[1]) {
        resolve({
          html: "<div class=\"video-embed\">\n                        <iframe\n                            src=\"https://www.youtube.com/embed/".concat(matches[1], "?modestbranding=1&autohide=1&showinfo=0&rel=0\"\n                            frameborder=\"0\"\n                            allowfullscreen\n                        ></iframe>\n                    </div>")
        });
      } else {
        reject({
          msg: 'Incorrect video url.'
        });
      }
    }
  };
};

var config$1 = config();

//
var script = {
  components: {
    BaseEditor: Editor
  },
  props: {
    config: {
      type: Object,
      default: function _default() {}
    },
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      content: this.value
    };
  },
  watch: {
    value: function value(_value) {
      this.content = _value;
    },
    content: function content(value) {
      this.$emit('input', value);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("base-editor", {
    attrs: {
      id: _vm.id,
      init: _vm.init,
      "api-key": _vm.apiKey
    },
    model: {
      value: _vm.content,
      callback: function callback($$v) {
        _vm.content = $$v;
      },
      expression: "content"
    }
  });
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultOptions = {
    config: options.config || config$1,
    componentName: options.componentName || 'editor'
  };
  Vue.component(defaultOptions.componentName, Vue.extend({
    extends: __vue_component__,
    data: function data() {
      return {
        apiKey: options.apiKey
      };
    },
    computed: {
      init: function init() {
        return Object.assign({}, defaultOptions.config, this.config);
      }
    },
    created: function created() {
      if (config$1.hasOwnProperty('onCreated')) {
        config$1.onCreated();
      }
    },
    mounted: function mounted() {
      if (config$1.hasOwnProperty('onMounted')) {
        config$1.onMounted();
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (config$1.hasOwnProperty('onBeforeDestroy')) {
        config$1.onBeforeDestroy();
      }
    }
  }));
}

export default install;
export { config$1 as config };
