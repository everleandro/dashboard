
import { getCurrentInstance } from 'vue'
export default function () {
    const props = ref(getCurrentInstance()?.props)
    const isHexPropColor = computed(() => (props.value?.color as string)?.charAt?.(0) == '#')
    const isHex = (color: string) => color.charAt?.(0) == '#'
    const hexStyle = (color: string): Record<string, string> => {
        return isHex(color) ? { '--component-color': color } : { '--component-color': `var(--${color})` }
    }
    return { isHexPropColor, isHex, hexStyle }

}