
import { SlotEvent } from "~~/components/shared/schedule/types";
export default class Session implements SlotEvent {
    start!: Date | string
    name!: string
    end!: Date | string
    id?: number | string | null
    color: string = 'primary'
    spaceId: number | string
    roles?: Array<string | number> = []
    user?: string | number | null

    constructor(props?: { start?: Date | string, end?: Date | string, name?: string, spaceId: string | number, id?: number | string, user?: string | number }) {
        this.start = new Date(props?.start || new Date());
        this.end = new Date(props?.end || new Date());
        this.name = props?.name || ''
        this.spaceId = props?.spaceId || ''
        this.id = props?.id || null
        this.user = props?.user || null
    }

}