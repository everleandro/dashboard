<template>
    <div :class="avatarClass" :style="style">
        <slot>
            <EIcon v-if="icon" :name="icon"></EIcon>
            <img v-else :img="img" alt="avatar" />
        </slot>
    </div>
</template>
<script lang="ts" setup>

export interface Props {
    color?: string
    icon?: string
    img?: string
    size?: string | number
}

const props = withDefaults(defineProps<Props>(), { size: '65' })

const avatarClass = computed(() => {
    const classes = ['e-avatar']
    props.color && classes.push(props.color)
    return classes
})

const style = computed(() => {
    return { height: `${props.size}px`, width: `${props.size}px` }
})

</script>

<style lang="scss">
.e-avatar {
    flex: none;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    line-height: normal;
    overflow: hidden;
    position: relative;
    text-align: center;
    transition: .2s cubic-bezier(.4, 0, .2, 1);
    transition-property: width, height;
    vertical-align: middle;
    border-radius: 50%;
}
</style>
