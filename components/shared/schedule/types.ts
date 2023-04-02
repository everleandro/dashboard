
export interface ScheduleEvent {
    name: string;
    footer: string;
    subtitle: string;
    spaceId: number | string;
    start: Date | string;
    end: Date | string;
    color: string;
}

export interface Space {
    label: string;
    id: string | number;
}

export interface EmptySlotEvent {
    space: Space;
    startDate: Date;
    endDate: Date;
}
export interface Point {
    x: number
    y: number
}
export enum Mode {
    day,
    week,
    month,
    year
}