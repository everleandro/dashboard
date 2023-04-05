
<template >
    <div :class="selectClass">
        <div class="e-field__control" v-click-outside="handleOutsideMenu">
            <div role="button" aria-expanded="false" class="e-field__slot">
                <div v-if="prependIcon" class="e-field__prepend-inner" @click="handleClickPrependIcon">
                    <div class="e-field__icon e-field__icon--prepend-inner">
                        <EIcon :name="prependIcon" />
                    </div>
                </div>
                <div class="e-field__overlay"></div>
                <div class="e-select__slot e-field__field" @click="handleSelectSlotCLick" @mouseenter="handleHover(true)"
                    @mouseleave="handleHover(false)">
                    <label :for="id" :class="[textColor, 'e-label']" :style="labelStyle">
                        <slot name="label"> {{ label }}</slot>
                    </label>
                    <div v-if="prefix" :class="[textColor, 'e-field__prefix']" @click="setInputFocus">
                        {{ prefix }}
                    </div>
                    <div :class="['e-select__selections', textColor]">
                        <div v-if="showPlaceholder" class="e-select__selection" :style="selectionStyle">
                            <span class="e-select__selection-placeholder">
                                {{ placeholder }}
                            </span>
                        </div>
                        <template v-else-if="multiple">
                            <div v-for="(item, index) in modelValue" class="e-select__selection" :key="index"
                                :style="selectionStyle">
                                <EChip closable @click:close="handleItemClick(item)"> {{ selectedText(item) }}</EChip>
                            </div>
                        </template>
                        <div v-else class="e-select__selection" :style="selectionStyle">
                            {{ selectedText() }}
                        </div>
                    </div>
                    <input :id="id" readonly type="text" aria-readonly="false" autocomplete="off" @blur="handleBlur"
                        @focus="handleSelectFocus" />
                    <div v-if="suffix" :class="[textColor, 'e-field__suffix']" @click="setInputFocus">
                        {{ suffix }}
                    </div>
                    <transition name="scale">
                        <div v-show="showClearable" class="e-field__append-inner">
                            <div class="e-field__icon e-field__icon--clear e-icon--size-default">
                                <EButton :icon="$icon.clear" small @click.stop.prevent="clear" />
                            </div>
                        </div>
                    </transition>
                    <div class="e-field__append-inner">
                        <div class="e-field__icon e-field__icon--append">
                            <EIcon :name="arrowDown || $icon?.arrowDown" class="flip-icon"></EIcon>
                        </div>
                    </div>
                </div>

                <div v-if="appendIcon" class="e-field__append-inner" @click="handleClickAppendIcon">
                    <div class="e-field__icon e-field__icon--append">
                        <EIcon :name="appendIcon" />
                    </div>
                </div>
                <div v-if="!outlined" class="e-field__line"></div>
                <div class="e-menu">
                    <transition name="fade">
                        <div v-show="opened" class="e-menu__content">
                            <e-list :color="color" :style="listStyle">
                                <template v-for="(item, index) in items">
                                    <slot name="item" :attrs="slotItemAttrs(item, index)" :item="item">
                                        <e-list-item :class="{ 'e-list-item--active': active(item) }"
                                            @click="handleItemClick(item)" :key="index">
                                            <slot name="item-text">
                                                {{ displayedText(item) }}
                                            </slot>
                                        </e-list-item>
                                    </slot>
                                </template>

                            </e-list>
                        </div>
                    </transition>
                </div>
            </div>
            <EDetails :details="details" :textColor="textColor" :showDetails="showDetails"></EDetails>
        </div>
    </div>
</template>

<script lang="ts">
export default { name: "Select" }
</script>
<script lang="ts" setup>

export type itemType = string | number | null | Record<string, any> | Array<itemType>;
export interface Props {
    arrowDown?: string; multiple?: boolean, returnObject?: boolean; retainColor?: boolean;
    disabled?: boolean; dense?: boolean; readonly?: boolean; clearable?: boolean; itemCol?: string | number;
    labelInline?: boolean; detail?: string; outlined?: boolean; label?: string | number;
    modelValue?: itemType; placeholder?: string; suffix?: string; autocomplete?: string;
    prefix?: string; inputAlign?: string; color?: string; limit?: string | number;
    detailErrors?: Array<string>; detailsOnMessageOnly?: boolean; type?: string; appendIcon?: string;
    labelMinWidth?: string; prependIcon?: string; rules?: Array<(param: any) => string | boolean>;
    cols?: string | number; xs?: string | number; sm?: string | number; md?: string | number;
    lg?: string | number; xl?: string | number;
    itemText?: string
    itemValue?: string
    items: Array<any>
}

const { $icon } = useNuxtApp() || {}
const emit = defineEmits<{
    (e: 'click:clear'): void, (e: 'focus', value: FocusEvent): void,
    (e: 'click:prepend'): void, (e: 'click:append'): void, (e: 'blur', value: Event): void,
    (e: 'update:modelValue', value: itemType): void
}>()

const props = withDefaults(defineProps<Props>(), { itemText: 'text', itemValue: 'value', inputAlign: 'start' })
const opened = ref<boolean>(false)
const { fieldClass, dirty, id, focused, showClearable, showDetails, textColor, color,
    details, labelStyle, handleHover, handleBlur, handleClickPrependIcon,
    handleClickAppendIcon, handleFocus, setInputFocus } = useField()
const { gridClass } = useGrid('e-field')
const { isObject } = useUtils()

watch(() => opened.value, (val: boolean) => {
    if (val) {
        document.addEventListener("keydown", handleExcListener);
        setInputFocus()
    }
    else
        document.removeEventListener("keydown", handleExcListener);

})

watch(() => props.modelValue, (val: itemType) => {
    if (!props.multiple) {
        closeMenu()
    }
})

const selectClass = computed(() => {
    const result = [...fieldClass.value, 'e-select', ...gridClass.value]
    opened.value && result.push('e-select--is-open')
    props.itemCol && result.push('e-select--columns-variant')
    props.multiple && result.push('e-select--multiple')
    return result
})


const handleExcListener = ({ key }: KeyboardEvent): void => {
    if (key === "Escape") {
        closeMenu()
    }
}

const handleSelectFocus = (event: FocusEvent): void => {
    opened.value = true;
    handleFocus(event)
}

const openMenu = (): void => {
    opened.value = true;
}
const showPlaceholder = computed((): boolean => {
    if (props.multiple) {
        return (props.modelValue as Array<itemType>)?.length === 0
    }
    return props.modelValue === undefined || props.modelValue === null
})
const slotItemAttrs = (item: itemType, index: number): Record<string, any> => {
    const attrs: Record<string, any> = {}
    attrs.class = { 'e-list-item--active': active(item) }
    attrs.onClick = () => handleItemClick(item)
    attrs.key = index

    return attrs;
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
    if (props.multiple) {
        const result: Array<itemType> = [...(props.modelValue as Array<itemType>)]

        let index = -1;
        if (isObject(item)) {
            if (props.returnObject) {
                index = result.findIndex((e) => JSON.stringify(e) === JSON.stringify(item));
            } else {
                index = result.findIndex(
                    (e) => (e as Record<string, string>)?.[props.itemValue] === (item as Record<string, string>)[props.itemValue]
                );
            }
        } else {
            index = result.findIndex((e) => e === item);
        }

        index < 0 ? result.push(item) : result.splice(index, 1)
        changeValue(result);

    } else if (props.returnObject || !isObject(item)) {
        changeValue(item);
    } else {
        changeValue((item as Record<string, any>)[props.itemValue]);
    }
}

const active = (item: itemType): boolean => {
    if (props.multiple) {
        const model: Array<itemType> = [...(props.modelValue as Array<itemType>)]

        let index = -1;
        if (isObject(item)) {
            if (props.returnObject) {
                index = model.findIndex((e) => JSON.stringify(e) === JSON.stringify(item));
            } else {
                index = model.findIndex(
                    (e) => (e as Record<string, string>)?.[props.itemValue] === (item as Record<string, string>)[props.itemValue]
                );
            }
        } else {
            index = model.findIndex((e) => e === item);
        }
        return index !== -1;

    } else if (!isObject(item)) {
        return item === props.modelValue;
    } else if (props.returnObject) {
        return JSON.stringify(item) === JSON.stringify(props.modelValue);
    } else {
        return (item as Record<string, any>)[props.itemValue] === props.modelValue;
    }
}

const selectedText = (_item?: itemType): string => {

    if (showPlaceholder.value) {
        return '';
    }

    const isArrayOfObjects = isObject(props.items[0]);

    if (props.returnObject) {
        const item = (_item || props.modelValue || {}) as Record<string, string>
        return `${item[props.itemText]}`
    }

    if (isArrayOfObjects) {
        if (_item) {
            return `${(_item as Record<string, any>)[props.itemText]}`
        }
        const item = props.items.find(
            (e) => (e as Record<string, string>)?.[props.itemValue] === props.modelValue
        );

        return item?.[props.itemText] || '';
    }

    return _item ? `${_item}` : `${props.modelValue}`

}

const selectionStyle = computed((): Record<string, string> => {
    return { textAlign: props.inputAlign }
})

const listStyle = computed((): Record<string, string> => {
    const percent = (1 / parseInt(`${props.itemCol}`, 10) * 100)
    return { '--list-item-percent': `${percent}%` }
})

const clear = (): void => {
    changeValue('')
}

const handleOutsideMenu = (): void => {
    if (opened.value) {
        dirty.value = true;
        closeMenu()
    }
}

const handleSelectSlotCLick = (evt: Event): void => {
    evt.stopPropagation()
    openMenu()
}
</script>
<style lang="scss" src="./style.scss"></style>