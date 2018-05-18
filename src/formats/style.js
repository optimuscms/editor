import Quill from 'quill';

const Parchment = Quill.import('parchment');

class ClassAttributor extends Parchment.Attributor.Class {
    add(node, value) {
        if (! this.canAdd(node, value)) return false;

        this.remove(node);
        node.classList.add(value);

        return true;
    }
    
    remove(node) {
        this.whitelist.some(style => {
            if (node.classList.contains(style)) {
                return node.classList.remove(style);
            }
        });
    }
    
    value(node) {
        let value = '';

        this.whitelist.some(style => {
            if (node.classList.contains(style)) {
                return value = style;
            }
        });

        return this.canAdd(node, value) ? value : '';
    }
}

let Style = new ClassAttributor('style', null, {
    scope: Parchment.Scope.BLOCK,
    whitelist: ['title', 'subtitle', 'button']
});

Quill.register(Style, true);
