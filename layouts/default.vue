<template>
    <e-app>
        <e-bar app fixed color="secondary">
            <e-button :icon="$icon.menu" color="white" large @click="closeDrawer()" />
            <e-spacer />
            <e-button :icon="$icon.maintenance" color="white" large @click="closeDrawer()" />
            <EMenu width="200" origin="right bottom">
                <template #activator="attrs">
                    <e-button color="white" v-bind="attrs" :icon="$icon.notification" large />
                </template>
                <e-list color="primary">
                    <e-list-item :prepend-icon="$icon.remuneration" :value='1'>
                    </e-list-item>
                    <e-list-item :prepend-icon="$icon.customer" :value="2">
                    </e-list-item>
                </e-list>
            </EMenu>
        </e-bar>

        <EDrawer v-model="drawerModel" fixed nav class="secondary">
            <div class="nav__header primary"></div>
            <div class="nav__body">
                <e-button v-for="({ icon, text, to }, index) in drawerLinks" stacked :key="index" :to="to"
                    :prepend-icon="icon" x-large color="secondary">
                    <span class="nav-button-info">{{ text }}</span>
                </e-button>
            </div>
        </EDrawer>

        <EMain>
            <EContainer>
                <slot />
            </EContainer>
        </EMain>
    </e-app>
</template>
<script lang="ts" setup>
import { drawerLinks } from "./constants"
const drawerModel = ref(true)

const closeDrawer = () => {
    drawerModel.value = !drawerModel.value
}

</script>
<style lang="scss" src="./default.style.scss"></style>
