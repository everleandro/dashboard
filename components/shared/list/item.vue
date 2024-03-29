<template>
    <component :is="tagResult" v-ripple :active-class="activeClass" tabindex="0" role="option" aria-selected="true"
        :class="listItemCLass" @click="handleItemClick">
        <div v-if="hasPrepend" class="e-list-item__prepend">
            <slot name="prepend">
                <EIcon v-if="prependIcon" :name="prependIcon"></EIcon>
                <EAvatar v-if="prependAvatar" size="34" :src="prependAvatar"></EAvatar>
            </slot>
        </div>
        <div class="e-list-item__content">
            <slot></slot>
        </div>
    </component>
</template>
  
<script lang="ts" setup>

export interface Props {
    disabled?: boolean
    ripple?: boolean
    prependIcon?: string
    prependAvatar?: string
    isActive?: boolean
    activeClass?: string
    tag?: string
    color?: string
    value?: Record<string, any> | string | number
}

const props = defineProps<Props>()
const slots = useSlots()
const attrs = useAttrs()

const emit = defineEmits<{
    (e: 'click:item', value: MouseEvent): void
}>()
const availableRootClasses = {
    disabled: "e-list-item--disabled",
};

const isIntoItemGroup = (): boolean => {
    return false
    //   return getCurrentInstance()?.parent?.exposed as ComponentInternalInstance;
}

const active = (): boolean => {
    return props.isActive;
}

const listItemCLass = computed((): Array<string> => {
    const classes = ['e-list-item']
    props.color && classes.push(`${props.color}--text`)
    props.disabled && classes.push('"e-list-item--disabled"')
    typeLink() && classes.push('e-list-item--link')
    active() && classes.push('"e-list-item--active"')
    return classes;
})

const hasPrepend = computed((): boolean => {
    return !!slots.prepend || !!props.prependAvatar || !!props.prependIcon;
})

const tagResult = computed((): string => {
    if (props.tag)
        return props.tag
    return attrs.to ? "router-link" : "li"
});

const handleItemClick = (evt: MouseEvent): void => {
    emit('click:item', evt)
}

const typeLink = (): boolean => {
    return !!attrs.to || props.value !== undefined;
}
</script>
  