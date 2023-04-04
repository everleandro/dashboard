<template>
    <div class="white">
        <div class="d-flex justify-flex-end px-3">
            <div>
                <h3 :class="['dialog-title', `${form.color}--text`]" v-html="modalTitle"></h3>
                <p>Rellena los campos necesarios para crear una nueva jornada:</p>
            </div>
            <ESpacer />
            <EButton :icon="$icon.clear" @click="closeMenu" />
        </div>

        <EForm ref="formComponent" class="ma-0" :color="form.color" @submit="submit">
            <ETextField v-model="form.name" :rules="[_required]" :readonly="loading" placeholder="Titulo" cols="16" />
            <EColorPicker v-model="form.color" :rules="[_required]" label="Color" cols="8" retain-color />
            <ESelect v-model="form.roles" label="Rol" :rules="[_required]" multiple :items="availableRole" cols="24"
                item-col="2">
                <template #item="{ attrs, item }">
                    <e-list-item v-bind="attrs">
                        {{ item.text }}
                    </e-list-item>
                </template>
            </ESelect>
            <ESelect v-model="form.user" :rules="[_required]" label="Usuario" placeholder="Selecciona 1 usuario"
                :items="availableUsers" cols="24" />
            <EMenu origin="bottom right" data-session-form-date-picker transition="scale">
                <template #activator="attrs">
                    <ETextField :modelValue="formattedDate" v-bind="attrs" :append-icon="$icon.calendar" cols="24" sm="10"
                        input-readonly />
                </template>
                <EDatePicker :model-value="form.start" :rules="[_required]" :icon-next="$icon.pickerIconeNext"
                    :color="form.color" :icon-prev="$icon.pickerIconPrev" close-on-change
                    @update:model-value="datePickerChange($event)" />
            </EMenu>
            <ETimePicker v-model="form.start" :rules="[_required]" />
            <ETimePicker v-model="form.end" :rules="[_required]" />
            <EFormColumn cols="24" class="d-flex justify-flex-end">
                <EButton :color="form.color" type="submit" :loading="loading">Aceptar</EButton>
            </EFormColumn>

        </EForm>
    </div>
</template>

<script lang="ts" setup>
import Session from '@/models/session';
import UtilDate from '@/models/date';
import { Form } from '~~/components/shared/form/types';
import { EDIalog } from '~~/components/shared/dialog/index.vue';
import { ContainerMenuInterface } from '~~/components/shared/menu/types';

export interface Props {
    session?: Session,
    date: Date | string,
}
const { $icon } = useNuxtApp()
const { _required } = useRules()
const formComponent = ref<Form>()
const props = defineProps<Props>()
const loading = ref(false);
const dialog = inject<EDIalog | undefined>("EDialog", undefined);
const menuContainer = inject<ContainerMenuInterface | undefined>("EMenuContainer", undefined);

const form = reactive<Session>(new Session())

const availableRole = [
    { text: 'Role x-large 1', value: 1 },
    { text: 'Role x-large 2', value: 2 },
    { text: 'Role large 3', value: 3 },
    { text: 'Role 4', value: 4 },
    { text: 'Role x-large 5', value: 5 },
    { text: 'Role x-large 6', value: 6 },
]

const availableUsers = [
    { text: 'User 1', value: 1, icon: 'customer' },
    { text: 'User 2', value: 2, icon: 'customer' },
    { text: 'User 3', value: 3, icon: 'customer' },
    { text: 'User 4', value: 4, icon: 'customer' },
]

const formattedDate = computed(() => new UtilDate(form.start).format('month-DD/month-MM, week-dddd '))

watch(() => props.session, (value: Session | undefined) => {
    if (value) {
        form.name = "";
        form.start = value.start;
        form.spaceId = value.spaceId;
        form.end = value.end;
    }
})

const emit = defineEmits<{
    (e: 'click:close', value: boolean): void,
    (e: 'submit', value: Session): void,
    (e: 'update:date', value: string | Date): void,
}>()


const modalTitle = computed((): string => {
    const day = new UtilDate(form.start).format('week-dddd')
    return `Crear jornada &#x2022; ${day}`
})

const datePickerChange = (value: Date | string) => {
    const newDay = new Date(value).getDate()
    if (new Date(props.date).getDate() !== newDay)
        emit('update:date', value)
    form.start = new UtilDate(form.start).set(newDay, 'days').date
}
const closeMenu = () => emit('click:close', true)

const reset = (): void => {
    form.start = new Date();
    form.name = '';
    form.end = new Date();
    form.id = 0;
    form.color = 'primary'
    form.spaceId = 0;
    form.roles = [];
    form.user = 0;
    nextTick(() => {
        formComponent.value?.reset()
    })
}
const submit = async () => {
    const valid = await formComponent.value?.validate()
    if (valid) {
        loading.value = true;
        setTimeout(async () => {
            emit('submit', { ...form })
            loading.value = false;
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