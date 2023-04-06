
import { ScheduleEvent } from "~~/components/shared/schedule/types";
export default class Session implements ScheduleEvent {
    name: string
    spaceId: number | string
    start: Date | string
    end: Date | string
    color: string = 'primary'
    id?: number | string | null
    roles?: Array<string | number> = []
    user?: string | number | null
    footer?: string | number | null;
    subtitle?: string | number | null;

    constructor(props?: { start?: Date | string, end?: Date | string, roles?: Array<string | number>, color?: string, name?: string, spaceId: string | number, id?: number | string, user?: string | number }) {
        this.start = new Date(props?.start || new Date());
        this.end = new Date(props?.end || new Date());
        this.name = props?.name || ''
        this.spaceId = props?.spaceId || ''
        this.id = props?.id || null
        if (props?.color) (this.color = props?.color)
        if (props?.roles) (this.roles = props?.roles)
        this.user = props?.user || null
    }

}