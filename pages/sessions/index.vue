<template>
    <div class="sessions-page">
        <EBar depressed>
            <div>
                <h1>Sesiones</h1>
            </div>

        </EBar>

        <ResponsiveMenu v-model="session.dialogModel" :menu-props="{ activator: session.activator }"
            :dialog-props="{ maxWidth: 450 }" id="data-event-menu">
            <SessionForm :session="session.form" @click:close="session.dialogModel = false" @submit="submitSession" />
        </ResponsiveMenu>

        <ResponsiveMenu v-model="state.datePickerDialog"
            :menu-props="{ activator: '#filer-date-picker', transition: 'scale', origin: 'bottom right' }"
            :dialog-props="{ maxWidth: '290' }" transition="scale">
            <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                close-on-change />
        </ResponsiveMenu>


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
import { sessions, spaces } from './constants'
import UtilDate from '@/models/date';
import Session from '~~/models/Session';
import { Mode, ScheduleEvent } from '@/components/shared/schedule/types';
import { Menu } from '@/components/shared/menu/types';
import { EDIalog } from '@/components/shared/dialog/index.vue';

const { $icon } = useNuxtApp()
const { viewport } = useBreakpoint()

const session = reactive({
    dialogModel: false,
    activator: <HTMLElement | undefined>undefined,
    form: new Session()
})

const eventsList = ref<Array<Session>>([...sessions])
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
    session.form = new Session(obj.data);
    session.activator = obj.nativeEvent.target as HTMLElement
    nextTick(() => session.dialogModel = true)
}

const scheduleColumns = computed(() => {
    if (viewport.xs) return 3
    if (viewport.sm) return 5
    if (viewport.md) return 7
    if (viewport.lg) return 10
    if (viewport.xl) return ''
})

const submitSession = (objectSession: Session) => {
    if (session.form.id) {
        const index = eventsList.value.findIndex(({ id }) => id === session.form.id)
        eventsList.value.splice(index, 1, objectSession)
    } else {
        eventsList.value.push(objectSession)
    }
}


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
    &#data-event-menu {
        transition: 300ms all;
        z-index: 10;
        width: 450px;
    }
}
</style>
