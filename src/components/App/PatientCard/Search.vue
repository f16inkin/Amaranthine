<template>
    <Toolbar class="p-p-1">
        <template #left>
            <Button label="Новая карта" icon="pi pi-plus" class="p-mr-2 p-button-sm" />
            <Button label="Разблокировать" icon="pi pi-lock-open" class="p-mr-2 p-button-sm" />
            <Button label="Печать талона" icon="pi pi-print" class="p-mr-2 p-button-sm" @click="printTalon" />
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
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import Button from 'primevue/components/button/Button'
    import InputText from 'primevue/components/inputtext/InputText'
    export default {
        name: "Search",
        components: {InputText, Button },
        setup () {
            const store = useStore()
            const route = useRoute()
            const getCards = () => {
                store.dispatch('card/getCardsAction', { searchString: searchString.value, page: page.value, offset: offset.value })
                store.state.card.currentView = 'Cards' //Либо лучше закинуть в мутацию, как было, но я буду уверен что вид поменяется
                // тогда когда будет уже сделан ajax запрос
            }
            const searchString = ref('')
            const page = ref(1)
            const offset = ref(5)
            const printTalon = () => {
                let talonPath = `http://192.168.0.6/api/v1/talons/${route.params.id}`;
                window.open(talonPath, '_blank');
            }
            return {
                searchString,
                getCards,
                printTalon
            }
        }
    }
</script>

<style scoped>

</style>
