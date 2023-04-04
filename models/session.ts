
import { SlotEvent } from "~~/components/shared/schedule/types";
export default class Session implements SlotEvent {
    start!: Date | string
    name!: string
    end!: Date | string
    id?: number | string = 0
    color: string = 'primary'
    spaceId: number | string = -1
    roles?: Array<string | number> = []
    user?: string | number

    constructor(props?: { start?: Date | string, end?: Date | string, name?: string, spaceId: string | number, id?: number | string, user?: string | number }) {
        this.start = new Date(props?.start || new Date());
        this.end = new Date(props?.end || new Date());
        this.name = props?.name || ''
        this.spaceId = props?.spaceId || ''
        this.id = props?.id || 0
        this.user = props?.user || 0
    }

}