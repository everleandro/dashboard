
export interface Field {
    setLabelStyle: (value: Record<string, string>) => void
    uid: number
    dirty: boolean
    hasError: any
    validate: () => void
    reset: () => void
}

export interface Form {
    bindField: (component: Field) => void
    unbindField: (uid: number) => void
    updateField: (component: Field) => void
}
