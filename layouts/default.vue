<template>
    <e-app>
        <e-bar app fixed clipped color="secondary">
            <e-button :icon="$icon.menu" color="white" large @click="closeDrawer()" />
            <e-spacer />
            <e-button :icon="$icon.maintenance" color="white" large />
            <EMenu width="200" origin="right bottom" data-notification-menu>
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
            <div class="nav__header primary">
                <div class="d-flex justify-center">
                    <!-- <EAvatar :icon="$icon.roles.directorate" color="white" /> -->
                </div>
                <!-- <EExpansion v-model="expansionModel">
                    <template #header>
                        <div>
                            <h4>Ever Santiesteban Jimenez</h4>
                            <p>Administrador</p>
                        </div>

                    </template>
                </EExpansion> -->
            </div>
            <div class="nav__body">
                <!-- <div class="secondary-links">
                    <ETransitionExpand>
                        <div v-show="expansionModel">
                            <e-list>
                                <e-list-item v-for="({ icon, text, to }, index) in secondaryLinks" :key="index" :to="to"
                                    :prepend-icon="icon">
                                    {{ text }}
                                </e-list-item>
                            </e-list>
                        </div>
                    </ETransitionExpand>
                </div> -->
                <div class="main-links">
                    <e-button v-for="({ icon, text, to }, index) in mainLinks" stacked :key="index" :to="to"
                        :prepend-icon="icon" x-large color="secondary">
                        <span class="nav-button-info">{{ text }}</span>
                    </e-button>
                </div>
            </div>
        </EDrawer>

        <EMain>
            <EContainer class="mt-8">
                <NuxtPage />
            </EContainer>
        </EMain>
    </e-app>
</template>
<script lang="ts" setup>
import { mainLinks, secondaryLinks } from "./constants"
const drawerModel = ref(true)
const expansionModel = ref(true)

const closeDrawer = () => {
    drawerModel.value = !drawerModel.value
}

</script>
<style lang="scss" src="./default.style.scss"></style>
