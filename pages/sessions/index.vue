<template>
    <div class="sessions-page">
        <EBar depressed>
            <div>
                <h1>Sesiones</h1>
            </div>

        </EBar>
        <EMenu ref="eventMenuRef" data-event-menu :activator="event.activator" check-offset>
            <SessionForm :event="event.form" @click:close="closeMenu()" @submit="submitEvent" />
        </EMenu>

        <EDialog ref="eventDialogRef" v-model="state.eventFormDialog" class="d-block d-md-none" max-width="450">
            <SessionForm :event="event.form" v-model:date="filters.date" @click:close="closeDialog()"
                @submit="submitEvent" />
        </EDialog>

        <EMenu activator="#filer-date-picker" class="d-none d-md-block" data-filter-date-picker-menu origin="bottom right"
            transition="scale">
            <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                close-on-change />
        </EMenu>
        <EDialog v-model="state.datePickerDialog" max-width="290" class="d-block d-md-none" transition="scale">
            <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                close-on-change />
        </EDialog>

        <ERow class="mb-8">
            <ECol sm="12" lg="min-content" class="d-none d-lg-block">
                <GridListSwitch v-model="filters.scheduleMode" text-one="Dia" fill-height text-two="Semana" min-width="200"
                    :true-value="Mode.schedule" :false-value="Mode.week" />
            </ECol>
            <ECol v-if="filters.scheduleMode === Mode.week" cols="24" sm="12" md="12" lg="6">
                <ESelect v-model="filters.space" :items="spaces" :readonly="loading" item-text="label" return-object
                    item-value="id" />
            </ECol>
            <ECol cols="24" :sm="filters.scheduleMode === Mode.week ? 12 : 24" lg="7">
                <ETextField v-model="filters.inputSearch" placeholder="Buscar Usuario o actividad"
                    :append-icon="$icon.search" clearable />
            </ECol>

            <ESpacer class="d-none d-lg-block" />
            <ECol cols="24" sm="12" class="d-block d-lg-none">
                <GridListSwitch v-model="filters.scheduleMode" text-one="Dia" fill-height text-two="Semana" min-width="200"
                    :true-value="Mode.schedule" :false-value="Mode.week" />
            </ECol>
            <ECol cols="24" sm="12" lg="min-content">
                <ETextField id="filer-date-picker" :modelValue="formattedDate" :append-icon="$icon.calendar"
                    :readonly="state.loading" input-readonly @click="openFilterPickerMenu" />
            </ECol>
        </ERow>
        <ESchedule v-model="filters.date" v-model:selected-space="filters.space" row-height="50" :events="eventsList"
            :loading="loading" v-model:mode="filters.scheduleMode" :start="60 * 60" :step="60 * 60" :spaces="spaces"
            :schedule-column="scheduleColumns" schedule-after-week sticky-top-header="120"
            @click:empty-slot="handleScheduleClick" @click:event="handleScheduleClick" />
    </div>
</template>
<script lang="ts" setup>
import { events, spaces } from './constants'
import UtilDate from '@/models/date';
import Event from '@/models/event';
import { SlotEvent, Mode, ScheduleEvent } from '@/components/shared/schedule/types';
import { Menu } from '@/components/shared/menu/types';
import { EDIalog } from '@/components/shared/dialog/index.vue';

let eventMenuRef = ref<Menu>();
let eventDialogRef = ref<EDIalog>();
const { $icon } = useNuxtApp()
const { viewport } = useBreakpoint()

const event = reactive({
    activator: <HTMLElement | undefined>undefined,
    form: new Event({ user: new Array<number>() })
})

const eventsList = ref<Array<Event>>([...events])
const loading = ref(false)

const modes = [
    { text: 'Semana', value: Mode.week },
    { text: 'Dia', value: Mode.day },
    { text: 'Horario', value: Mode.schedule },

]

const scheduleOptions = [
    { icon: $icon.calendar, text: 'Horario Habitual', value: 1 },
    { icon: $icon.calendar, text: 'Horario Festivo', value: 2 }
]

const state = reactive({
    scheduleOption: 1,
    datePickerDialog: false,
    loading: false,
    eventFormDialog: false,
    sessionGroups: true,
})

const filters = reactive({
    role: 1,
    inputSearch: '',
    sessionsOrGroups: 1,
    scheduleMode: Mode.schedule,
    space: spaces[0],
    date: new Date(),
})

const formattedDate = computed(() => new UtilDate(filters.date).format('month-DD/month-MM, week-dddd '))

const openFilterPickerMenu = (evt: MouseEvent): void => {
    if (viewport.xs || viewport.sm) {
        state.datePickerDialog = true;
        evt.stopImmediatePropagation()
    }
}

watch(() => filters, () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000)
}, { deep: true })

watch(() => viewport, ({ lg }) => {
    if (!lg) filters.scheduleMode = Mode.week
}, { deep: true });

const handleScheduleClick = (obj: { data: ScheduleEvent, nativeEvent: MouseEvent }): void => {
    event.form = new Event({ user: [], ...obj.data });
    if (viewport.xs || viewport.sm) {
        state.eventFormDialog = true;
    } else {

        event.activator = obj.nativeEvent.target as HTMLElement
        if (!event.activator?.getAttribute('aria-hasmenu')) {
            nextTick(() => {
                eventMenuRef.value?.openMenu()
            })
        }
    }
}


const scheduleColumns = computed(() => {
    if (viewport.xs) return 2
    if (viewport.sm) return 4
    if (viewport.md) return 6
    if (viewport.lg) return 10
    if (viewport.xl) return ''
})

const submitEvent = (objectEvent: Event) => {
    if (event.form.id) {
        const index = eventsList.value.findIndex(({ id }) => id === event.form.id)
        eventsList.value.splice(index, 1)
    } else {
        eventsList.value.push(objectEvent)
    }
}
const closeMenu = () => eventMenuRef.value?.closeMenu()
const closeDialog = () => eventDialogRef.value?.close()


</script>
<style lang="scss">
.sessions-page {
    #filer-date-picker {
        .e-field__control {
            min-width: 190px;
        }
    }


}

.e-menu-container {
    &[data-filter-date-picker-menu] {
        margin-top: 2px;
    }

    &[data-event-menu] {
        transition: 300ms all;
        width: calc(100% - 24px);
        z-index: 10;

        @include _from_sm {
            width: 450px;
        }
    }
}
</style>
