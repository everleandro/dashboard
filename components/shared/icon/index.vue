<template>
    <i ref="iconElement" v-cloak aria-hidden="true" :class="iconClass">
        <slot>
            <svg v-if="path" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" role="img" aria-hidden="true"
                class="e-icon__svg">
                <path v-for="(line, i) in path" v-bind="bindPathAttributes(line)" :key="i"></path>
            </svg>
        </slot>
    </i>
</template>
<script lang="ts" setup>
import { IconPath, IconClassKeys } from './types'

export interface Props {
    color?: string
    disabled?: boolean
    preffix?: string
    name?: string
    viewBox?: string,
    path?: Array<IconPath>
    small?: boolean
    XSmall?: boolean
    large?: boolean
    XLarge?: boolean
}

const props = withDefaults(defineProps<Props>(), { preffix: 'icon' })

const availableRootClasses = {
    XSmall: 'e-icon--size-x-small',
    small: 'e-icon--size-small',
    disabled: 'e-icon--disabled',
    large: 'e-icon--size-large',
    XLarge: 'e-icon--size-x-large'
};
const slots = useSlots()

const iconElement = ref(null)

const bindPathAttributes = (
    path: IconPath
): IconPath => {
    const d = typeof path === 'string' ? path : path?.d;
    let result: IconPath = { d };
    if (typeof path === 'object' && path?.fill) {
        result.class = `${path.fill}--text`;
    }
    return result;
}

const iconClass: ComputedRef<Array<string>> = computed((): Array<string> => {
    let classes = ['e-icon icon'];
    const defaultSize = !(props.small || props.XSmall || props.large || props.XLarge);
    defaultSize && classes.push("e-icon--size-default")
    props.name && classes.push(`${props.preffix.trim()}-${props.name.trim()}`);
    props.color && (classes.push(`${props.color}--text`));

    const availableRootClassKeys = Object.keys(availableRootClasses) as Array<IconClassKeys>
    const classes2 = availableRootClassKeys.filter(
        (key) => { !!props[key] }
    ).map(key => availableRootClasses[key]);

    return [...classes, ...classes2]
})

</script>
<style lang="scss" src="./style.scss"></style>
  