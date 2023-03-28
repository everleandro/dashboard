
<template>
    <div :class="radioClass" @click="changeModelValue()">
        <div class="e-field--selection-controls__field">
            <span aria-hidden="true" class="e-icon" :class="radioColor"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" role="img" aria-hidden="true" class="e-icon__svg">
                    <path v-if="active"
                        d="M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z">
                    </path>
                    <path v-else
                        d="M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z">
                    </path>
                </svg>
            </span>
            <input :aria-checked="active" :id="id" tabindex="-1" role="radio" type="radio" :name="id" :value="modelValue" />
            <div :class="['e-field--selection-controls__ripple', radioColor]" tabindex="-1" @focus="handleFocus"
                @blur="handleBlur">
            </div>
        </div>
        <label :class="[textColor, 'e-label']" :for="id" :labelStyle="labelStyle">
            <slot name="label"> {{ label }} </slot>
        </label>
    </div>
</template>
<script lang="ts">
export default { name: 'Radio' }
</script>

<script lang="ts" setup>
import { radioType, RadioGroup } from "@/components/shared/form/types"


export interface Props {
    disabled?: boolean; readonly?: boolean; label?: string | number;
    modelValue: radioType; color?: string; labelMinWidth?: string;
}

const { fieldClass, id, textColor, labelStyle, setConfiguration, configuration } = useField(false)

const radioGroup = inject<Partial<RadioGroup> | undefined>("ERadioGroup", undefined);

const props = defineProps<Props>()

const radioClass = computed(() => [...fieldClass.value, 'e-radio'])

const radioColor = computed(() => {
    const color = props.color || configuration.color
    return textColor.value || color ? `${color}--text` : ''
})

const addSpaceListener = () => document.addEventListener('keyup', evt => (evt.code === 'Space') && changeModelValue())

const removeSpaceListener = () => document.removeEventListener('keyup', addSpaceListener)

const active = computed(() => radioGroup?.modelValue?.value === props.modelValue)

const changeModelValue = (): void => {
    radioGroup?.changeModelValue?.(props.modelValue)
}

const handleFocus = (evt: FocusEvent): void => {
    addSpaceListener()
    radioGroup?.handleFocus?.(evt)
}

const handleBlur = (evt: FocusEvent): void => {
    removeSpaceListener()
    radioGroup?.handleBlur?.(evt)
}

onUnmounted(() => {
    removeSpaceListener()
})
const uid = getCurrentInstance()?.uid;

onMounted(() => {
    radioGroup?.bindRadio?.({ uid: uid || -1, setConfiguration, modelValue: props.modelValue });
});


</script>