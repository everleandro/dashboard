<template>
    <div class="schedule-page">
        <EBar depressed>
            <div>
                <h1>Horario</h1>
            </div>
        </EBar>

        <EMenu ref="eventMenuRef" data-event-menu :activator="session.activator" check-offset>
            <ScheduleSessionForm v-model:session="session.form" v-model:date="filters.date" @click:close="closeMenu()"
                @submit="submitSession" />
        </EMenu>

        <EForm @submit="search" class="mb-8">
            <ESelect v-model="filters.space" label="Espacio :" :items="spaces" :readonly="filters.loading" item-text="label"
                return-object item-value="id" cols="24" sm="12" lg="6" />
            <ESelect v-model="filters.role" label="Rol:" :items="availableRole" :readonly="filters.loading" clearable
                cols="24" sm="12" lg="6">
                <template #selection="{ selection, attrs }">
                    <EChip :prepend-icon="selection?.icon" v-bind="attrs" text>
                        {{ selection.text }}
                    </EChip>
                </template>
            </ESelect>

            <EMenu origin="bottom right" transition="scale">
                <template #activator="attrs">
                    <ETextField :modelValue="formattedDate" v-bind="attrs" :append-icon="$icon.calendar"
                        :readonly="filters.loading" cols="24" sm="12" lg="6" input-readonly />
                </template>
                <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                    close-on-change />
            </EMenu>
            <ESpacer />
            <ESelect v-model="filters.scheduleMode" class="schedule-mode-select" :items="modes"
                :readonly="filters.loading || mdBreakpoint" outlined retain-color />
        </EForm>
        <ESchedule v-model="filters.date" v-model:selected-space="filters.space" row-height="50" :events="sessionsList"
            v-model:mode="filters.scheduleMode" :start="60 * 60" :step="60 * 60" :spaces="spaces" sticky-top-header="120"
            @click:empty-slot="handleScheduleClickClick" @click:event="handleScheduleClickClick" />
    </div>
</template>
<script lang="ts" setup>
import { sessions, spaces } from './constants'
import UtilDate from '@/models/date';
import Session from '@/models/session';
import { SlotEvent, Mode, ScheduleEvent } from '@/components/shared/schedule/types';
import { Menu } from '@/components/shared/menu/types';

let mdBreakpoint = ref(false);
let eventMenuRef = ref<Menu>();
const { $icon } = useNuxtApp()
const session = reactive({
    activator: <HTMLElement | undefined>undefined,
    form: new Session()
})

const sessionsList = ref<Array<Session>>([...sessions])

const availableRole = [
    { text: 'instructor', value: 1, icon: $icon.roles.instructor },
    { text: 'monitor de sala', value: 2, icon: $icon.roles.roomInstructor },
    { text: 'entrenador personal', value: 3, icon: $icon.roles.personalTrainer },
    { text: 'servicio al cliente', value: 4, icon: $icon.roles.customerService },
    { text: 'Coordinador', value: 5, icon: $icon.roles.coordination },
    { text: 'Administracion', value: 6, icon: $icon.roles.administration },
    { text: 'Direccion', value: 7, icon: $icon.roles.directorate },
    { text: 'Limpieza', value: 8, icon: $icon.roles.cleaning },
    { text: 'Mantenimiento', value: 9, icon: $icon.roles.maintenance },
    { text: 'Operaciones', value: 10, icon: $icon.roles.operations },
    { text: 'Recepcion', value: 11, icon: $icon.roles.reception },
    { text: 'Recursos Humanos', value: 12, icon: $icon.roles.humanResources },
    { text: 'Supervisor', value: 13, icon: $icon.roles.supervisor },
]

const modes = [
    { text: 'Semana', value: Mode.week },
    { text: 'Dia', value: Mode.day }
]

const filters = reactive({
    searchValue: '',
    role: 1,
    scheduleMode: Mode.day,
    space: spaces[0],
    date: new Date(),
    loading: false
})

const formattedDate = computed(() => new UtilDate(filters.date).format('month-DD/month-MM, week-dddd '))

const search = (evt: SubmitEvent): void => {
    evt.preventDefault()
    filters.loading = true;
    setTimeout(() => {
        filters.loading = false;

    }, 2000)
}

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

const submitSession = (objectSession: Session) => {
    if (session.form.id) {
        const index = sessionsList.value.findIndex(({ id }) => id === session.form.id)
        sessionsList.value.splice(index, 1)
    } else {
        sessionsList.value.push(objectSession)
    }
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

const closeMenu = () => eventMenuRef.value?.closeMenu()


</script>
<style lang="scss">
.e-menu-container[data-event-menu] {
    transition: 300ms all;
    width: calc(100% - 24px);
    z-index: 10;

    @include _from_sm {
        width: 500px;
    }
}

.schedule-page {
    .schedule-mode-select {
        display: none;

        @include _from_lg {
            display: flex;
        }
    }
}
</style>
