<template src="./template.html"></template>

<script lang="ts" setup>
export type itemType = string | number | undefined | null | Record<string, any>;



export interface Props {
    disabled?: boolean; dense?: boolean; readonly?: boolean; counter?: boolean; clearable?: boolean;
    labelInline?: boolean; detail?: string; outlined?: boolean; label?: string | number;
    modelValue?: itemType; placeholder?: string; suffix?: string; autocomplete?: string;
    prefix?: string; inputAlign?: string; color?: string; limit?: string | number;
    returnObject?: boolean
    detailErrors?: Array<string>; detailsOnMessageOnly?: boolean; type?: string; appendIcon?: string;
    labelMinWidth?: string; prependIcon?: string; rules?: Array<(param: any) => string | boolean>;
    cols?: string | number; xs?: string | number; sm?: string | number; md?: string | number;
    lg?: string | number; xl?: string | number;
    itemText?: string
    itemValue?: string
    items?: Array<any>
}

const emit = defineEmits<{
    (e: 'click:clear'): void, (e: 'focus', value: FocusEvent): void,
    (e: 'click:prepend'): void, (e: 'click:append'): void, (e: 'blur', value: Event): void,
    (e: 'update:modelValue', value: string | number): void
}>()

const props = withDefaults(defineProps<Props>(), { itemText: 'text', itemValue: 'value', inputAlign: 'start', color: 'primary' })
const opened = ref<boolean>(false)
const { fieldClass, dirty, inputStyle, id, focused, showClearable, showDetails, textColor,
    details, hasError, labelStyle, handleHover, handleBlur, handleClickPrependIcon,
    handleClickAppendIcon, handleFocus, setInputFocus, setLabelStyle } = useField()
const { gridClass } = useGrid('e-field')
const { isObject } = useUtils()

watch(() => opened.value, (val: boolean) => {
    if (val)
        document.addEventListener("keydown", handleExcListener);
    else
        document.removeEventListener("keydown", handleExcListener);
    setInputFocus()
})

const selectClass = computed(() => {
    const result = [...fieldClass.value, 'e-select', ...gridClass.value]
    opened.value && result.push('e-select--is-open')
    return result
})


const handleExcListener = ({ key }: KeyboardEvent): void => {
    if (key === "Escape") {
        closeMenu()
    }
}
const openMenu = (): void => {
    opened.value = true;
}

const closeMenu = (): void => {
    opened.value = false;
    focused.value = false;
}
const displayedText = (item: itemType): string => {
    return isObject(item) ? (item as Record<string, any>)[props.itemText] : item;
}
const changeValue = (value: any, isEvent = false) => {
    const valueResult = isEvent ? value.target.value : value
    emit('update:modelValue', valueResult)
}
const handleItemClick = (item: itemType): void => {
    if (props.returnObject || !isObject(item)) {
        changeValue(item);
    } else {
        changeValue((item as Record<string, any>)[props.itemValue]);

    }
}

const active = (item: itemType): boolean => {
    if (!isObject(item)) {
        return item === props.modelValue;
    } else if (props.returnObject) {
        return JSON.stringify(item) === JSON.stringify(props.modelValue);
    } else {
        return (item as Record<string, any>)[props.itemText] === props.modelValue;
    }
}

const selectedText = computed((): string => {
    if (props.modelValue === null || props.modelValue === undefined) {
        return '';
    }
    let result = ''
    if (!isObject((props.items?.[0] as string) || {})) {
        result = `${props.modelValue}`;
    } else if (props.returnObject) {
        const item = (props.items || []).find(
            (e) =>
                (e as Record<string, any>)[props.itemValue] ===
                (props.modelValue as Record<string, any>)[props.itemValue]
        ) as Record<string, string>;
        result = item?.[props.itemText];
    } else {
        const item = (props.items || []).find(
            (e) => (e as Record<string, string>)?.[props.itemValue] === props.itemValue
        ) as Record<string, string>;
        result = item?.[props.itemText] || '';
    }
    return result
})


const selectionStyle = computed((): Record<string, string> => {
    return { textAlign: props.inputAlign }
}
)
const clear = (): void => {
    changeValue('')
}

const handleOutsideMenu = (): void => {
    dirty.value = true;
    closeMenu()
}

const handleSelectSlotCLick = (evt: Event): void => {
    evt.stopPropagation()
    openMenu()
}
</script>
<style lang="scss" src="./style.scss"></style>