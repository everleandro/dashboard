<template>
    <div class="booking-page">
        <EBar depressed>
            <div>
                <h1>Sesiones</h1>
            </div>

        </EBar>
        <EMenu ref="bookingMenuRef" data-booking-menu :activator="booking.activator" check-offset>
            <BookingsForm :booking="booking.form" @click:close="closeMenu()" @submit="submitBooking" />
        </EMenu>

        <EDialog ref="bookingDialogRef" v-model="state.bookingFormDialog" class="d-block d-md-none" max-width="450">
            <BookingsForm :booking="booking.form" @click:close="closeDialog()" @submit="submitBooking" />
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
        <ESchedule v-model="filters.date" v-model:selected-space="filters.space" row-height="50" :events="bookingList"
            :loading="loading" v-model:mode="filters.scheduleMode" :start="60 * 60" :step="60 * 60" :spaces="spaces"
            :schedule-column="scheduleColumns" schedule-after-week sticky-top-header="120"
            @click:empty-slot="handleScheduleClick" @click:event="handleScheduleClick" />
    </div>
</template>
<script lang="ts" setup>
import { bookings, spaces } from './constants'
import UtilDate from '@/models/date';
import Booking from '~~/models/Booking';
import { Mode, ScheduleEvent } from '@/components/shared/schedule/types';
import { Menu } from '@/components/shared/menu/types';
import { EDIalog } from '@/components/shared/dialog/index.vue';

let bookingMenuRef = ref<Menu>();
let bookingDialogRef = ref<EDIalog>();
const { $icon } = useNuxtApp()
const { viewport } = useBreakpoint()

const booking = reactive({
    activator: <HTMLElement | undefined>undefined,
    form: new Booking()
})

const bookingList = ref<Array<Booking>>([...bookings])
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
    bookingFormDialog: false,
})

const filters = reactive({
    role: 1,
    inputSearch: '',
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
    booking.form = new Booking(obj.data);
    if (viewport.xs || viewport.sm) {
        state.bookingFormDialog = true;
    } else {

        booking.activator = obj.nativeEvent.target as HTMLElement
        if (!booking.activator?.getAttribute('aria-hasmenu')) {
            nextTick(() => {
                bookingMenuRef.value?.openMenu()
            })
        }
    }
}

const scheduleColumns = computed(() => {
    if (viewport.xs) return 3
    if (viewport.sm) return 5
    if (viewport.md) return 7
    if (viewport.lg) return 10
    if (viewport.xl) return ''
})

const submitBooking = (objectBooking: Booking) => {
    if (objectBooking.id !== 'new') {
        const index = bookingList.value.findIndex(({ id }) => id === objectBooking.id)
        bookingList.value.splice(index, 1, new Booking(objectBooking))
    } else {
        bookingList.value.push(objectBooking)
    }
}
const closeMenu = () => bookingMenuRef.value?.closeMenu()
const closeDialog = () => bookingDialogRef.value?.close()


</script>
<style lang="scss">
.booking-page {
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

    &[data-booking-menu] {
        transition: 300ms all;
        width: calc(100% - 24px);
        z-index: 10;

        @include _from_sm {
            width: 450px;
        }
    }
}
</style>
