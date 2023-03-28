
export interface Field {
    setConfiguration: (value: Record<string, string>) => void
    uid: number
    dirty: boolean
    hasError: any
    validate: () => void
    reset: () => void
}

export interface Form {
    bindField: (component: Partial<Field>) => void
    unbindField: (uid: number) => void
    updateField: (component: Partial<Field>) => void
}
export type radioType = string | number | undefined | null;

export interface Radio {
    uid: number,
    modelValue: radioType,
    setConfiguration: (value: Record<string, string>) => void

}

export interface RadioGroup {
    bindRadio: (component: Partial<Radio>) => void
    unbindRadio: (uid: number) => void
    changeModelValue: (value: radioType) => void
    handleFocus: (value?: FocusEvent) => void
    handleBlur: (value?: Event) => void
    modelValue: ComputedRef<radioType>
}
