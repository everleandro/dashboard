
<template src="./template.html"></template>
<script lang="ts" setup>

export interface Props {
    fullscreen?: boolean
    modelValue?: boolean
    persistent?: boolean
    maxWidth?: string | number
}

const availableRootClasses = {
    fullscreen: "e-dialog--fullscreen",
    animated: "e-dialog--animated",
    active: "e-dialog--active",
    persistent: "e-dialog--persistant",
};

const props = defineProps<Props>()
const store = reactive({
    animated: false,
    active: false
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

watch(() => props.modelValue, (value) => {
    if (value) {
        document.addEventListener("keydown", handleExcListener);
    } else {
        document.removeEventListener("keydown", handleExcListener);
    }
    store.active = value
})


const dialogClass = computed(() => {
    const classes = ['e-dialog']
    props.fullscreen && classes.push(availableRootClasses.fullscreen)
    store.active && classes.push(availableRootClasses.active)
    store.animated && classes.push(availableRootClasses.animated)
    return classes
})


onMounted(() => store.active = props.modelValue)


const handleExcListener = ({ key }: KeyboardEvent): void => {
    if (key === "Escape") {
        close();
    }
}
const changeValue = (value: boolean) => {
    emit('update:modelValue', value)
}

const style = computed((): { maxWidth?: string } => {
    const maxWidth =
        props.maxWidth && !props.fullscreen
            ? { maxWidth: `${props.maxWidth}px` }
            : {};
    return { ...maxWidth };
})

const close = (force = false): void => {
    if (!force && props.persistent) {
        store.animated = true;
        setTimeout((): void => {
            store.animated = false;
        }, 200);
    } else {
        changeValue(false)
    }
}

provide("EDialog", {
    close
});
</script>
<style lang="scss" src="./style.scss"></style>