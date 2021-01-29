<template>
    <div>
        <div id="cards-search-panel">
            <CardControlButtons></CardControlButtons>
        </div>
        <div id="cards-wrapper">
            <DataTable :value="cards" :paginator="true" :rows="10"
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       :rowsPerPageOptions="[10,20,50]">
                <template #header>
                    <div style="text-align: right">
                        Карты найденные по запросу: <Badge severity="success" :value="cardsCount"></Badge>
                    </div>
                </template>
                <Column field="cardNumber" header="Карта" headerStyle="width:5%; text-align:center;"  bodyStyle="text-align: center"/>
                <Column field="fullName" header="ФИО" headerStyle="width:20%; text-align:center;"  bodyStyle="text-align: center"/>
                <Column field="insuranceCertificate" header="СНИЛС"  headerStyle="width:20%; text-align:center;"  bodyStyle="text-align: center"/>
                <Column field="policyNumber" header="Полис" headerStyle="width:20%; text-align:center;" bodyStyle="text-align: center"/>
                <Column header="Управление"  headerStyle="text-align:center;" bodyStyle="text-align: center">
                    <template #body="slotProps">
                        <!--<router-link tag="Button" :to="{name: 'get.card', params: {id: slotProps.data.cardId}}">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button p-mr-2"/>
                        </router-link>-->
                        <Button @click="showCard(slotProps.data.cardId)">Перейти</Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import DataTable from 'primevue/components/datatable/DataTable'
import Column from 'primevue/components/column/Column'
import Button from 'primevue/components/button/Button'
import Badge from 'primevue/components/badge/Badge'
import CardControlButtons from '../../components/App/PatientCard/CardControlButtons'
export default {
  name: 'Cards',
  components: { CardControlButtons, Badge, Button, Column, DataTable },
  setup () {
    const store = useStore()
    const router = useRouter()
    const cards = computed(() => store.state.card.patientCards.Cards)
    const cardsCount = computed(() => store.state.card.patientCards.CardsCount || '0')
    const showCard = (cardId) => {
        router.push({name: 'get.card', params: {id: cardId}})
    }
    return {
      cards,
      cardsCount,
      showCard
    }
  }
}
</script>

<style scoped>
    #cards-wrapper{
        padding: 1rem;
    }
</style>
