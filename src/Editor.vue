<template>
    <div ref="bounds" class="editor">
        <div ref="toolbar" class="toolbar">
            <div class="field">
                <div class="control">
                    <editor-dropdown class="is-wide">
                        <span slot="label">{{ selectedDropdownItem(toolbar.headers, getFormat('header')).label }}</span>

                        <div class="content">
                            <a class="dropdown-item"
                                :class="{ 'is-active': getFormat('header') === option.value }"
                                :key="option.value"
                                v-for="option in toolbar.headers"
                                @click="applyFormat('header', option.value)">
                                <component :is="option.element || 'span'" class="mb-0">
                                    {{ option.label }}
                                </component>
                            </a>
                        </div>
                    </editor-dropdown>
                </div>

                <div class="control">
                    <editor-dropdown @open="setSelection()">
                        <span slot="label" class="icon is-small">
                            <icon icon="paragraph"></icon>
                        </span>

                        <a class="dropdown-item"
                            :class="{ 'is-active': hasFormat('button') }"
                            @click="addButton()">
                            Button
                        </a>

                        <a class="dropdown-item"
                            :class="{ 'is-active': getFormat('style') === 'title' }"
                            @click="toggleFormat('style', 'title')">
                            <span class="title mb-0">Title</span>
                        </a>

                        <a class="dropdown-item"
                            :class="{ 'is-active': getFormat('style') === 'subtitle' }"
                            @click="toggleFormat('style', 'subtitle')">
                            <span class="subtitle mb-0">Subtitle</span>
                        </a>
                    </editor-dropdown>
                </div>

                <div class="control">
                    <a class="button" :class="{ 'is-active': hasFormat('bold') }" @click="toggleFormat('bold')">
                        <span class="icon is-small">
                            <icon icon="bold"></icon>
                        </span>
                    </a>
                </div>

                <div class="control">
                    <a class="button" :class="{ 'is-active': hasFormat('italic') }" @click="toggleFormat('italic')">
                        <span class="icon is-small">
                            <icon icon="italic"></icon>
                        </span>
                    </a>
                </div>

                <div class="control">
                    <a class="button" :class="{ 'is-active': hasFormat('underline') }" @click="toggleFormat('underline')">
                        <span class="icon is-small">
                            <icon icon="underline"></icon>
                        </span>
                    </a>
                </div>

                <div class="control">
                    <a class="button" :class="{ 'is-active': hasFormat('blockquote') }" @click="toggleFormat('blockquote')">
                        <span class="icon is-small">
                            <icon icon="quote-right"></icon>
                        </span>
                    </a>
                </div>

                <div class="control">
                    <editor-dropdown>
                        <span slot="label" class="icon is-small">
                            <icon :icon="selectedDropdownItem(toolbar.align, getFormat('align')).icon"></icon>
                        </span>

                        <a class="dropdown-item"
                            :title="option.label"
                            :class="{ 'is-active': getFormat('align') === option.value }"
                            :key="option.value"
                            v-for="option in toolbar.align"
                            @click="applyFormat('align', option.value)">
                            <span class="icon">
                                <icon :icon="option.icon"></icon>
                            </span>
                        </a>
                    </editor-dropdown>
                </div>

                <div class="control">
                    <a class="button" :class="{ 'is-active': getFormat('list') === 'bullet' }" @click="toggleFormat('list', 'bullet')">
                        <span class="icon is-small">
                            <icon icon="list-ul"></icon>
                        </span>
                    </a>
                </div>

                <div class="control">
                    <a class="button" :class="{ 'is-active': getFormat('list') === 'ordered' }" @click="toggleFormat('list', 'ordered')">
                        <span class="icon is-small">
                            <icon icon="list-ol"></icon>
                        </span>
                    </a>
                </div>

                <div class="control">
                    <a class="button" :class="{ 'is-active': hasFormat('link') }" @click="addLink()">
                        <span class="icon is-small">
                            <icon icon="link"></icon>
                        </span>
                    </a>
                </div>

                <!-- <div class="control">
                    <a class="button">
                        <span class="icon is-small">
                            <i class="fa fa-picture-o"></i>
                        </span>
                    </a>
                </div> -->

                <!-- <div class="control">
                    <a class="button" :class="{ 'is-active': selection.format.embed }" @click="embed">
                        <span class="icon is-small">
                            <i class="fa fa-film"></i>
                        </span>
                    </a>
                </div> -->
            </div>
        </div>

        <div class="editor-scroll">
            <div ref="editor" class="content"></div>
        </div>
    </div>
</template>

<script>
    import EditorDropdown from './components/Dropdown';
    import editor from './mixins/editor';

    export default {
        components: { EditorDropdown },

        mixins: [ editor ],

        data() {
            return {
                selection: null
            }
        },

        methods: {
            insertMedia() {
                // Open Media Manger
                // Listen for input
                // Use image url to embed

                // this.quill.insertEmbed(0, 'image', 'http://via.placeholder.com/350x100.png');
            },

            addLink() {
                let range = this.quill.getSelection();

                if (range && range.length) {
                    this.tooltip.edit('link');
                }
            },

            addButton() {
                if (this.selection && this.selection.length) {
                    this.tooltip.edit('button');
                }
            },

            setSelection() {
                this.selection = this.quill.getSelection();
            },

            selectedDropdownItem(options, value) {
                return options.find(option => option.value === value);
            }
        }
    }
</script>
