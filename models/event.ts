
import { ScheduleEvent } from "~~/components/shared/schedule/types";
export default class Event implements ScheduleEvent {
    name: string
    entityId: number | string
    start: Date | string
    end: Date | string
    dateChange: Date | string
    color: string = 'primary'
    id?: number | string | null
    roles?: Array<string | number> = []
    user?: string | number | null | Array<number | string>
    footer?: string | number | null;
    subtitle?: string | number | null;
    activityId?: number | string
    target: number | string
    rotating: boolean

    constructor(props?: {
        start?: Date | string, end?: Date | string, dateChange?: Date, roles?: Array<string | number>, activityId?: number | string,
        color?: string, name?: string, entityId?: string | number, id?: number | string, user?: string | number | Array<number | string>, rotating?: boolean,
        target?: string | number
    }) {
        this.start = new Date(props?.start || new Date());
        this.end = new Date(props?.end || new Date());
        this.name = props?.name || ''
        this.entityId = props?.entityId || ''
        this.id = props?.id
        if (props?.color) (this.color = props?.color)
        if (props?.roles) (this.roles = props?.roles)
        this.user = props?.user
        this.activityId = props?.activityId
        this.rotating = props?.rotating || false
        this.target = props?.target || ''
        this.dateChange = props?.dateChange || new Date()
    }
}