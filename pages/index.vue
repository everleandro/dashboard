<template>
    <div>

        <EMenu text="asd" absolute :full-width="fullWidth">
            <template #activator="attrs">
                <EButton color="primary" v-bind="attrs">disparador menu</EButton>
            </template>
            <ERow noGutter>
                <ECol cols="24">
                    <EButton color="primary" @click="showSecond = !showSecond">{{ showSecond }}</EButton>
                </ECol>
                <ECol cols="24">
                    <EButton color="secondary" @click="fullWidth = !fullWidth">fullWidth</EButton>
                </ECol>
            </ERow>
        </EMenu>


        <h1>{{ fullWidth }}</h1>
    </div>
</template>
<script lang="ts" setup>
const fullWidth = ref(true)
const showSecond = ref(true)
</script>