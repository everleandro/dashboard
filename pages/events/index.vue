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
        <EMenu ref="eventMenuRef" data-event-menu :activator="event.activator" check-offset>
            <EventForm v-model:event="event.form" v-model:date="filters.date" @click:close="closeMenu()"
                @submit="submitEvent" />
        </EMenu>

        <ERow class="mb-8">
            <ECol sm="12" lg="min-content" class="d-none d-lg-block">
                <GridListSwitch v-model="filters.scheduleMode" text-one="Dia" fill-height text-two="Semana" min-width="200"
                    :true-value="Mode.schedule" :false-value="Mode.week" />
            </ECol>
            <transition name="fade">
                <ECol v-if="state.sessionView && (filters.scheduleMode === Mode.week)" cols="24" sm="12" md="auto" lg="5">
                    <ESelect v-model="filters.space" label="Espacio :" :items="spaces" :readonly="loading" item-text="label"
                        return-object item-value="id" />
                </ECol>
            </transition>
            <ECol cols="24" sm="12" md="auto" lg="6">
                <ETextField v-model="filters.inputSearch" placeholder="Buscar Usuario o actividad"
                    :append-icon="$icon.search" clearable cols="24" sm="12" md="8" lg="6" />
            </ECol>

            <ESpacer class="d-none d-lg-block" />
            <ECol cols="24" sm="12" md="min-content">
                <GridListSwitch v-model="state.sessionView" text-one="Sesiones" fill-height text-two="Grupos"
                    min-width="228" />
            </ECol>
        </ERow>
        <ESchedule v-model="filters.date" v-model:selected-space="filters.space" row-height="50" :events="sessionsList"
            :loading="loading" v-model:mode="filters.scheduleMode" :start="60 * 60" :step="60 * 60" :spaces="spaces"
            schedule-after-week sticky-top-header="120" @click:empty-slot="handleScheduleClick"
            @click:event="handleScheduleClick" />
    </div>
</template>
<script lang="ts" setup>
import { sessions, spaces } from './constants'
import UtilDate from '@/models/date';
import Session from '@/models/session';
import { SlotEvent, Mode } from '@/components/shared/schedule/types';
import { Menu } from '@/components/shared/menu/types';


let eventMenuRef = ref<Menu>();
const { $icon } = useNuxtApp()
const { viewport } = useBreakpoint()

const event = reactive({
    activator: <HTMLElement | undefined>undefined,
    form: new Session()
})

const sessionsList = ref<Array<Session>>([...sessions])
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

const handleScheduleClick = (obj: { data: SlotEvent, nativeEvent: Event }): void => {
    event.form = new Session(obj.data);
    event.activator = obj.nativeEvent.target as HTMLElement
    if (!event.activator?.getAttribute('aria-hasmenu')) {
        nextTick(() => {
            eventMenuRef.value?.openMenu()
        })
    }
}

const submitEvent = (objectSession: Session) => {
    // if (session.form.id) {
    //     const index = sessionsList.value.findIndex(({ id }) => id === session.form.id)
    //     sessionsList.value.splice(index, 1)
    // } else {
    //     sessionsList.value.push(objectSession)
    // }
}
const closeMenu = () => eventMenuRef.value?.closeMenu()


</script>
<style lang="scss">
.events-page {
    .e-bar {
        z-index: 1;
    }

    .e-schedule__header {
        pointer-events: none;

        @include _from_lg {
            pointer-events: all;
        }
    }

    .schedule-options {
        min-width: 228px;

        @include _xs {
            min-width: 190px;
        }
    }
}

.e-menu-container[data-event-menu] {
    transition: 300ms all;
    width: calc(100% - 24px);
    z-index: 10;

    @include _from_sm {
        width: 400px;
    }
}
</style>
