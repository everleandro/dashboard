<template>
    <component :is="root" />
</template>

<script setup lang="ts">
import EMenuContainer from './container.vue'
import { ContainerMenuInterface } from '@/components/shared/menu/types'
import { createApp } from 'vue'
import { clickOutside } from '@/plugins/click-outside'
import { ripple } from '@/plugins/ripple'

export interface Props {
    disableMenu?: boolean
}

const props = defineProps<Props>()

const slots = useSlots()
const MenuReference = ref()
const ContainerReference = ref()
const ContainerUnmounted = ref(true)
const node = ref<HTMLElement | null>(null)
const attrs = useAttrs()

const container = () => (ContainerReference.value || { openMenu: () => { } }) as ContainerMenuClass
const root: VNode = h(() => slots.activator?.({ onClick: openMenu, ref: MenuReference, 'aria-hasmenu': true }))

onMounted(() => {
    createMenu()
})

onUnmounted(() => {
    console.log(' container()', container())
    container().destroyComponent()
    node.value?.remove()
})

const createMenu = () => {
    if (ContainerUnmounted.value) {
        const containerComponent = createApp(defineComponent({
            extends: EMenuContainer,
            setup() {
                return () => h(EMenuContainer, { ref: ContainerReference, target: MenuReference.value.$el, ...attrs }, { default: () => slots?.default?.() })
            }
        }), { target: MenuReference.value.$el })

        node.value = document.createElement('div');
        document.body.appendChild(node.value);

        containerComponent.directive('click-outside', clickOutside)
        containerComponent.directive('ripple', ripple)
        containerComponent.mount(node.value)
    }
    ContainerUnmounted.value = false
}

const openMenu = (evt: Event) => {
    evt.stopPropagation()
    evt.preventDefault()
    if (!props.disableMenu) {
        createMenu();
        nextTick(() => {
            container().openMenu()
        })
    }
}

</script>
<style lang="scss" src="./style.scss"></style>

