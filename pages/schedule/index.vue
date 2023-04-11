<template>
    <div class="schedule-page">
        <EBar depressed>
            <div>
                <h1>Horario</h1>
            </div>
        </EBar>

        <EMenu activator="#filer-date-picker" class="d-none d-md-block" origin="bottom right" transition="scale"
            offset-x="12">
            <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                close-on-change />
        </EMenu>
        <EMenu ref="sessionMenuRef" data-session-menu="true" class="d-none d-md-block" :activator="session.activator"
            check-offset>
            <ScheduleSessionForm v-model:session="session.form" v-model:date="filters.date" @click:close="closeMenu()"
                @submit="submitSession" />
        </EMenu>

        <EDialog v-model="state.datePickerDialog" max-width="290" class="d-block d-md-none" transition="scale">
            <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                close-on-change />
        </EDialog>

        <EDialog ref="sessionDialogRef" v-model="state.sessionFormDialog" class="d-block d-md-none" max-width="500">
            <ScheduleSessionForm v-model:session="session.form" v-model:date="filters.date" @click:close="closeDialog()"
                @submit="submitSession" />
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

        <ESchedule v-model="filters.date" v-model:selected-space="filters.space" row-height="50"
            :events="state.sessionsList" :loading="state.loading" v-model:mode="filters.scheduleMode" :start="60 * 60"
            :step="60 * 60" :spaces="spaces" sticky-top-header="120" @click:empty-slot="handleScheduleClickClick"
            @click:event="handleScheduleClickClick" />
    </div>
</template>
<script lang="ts" setup>
import { sessions, spaces } from './constants'
import UtilDate from '@/models/date';
import Session from '@/models/session';
import { SlotEvent, Mode } from '@/components/shared/schedule/types';
import { Menu } from '@/components/shared/menu/types';
import { EDIalog } from '@/components/shared/dialog/index.vue';
import { roleList } from "@/models/employee";

let sessionMenuRef = ref<Menu>();
let sessionDialogRef = ref<EDIalog>();

const { viewport } = useBreakpoint()
const { $icon } = useNuxtApp()

const session = reactive({
    activator: <HTMLElement | undefined>undefined,
    form: new Session()
})

const state = reactive({
    sessionsList: <Array<Session>>[...sessions],
    loading: false,
    datePickerDialog: false,
    sessionFormDialog: false
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

const submitSession = (objectSession: Session) => {
    if (session.form.id) {
        const index = state.sessionsList.findIndex(({ id }) => id === session.form.id)
        state.sessionsList.splice(index, 1)
    } else {
        state.sessionsList.push(objectSession)
    }
}

const handleScheduleClickClick = (obj: { data: SlotEvent, nativeEvent: MouseEvent }): void => {
    session.form = new Session(obj.data);
    if (viewport.xs || viewport.sm) {
        state.sessionFormDialog = true;
    } else {
        session.activator = obj.nativeEvent.target as HTMLElement
        if (!session.activator?.getAttribute('aria-hasmenu')) {
            nextTick(() => {
                sessionMenuRef.value?.openMenu()
            })
        }
    }
}

const closeMenu = () => sessionMenuRef.value?.closeMenu()
const closeDialog = () => sessionDialogRef.value?.close()


</script>
<style lang="scss">
.schedule-page {
    #filer-date-picker {
        .e-field__control {
            min-width: 180px;
        }
    }
}

.e-menu-container[data-session-menu] {
    transition: 300ms all;
    width: calc(100% - 24px);
    z-index: 10;

    @include _from_sm {
        width: 500px;
    }
}
</style>
