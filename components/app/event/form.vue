<template>
    <div class="white">
        <div class="d-flex justify-flex-end px-3">
            <div>
                <h3 :class="['dialog-title', `${state.form.color}--text`]" v-html="modalTitle"></h3>
                <p>Rellena los campos necesarios para crear un nuevo evento:</p>
            </div>
            <ESpacer />
            <EButton :icon="$icon.clear" @click="closeMenu" />
        </div>

        <EForm ref="formComponent" v-model="state.formValid" class="ma-0" :color="state.form.color" @submit="submit">
            <ESelect v-model="state.form.entityId" :rules="[_required]" clearable autocomplete label="Actividad"
                :items="availableActivity" cols="24">
            </ESelect>
            <ESelect v-model="state.form.user" :rules="[_required]" label="Monitor" chip item-col="2"
                :items="availableUsers" cols="24">
                <template #selection="{ selection }">
                    <EChip :prepend-avatar="selection?.avatar" :avatar-size="32" text>
                        {{ selection?.text }}
                    </EChip>
                </template>
                <template #item="{ attrs, item }">
                    <e-list-item v-bind="attrs" :prepend-avatar="item.avatar">
                        {{ item.text }}
                    </e-list-item>
                </template>
            </ESelect>

            <EMenu origin="bottom right" data-session-form-date-picker transition="scale" check-offset offset-x="12">
                <template #activator="attrs">
                    <ETextField :modelValue="formattedDate" input-align="end" label="Cambios de fecha" v-bind="attrs"
                        :append-icon="$icon.calendar" cols="24" input-readonly />
                </template>
                <EDatePicker :model-value="state.form.start" :rules="[_required]" :icon-next="$icon.pickerIconeNext"
                    :color="state.form.color" :icon-prev="$icon.pickerIconPrev" close-on-change
                    @update:model-value="datePickerChange($event)" />
            </EMenu>
            <ETimePicker v-model="state.form.start" label="inicio" :rules="[_required]" />
            <ETimePicker v-model="state.form.end" label="fin" :rules="[_required]" />
            <EFormColumn cols="24" class="pa-0 mt-4">
                <EButton :color="state.form.color" block depressed type="submit" :disabled="!state.formValid"
                    :loading="state.loading">
                    Aceptar</EButton>
            </EFormColumn>

        </EForm>
    </div>
</template>

<script lang="ts" setup>
import Event from '@/models/event';
import UtilDate from '@/models/date';
import { Form } from '~~/components/shared/form/types';
import { EDIalog } from '~~/components/shared/dialog/index.vue';
import { ContainerMenuInterface } from '~~/components/shared/menu/types';

export interface Props {
    event?: Event,
    date: Date | string,
}
const { $icon } = useNuxtApp()
const { _required } = useRules()
const formComponent = ref<Form>()

const state = reactive({
    formValid: true,
    loading: false,
    form: new Event()
})

const props = defineProps<Props>()

const dialog = inject<EDIalog | undefined>("EDialog", undefined);
const menuContainer = inject<ContainerMenuInterface | undefined>("EMenuContainer", undefined);

const availableUsers = [
    { text: 'User 1', value: 1, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { text: 'User 2', value: 2, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { text: 'User 3', value: 3, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { text: 'User 4', value: 4, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
]

const availableActivity = [
    { text: '108 horas bajo el sol', value: 1 },
    { text: 'Afrodance', value: 5 },
    { text: 'Bachata', value: 6 },
    { text: 'Americano Padel', value: 7 },
    { text: 'Bailamos por sevillanas', value: 8 },
    { text: 'Body Art', value: 9 },
    { text: 'Body n', value: 10 },
    { text: 'Body combar', value: 11 },
    { text: 'Boxeo', value: 12 },
    { text: 'Calistena', value: 13 },
    { text: 'Dance', value: 14 },
    { text: 'Dana Oriental', value: 15 },
]

const formattedDate = computed(() => new UtilDate(state.form.start).format('month-DD/month-MM/year-YYYY'))
const roleDetail = computed(() => state.form.user ? '' : 'Seleccione primero un usuario')
watch(() => props.event, (value: Event | undefined) => {
    reset()
    if (value) {
        state.form = value
    }
})

const emit = defineEmits<{
    (e: 'click:close', value: boolean): void,
    (e: 'submit', value: Event): void,
    (e: 'update:date', value: string | Date): void,
}>()


const modalTitle = computed((): string => {
    return `Crear jornada &#x2022; Horario Habitual`
})

const datePickerChange = (value: Date | string) => {
    const newDay = new Date(value).getDate()
    if (new Date(props.date).getDate() !== newDay)
        emit('update:date', value)
    state.form.start = new UtilDate(state.form.start).set(newDay, 'days').date
}
const closeMenu = () => {
    emit('click:close', true)
}

const reset = (): void => {
    state.form = new Event()
    nextTick(() => {
        formComponent.value?.reset()
    })
}
const submit = async () => {
    const valid = await formComponent.value?.validate()
    if (valid) {
        state.loading = true;
        setTimeout(async () => {
            emit('submit', { ...state.form })
            state.loading = false;
            dialog?.close(true);
            menuContainer?.closeMenu();
            await nextTick()
            reset()
        }, 300)
    }

}
</script>
<style lang="scss">
.e-menu-container[data-session-form-date-picker] {
    z-index: 10;
}
</style>