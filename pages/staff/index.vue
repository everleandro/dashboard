<template>
    <div class="customer_page">
        <EBar depressed>
            <div>
                <h1>Empleados</h1>
                <p>12 empleados</p>
            </div>

            <ESpacer></ESpacer>

            <EButton :prepend-icon="$icon.list" stacked text>Lista</EButton>
            <EButton :prepend-icon="$icon.grid" stacked text>Grid</EButton>

        </EBar>
        <EForm @submit="search">
            <ETextField v-model="filters.searchValue" placeholder="Buscar Cliente" :append-icon="$icon.search" clearable
                :readonly="filters.loading" cols="24" sm="12" md="8" lg="6" />
            <ESelect v-model="filters.order" label="Orden:" :items="availableOrder" :readonly="filters.loading" cols="24"
                sm="12" md="8" lg="6" />
            <ESelect v-model="filters.role" label="Rol:" :items="availableRole" :readonly="filters.loading" clearable
                cols="24" sm="12" md="8" lg="6" />
            <EFormColumn class="d-flex justify-flex-end">
                <EButton to="/staff/new" color="primary">Añadir Empleado</EButton>
            </EFormColumn>
        </EForm>

        <ERow class="mt-12">
            <ECol v-for="item in 20" :key="item" cols="24" lg="12">
                <ECard>
                    <EAvatar src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></EAvatar>
                    <ECardContainer>
                        <h3 class="title">Ever Santiesteban Jimenez</h3>
                        <p>
                            <EIcon :name="$icon.phone" class="mr-2" /> 41359976
                        </p>
                    </ECardContainer>

                    <EMenu width="200" origin="right bottom" transition="scale">
                        <template #activator="attrs">
                            <EButton v-bind="attrs" :icon="$icon.dotsVertical" />
                        </template>
                        <e-list color="primary" dense>
                            <e-list-item :prepend-icon="$icon.accountEdit" @click:item="goToCustomerDetail(1)">
                                editar
                            </e-list-item>
                            <e-list-item :prepend-icon="$icon.accountCancel">
                                Desactivar
                            </e-list-item>
                        </e-list>
                    </EMenu>
                    <template #footer>
                        <EDivider />
                        <div class="pa-1">
                            <EChip class="ma-1">Administrador</EChip>
                            <EChip class="ma-1">limpieza</EChip>
                            <EChip class="ma-1">entrenador</EChip>
                            <EChip class="ma-1">nananan</EChip>
                            <EChip class="ma-1">role 3</EChip>
                            <EChip class="ma-1">role random</EChip>
                        </div>
                    </template>
                </ECard>
            </ECol>
        </ERow>
    </div>
</template>
<script lang="ts" setup>
import { order } from './constants'
const router = useRouter()
const route = useRoute()

const availableOrder = [
    { text: 'Nombre', value: order.name },
    { text: 'Apellido', value: order.lastName }
]

const availableRole = [
    { text: 'Role 1', value: order.name },
    { text: 'role 2', value: order.lastName }
]

const filters = reactive({
    searchValue: '',
    order: order.name,
    role: order.name,
    loading: false
})

const search = (evt: MouseEvent): void => {
    evt.preventDefault()
    filters.loading = true;
    setTimeout(() => {
        filters.loading = false;

    }, 2000)
}
const goToCustomerDetail = (id: string | number) => {
    router.push({
        path: `/staff/${id}`
    })
}
</script>
<style lang="scss"></style>