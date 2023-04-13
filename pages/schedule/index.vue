<template>
    <div class="schedule-page">
        <EBar depressed>
            <div>
                <h1>Horario</h1>
            </div>
        </EBar>

        <EMenu activator="#filer-date-picker" data-filter-date-picker-menu origin="bottom right" transition="scale"
            offset-x="12">
            <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                close-on-change />
        </EMenu>
        <EMenu ref="workdayMenuRef" data-work-day-menu="true" class="d-none d-md-block" :activator="workday.activator"
            check-offset>
            <ScheduleWorkdayForm v-model:workday="workday.form" v-model:date="filters.date" @click:close="closeMenu()"
                @submit="submitWorkday" />
        </EMenu>

        <EDialog v-model="state.datePickerDialog" max-width="290" class="d-block d-md-none" transition="scale">
            <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                close-on-change />
        </EDialog>

        <EDialog ref="workdayDialogRef" v-model="state.workdayFormDialog" class="d-block d-md-none" max-width="500">
            <ScheduleWorkdayForm v-model:workday="workday.form" v-model:date="filters.date" @click:close="closeDialog()"
                @submit="submitWorkday" />
        </EDialog>

        <EForm class="mb-8">
            <EFormColumn lg="min-content">
                <GridListSwitch v-model="filters.scheduleMode" block text-one="Dia" fill-height text-two="Semana"
                    min-width="200" :true-value="Mode.day" :false-value="Mode.week" />
            </EFormColumn>
            <ESelect v-model="filters.space" :items="spaces" :readonly="state.loading" item-text="label" return-object
                item-value="id" cols="24" sm="12" lg="6" />
            <ESelect v-model="filters.role" :items="roleList" :readonly="state.loading" cols="24" sm="12" lg="6">
                <template #selection="{ selection, attrs }">
                    <EChip :prepend-icon="selection?.icon" v-bind="attrs" text>
                        {{ selection.text }}
                    </EChip>
                </template>
                <template #item="{ attrs, item }">
                    <e-list-item v-bind="attrs" :prepend-icon="item.icon">
                        {{ item.text }}
                    </e-list-item>
                </template>
            </ESelect>
            <ESpacer />
            <ETextField id="filer-date-picker" :modelValue="formattedDate" :append-icon="$icon.calendar"
                :readonly="state.loading" cols="24" sm="12" lg="min-content" input-readonly @click="openFilterPickerMenu" />
        </EForm>

        <ESchedule v-model="filters.date" v-model:selected-space="filters.space" row-height="50" :events="state.workdayList"
            :loading="state.loading" v-model:mode="filters.scheduleMode" :start="60 * 60" :step="60 * 60" :spaces="spaces"
            sticky-top-header="120" @click:empty-slot="handleScheduleClickClick" @click:event="handleScheduleClickClick" />
    </div>
</template>
<script lang="ts" setup>
import { workdays, spaces } from './constants'
import UtilDate from '@/models/date';
import Workday from '@/models/Workday';
import { SlotEvent, Mode } from '@/components/shared/schedule/types';
import { Menu } from '@/components/shared/menu/types';
import { EDIalog } from '@/components/shared/dialog/index.vue';
import { roleList } from "@/models/employee";

let workdayMenuRef = ref<Menu>();
let workdayDialogRef = ref<EDIalog>();

const { viewport } = useBreakpoint()
const { $icon } = useNuxtApp()

const workday = reactive({
    activator: <HTMLElement | undefined>undefined,
    form: new Workday()
})

const state = reactive({
    workdayList: <Array<Workday>>[...workdays],
    loading: false,
    datePickerDialog: false,
    workdayFormDialog: false
})

const modes = [
    { text: 'Semana', value: Mode.week },
    { text: 'Dia', value: Mode.day }
]

const filters = reactive({
    role: 1,
    scheduleMode: Mode.week,
    space: spaces[0],
    date: new Date(),

})

const formattedDate = computed(() => new UtilDate(filters.date).format('month-DD/month-MM, week-dddd '))

watch(() => filters, () => {
    state.loading = true;
    setTimeout(() => {
        state.loading = false;
    }, 2000)
}, { deep: true })

watch(() => viewport, ({ lg }) => {
    if (!lg) filters.scheduleMode = Mode.day
}, { deep: true });

const openFilterPickerMenu = (evt: Event): void => {
    if (viewport.xs || viewport.sm) {
        state.datePickerDialog = true;
        evt.stopImmediatePropagation()
    }
}

const submitWorkday = (objectWorkday: Workday) => {
    if (workday.form.id !== 'new') {
        const index = state.workdayList.findIndex(({ id }) => id === workday.form.id)
        state.workdayList.splice(index, 1, new Workday(objectWorkday))
    } else {
        state.workdayList.push(new Workday(objectWorkday))
    }
}

const handleScheduleClickClick = (obj: { data: SlotEvent, nativeEvent: MouseEvent }): void => {
    workday.form = new Workday(obj.data);
    if (viewport.xs || viewport.sm) {
        state.workdayFormDialog = true;
    } else {
        workday.activator = obj.nativeEvent.target as HTMLElement
        if (!workday.activator?.getAttribute('aria-hasmenu')) {
            nextTick(() => {
                workdayMenuRef.value?.openMenu()
            })
        }
    }
}

const closeMenu = () => workdayMenuRef.value?.closeMenu()
const closeDialog = () => workdayDialogRef.value?.close()


</script>
<style lang="scss">
.schedule-page {
    #filer-date-picker {
        .e-field__control {
            min-width: 190px;
        }
    }
}

.e-menu-container {
    &[data-filter-date-picker-menu] {
        margin-top: -10px;
    }

    &[data-work-day-menu] {
        transition: 300ms all;
        width: calc(100% - 24px);
        z-index: 10;

        @include _from_sm {
            width: 500px;
        }
    }
}
</style>
