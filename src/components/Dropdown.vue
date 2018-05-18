<template>
    <div class="dropdown" :class="{ 'is-active': isActive }">
        <div ref="trigger" class="dropdown-trigger" @click="$emit('open')">
            <a class="button is-secondary" @click="isActive = ! isActive">
                <slot name="label"></slot>

                <span class="icon is-small">
                    <icon icon="angle-down"></icon>
                </span>
            </a>
        </div>

        <div class="dropdown-menu" id="dropdown-menu">
            <div class="dropdown-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from '@fortawesome/vue-fontawesome';

    export default {
        components: {
            Icon
        },

        data() {
            return {
                isActive: false
            }
        },

        created() {
            document.addEventListener('click', this.hideDropdown);
        },

        destroyed() {
            document.removeEventListener('click', this.hideDropdown);
        },

        methods: {
            hideDropdown(e) {
                let el = this.$refs.trigger;
                let target = e.target;

                if (el !== target && ! el.contains(target)) {
                    this.isActive = false;
                }
            }
        }
    }
</script>
