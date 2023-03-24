
export type IconPath = string | Record<string, string>
export type IconClassKeys = 'XSmall' | 'small' | 'large' | 'XLarge' | 'disabled'
export interface IconItem {
    name: string
    description?: string
    useLocation?: string
}