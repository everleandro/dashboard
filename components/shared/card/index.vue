<template>
    <div :class="cardClass" :style="cardStyle">
        <slot> </slot>
    </div>
</template>
<script lang="ts" setup>
export interface Props {
    height?: string
    depressed?: boolean
}
const props = defineProps<Props>()

const cardClass = computed(() => {
    const classes = ['e-card']
    props.depressed && classes.push('e-card--depressed')
    return classes
})

const cardStyle = computed((): Record<string, string> => {
    const result: Record<string, string> = {}
    props.height && (result.height = `${props.height}px`)
    return result;
})

</script>
<style lang="scss" src="./style.scss"></style>