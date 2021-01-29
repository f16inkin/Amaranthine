<template>
    <div>
        <div id="cards-search-panel">
            <CardControlButtons></CardControlButtons>
        </div>
        <div id="cards-wrapper">
            <DataTable :value="cards" class="p-datatable-sm p-datatable-striped p-datatable-gridlines">
                <template #header>
                    <div style="text-align: right">
                        Карты найденные по запросу: <Badge severity="success" :value="cardsCount"></Badge>
                    </div>
                </template>
                <Column field="cardNumber" header="Карта" headerStyle="width:5%; text-align:center;"  bodyStyle="text-align: center"/>
                <Column field="fullName" header="ФИО" headerStyle="width:20%; text-align:center;"  bodyStyle="text-align: center"/>
                <Column field="insuranceCertificate" header="СНИЛС"  headerStyle="width:20%; text-align:center;"  bodyStyle="text-align: center"/>
                <Column field="policyNumber" header="Полис" headerStyle="width:20%; text-align:center;" bodyStyle="text-align: center"/>
                <Column header="Управление"  bodyStyle="text-align: center">
                    <template #body="slotProps">
                        <router-link tag="Button" :to="{name: 'get.card', params: {id: slotProps.data.cardId}}">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button p-mr-2"/>
                        </router-link>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import DataTable from 'primevue/components/datatable/DataTable'
import Column from 'primevue/components/column/Column'
import Button from 'primevue/components/button/Button'
import InputText from 'primevue/components/inputtext/InputText'
import Badge from 'primevue/components/badge/Badge'
import Toolbar from 'primevue/components/toolbar/Toolbar'
import Dialog from 'primevue/components/dialog/Dialog'
import InputMask from 'primevue/components/inputmask/InputMask'
import CardControlButtons from '../../components/App/PatientCard/CardControlButtons'
export default {
  name: 'Cards',
  components: {CardControlButtons, InputMask, Dialog, Toolbar, Badge, InputText, Button, Column, DataTable },
  setup () {
    const store = useStore()
    const cards = computed(() => store.state.card.patientCards.Cards)
    const cardsCount = computed(() => store.state.card.patientCards.CardsCount || '0')
    return {
      cards,
      cardsCount
    }
  }
}
</script>

<style scoped>
    #cards-wrapper{
        padding: 1rem;
    }
</style>
