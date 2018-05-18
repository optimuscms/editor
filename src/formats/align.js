import Quill from 'quill';

const Parchment = Quill.import('parchment');

let Align = new Parchment.Attributor.Class('align', 'has-text', {
    scope: Parchment.Scope.BLOCK,
    whitelist: ['left', 'right', 'centered']
});

Quill.register(Align, true);
