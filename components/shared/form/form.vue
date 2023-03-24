<template>
    <form ref="form" :class="formClass">
        <slot></slot>
    </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "EForm"
})
</script>
  
<script lang="ts" setup>
import { Field } from '@/components/shared/form/types';

export interface Props {
    modelValue?: boolean | undefined
    lazy?: boolean
    noGutters?: boolean
    outlined?: boolean
    disabled?: boolean
    labelMinWidth?: string
}
const props = withDefaults(defineProps<Props>(), { modelValue: undefined })
const localValue = ref(true)
const form = ref()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const state = reactive({
    fieldsChild: new Array<Partial<Field>>(),
    fieldsChildError: new Array<boolean>(),
    localValue: true
});

const formClass = computed(() => {
    const result: Array<string> = ['e-form', 'e-row']
    props.noGutters && result.push('no-gutters')
    props.outlined && result.push('e-form--outlined')
    props.disabled && result.push('e-form--disabled')
    return result
})

watch(() => state.fieldsChildError, (val: Array<boolean>) => changeValue(!val.find((e) => e)))

onMounted(() => {
    setLabelStyle()
})

const bindField = (component: Field) => {
    state.fieldsChild.push(component);
    state.fieldsChildError.push(false);
}

const unbindField = (uid: number) => {
    const index = state.fieldsChild.findIndex((c) => c.uid === uid);
    if (index > -1) {
        state.fieldsChild.splice(index, 1);
        state.fieldsChildError.splice(index, 1);
    }
}

const updateField = (component: Field) => {
    const index = state.fieldsChild.findIndex((c) => c.uid === component.uid);
    if (index > -1) {
        state.fieldsChildError.splice(index, 1, component.hasError)
    }
}

provide("EForm", {
    bindField,
    unbindField,
    updateField
});

const changeValue = (value: boolean): void => {
    localValue.value = value;
    emit('update:modelValue', value)
}

const reset = (): void => {
    state.fieldsChild.forEach((vueComponent) => {
        vueComponent.reset?.();
    });
}

const setLabelStyle = (): void => {
    if (props.labelMinWidth)
        state.fieldsChild.forEach((vueComponent) => {
            vueComponent.setLabelStyle?.({ minWidth: `${props.labelMinWidth}px` });
        });
}

const validate = (): boolean => {
    state.fieldsChild.forEach((vueComponent, index) => {
        vueComponent.validate?.();
    });
    return (
        (form.value.querySelectorAll('.e-field--has-error') || []).length === 0
    );
}

defineExpose({ validate, reset })

</script>
<style lang="scss" src="./style.scss"></style>