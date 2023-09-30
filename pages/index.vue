<template>
    <div>
        <h1>Dashboard</h1>
        <div class="">

            <ETabGroup v-model="tab"  color="primary">
                <ETab value="option-1">
                    <EIcon :name="$icon.schedule" />
                </ETab>
                <ETab value="option-2">
                    <EIcon :name="$icon.schedule" />
                </ETab>
                <ETab value="option-3">
                    <EIcon :name="$icon.schedule" />
                </ETab>
            </ETabGroup>
            <EWindow v-model="tab" class="pa-3">
                <EWindowItem value="option-1">
                    <div class="v-card-text">
                        <p> Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat
                            lorem non metus. Sed a libero. </p>
                        <p> Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus,
                            bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis.
                            Suspendisse non nisl sit amet velit hendrerit rutrum. </p>
                    </div>
                </EWindowItem>
                <EWindowItem value="option-2">
                    <div class="v-card-text">
                        <p> Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat
                            lorem non metus. Sed a libero. </p>

                        <p class="mb-0"> Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque
                            libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut
                            odio. </p>
                    </div>
                </EWindowItem>
                <EWindowItem value="option-3">
                    <div class="v-card-text">

                        <p> Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus,
                            bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis.
                            Suspendisse non nisl sit amet velit hendrerit rutrum. </p>
                        <p class="mb-0"> Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque
                            libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut
                            odio. </p>
                    </div>
                </EWindowItem>
            </EWindow>
        </div>
    </div>
</template>
<script lang="ts" setup>
const model = ref()
const tab = ref('option-1')

const availableUsers = [
    { text: 'User 1 large large large large', value: 1, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { text: 'User 2 large large large large', value: 2, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { text: 'User 3 large large large large', value: 3, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { text: 'User 4 large large large large', value: 4, icon: 'customer', avatar: "https://cdn.vuetifyjs.com/images/john.png" },
]
const { _required } = useRules()
</script>