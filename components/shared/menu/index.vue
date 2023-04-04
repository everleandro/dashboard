<template>
    <component :is="root" />
</template>

<script lang="ts">
export default {
    name: 'EMenu'
}
</script>
<script setup lang="ts">
import EMenuContainer from './container.vue'
import { ContainerMenuInterface } from '@/components/shared/menu/types'
import { createApp } from 'vue'
import { clickOutside } from '@/plugins/click-outside'
import { ripple } from '@/plugins/ripple'
import { Target } from "./types"

export interface Props {
    absolute?: boolean
    closeOnContentClick?: boolean
    fullWidth?: boolean
    activator?: Target
    holdFocus?: boolean
    disableMenu?: boolean
    checkOffset?: boolean
    transition?: string
    origin?: string
    maxWidth?: string | number
    width?: string | number
}

const id = `${Math.floor(Math.random() * 999999)}-e-menu`
const props = withDefaults(defineProps<Props>(), { origin: 'bottom left', transition: 'fade' })
const slots = useSlots()
const MenuReference = ref()
const ContainerReference = ref()
const ContainerUnmounted = ref(true)
const node = ref<HTMLElement | null>(null)
const attrs = useAttrs()

const container = () => (ContainerReference.value || { openMenu: () => { }, setConfiguration: () => { } }) as ContainerMenuInterface
const root: VNode = h(() => slots.activator?.({ onClick: openMenu, ref: MenuReference, 'aria-hasmenu': true }))

onMounted(() => createMenu())

onUpdated(() => activatorBehavior())

onUnmounted(() => {
    container()?.destroyComponent?.()
    node.value?.remove()
})

const createMenu = async (): Promise<void> => {
    if (ContainerUnmounted.value) {
        const containerComponent = createApp(defineComponent({
            extends: EMenuContainer,
            setup() {
                return () => h(EMenuContainer, { ref: ContainerReference }, { default: () => slots?.default?.() })
            }
        }), {})

        node.value = document.createElement('div');
        document.body.appendChild(node.value);

        containerComponent.directive('click-outside', clickOutside)
        containerComponent.directive('ripple', ripple)
        // target: MenuReference.value?.$el

        containerComponent.mount(node.value)
    }

    await activatorBehavior();
    ContainerUnmounted.value = false
}

const openMenu = async (evt?: Event) => {
    evt?.stopPropagation()
    evt?.preventDefault()
    if (!props.disableMenu) {
        await createMenu();
        container().openMenu()
    }
}
const closeMenu = () => container().closeMenu()

const activator = (): HTMLElement => {
    if (typeof props.activator === 'string') {
        return (document.querySelector(props.activator) || document.createElement('div')) as HTMLElement
    } else {
        return props.activator as HTMLElement
    }
}

const activatorClick = (evt: Event): void => {
    evt.stopPropagation();
    if (!props.disableMenu) {
        openMenu();
    }
}

const activatorBehavior = async (): Promise<void> => {
    await nextTick()

    let target = MenuReference.value?.$el;
    if (props.activator) {
        activator()?.addEventListener('click', activatorClick)
        activator()?.setAttribute('aria-hasmenu', 'true')
        target = activator()
    }

    const child = target?.closest('.e-menu-container__wrapper')?.getAttribute('data-id')
    const dataId = child ? `${child}--child` : id

    container().setConfiguration({ ...props, attrs: attrs, target, dataId })

}

defineExpose({ openMenu, closeMenu })


</script>
<style lang="scss" src="./style.scss"></style>

