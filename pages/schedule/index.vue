<template>
    <div>
        <EBar depressed>
            <div>
                <h1>Empleados</h1>
                <p>12 clientes</p>
            </div>

            <ESpacer></ESpacer>

            <EButton :prepend-icon="$icon.list" stacked text>Lista</EButton>
            <EButton :prepend-icon="$icon.grid" stacked text>Grid</EButton>

        </EBar>
        <EForm @submit="search" class="mb-8">
            <ESelect v-model="filters.space" label="Espacio :" :items="spaces" :readonly="filters.loading" item-text="label"
                return-object item-value="id" cols="24" sm="12" md="8" lg="6" />
            <ESelect v-model="filters.role" label="Rol:" :items="availableRole" :readonly="filters.loading" clearable
                cols="24" sm="12" md="8" lg="6" />

            <EMenu origin="bottom right" transition="scale">
                <template #activator="attrs">
                    <ETextField :modelValue="formattedDate" v-bind="attrs" :append-icon="$icon.calendar"
                        :readonly="filters.loading" cols="24" sm="12" md="8" lg="6" input-readonly />
                </template>
                <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                    close-on-change />
            </EMenu>
            <ESpacer />
            <ESelect v-model="filters.scheduleModel" :items="modes" :readonly="filters.loading" outlined />

        </EForm>
        <ESchedule v-model="filters.date" v-model:selected-space="filters.space" color="green" row-height="50"
            :events="events" v-model:mode="filters.scheduleModel" :start="60 * 60" :step="60 * 60" :spaces="spaces"
            sticky-top-header="120" />
    </div>
</template>
<script lang="ts" setup>
import { events, spaces } from './constants'
import UtilDate from '@/models/date';
import { Mode } from '@/components/shared/schedule/types';
import { mode } from 'process';

let mdBreakpoint = ref(false);

const availableRole = [
    { text: 'Role 1', value: 1 },
    { text: 'role 2', value: 2 }
]

const modes = [
    { text: 'Semana', value: Mode.week },
    { text: 'Dia', value: Mode.day }
]

const filters = reactive({
    searchValue: '',
    role: 1,
    scheduleModel: Mode.day,
    space: spaces[0],
    date: new Date(),
    loading: false
})

const formattedDate = computed(() => new UtilDate(filters.date).format('month-DD/month-MM, week-dddd '))

const search = (evt: MouseEvent): void => {
    evt.preventDefault()
    filters.loading = true;
    setTimeout(() => {
        filters.loading = false;

    }, 2000)
}

watch(() => mdBreakpoint.value, () => {
    filters.scheduleModel = Mode.day
});

onMounted(() => {
    observeBreakpoint();
    window?.addEventListener('resize', observeBreakpoint);
    nextTick(() => {
        if (!mdBreakpoint.value) {
            filters.scheduleModel = Mode.week
        }
    })
})

onUnmounted(() => window?.removeEventListener('resize', observeBreakpoint))

const observeBreakpoint = (): void => {
    const windowWidth = window?.innerWidth;
    const mdValue = getComputedStyle(document.body).getPropertyValue('--md');
    mdBreakpoint.value = windowWidth <= parseInt(mdValue, 10);
}

const model = ref(new Date())
</script>
