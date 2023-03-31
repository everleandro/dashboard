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
        <div class="e-chip__close" aria-label="Close">
            <i class="mdi-close-circle mdi v-icon notranslate v-theme--light v-icon--size-x-small" aria-hidden="true"></i>
        </div>
    </span>
</template>
<style lang="scss" src="./style.scss"></style>