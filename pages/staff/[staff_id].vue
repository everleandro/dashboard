<template>
    <div class="customer_page">
        <ERow class="mb-12 mt-4">
            <ECol class="d-flex align-center">
                <EAvatar color="primary" src="https://cdn.vuetifyjs.com/images/john.jpg"></EAvatar>
                <div class="ml-4">
                    <h1>Ever Santiesteban</h1>
                    <p>monitor fitness</p>
                </div>
            </ECol>
            <ESpacer></ESpacer>
            <ECol class="d-flex justify-flex-end align-center ">
                <EButton :prepend-icon="editionEnabled ? $icon.accountCheck : $icon.accountEdit" color="primary"
                    :loading="store.savingProfile" :disabled="!profileValid" @click="editAction">
                    {{ editionEnabled ? 'Guardar' : 'Editar' }}
                </EButton>
            </ECol>
        </ERow>

        <EDialog v-model="store.dialogBirthDate" maxWidth="290" :persistent="!identificativeData.birthDate">
            <EDatePicker v-model="identificativeData.birthDate" close-on-change />
        </EDialog>
        <EExpansion header-title="Datos Identificativos">
            <EExpansionContent>
                <EForm ref="identificativeDataForm" v-model="identificativeData.formValid" :disabled="store.savingProfile"
                    outlined no-gutters label-min-width="125">
                    <ETextField v-model="identificativeData.name" :rules="[_required]" placeholder="Nombre" label="Nombre"
                        clearable sm="12" lg="11" />
                    <ERadioGroup v-model="identificativeData.gender" mandatory row label="Sexo" sm="12" lg="7">
                        <ERadio model-value="1" label="M"></ERadio>
                        <ERadio model-value="2" label="F"></ERadio>
                    </ERadioGroup>
                    <ETextField :model-value="birthDateFormatted" input-readonly lg="6" placeholder="00/00/00"
                        label="Nacimiento" @click="store.dialogBirthDate = true" />

                    <ETextField v-model="identificativeData.lastName" placeholder="Primer Apellido" lg="11"
                        label="Primer Apellido" />
                    <ETextField v-model="identificativeData.dni" placeholder="000000A" lg="13" label="Dni" />
                    <ETextField v-model="identificativeData.secondName" placeholder="Segundo apellido" lg="11"
                        label="Segundo apellido" />
                    <ETextField v-model="identificativeData.phone_1" placeholder="+00 000 000 000" lg="7" label="Tel 1"
                        :append-icon="$icon.phone" />
                    <ETextField v-model="identificativeData.phone_2" placeholder="+00 000 000 000" lg="6" label="Tel 2"
                        :append-icon="$icon.phone" />
                    <EFormSpacer />
                    <ETextField v-model="identificativeData.address" placeholder="Direccion" lg="18" label="Direccion" />
                    <ETextField v-model="identificativeData.cp" placeholder="0000" lg="6" label="CP" />
                    <ETextField v-model="identificativeData.city" placeholder="Ciudad" lg="11" label="Ciudad" />
                    <ETextField v-model="identificativeData.province" placeholder="Provincia" lg="13" label="Provincia" />
                    <EFormSpacer />
                    <ETextField v-model="identificativeData.pin" placeholder="0000" lg="11" label="Pin Usuario" />
                    <ETextField v-model="identificativeData.email" :rules="[_email]" placeholder="ejemplo@dominio.com"
                        type="email" :append-icon="$icon.sendEmail" lg="13" label="Email" />
                    <ETextField v-model="identificativeData.password" placeholder="Contraseña" lg="11" label="Contraseña" />
                    <ESwitch v-model="identificativeData.send_email" lg="13" label="switch" />
                </EForm>
            </EExpansionContent>
        </EExpansion>

        <EExpansion header-title="Permisos de Empleado">
            <EExpansionContent>
                <EForm ref="permissionsForm" v-model="permissionsData.formValid" :disabled="store.savingProfile">
                    <ECheckbox v-model="permissionsData.pSchedule" md="12" lg="6" label="Ver Horarios" />
                    <ECheckbox v-model="permissionsData.pCustomer" md="12" lg="6" label="Gestionar Clientes" />
                    <ECheckbox v-model="permissionsData.pProviders" md="12" lg="6" label="Gestionar Proveedores" />
                    <ECheckbox v-model="permissionsData.pBooking" md="12" lg="6" label="Gestionar Reservas" />
                    <ECheckbox v-model="permissionsData.pAccounting" md="12" lg="6" label="Gestionar Contabilidad" />
                    <ECheckbox v-model="permissionsData.pAccounting" md="12" label="Gestionar Productos/servicios" />
                </EForm>
            </EExpansionContent>
        </EExpansion>
    </div>
</template>
<script lang="ts" setup>
import UtilDate from '@/models/date'
const { _email, _required } = useRules()

const editionEnabled: Ref<boolean> = ref<boolean>(true)

const store = reactive({
    savingProfile: false,
    dialogBirthDate: false
})

const identificativeDataForm = ref()
const identificativeData = reactive({
    name: '', gender: '', lastName: '',
    birthDate: new Date(), dni: '',
    secondName: '', phone_1: '',
    phone_2: '', address: '',
    cp: '', city: '', send_email: false,
    province: '', pin: '',
    email: '', password: '',
    formValid: true,
})

const permissionsForm = ref()
const permissionsData = reactive({
    formValid: true, pSchedule: false,
    pCustomer: true, pProviders: false,
    pBooking: false, pAccounting: false,
})

const profileValid = computed(() => {
    return identificativeData.formValid && permissionsData.formValid
})

const birthDateFormatted = computed(() => new UtilDate(identificativeData.birthDate).format('month-DD/month-MM/year-YYYY'))

const editAction = async () => {
    // if (editionEnabled.value) {
    identificativeDataForm.value.validate()
    permissionsForm.value.validate()
    await nextTick()
    if (profileValid.value) {
        store.savingProfile = true;

        setTimeout(() => {
            store.savingProfile = false;
            // editionEnabled.value = false
        }, 3000)
    }
    // } else {
    //     editionEnabled.value = true

    // }
}
</script>