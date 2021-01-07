<template>
    <Panel>
        <template #header>
            <div>
                <i class="pi pi-home p-text-bold" style="color: #15cc15"></i><span class="p-text-bold"> Адреса</span>
            </div>
        </template>
        <template #icons>
            <button class="p-panel-header-icon p-link p-mr-2" @click="editCard" v-show="!onEdit" v-tooltip.top="'Редактировать'">
                <span class="pi pi-pencil"></span>
            </button>
            <button class="p-panel-header-icon p-link p-mr-2" @click="saveCard" v-show="onEdit" v-tooltip.top="'Сохранить'">
                <span class="pi pi-save"></span>
            </button>
        </template>
        <div class="p-grid" v-show="onEdit">
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="region" class="p-text-bold">Регион:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-home"></i>
                    </span>
                    <InputText id="region" type="text" class="p-inputtext-sm" v-model="card.RegionName" @keyup="getDisposition(card.RegionName, 'regions')"/>
                </div>
                <div class="search-result-area" v-if="dispositions.regions.length">
                    <div class="search-result-container">
                        <div  v-for="region in dispositions.regions" :key="region.id" class="patient-card-search-result-line" @click="setDisposition(region)">
                            <div hidden>{{region.RegionId}}</div>
                            <div class="search-result">{{region.RegionName}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="district" class="p-text-bold">Район:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-home"></i>
                    </span>
                    <InputText id="district" type="text" class="p-inputtext-sm" v-model="card.DistrictName" @keyup="getDisposition(card.DistrictName, 'districts')" />
                </div>
                <div class="search-result-area" v-if="dispositions.districts.length">
                    <div class="search-result-container">
                        <div  v-for="district in dispositions.districts" :key="district.id" class="patient-card-search-result-line"  >
                            <div hidden>{{district.id}}</div>
                            <div class="search-result">{{district.district_name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="locality" class="p-text-bold">Населенный пункт:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-home"></i>
                    </span>
                    <InputText id="locality" type="text" class="p-inputtext-sm" v-model="card.LocalityName"  @keyup="getDisposition(card.LocalityName, 'localities')" />
                </div>
                <div class="search-result-area" v-if="dispositions.localities.length">
                    <div class="search-result-container">
                        <div  v-for="locality in dispositions.localities" :key="locality.id" class="patient-card-search-result-line"  >
                            <div hidden>{{locality.id}}</div>
                            <div class="search-result">{{locality.locality_name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="street" class="p-text-bold">Улица:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-home"></i>
                    </span>
                    <InputText id="street" type="text" class="p-inputtext-sm" v-model="card.StreetName"  @keyup="getDisposition(card.StreetName, 'streets')"/>
                </div>
                <div class="search-result-area" v-if="dispositions.streets.length">
                    <div class="search-result-container">
                        <div  v-for="street in dispositions.streets" :key="street.id" class="patient-card-search-result-line"  >
                            <div hidden>{{street.id}}</div>
                            <div class="search-result">{{street.street_name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-col-2">
                <div class="p-mb-2">
                    <label for="houseNumber" class="p-text-bold">Дом:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-home"></i>
                    </span>
                    <InputText id="houseNumber" type="text" class="p-inputtext-sm" v-model="card.HouseNumber"/>
                </div>
            </div>
            <div class="p-col-2">
                <div class="p-mb-2">
                    <label for="apartment" class="p-text-bold">Квартира:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-home"></i>
                    </span>
                    <InputText id="apartment" type="text" class="p-inputtext-sm" v-model="card.Apartment"/>
                </div>
            </div>
        </div>
        <div class="p-grid" v-show="!onEdit">
            <div class="p-col-12">
                <div class="p-mb-2">
                    <label for="region" class="p-text-bold">Адрес проживания:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-home"></i>
                    </span>
                    <InputText type="text" class="p-inputtext-sm" v-model="fullAddress" disabled/>
                </div>
            </div>
        </div>
    </Panel>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Panel from 'primevue/components/panel/Panel'
import InputText from 'primevue/components/inputtext/InputText'
export default {
  name: 'CardAddresses',
  components: { InputText, Panel },
  setup () {
    const store = useStore()
    const onEdit = ref(false)
    let typingTimer = 0
    const card = computed(() => store.state.card.patientCard)
    const dispositions = computed(() => store.state.card.dispositions)
    const fullAddress = computed(() => (card.value.RegionName + ', ' + card.value.DistrictName + ', ' +
        card.value.LocalityName + ', ' + card.value.StreetName + ', ' + card.value.HouseNumber + ', ' + card.value.Apartment))
    const editCard = () => {
      onEdit.value = !onEdit.value
    }
    const saveCard = () => {
        store.dispatch('card/updateCardAction', card.CardId)
        onEdit.value = !onEdit.value
    }
    const getDisposition = (searchString, endpoint) => {
      if (searchString.length > 3) {
          if (typingTimer !== null) {
              clearTimeout(typingTimer)
          }
          typingTimer = setTimeout(() => {
              store.dispatch('card/getDispositionsAction', { endpoint: endpoint, searchString: searchString, limit: 5 })
          }, 500)
      }
    }
    const setDisposition = (payload) => {
        store.dispatch('card/setDispositionAction', payload)
    }

    return {
      card,
      dispositions,
      onEdit,
      fullAddress,
      editCard,
      saveCard,
      getDisposition,
      setDisposition
    }
  }
}
</script>

<style scoped>
    .search-result-container{
        width: 100%;
        border: solid 1px;
        border-color: #dce1e5;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .search-result-area {
        width: 100%;
    }
    .search-result {
        padding: 0.3rem;
        border: solid 1px;
        border-radius: 2px;
        border-color: #e9ecef;
        cursor: pointer
    }
    .search-result:hover{
        background-color: #007bff;
        color: white;
    }
</style>
