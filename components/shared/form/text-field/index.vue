<template src="./template.html" />
<script lang="ts">
export default { name: 'TextField' }
</script>

<script setup lang="ts">

export interface Props {
    disabled?: boolean; dense?: boolean; readonly?: boolean; counter?: boolean; clearable?: boolean;
    labelInline?: boolean; detail?: string; outlined?: boolean; label?: string | number;
    modelValue?: string | number; placeholder?: string; suffix?: string; autocomplete?: string;
    prefix?: string; inputAlign?: string; color?: string; limit?: string | number;
    detailErrors?: Array<string>; detailsOnMessageOnly?: boolean; type?: string; appendIcon?: string;
    labelMinWidth?: string; prependIcon?: string; rules?: Array<(param: any) => string | boolean>;
    cols?: string | number; xs?: string | number; sm?: string | number; md?: string | number;
    lg?: string | number; xl?: string | number; inputReadonly?: boolean
}

const props = withDefaults(defineProps<Props>(), { inputAlign: 'start', type: 'text', color: 'primary' })


onUpdated(() => {

})



const emit = defineEmits<{
    (e: 'click:clear'): void, (e: 'focus', value: FocusEvent): void,
    (e: 'click:prepend'): void, (e: 'click:append'): void, (e: 'blur', value: Event): void,
    (e: 'update:modelValue', value: string | number): void
}>()

const { fieldClass, dirty, inputStyle, id, focused, showClearable, showDetails, textColor,
    details, hasError, labelStyle, handleHover, handleBlur, handleClickPrependIcon,
    handleClickAppendIcon, handleFocus, setInputFocus, setLabelStyle } = useField()

const { gridClass } = useGrid('e-field')
const textFieldClass = computed(() => [...fieldClass.value, 'e-text-field', ...gridClass.value])

const changeValue = (value: any, isEvent = false) => {
    const valueResult = isEvent ? value.target.value : value
    emit('update:modelValue', valueResult)
}

const clear = () => { changeValue(''); emit('click:clear') };

</script>
<style lang="scss" src="./style.scss"></style>