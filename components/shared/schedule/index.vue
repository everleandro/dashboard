
<template>
    <div :class="scheduleClass" :style="componentStyle">
        <div role="col">
            <div role="cell" class="e-schedule__header">
                <span></span>
            </div>
            <div role="cell" v-for="(hour, hourIndex) in hourList" :key="hourIndex" class="e-schedule__hour">
                <span :class="`${color}--text`">
                    <span class="hour-label e-vue-input--text">{{ hour }}</span>
                </span>
            </div>
        </div>
        <transition-group :name="local.globalContentAnimation">
            <div v-for="(data, colIndex) in headerLabels" :key="data.dayOfWeek + '-' + data.dayOfMonth" role="col">
                <div role="cell" class="e-schedule__header">
                    <span :class="`${color}--text`">
                        <span data-day-of-week="true"> {{ data.dayOfWeek }}</span>
                        <EButton class="mt-1 e-schedule-btn--day" :color="color" :text="!data.today" depressed
                            @click="handleHeaderLabelClick(data.date)">{{
                                data.dayOfMonth }}</EButton>
                    </span>
                </div>
                <div role="cell" v-for="(hour, hourIndex) in hourList" :key="hourIndex" class="e-schedule__event">
                    <div v-if="hasEvent({ x: hourIndex, y: colIndex })" class="e-schedule__event"
                        :style="eventStyle({ x: hourIndex, y: colIndex })">
                        <slot name="event" :event="getEvent({ x: hourIndex, y: colIndex })">
                            <div v-ripple :class="eventClass(getEvent({ x: hourIndex, y: colIndex }))"
                                @click="handleEventClick(getEvent({ x: hourIndex, y: colIndex }), $event)">
                                <span class="event-name">{{
                                    getEvent({ x: hourIndex, y: colIndex }).name
                                }}</span>
                                <span class="event-subtitle">{{
                                    getEvent({ x: hourIndex, y: colIndex }).subtitle
                                }}</span>
                                <span class="event-footer">{{
                                    getEvent({ x: hourIndex, y: colIndex }).footer
                                }}</span>
                            </div>
                        </slot>
                    </div>
                    <slot v-else name="empty-slot" :data="getEmptySlotData({ x: hourIndex, y: colIndex })">
                        <div v-ripple :class="[
                            `${color}--text`,
                            'v-ripple-element',
                            'e-schedule__empty-slot',
                            'e-btn',
                            'e-btn--text'
                        ]" @click="emptySlotClickHandler({ x: hourIndex, y: colIndex }, $event)"></div>
                    </slot>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script lang="ts" setup>
import { ScheduleEvent, Space, Mode, Point, EmptySlotEvent } from "./types"
import { Lng as Lnguage, suportedLng } from '@/locales/index';
import UtilDate from '@/models/date';
import { rollupVersion } from "vite";

export interface Props {
    lng?: suportedLng; color?: string; stickyTopHeader?: string;
    rowHeight?: string; step?: number; start?: number; events?: ScheduleEvent[];
    end?: number; spaces?: Space[]; selectedSpace?: Space; modelValue: Date; mode?: Mode;
}
const props = withDefaults(defineProps<Props>(),
    {
        lng: 'es', color: 'primary', rowHeight: '97',
        step: 60 * 60, start: 0, events: () => [], stickyTopHeader: '0',
        end: 60 * 60 * 24, spaces: () => [], mode: Mode.day
    })

const local = reactive({
    mode: Mode.week,
    forceUnanimated: false,
    selectedSpace: <Space | undefined>undefined,
    events: new Array<Array<ScheduleEvent>>(),
    globalContentAnimation: 'tab-transition'
})

const scheduleClass = computed(() => {
    const classes = ['e-schedule']
    modeDay.value && classes.push('e-schedule--day')
    !!props.stickyTopHeader && classes.push('e-schedule--header-stiky')
    return classes

})
const modeDay = computed(() => props.mode == Mode.day)

const emit = defineEmits<{
    (e: 'update:modelValue', value: Date): void,
    (e: 'update:mode', value: Mode): void,
    (e: 'click:empty-slot', value: { data: EmptySlotEvent, nativeEvent: Event }): void,
    (e: 'click:event', value: { data: ScheduleEvent, nativeEvent: Event }): void,
    (e: 'update:selected-space', value: Space | undefined): void,
}>()

const changeValue = (value: Date): void => {
    emit('update:modelValue', value)
}

const computedMode = computed((): Mode => {
    local.globalContentAnimation = ''
    nextTick(() => local.globalContentAnimation = 'tab-transition')
    return props.mode != null ? props.mode : local.mode;
})

const changeMode = (value: Mode) => {
    local.mode = value;
    emit('update:mode', value);
}

const computedSelectedSpace = computed((): Space | undefined => {
    return props.selectedSpace != undefined ? props.selectedSpace : local.selectedSpace;
})

const changeSelectedSpace = (value: Space | undefined) => {
    local.selectedSpace = value;
    emit('update:selected-space', value);
}
watch(() => props.selectedSpace, () => setLocalEvents())
watch(() => props.selectedSpace, () => setLocalEvents())
watch(() => props.modelValue, (value, oldValue) => {
    const reverse = new UtilDate(value).date > new UtilDate(oldValue).date
    if (local.forceUnanimated) {
        local.forceUnanimated = false
        local.globalContentAnimation = ''
    }
    else
        local.globalContentAnimation = reverse ? 'tab-transition' : 'tab-reverse-transition'
    setLocalEvents()
})
watch(() => computedMode.value, () => setLocalEvents())
watch(() => props.events, () => setLocalEvents(), { deep: true })

const setLocalEvents = (): void => {

    const result: Array<Array<ScheduleEvent>> = [];
    const dateFrom = new UtilDate(props.modelValue).setTime(0, 0, 0).date;
    const dateTo = new UtilDate(props.modelValue)
        .setTime(23, 59, 59)
        .add(6, 'days').date;

    let events = props.events.filter(
        ({ start }: ScheduleEvent) => new UtilDate(start).date > dateFrom && new UtilDate(start).date < dateTo
    );


    if (modeDay.value) {
        events = events.filter(
            ({ start }: ScheduleEvent) => new UtilDate(start).date.getDay() == dateFrom.getDay()
        );
    } else if (computedMode.value === Mode.week) {
        events = events.filter(
            ({ spaceId }: ScheduleEvent) =>
                spaceId === computedSelectedSpace.value?.id
        );
    }

    events.forEach((event: ScheduleEvent) => {
        const day = props.modelValue.getDay();
        let y = -1;
        if (computedMode.value === Mode.day) {
            y = props.spaces.findIndex(({ id }) => id == event.spaceId);
        } else {
            y = new UtilDate(event.start).date.getDay();
            y = y < day ? 7 - day + y : y - day;
        }
        if (y !== -1) {
            const timePassed = secondsByDate(new UtilDate(event.start).date);
            const x = Math.floor(timePassed / props.step);

            if (result[x]) {
                result[x][y] = event;
            } else {
                result[x] = [];
                result[x][y] = event;
            }
        }
    });
    local.events = result;
}

const secondsByDate = (date: Date): number => date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 60 * 60 - props.start

const getEvent = ({ x, y }: Point) => local.events[x][y]

const getEmptySlotData = ({ x, y }: Point): EmptySlotEvent => {
    const timestamp = props.start + x * props.step;

    const startHours: number = Math.floor(timestamp / 60 / 60);
    const startMinutes: number = Math.floor(timestamp / 60) - startHours * 60;

    const endHours: number = Math.floor((timestamp + props.step) / 60 / 60);
    const endMinutes: number =
        Math.floor((timestamp + props.step) / 60) - endHours * 60;
    const selectedDate: Date = modeDay.value
        ? props.modelValue
        : new UtilDate(props.modelValue).add(y, 'days').date;

    const startDate = new UtilDate(selectedDate)
        .set(startHours, 'hours')
        .set(startMinutes, 'minutes').date;
    const endDate = new UtilDate(selectedDate)
        .set(endHours, 'hours')
        .set(endMinutes, 'minutes').date;

    const space: Space = modeDay.value
        ? props.spaces[y]
        : (computedSelectedSpace.value as Space);
    return {
        space,
        startDate,
        endDate
    };
}

const emptySlotClickHandler = (point: Point, nativeEvent: Event): void => {
    emit('click:empty-slot', { data: getEmptySlotData(point), nativeEvent });
}

const eventStyle = (point: Point): Record<string, string> => {
    const { start, end, color } = getEvent(point);
    const from = secondsByDate(new UtilDate(start).date);
    const to = secondsByDate(new UtilDate(end).date);
    const displacement = ((to - from) / props.step)
    const height = parseInt(props.rowHeight) * (displacement == 0 ? 1 : displacement);
    const fillPercent = (from % props.step) / props.step;
    const top = parseInt(props.rowHeight) * fillPercent;
    const backgroundColor = (color || '').indexOf('#') == -1 ? '' : color;

    return { height: `${height}px`, top: `${top}px`, backgroundColor, marginTop: '1px' };
}

const handleEventClick = (event: ScheduleEvent, nativeEvent: Event): void => {
    emit('click:event', { data: event, nativeEvent });
}


const hasEvent = ({ x, y }: Point): boolean => {
    return !!local.events?.[x]?.[y];
}

const eventClass = (event: ScheduleEvent): string => {
    const { color } = event;
    const extraClass = color.indexOf('#') == -1 ? color : '';
    return ['e-schedule__event-container', extraClass].join(' ').trim();
}


const handleHeaderLabelClick = (date: Date): void => {

    if (computedMode.value === Mode.week) {
        local.forceUnanimated = true
        nextTick(() => {
            date && changeValue(date)
            changeMode(Mode.day);
        })

    }
}

onMounted(() => {
    setLocalEvents();
})

const t = (): Lnguage => {
    return new Lnguage(props.lng, 1);
}

const componentStyle = computed((): Record<string, string> => (
    { '--row-height': props.rowHeight + 'px', '--header-stiky-top': props.stickyTopHeader + 'px' }
))

const hourList = computed((): Array<string> => {
    const result: Array<string> = [];
    let incompleteList = true;
    let count = 0;
    while (incompleteList) {
        const timestamp = props.start + count++ * props.step;
        let hours: string | number = Math.floor(timestamp / 60 / 60);
        let minutes: string | number = Math.floor(timestamp / 60) - hours * 60;
        minutes = minutes || '00';
        hours = hours <= 9 ? `0${hours}` : hours;
        result.push(`${hours}:${minutes}`);
        incompleteList = timestamp < props.end;
    }
    return result;
})

const headerLabels = computed((): Array<Record<string, any>> => {
    const day = props.modelValue.getDay();
    let dayList: Array<string> = [];
    if (modeDay.value) {
        dayList = [t().currentLng.weekdaysShort[day]];
    } else {
        dayList = t().sliceLangList(t().currentLng.weekdaysShort, day);
    }

    return dayList.map((d, i) => {
        const date: Date = new Date(
            new Date(props.modelValue).setDate(props.modelValue.getDate() + i)
        );
        const today = date.toDateString() === new Date().toDateString()
        return { dayOfWeek: d, dayOfMonth: date.getDate(), today, date }
    });

})


</script>
<style lang="scss" src="./style.scss"></style>