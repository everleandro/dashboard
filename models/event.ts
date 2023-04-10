
import { ScheduleEvent } from "~~/components/shared/schedule/types";
export default class Event implements ScheduleEvent {
    name: string
    entityId: number | string
    start: Date | string
    end: Date | string
    color: string = 'primary'
    id?: number | string | null
    roles?: Array<string | number> = []
    user?: string | number | null
    footer?: string | number | null;
    subtitle?: string | number | null;

    constructor(props?: {
        start?: Date | string, end?: Date | string, roles?: Array<string | number>,
        color?: string, name?: string, entityId: string | number, id?: number | string, user?: string | number
    }) {
        this.start = new Date(props?.start || new Date());
        this.end = new Date(props?.end || new Date());
        this.name = props?.name || ''
        this.entityId = props?.entityId || ''
        this.id = props?.id || null
        if (props?.color) (this.color = props?.color)
        if (props?.roles) (this.roles = props?.roles)
        this.user = props?.user || null
    }
}