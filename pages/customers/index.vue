<template>
    <div class="customer_page">
        <EBar depressed>
            <div>
                <h1>Clientes</h1>
                <p>22566 clientes</p>
            </div>

            <ESpacer></ESpacer>

            <GridListSwitch v-model="state.modeList" :switch-type="switchType.listGrid" />

        </EBar>
        <EForm @submit="search">
            <ETextField v-model="filters.searchValue" placeholder="Buscar Cliente" cols="24" md="9" lg="7"
                :append-icon="$icon.search" clearable :readonly="filters.loading" />
            <ESelect v-model="filters.order" label="Ordenar por:" :items="availableOrder" cols="24" sm="16" md="9" lg="7"
                :readonly="filters.loading" />
            <ESpacer />
            <EFormColumn cols="24" sm="8" md="6" lg="5" class="d-flex justify-flex-end">
                <EButton to="/customers/new" color="primary">Añadir cliente</EButton>
            </EFormColumn>
        </EForm>

        <div class="tab__container">
            <transition :name="listTrasition">
                <ERow class="mt-12" :key="`${state.modeList}`">
                    <ECol v-for="(employee, index) in customers" :key="index" v-bind="colListAttributes">
                        <UserCard :model-value="employee" :card-type="userCardType.customer" :grid-mode="!state.modeList" />
                    </ECol>
                </ERow>
            </transition>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { type as switchType } from "@/components/app/grid-list-switch.vue"
import Customer from "@/models/customer"
import { type as userCardType } from "@/components/app/user/card.vue";

const state = reactive({
    modeList: true
})


enum order {
    name,
    lastName,
}

const customers: Array<Partial<Customer>> = [
    { name: 'Ever Santiesteban', id: 1, avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', phone: '52013954' },
    { name: 'Ever Santiesteban', id: 2, phone: '52013954', },
    { name: 'Ever Santiesteban', id: 3, phone: '52013954', },
    { name: 'Ever Santiesteban', id: 4, phone: '52013954', },
    { name: 'Ever Santiesteban', id: 5, phone: '52013954', },
    { name: 'Ever Santiesteban', id: 6, phone: '52013954', },
    { name: 'Ever Santiesteban', id: 7, phone: '52013954', },
    { name: 'Ever Santiesteban', id: 8, phone: '52013954', },
    { name: 'Ever Santiesteban', id: 9, phone: '52013954', },
    { name: 'Ever Santiesteban', id: 10, phone: '52013954', },
];

const availableOrder = [
    { text: 'Nombre', value: order.name },
    { text: 'Apellido', value: order.lastName }
]

const filters = reactive({
    searchValue: '',
    order: order.name,
    loading: false
})

const search = (evt: SubmitEvent): void => {
    evt.preventDefault()
    filters.loading = true;
    setTimeout(() => {
        filters.loading = false;

    }, 2000)
}
const listTrasition = computed(() => state.modeList ? 'tab-reverse-transition' : 'tab-transition')

const colListAttributes = computed(() => {
    return state.modeList ? { cols: 24, lg: 12 } : { cols: 24, sm: 12, md: 8, xl: 6 }
})
</script>
<style lang="scss"></style>