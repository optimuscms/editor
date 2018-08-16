# Optimus Editor

The Optimus CMS WYSIWYG editor powered by TinyMCE.

## Installation

```bash
npm install @optimuscms/editor --save
yarn add @optimuscms/editor
```

## Usage

The default config can be modified using any of the TinyMCE options

```javascript
import Editor, { config } from '@optimuscms/editor';

config.branding = true;

Vue.use(Editor, {
    apiKey: 'your-api-key'
});
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
