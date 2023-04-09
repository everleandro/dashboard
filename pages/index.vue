<template>
    <div>
        <h1>Dashboard</h1>
        <!-- <ESelect v-model="test" :rules="[_required]" :items="[1, 2, 3, 4, 5]" />
        <EProgressLinear indeterminate /> -->
    </div>
</template>
<script lang="ts" setup>
const test = ref()
const { _required } = useRules()
</script>