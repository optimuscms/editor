import Quill from 'quill';

const Link = Quill.import('formats/link');

class Button extends Link {
    static create(url) {
        const node = super.create(url);

        node.classList.add('is-primary');

        return node;
    }
}

Button.tagName = 'a'
Button.blotName = 'button';
Button.className = 'button';

Quill.register(Button, true);
