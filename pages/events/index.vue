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

        <ERow class="mb-8">
            <ECol cols="24" sm="12" md="8" lg="5">
                <ESelect v-model="filters.scheduleMode" :items="modes" retain-color outlined />
            </ECol>
            <transition name="fade">
                <ECol v-if="!state.sessionView" cols="24" sm="12" md="8" lg="5">
                    <ESelect v-model="filters.space" label="Espacio :" :items="spaces" :readonly="loading" item-text="label"
                        return-object item-value="id" />
                </ECol>
            </transition>
            <ECol cols="24" sm="12" md="8" lg="6">
                <ETextField v-model="filters.inputSearch" placeholder="Buscar Usuario o actividad"
                    :append-icon="$icon.search" clearable cols="24" sm="12" md="8" lg="6" />
            </ECol>

            <ESpacer />
            <ECol class="d-flex justify-flex-end">
                <GridListSwitch v-model="state.sessionView" text-one="Sesiones" fill-height text-two="Grupos" width="228" />
            </ECol>
        </ERow>
        <ESchedule v-model="filters.date" v-model:selected-space="filters.space" row-height="50" :events="sessionsList"
            :loading="loading" v-model:mode="filters.scheduleMode" :start="60 * 60" :step="60 * 60" :spaces="spaces"
            sticky-top-header="120" @click:empty-slot="handleScheduleClickClick" @click:event="handleScheduleClickClick" />
    </div>
</template>
<script lang="ts" setup>
import { sessions, spaces } from './constants'
import UtilDate from '@/models/date';
import Session from '@/models/session';
import { SlotEvent, Mode } from '@/components/shared/schedule/types';
import { Menu } from '@/components/shared/menu/types';

let mdBreakpoint = ref(false);
let eventMenuRef = ref<Menu>();
const { $icon } = useNuxtApp()

const session = reactive({
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

watch(() => mdBreakpoint.value, () => {
    filters.scheduleMode = Mode.day
});

onMounted(() => {
    observeBreakpoint();
    window?.addEventListener('resize', observeBreakpoint);
    nextTick(() => {
        if (!mdBreakpoint.value) {
            filters.scheduleMode = Mode.week
        }
    })
})

onUnmounted(() => window?.removeEventListener('resize', observeBreakpoint))

const observeBreakpoint = (): void => {
    const windowWidth = window?.innerWidth;
    const mdValue = getComputedStyle(document.body).getPropertyValue('--md');
    mdBreakpoint.value = windowWidth <= parseInt(mdValue, 10);
}

const handleScheduleClickClick = (obj: { data: SlotEvent, nativeEvent: Event }): void => {
    session.form = new Session(obj.data);
    session.activator = obj.nativeEvent.target as HTMLElement
    if (!session.activator?.getAttribute('aria-hasmenu')) {
        nextTick(() => {
            eventMenuRef.value?.openMenu()
        })
    }
}


</script>
<style lang="scss">
.events-page {
    .e-bar {
        z-index: 1;

    }

    &__view-selector {
        min-width: 130px;
    }

    .schedule-options {
        min-width: 228px;
    }

    .grid-list-switch {
        @include _xs {
            width: 100% !important;
        }

        @include _sm {
            width: 100% !important;
        }
    }
}
</style>