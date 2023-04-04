<template>
    <span class="e-chip e-chip--size-default" draggable="false">
        <div class="e-chip__prepend">
            <i class="mdi-vuetify mdi v-icon notranslate v-theme--light v-icon--size-default v-icon--start"
                aria-hidden="true"></i>
        </div>
        <div class="e-chip__underlay"></div>
        <slot></slot>

        <div class="e-chip__append">
            <i class="mdi-vuetify mdi v-icon notranslate v-theme--light v-icon--size-default v-icon--end"
                aria-hidden="true"></i>
        </div>
        <div v-if="closable" class="e-chip__close" aria-label="Close">
            <button v-ripple="{ center: true }" type="button" class="e-btn e-btn--icon" @click="handleClickClose">
                <EIcon name="close" />
            </button>
        </div>
    </span>
</template>
<script lang="ts" setup>
export interface Props {
    closable?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'click:close', value: Event): void
}>()

const handleClickClose = (evt: Event) => {
    emit('click:close', evt)
}
</script>
<style lang="scss" src="./style.scss"></style>