<template>
    <div class="customer_page">
        <EBar depressed>
            <div>
                <h1>Empleados</h1>
                <p>12 empleados</p>
            </div>

            <ESpacer></ESpacer>

            <GridListSwitch v-model="state.modeList" :switch-type="switchType.listGrid" />

        </EBar>
        <EForm @submit="search">
            <ETextField v-model="filters.searchValue" placeholder="Buscar Cliente" :append-icon="$icon.search" clearable
                :readonly="filters.loading" cols="24" sm="12" md="8" lg="6" />
            <ESelect v-model="filters.order" label="Orden:" :items="availableOrder" :readonly="filters.loading" cols="24"
                sm="12" md="8" lg="6" />
            <ESelect v-model="filters.role" label="Rol:" :items="roleList" :readonly="filters.loading" cols="24" sm="12"
                lg="6">
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
            <EFormColumn class="d-flex justify-flex-end">
                <EButton to="/staff/new" color="primary">Añadir Empleado</EButton>
            </EFormColumn>
        </EForm>

        <div class="tab__container">
            <transition :name="listTrasition">
                <ERow class="mt-12" :key="`${state.modeList}`">
                    <ECol v-for="(employee, index) in emloyees" :key="index" v-bind="colListAttributes">
                        <UserCard :model-value="employee" :card-type="userCardType.employee" :grid-mode="!state.modeList" />
                    </ECol>
                </ERow>
            </transition>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Employee, roleList } from "@/models/employee";
import { type as userCardType } from "@/components/app/user/card.vue";
import { type as switchType } from "@/components/app/grid-list-switch.vue"
const router = useRouter()

enum order { name, lastName }

const state = reactive({
    modeList: true
})

const emloyees: Array<Partial<Employee>> = [
    { name: 'Ever Santiesteban', id: 1, avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', phone: '52013954', roles: roleList.slice(0, 4) },
    { name: 'Ever Santiesteban', id: 2, phone: '52013954', roles: roleList.slice(3, 5) },
    { name: 'Ever Santiesteban', id: 3, phone: '52013954', roles: roleList.slice(5, 8) },
    { name: 'Ever Santiesteban', id: 4, phone: '52013954', roles: roleList.slice(-1) },
    { name: 'Ever Santiesteban', id: 5, phone: '52013954', roles: roleList.slice(10, 11) },
    { name: 'Ever Santiesteban', id: 6, phone: '52013954', roles: roleList.slice(8, 9) },
    { name: 'Ever Santiesteban', id: 7, phone: '52013954', roles: roleList.slice(8, 9) },
    { name: 'Ever Santiesteban', id: 8, phone: '52013954', roles: roleList.slice(3, 9) },
    { name: 'Ever Santiesteban', id: 9, phone: '52013954', roles: roleList.slice(3, 5) },
    { name: 'Ever Santiesteban', id: 10, phone: '52013954', roles: roleList.slice(2, 9) },
]

const availableOrder = [
    { text: 'Nombre', value: order.name },
    { text: 'Apellido', value: order.lastName }
]

const filters = reactive({
    searchValue: '',
    order: order.name,
    role: order.name,
    loading: false
})

const search = (evt: SubmitEvent): void => {
    evt.preventDefault()
    filters.loading = true;
    setTimeout(() => {
        filters.loading = false;
    }, 2000)
}

const colListAttributes = computed(() => {
    return state.modeList ?  { cols: 24, lg: 12 }:{ cols: 24, sm: 12, md: 8, xl: 6 }
})
const listTrasition = computed(() => state.modeList ? 'tab-reverse-transition' : 'tab-transition')
</script>
<style lang="scss"></style>