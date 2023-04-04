export interface ContainerMenuInterface {
    openMenu: () => void
    closeMenu: () => void
    destroyComponent: () => void
    setConfiguration: (configuration: Record<string, any>) => void
}

export interface Menu {
    closeMenu: () => void
    openMenu: () => void
}

export type Target = HTMLElement | string | null

