<template>
    <div>
        <h1>Dashboard</h1>
        <ESelect v-model="model" :rules="[_required]" chip autocomplete label="Usuario" clearable item-col="2"
            :items="availableUsers" cols="24">


        </ESelect>
    </div>
</template>
<script lang="ts" setup>
const model = ref()
const test = ref('')

const availableUsers = [
    { text: 'User 1 large large large large', value: 1, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { text: 'User 2 large large large large', value: 2, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { text: 'User 3 large large large large', value: 3, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { text: 'User 4 large large large large', value: 4, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
]
const { _required } = useRules()
</script>