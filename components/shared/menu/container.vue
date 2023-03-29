
<template>
    <div ref="ContainerReference" class="e-menu-container" v-click-outside="handleOutside" :style="menuContentStyle"
        @click="handleContentClick">
        <transition :name="transition">
            <div v-show="opened" class="e-menu-container__wrapper">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
export default {
    name: 'EMenuContainer'
}
</script>
<script setup lang="ts">

export interface Props {
    absolute?: boolean
    closeOnContentClick?: boolean
    fullWidth?: boolean
    holdFocus?: boolean
    disableMenu?: boolean
    transition?: string
    origin?: string
    maxWidth?: string | number
    width?: string | number
    target: HTMLElement
}

const props = withDefaults(defineProps<Props>(), { transition: 'fade', origin: 'bottom left' })
const opened = ref(false)
const timerResize = ref<number>(0);
const ContainerReference = ref(null)
const menuContentStyle: Ref<Record<string, string | number>> = ref({
    top: 0
});


watch(() => opened.value, (value: boolean) => {
    value ? document.addEventListener('keydown', handleExcListener) : document.removeEventListener('keydown', handleExcListener);
});

onMounted(() => {
    updatemenuContentStyle();
    window.addEventListener('resize', handleResize, true);
})

const closeMenu = (): boolean => opened.value = false

const handleContentClick = (): boolean => props.closeOnContentClick && closeMenu()

const handleExcListener = ({ key }: KeyboardEvent): boolean => key === 'Escape' && closeMenu()

const targetDOMRect = (): DOMRect => props.target?.getBoundingClientRect() || {}

const destroyComponent = (): void => {
    document.removeEventListener('keydown', handleExcListener);
    window.removeEventListener('resize', handleResize);
}

const openMenu = async () => {
    updatemenuContentStyle();
    await nextTick();
    opened.value = true;
}

const handleResize = (): void => {
    opened.value && closeMenu();
    timerResize.value && clearTimeout(timerResize.value)

    timerResize.value = window.setTimeout(() => {
        updatemenuContentStyle();
    }, 300);
}

const handleOutside = (evt: MouseEvent) => {
    const triggerContainer: HTMLElement =
        (evt.target as HTMLElement).closest('[aria-hasmenu="true"]') ||
        document.createElement('div');

    if (!triggerContainer.isEqualNode(props.target))
        closeMenu();
}


const updatemenuContentStyle = (): void => {
    nextTick(() => {
        const { width, top, left, height, right } = targetDOMRect();
        const result: Record<string, string | number> = {}

        if (props.fullWidth) {
            result.minWidth = `${width}px`;
            result.maxWidth = `${width}px`;
        }

        const origin = props.origin.split(' ');

        let y = top + window.pageYOffset;
        origin.find((position: string) => position == 'bottom') && (y += height)

        let x = left + window.pageXOffset;
        if (origin.find((position: string) => position == 'right')) {
            x += width;
            result.transform = 'translateX(-100%)';
        }

        result.top = `${y}px`;
        result.left = `${x}px`;

        props.maxWidth && (result.maxWidth = props.maxWidth);
        props.width && (result.width = `${props.width}px`);
        menuContentStyle.value = result
    });
}


defineExpose({ openMenu, destroyComponent })

</script>
