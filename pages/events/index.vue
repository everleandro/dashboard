<template>
    <div class="events-page">
        <EBar depressed>
            <div>
                <h1>Eventos</h1>
            </div>
            <e-spacer></e-spacer>
            <div class="schedule-options">
                <ESelect v-model="state.scheduleOption" :items="scheduleOptions" :readonly="loading" cols="24" sm="12"
                    retain-color outlined lg="6">
                    <template #item="{ attrs, item }">
                        <e-list-item v-bind="attrs" :prepend-icon="item.icon">
                            {{ item.text }}
                        </e-list-item>
                    </template>
                </ESelect>
            </div>
        </EBar>
        <ResponsiveMenu v-model="event.dialogModel" :menu-props="{ activator: event.activator }"
            :dialog-props="{ maxWidth: 450 }" id="data-event-menu">
            <EventForm :event="event.form" @click:close="event.dialogModel = false" @submit="submitEvent" />
        </ResponsiveMenu>

        <ERow class="mb-8">
            <ECol sm="12" lg="min-content" class="d-none d-lg-block">
                <GridListSwitch v-model="filters.scheduleMode" text-one="Dia" fill-height text-two="Semana" min-width="200"
                    :true-value="Mode.schedule" :false-value="Mode.week" />
            </ECol>
            <ECol v-if="showSpaceSelector" cols="24" sm="12" md="12" lg="6">
                <ESelect v-model="filters.space" :items="spaces" :readonly="loading" item-text="label" return-object
                    item-value="id" />
            </ECol>
            <ECol cols="24" :sm="showSpaceSelector ? 12 : 24" lg="7">
                <ETextField v-model="filters.inputSearch" placeholder="Buscar Usuario o actividad"
                    :append-icon="$icon.search" clearable />
            </ECol>

            <ESpacer class="d-none d-lg-block" />
            <ECol cols="24" sm="12" class="d-block d-lg-none">
                <GridListSwitch v-model="filters.scheduleMode" text-one="Dia" fill-height text-two="Semana" min-width="200"
                    :true-value="Mode.schedule" :false-value="Mode.week" />
            </ECol>
            <ECol cols="24" sm="12" lg="min-content">
                <GridListSwitch v-model="state.sessionView" text-one="Sesiones" fill-height text-two="Grupos"
                    min-width="228" />
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
import Event from '~~/models/Event';
import { SlotEvent, Mode, ScheduleEvent } from '@/components/shared/schedule/types';
import { Menu } from '@/components/shared/menu/types';
import { EDIalog } from '@/components/shared/dialog/index.vue';

let eventMenuRef = ref<Menu>();
let eventDialogRef = ref<EDIalog>();
const { $icon } = useNuxtApp()
const { viewport } = useBreakpoint()

const event = reactive({
    activator: <HTMLElement | undefined>undefined,
    form: new Event(),
    dialogModel: false
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
    sessionView: true,
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
    event.form = new Event(obj.data);
    event.activator = obj.nativeEvent.target as HTMLElement
    nextTick(() => event.dialogModel = true)
}

const showSpaceSelector = computed(() => state.sessionView && (filters.scheduleMode === Mode.week))

const scheduleColumns = computed(() => {
    if (viewport.xs) return 3
    if (viewport.sm) return 5
    if (viewport.md) return 7
    if (viewport.lg) return 10
    if (viewport.xl) return ''
})

const submitEvent = (objectEvent: Event) => {
    if (objectEvent.id !== 'new') {
        const index = eventsList.value.findIndex(({ id }) => id === objectEvent.id)
        eventsList.value.splice(index, 1, objectEvent)
    } else {
        eventsList.value.push(objectEvent)
    }
}


</script>
<style lang="scss">
.events-page {
    .e-bar {
        z-index: 1;
    }

    .schedule-options {
        min-width: 228px;

        @include _xs {
            min-width: 190px;
        }
    }
}

.e-menu-container#data-event-menu {
    transition: 300ms all;
    z-index: 10;

    @include _from_sm {
        width: 450px;
    }
}
</style>
