<template>
    <Panel>
        <template #header>
            <div>
                <i class="pi pi-home p-text-bold" style="color: #15cc15"></i><span class="p-text-bold"> Адреса</span>
            </div>
        </template>
        <template #icons>
            <button class="p-panel-header-icon p-link p-mr-2" @click="changeEditMode" v-show="!onEdit" v-tooltip.top="'Редактировать'">
                <span class="pi pi-pencil"></span>
            </button>
            <button class="p-panel-header-icon p-link p-mr-2" @click="changeEditMode" v-show="onEdit" v-tooltip.top="'Сохранить'">
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
                    <InputText id="region" type="text" class="p-inputtext-sm"/>
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
                    <InputText id="district" type="text" class="p-inputtext-sm"/>
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
                    <InputText id="locality" type="text" class="p-inputtext-sm"/>
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
                    <InputText id="street" type="text" class="p-inputtext-sm"/>
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
                    <InputText id="houseNumber" type="text" class="p-inputtext-sm"/>
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
                    <InputText id="apartment" type="text" class="p-inputtext-sm"/>
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
export default {
  name: 'CardAddresses',
  components: { Panel },
  setup () {
    const store = useStore()
    const onEdit = ref(false)
    const card = computed(() => store.state.card.patientCard)
    const fullAddress = computed(() => (card.value.RegionName + ', ' + card.value.DistrictName + ', ' +
        card.value.LocalityName + ', ' + card.value.StreetName + ', ' + card.value.HouseNumber + ', ' + card.value.Apartment))
    const changeEditMode = () => {
      onEdit.value = !onEdit.value
    }
    return {
      card,
      changeEditMode,
      onEdit,
      fullAddress
    }
  }
}
</script>

<style scoped>

</style>
