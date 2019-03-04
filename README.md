# Optimus Editor

The Optimus CMS WYSIWYG editor powered by TinyMCE.

## Installation

```bash
npm install @optimuscms/editor --save

yarn add @optimuscms/editor
```

#### Javascript
```javascript
import Editor from '@optimuscms/editor';

Vue.use(Editor, {
    apiKey: 'your-api-key'
});
```

#### SCSS
```scss
@import '~@optimuscms/editor/dist/styles.css';
```

## Usage

### Configuration

The default configuration [options](src/config.js) can be modified using any of the TinyMCE options.

```javascript
import Editor, { config } from '@optimuscms/editor';

config.branding = true;

Vue.use(Editor, {
    apiKey: 'your-api-key',
    config: config
});
```

An optional parameter of `componentName` can be passed allowing you to set a custom component name for
the editor, by default this is `editor`.

### Component

By default the plugin registers an `<editor>` component.

```vue
<editor v-model="content"></editor>
```

It's also possible to modifiy a specific component's configuration options via the `config` prop.

```vue
<editor v-model="content" :config="{ branding: true }"></editor>
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
