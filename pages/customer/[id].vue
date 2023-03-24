<template>
    <div class="customer_page">
        <EBar depressed>
            <div class="d-flex align-center">
                <EAvatar color="primary">asd</EAvatar>
                <div class="ml-4">
                    <h1>Ever</h1>
                    <p>Santiesteban</p>
                </div>
            </div>

            <ESpacer></ESpacer>

            <EButton icon large @click="dialogModel = true">
                <EIcon :name="$icon.edit"></EIcon>
            </EButton>
            <EButton icon large @click="reset()">
                <EIcon :name="$icon.customerInfo"></EIcon>
            </EButton>
            <EButton icon large @click="validate()">
                <EIcon :name="$icon.dollar"></EIcon>
            </EButton>
        </EBar>

        <EDialog v-model="dialogModel" maxWidth="290">
            <EDatePicker v-model="pickerModel" />
        </EDialog>

        <EExpansion header-title="Datos Identificativos">
            <EExpansionContent>
                <EForm ref="form" outlined no-gutters label-min-width="125">
                    <ETextField v-model="model" lg="12" />

                    <ESelect v-model="selectModel" lg="6" label="sexo" :items="['masculino', 'Femenino']"
                        inputAlign="center" />

                    <ETextField :model-value="pickerModelFormatted" input-readonly lg="6" label="Nacimiento"
                        placeholder="00/00/00" inputAlign="center" @click="dialogModel = true" />

                    <ETextField v-model="model" sm="12" label="Primer Apellido" />

                    <ETextField v-model="model" sm="6" label="Dni" />
                </EForm>
            </EExpansionContent>
        </EExpansion>
    </div>
</template>
<script lang="ts" setup>
import UtilDate from '@/models/date'
const model = ref('')
const form = ref()
const pickerModel = ref(new Date())
const selectModel = ref('masculino')
const dialogModel = ref(false)
const rules = [(val: string) => { return val == "t" || "mojon" }]
const validate = () => {
    form.value.validate()
}
const pickerModelFormatted = computed(() => new UtilDate(pickerModel.value).format('month-DD/month-MM/year-YYYY'))
const reset = () => {
    form.value.reset()
}
</script>