<template>
    <Toolbar class="p-p-1">
        <template #left>
            <Button label="Новая карта" icon="pi pi-plus" class="p-mr-2 p-button-sm" />
            <Button label="Разблокировать" icon="pi pi-lock-open" class="p-mr-2 p-button-sm" />
            <Button label="Печать талона" icon="pi pi-print" class="p-mr-2 p-button-sm" @click="getCardAction()" />
            <SplitButton  icon="pi pi-print" class="p-button-secondary" :model="items"></SplitButton>
        </template>
        <template #right>
            <div class="p-inputgroup">
                <InputText class="p-inputtext" placeholder="ФИО, СНИЛС или номер полиса" style="width: 300px;" v-model="searchString"/>
                <Button icon="pi pi-search" class="p-button-warning" @click="getCards"/>
            </div>
        </template>
    </Toolbar>
</template>

<script>
    import { computed, ref } from 'vue'
    import { useStore } from 'vuex'
    import Button from 'primevue/components/button/Button'
    export default {
        name: "Search",
        components: { Button },
        setup () {
            const store = useStore()
            const getCards = () => {
                store.dispatch('card/getCardsAction', { searchString: searchString.value, page: page.value, offset: offset.value })
            }
            const searchString = ref('')
            const page = ref(1)
            const offset = ref(5)
            return {
                searchString,
                getCards
            }
        }
    }
</script>

<style scoped>

</style>
