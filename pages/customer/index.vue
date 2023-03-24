<template>
    <div class="customer_page">
        <EBar depressed>
            <div>
                <h1>Clientes</h1>
                <p>22566 clientes</p>
            </div>

            <ESpacer></ESpacer>

            <EButton icon>
                <EIcon :name="$icon.list"></EIcon>
            </EButton>

            <EButton icon>
                <EIcon :name="$icon.grid"></EIcon>
            </EButton>

        </EBar>
    </div>
</template>
<style lang="scss">
h1 {
    +p {
        margin-top: 0px;
    }
}
</style>