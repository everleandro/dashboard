<template>
    <e-app>
        <e-bar app color="secondary">
            <e-button icon color="white" large rounded @click="closeDrawer()">
                <e-icon :name="$icon.hamburger"></e-icon>
            </e-button>
            <e-spacer />
            <e-button icon color="white" rounded large @click="closeDrawer()">
                <e-icon :name="$icon.maintenance"></e-icon>
            </e-button>
            <EMenu width="200" origin="right bottom">
                <template #activator="attrs">
                    <e-button icon color="white" rounded v-bind="attrs" large>
                        <e-icon :name="$icon.notification"></e-icon>
                    </e-button>
                </template>
                <e-list color="primary">
                    <e-list-item :prepend-icon="$icon.remuneration" :value='1'>
                    </e-list-item>
                    <e-list-item :prepend-icon="$icon.customer" :value="2">
                    </e-list-item>
                </e-list>
            </EMenu>
        </e-bar>

        <EDrawer v-model="drawerModel" nav class="secondary">
            <div class="nav__header primary"></div>
            <div class="nav__body">
                <e-button v-for="({ icon, text, to }, index) in drawerLinks" :key="index" :to="to" icon x-large
                    color="tertiary">
                    <e-icon :name="icon"></e-icon>
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
