const mix = require('laravel-mix');

mix.sass('src/styles.scss', 'dist/styles.css')
   .setPublicPath('dist');
