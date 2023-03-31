<template>
    <hr role="separator" :aria-orientation="orientation" :class="dividerClass" />
</template>
  
<script lang="ts" setup>
export interface Props {
    vertical?: boolean
}

const props = defineProps<Props>()

const dividerClass = computed(() => {
    const classes = ['e-divider']
    return classes
})
const orientation = computed(() => props.vertical ? 'vertical' : 'horizontal')


</script>
<style lang="scss" src="./style.scss"></style>
  