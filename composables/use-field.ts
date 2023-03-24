
import { fieldClasses, classKey } from "@/components/shared/form/constants"
import { getCurrentInstance } from 'vue'
export default function () {

    const props = ref(getCurrentInstance()?.props)
    const dirty = ref(false)
    const hovered = ref(false)
    const localLabelStyle = ref({})
    const focused = ref(false)
    const input = ref<HTMLInputElement>()
    const id = `${Math.floor(Math.random() * 999999)}-input`;

    const fieldClass = computed((): Array<string> => {
        const keys = Object.keys(fieldClasses)
        const result = keys.filter(
            key => !!props?.value?.[key]
        ).map(
            (key) => fieldClasses[key as classKey]
        );
        result.push(textColor.value)
        hasError.value && result.push(fieldClasses.hasError)
        hovered.value && result.push(fieldClasses.hovered)
        focused.value && result.push(fieldClasses.focused)
        return [...result, 'e-field']
    })

    const labelStyle = computed((): Record<string, string> => {
        return props.value?.labelMinWidth
            ? { ...localLabelStyle.value, minWidth: `${props.value.labelMinWidth}px` }
            : { ...localLabelStyle.value };
    })

    const details = computed((): string => {
        const errorFromProps: Array<string> = (props.value?.detailErrors || []) as Array<string>
        const errorFromRule: string = errorMessage.value as string
        return hasError.value
            ? errorFromProps[0] || errorFromRule
            : (props.value?.detail as string);
    })
    const errorMessage = computed((): string | boolean => {
        const rules = (props.value?.rules || []) as Array<(val: any) => string | true>
        const _function = rules.find((rule: (param: any) => string | true) => rule(props.value?.modelValue) !== true);
        return _function?.(props.value?.modelValue) || "";
    })

    const hasError: ComputedRef<boolean> = computed((): boolean => {
        const errorFromProps: Array<string> = (props.value?.detailErrors || []) as Array<string>
        const result = !!(dirty.value && errorMessage.value) || !!errorFromProps[0];
        form?.updateField({ hasError: result, uid: uid || -1 });
        return result;
    })

    const showDetails = computed((): boolean => {
        return !!details.value
    })

    const showClearable = computed((): boolean => {
        const clearable: boolean = props.value?.clearable as boolean
        return clearable && `${props.value?.modelValue || ''}`.length > 0;
    })

    const color = computed((): string => {
        let result = (props.value?.color || '') as string;
        (props.value?.disabled) && (result = 'disabled');
        (dirty.value && errorMessage.value) && (result = 'error');
        return result
    })

    const inputStyle = computed((): Record<string, string> => {
        return { textAlign: props.value?.inputAlign as string };
    })

    const textColor = computed((): string => {
        if (hasError.value) return 'error--text';
        return (hovered.value || focused.value) ? `${color.value}--text` : '';
    })

    watch(() => props.value?.modelValue, () => dirty.value = true)

    const handleClickPrependIcon = (event: FocusEvent): void => {
        getCurrentInstance()?.emit('click:prepend', event)
        setInputFocus(event);
    }

    const handleHover = (value: boolean): boolean => hovered.value = value

    const setInputFocus = (event?: FocusEvent): void => {
        focused.value = true;
        input.value?.focus();
        getCurrentInstance()?.emit('focus', event)
    }

    const handleClickAppendIcon = (event: FocusEvent): void => {
        getCurrentInstance()?.emit('click:append', event)
        setInputFocus(event);
    }

    const handleFocus = (event: FocusEvent): void => {
        focused.value = true;
        getCurrentInstance()?.emit('focus', event)
    }

    const handleBlur = (event: Event): void => {
        focused.value = false;
        dirty.value = true;
        getCurrentInstance()?.emit('blur', event)
    }
    const setLabelStyle = (value: Record<string, string>): void => {
        localLabelStyle.value = value
    }
    const form = inject<any>("EForm");
    const uid = getCurrentInstance()?.uid;

    const validate = () => {
        dirty.value = true
    }

    const reset = () => {
        dirty.value = false
    }

    onMounted(() => {
        form?.bindField({ validate, reset, uid: uid || -1, setLabelStyle });
    });

    return {
        fieldClass, id, dirty, focused, errorMessage, hasError, inputStyle,
        showClearable, showDetails, hovered, details, labelStyle, color,
        textColor, handleHover, setInputFocus, handleFocus, handleBlur,
        handleClickAppendIcon, handleClickPrependIcon, setLabelStyle,
    };
}