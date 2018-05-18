import Quill from 'quill';

import Emitter from 'quill/core/emitter';
import { Range } from 'quill/core/selection';
import Keyboard from 'quill/modules/keyboard';

const BaseTooltip = Quill.import('ui/tooltip');

const LinkBlot = Quill.import('formats/link');
const ButtonBlot = Quill.import('formats/button');

class Tooltip extends BaseTooltip {
    constructor(quill, bounds) {
        super(quill, bounds);

        this.textbox = this.root.querySelector('input[type="text"]');
        this.preview = this.root.querySelector('a.ql-preview');

        this.listen();
    }

    listen() {
        this.textbox.addEventListener('keydown', event => {
            if (Keyboard.match(event, 'enter')) {
                this.save();
                event.preventDefault();
            } else if (Keyboard.match(event, 'escape')) {
                this.cancel();
                event.preventDefault();
            }
        });

        this.root.querySelector('a.ql-action').addEventListener('click', event => {
            if (this.root.classList.contains('ql-editing')) {
                this.save();
            } else {
                let mode = this.root.getAttribute('data-mode');
                this.edit(mode, this.preview.textContent);
            }

            event.preventDefault();
        });

        this.root.querySelector('a.ql-remove').addEventListener('click', event => {
            if (this.linkRange != null) {
                let range = this.linkRange;
                let mode = this.root.getAttribute('data-mode');

                this.restoreFocus();
                this.quill.formatText(range, mode, false, Emitter.sources.USER);

                delete this.linkRange;
            }

            this.hide();
            event.preventDefault();
        });

        this.quill.on(Emitter.events.SELECTION_CHANGE, (range, oldRange, source) => {
            if (range == null) return;

            if (range.length === 0 && source === Emitter.sources.USER) {
                let [link, offset] = this.quill.scroll.descendant(LinkBlot, range.index);
                
                if (link != null) {
                    this.root.setAttribute('data-mode', link instanceof ButtonBlot ? 'button' : 'link');

                    this.linkRange = new Range(range.index - offset, link.length());
                    let preview = LinkBlot.formats(link.domNode);

                    this.preview.textContent = preview;
                    this.preview.setAttribute('href', preview);

                    this.show();
                    this.position(this.quill.getBounds(this.linkRange));

                    return;
                }
            } else {
                delete this.linkRange;
            }

            this.hide();
        });
    }

    show() {
        super.show();
    }

    cancel() {
        this.hide();
    }

    edit(mode = 'link', preview = null) {
        // if (this.quill.selection.savedRange.length) {
            this.root.classList.remove('ql-hidden');
            this.root.classList.add('ql-editing');
    
            if (preview != null) {
                this.textbox.value = preview;
            } else if (mode !== this.root.getAttribute('data-mode')) {
                this.textbox.value = '';
            }
    
            this.position(this.quill.getBounds(this.quill.selection.savedRange));
    
            this.textbox.select();
    
            this.root.setAttribute('data-mode', mode);
        // }
    }

    restoreFocus() {
        let scrollTop = this.quill.scrollingContainer.scrollTop;

        this.quill.focus();
        this.quill.scrollingContainer.scrollTop = scrollTop;
    }

    save() {
        let value = this.textbox.value;
        
        switch (this.root.getAttribute('data-mode')) {
            case 'link':
            case 'button': {
                let scrollTop = this.quill.root.scrollTop;
                let mode = this.root.getAttribute('data-mode');
                
                if (this.linkRange) {
                    this.quill.formatText(this.linkRange, mode, value, Emitter.sources.USER);
                    delete this.linkRange;
                } else {
                    this.restoreFocus();
                    this.quill.format(mode, value, Emitter.sources.USER);
                }
                
                this.quill.root.scrollTop = scrollTop;

                break;
            }

            case 'video': {
                value = extractVideoUrl(value);
            }

            default:
        }

        this.textbox.value = '';
        this.hide();
    }
}

function extractVideoUrl(url) {
    let match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
                url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
    
    if (match) {
        return (match[1] || 'https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
    }

    if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
        return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
    }

    return url;
}

Tooltip.TEMPLATE = `
    <a class="ql-preview" target="_blank" href="about:blank"></a>
    <input type="text" data-link="https://optixsolutions.co.uk" data-video="Embed URL">
    <a class="ql-action"></a>
    <a class="ql-remove"></a>
`;

export default Tooltip;
