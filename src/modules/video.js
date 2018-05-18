import Quill from 'quill';

let BlockEmbed = Quill.import('blots/block/embed');

class Video extends BlockEmbed {
    static create(value) {
        let node = super.create(value);
        let iframe = document.createElement('iframe');

        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', true);
        iframe.setAttribute('src', value);
        node.appendChild(iframe);

        return node;
    }

    static value(domNode) {
        return domNode.firstChild.getAttribute('src');
    }
}

Video.blotName = 'video';
Video.className = 'iframe-wrap';
Video.tagName = 'div';

export default Video;
