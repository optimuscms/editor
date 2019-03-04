# Optimus Editor

The Optimus CMS WYSIWYG editor powered by TinyMCE.

## Installation

```bash
npm install @optimuscms/editor --save

yarn add @optimuscms/editor
```

```javascript
import Editor from '@optimuscms/editor';

Vue.use(Editor, {
    apiKey: 'your-api-key'
});
```

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

### Component

The plugin registers an `<editor>` component.

```vue
<editor v-model="content"></editor>
```

It's also possible to modifiy a specific component's configuration options via the `config` prop.

```vue
<editor v-model="content" :config="{ branding: true }"></editor>
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
