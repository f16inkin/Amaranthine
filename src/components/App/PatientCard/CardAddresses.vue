<template>
    <Panel>
        <template #header>
            <div>
                <i class="pi pi-home p-text-bold" style="color: #15cc15"></i><span class="p-text-bold"> Адреса</span>
            </div>
        </template>
        <template #icons>
            <button class="p-panel-header-icon p-link p-mr-2" @click="editAddresses" v-show="!onEdit" v-tooltip.top="'Редактировать'">
                <span class="pi pi-pencil"></span>
            </button>
            <button class="p-panel-header-icon p-link p-mr-2" @click="saveAddresses" v-show="onEdit" v-tooltip.top="'Сохранить'">
                <span class="pi pi-save"></span>
            </button>
        </template>
        <div class="p-grid" v-show="onEdit">
            <div class="p-col-12">
                <div class="p-mb-2">
                    <label class="p-text-bold">Адрес проживания:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-home"></i>
                    </span>
                    <InputText type="text" class="p-inputtext-sm" v-model="fullAddress" @input="searchAddress(fullAddress)"/>
                </div>
                <div class="search-result-area" v-if="outputContainer.length">
                    <div class="search-result-container">
                        <div  v-for="address in outputContainer" class="patient-card-search-result-line" @click="setAddress(address)">
                            <div class="search-result">{{address.OutputString}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="p-col-12">
                <div class="p-mb-2">
                    <label class="p-text-bold">Адрес регистрации:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-home"></i>
                    </span>
                    <InputText type="text" class="p-inputtext-sm" />
                </div>
            </div>-->
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
                    <InputText type="text" class="p-inputtext-sm" v-model="fullAddressReal" disabled/>
                </div>
            </div>
        </div>
    </Panel>
</template>

<script>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Panel from 'primevue/components/panel/Panel'
import InputText from 'primevue/components/inputtext/InputText'
export default {
  name: 'CardAddresses',
  components: { InputText, Panel },
  setup () {
    let typingTimer = 0
    const store = useStore()
    const route = useRoute()
    const onEdit = ref(false)
    const editButtonDisabled = ref(false)
    const saveButtonDisabled = ref(true)
    const card = computed(() => store.state.card.patientCard)
    const residenceAddress = computed(() => store.state.card.patientCardAddresses.ResidenceAddress)
    const fullAddressReal = computed(() => {
        let regionName = residenceAddress.value.RegionName  || ''
        let districtName = residenceAddress.value.DistrictName || ''
        let localityName = residenceAddress.value.LocalityName || ''
        let streetName = residenceAddress.value.StreetName ? ', ул. ' + residenceAddress.value.StreetName : ''
        let houseNumber = residenceAddress.value.HouseNumber ? ', д. ' + residenceAddress.value.HouseNumber : ''
        let apartment = residenceAddress.value.Apartment ? ', кв. ' + residenceAddress.value.Apartment : ''
        return  regionName + ', ' + districtName + ', с. ' + localityName + streetName + houseNumber + apartment
    })
    const fullAddress = ref();
    //Это объект будет использоватся для обновления адресов, для отправки в экшн
    const DTOContainer = reactive({
          PatientCardId: null,
          AddressId: null,//residenceAddress.value.AddressId,
          AddressTypeId: null,//residenceAddress.value.AddressTypeId,
          RegionId: null,
          RegionName: null,
          DistrictId: null,
          DistrictName: null,
          LocalityId: null,
          LocalityName: null,
          StreetId: null,
          StreetName: null,
          HouseNumber: null,
          Apartment: null
      })
    const outputContainer = reactive([]);
      const getFullAddress = () => {
          let regionName = residenceAddress.value.RegionName  || ''
          let districtName = residenceAddress.value.DistrictName || ''
          let localityName = residenceAddress.value.LocalityName || ''
          let streetName = residenceAddress.value.StreetName ? ', ул. ' + residenceAddress.value.StreetName : ''
          let houseNumber = residenceAddress.value.HouseNumber ? ', д. ' + residenceAddress.value.HouseNumber + ', ' : ''
          let apartment = residenceAddress.value.Apartment ? 'кв. ' + residenceAddress.value.Apartment : ''
          return  regionName + ', ' + districtName + ', с. ' + localityName + streetName + houseNumber + apartment
      }
    //Приватные методы
    const searchStreets = async(disassembled) => {
        outputContainer.length = 0
        let result = await store.dispatch('card/searchAddressAction', { target: 'streets', searchString: disassembled[3], limit: 5 })
        if (result) {
            Object.keys(result).forEach((k) => {
                let buffer = {
                    Target: 'Street',
                    OutputString: null,
                    StreetId: null
                }
                buffer.OutputString = disassembled[0] +', '+ disassembled[1]+', с. '+ disassembled[2]+', ул.' + result[k]['StreetName']
                buffer.StreetName= result[k]['StreetName']
                buffer.StreetId= result[k]['StreetId']
                outputContainer.push(buffer)
            })
        }else {
            let errorBuffer = {
                Target: 'Error',
                OutputString: null,
            }
            errorBuffer.OutputString = `Улица ${disassembled[3]} не найдена в справочнике`
            outputContainer.push(errorBuffer)
        }
    }
    const setStreets = (container) => {
        outputContainer.length = 0
        DTOContainer.StreetId = container.StreetId
        DTOContainer.StreetName = container.StreetName
        DTOContainer.HouseNumber = null
        DTOContainer.Apartment = null
      }
    //Населенные пункты
    const searchLocalities = async(disassembled, searchString) => {
        outputContainer.length = 0
        let result = await store.dispatch('card/searchAddressAction', { target: 'localities', searchString: searchString, limit: 5 })
        if (result) {
            Object.keys(result).forEach((k) => {
                let buffer = {
                    Target: 'Localities',
                    OutputString: null,
                    LocalityName: null,
                    LocalityId: null,
                    DistrictName: null,
                    DistrictId: null,
                    RegionName: null,
                    RegionId: null
                }
                buffer.OutputString = disassembled[0] +', '+ disassembled[1]+', с. '+ disassembled[2]+', ул.' + result[k]['StreetName']
                buffer.OutputString = result[k]['RegionName'] +', '+ result[k]['DistrictName']+', с. '+ result[k]['LocalityName']
                buffer.LocalityName= result[k]['LocalityName']
                buffer.LocalityId= result[k]['LocalityId']
                buffer.DistrictName= result[k]['DistrictName']
                buffer.DistrictId= result[k]['DistrictId']
                buffer.RegionName= result[k]['RegionName']
                buffer.RegionId= result[k]['RegionId']
                outputContainer.push(buffer)
            })
        }else {
            let errorBuffer = {
                Target: 'Error',
                OutputString: null,
            }
            errorBuffer.OutputString = `Населенный пункт ${searchString} не найден в справочнике`
            outputContainer.push(errorBuffer)
        }
    }
    const setLocalities = (container) => {
        outputContainer.length = 0
        DTOContainer.RegionId = container.RegionId
        DTOContainer.RegionName = container.RegionName
        DTOContainer.DistrictId = container.DistrictId
        DTOContainer.DistrictName = container.DistrictName
        DTOContainer.LocalityId = container.LocalityId
        DTOContainer.LocalityName = container.LocalityName
        DTOContainer.StreetId = null
        DTOContainer.StreetName =  null
        DTOContainer.HouseNumber = null
        DTOContainer.Apartment = null
    }
    //Дом и квартира
    const setHouseNumber = (container) => {
        outputContainer.length = 0
        DTOContainer.Apartment = null
        DTOContainer.HouseNumber = container.HouseNumber
    }
    const setApartment = (container) => {
        outputContainer.length = 0
        DTOContainer.Apartment = container.Apartment
      }
    const setErrorMessageAway = () => {
        fullAddress.value = ''
        outputContainer.length = 0
    }
    //Методы анализа строки поиска
    const disassembleSearchString = (searchString) => {
        let output = searchString.split(',').map(val => val.trim()).filter(val => val !== '')
        if(output[5]){
            output[5] = output[5].replace(/\D/g,'')
        }
        if(output[4]){
            output[4] = output[4].replace(/\D/g,'')
        }
        if(output[3]){
            output[3] = output[3].replace("ул.",'')
        }
        if(output[2]){
            output[2] = output[2].replace("с.",'')
        }
        return output.map(val => val.trim()).filter(val => val !== '')
    }
    const analyseSearchString = async(disassembled) => {
        switch (disassembled.length) {
            case 6:
                outputContainer.length = 0
                const apartmentBuffer = {
                    Target: 'Apartment',
                    OutputString: null,
                    Apartment: null
                }
                apartmentBuffer.Apartment = disassembled[5]
                apartmentBuffer.OutputString = disassembled[0] +', '+ disassembled[1]+', с. '+ disassembled[2]+', ул. '+ disassembled[3]+', д. '+ disassembled[4] + ', кв. ' + disassembled[5]
                outputContainer.push(apartmentBuffer)
                break;
            case 5:
                const houseBuffer = {
                    Target: 'HouseNumber',
                    OutputString: null,
                    HouseNumber: null
                }
                outputContainer.length = 0
                houseBuffer.HouseNumber = disassembled[4]
                houseBuffer.OutputString = disassembled[0] +', '+ disassembled[1]+', с. '+ disassembled[2]+', ул. '+ disassembled[3]+', д. '+ disassembled[4]
                outputContainer.push(houseBuffer)
                break;
            case 4:
                searchStreets(disassembled)
                break;
            case 3:
                searchLocalities(disassembled, disassembled[2])
                break;
            case 1:
                searchLocalities(disassembled, disassembled[0])
                break;
        }
    }
    //Публичные методы
    const setAddress = (container) =>{
        fullAddress.value = container.OutputString +','
        switch (container.Target) {
            case 'Localities': setLocalities(container); break;
            case 'Street': setStreets(container); break;
            case 'HouseNumber': setHouseNumber(container); break;
            case 'Apartment': setApartment(container); break;
            case 'Error': setErrorMessageAway(); break;
        }
    }
    const editAddresses = async() => {
        DTOContainer.PatientCardId = card.value.CardId
        DTOContainer.AddressId = residenceAddress.value.AddressId
        DTOContainer.AddressTypeId = residenceAddress.value.AddressTypeId
        DTOContainer.RegionId = residenceAddress.value.RegionId
        DTOContainer.RegionName = residenceAddress.value.RegionName
        DTOContainer.DistrictId = residenceAddress.value.DistrictId
        DTOContainer.DistrictName = residenceAddress.value.DistrictName
        DTOContainer.LocalityId = residenceAddress.value.LocalityId
        DTOContainer.LocalityName = residenceAddress.value.LocalityName
        DTOContainer.StreetId = residenceAddress.value.StreetId
        DTOContainer.StreetName = residenceAddress.value.StreetName
        DTOContainer.HouseNumber = residenceAddress.value.HouseNumber
        DTOContainer.Apartment = residenceAddress.value.Apartment
        //fullAddress.value = residenceAddress.value.RegionName + ', ' +residenceAddress.value.DistrictName + ', с. ' +
        //    residenceAddress.value.LocalityName + ', ул. ' + residenceAddress.value.StreetName + ', д. ' + residenceAddress.value.HouseNumber + ', кв. ' + residenceAddress.value.Apartment
        fullAddress.value = getFullAddress()
        onEdit.value = !onEdit.value
    }
    const saveAddresses = async() => {
        onEdit.value = !onEdit.value
        saveButtonDisabled.value = !saveButtonDisabled.value
        if (DTOContainer.AddressId !== null){
            await store.dispatch('card/updateAddressesAction', DTOContainer)
        }else{
            await store.dispatch('card/createAddressesAction', DTOContainer)
        }
        editButtonDisabled.value = !editButtonDisabled.value
    }
    const searchAddress = (searchString) => {
      if (searchString.length > 3) {
        if (typingTimer !== null) {
          clearTimeout(typingTimer)
        }
        typingTimer = setTimeout(() => {
            let disassembledSearchString = disassembleSearchString((searchString))
            analyseSearchString(disassembledSearchString)
        }, 300)
      }else if (searchString.length === 0) {
          store.dispatch('card/clearDispositionsAction', endpoint)
      }
    }
    store.dispatch('card/getAddressesAction', route.params.id)
    return {
      fullAddress,
      fullAddressReal,
      outputContainer,
      onEdit,
      setAddress,
      editAddresses,
      saveAddresses,
      searchAddress
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
