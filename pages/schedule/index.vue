<template>
    <div class="schedule-page">
        <EBar depressed>
            <div>
                <h1>Horario</h1>
            </div>
        </EBar>

        <EMenu ref="eventMenuRef" data-session-menu :activator="session.activator" check-offset>
            <ScheduleSessionForm v-model:session="session.form" v-model:date="filters.date" @click:close="closeMenu()"
                @submit="submitSession" />
        </EMenu>
        <EForm class="mb-8">
            <EFormColumn lg="min-content">
                <GridListSwitch v-model="filters.scheduleMode" block text-one="Dia" fill-height text-two="Semana"
                    min-width="200" :true-value="Mode.day" :false-value="Mode.week" />
            </EFormColumn>
            <ESelect v-model="filters.space" label="Espacio :" :items="spaces" :readonly="loading" item-text="label"
                return-object item-value="id" cols="24" sm="12" lg="6" />
            <ESelect v-model="filters.role" label="Rol:" :items="roleList" :readonly="loading" cols="24" sm="12" lg="6">
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

            <EMenu origin="bottom right" transition="scale" offset-x="12">
                <template #activator="attrs">
                    <ETextField :modelValue="formattedDate" v-bind="attrs" :append-icon="$icon.calendar" :readonly="loading"
                        cols="24" sm="12" lg="6" input-readonly />
                </template>
                <EDatePicker v-model="filters.date" :icon-next="$icon.pickerIconeNext" :icon-prev="$icon.pickerIconPrev"
                    close-on-change />
            </EMenu>
            <ESpacer />
            <!-- <ESelect v-model="filters.scheduleMode" class="schedule-mode-select" :items="modes" :readonly="loading"
                outlined retain-color /> -->
        </EForm>
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
import { roleList } from "@/models/employee";

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
    { text: 'Dia', value: Mode.day }
]

const filters = reactive({
    role: 1,
    scheduleMode: Mode.day,
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
.e-menu-container[data-session-menu] {
    transition: 300ms all;
    width: calc(100% - 24px);
    z-index: 10;

    @include _from_sm {
        width: 500px;
    }
}
</style>
