<template>
    <div class="customer_page">
        <EBar depressed>
            <div>
                <h1>Clientes</h1>
                <p>22566 clientes</p>
            </div>

            <ESpacer></ESpacer>

            <EButton :prepend-icon="$icon.list" stacked text>Lista</EButton>
            <EButton :prepend-icon="$icon.grid" stacked text>Grid</EButton>

        </EBar>
        <EForm @submit="search">
            <ETextField v-model="filters.searchValue" placeholder="Buscar Cliente" cols="24" md="9" lg="7"
                :append-icon="$icon.search" clearable :readonly="filters.loading" />
            <ESelect v-model="filters.order" label="Ordenar por:" :items="availableOrder" cols="24" sm="16" md="9" lg="7"
                :readonly="filters.loading" />
            <EFormColumn cols="24" sm="8" md="6" lg="5" class="d-flex justify-flex-end">
                <EButton to="/customers/new" color="primary">Añadir cliente</EButton>
            </EFormColumn>
        </EForm>

        <ERow class="mt-12">
            <ECol v-for="item in 20" :key="item" cols="24" lg="12">
                <ECard>
                    <EAvatar src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></EAvatar>
                    <ECardContainer>
                        <h3 class="title">Ever Santiesteban Jimenez</h3>
                        <p>
                            <EIcon :name="$icon.phone" class="mr-4" /> 41359976L
                        </p>
                    </ECardContainer>
                    <EMenu width="200" origin="right bottom" transition="scale">
                        <template #activator="attrs">
                            <EButton v-bind="attrs" :icon="$icon.dotsVertical" />
                        </template>
                        <e-list color="primary" dense>
                            <e-list-item :prepend-icon="$icon.accountEdit" to="/1">
                                editar
                            </e-list-item>
                            <e-list-item :prepend-icon="$icon.accountCancel">
                                Desactivar
                            </e-list-item>
                        </e-list>
                    </EMenu>
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

const filters = reactive({
    searchValue: '',
    order: order.name,
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
        path: `/customers/${id}`
    })
}
</script>
<style lang="scss"></style>