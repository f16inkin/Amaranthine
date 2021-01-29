<template>
    <div>
        <div id="toolbar">
            <Toolbar class="p-p-1">
                <template #left>
                    <Button label="Новая карта" icon="pi pi-plus" class="p-mr-2 p-button-sm" @click="showCardCreationForm"/>

                    <transition name="fade">
                        <div v-show="isBlocked">
                            <Button label="Разблокировать" icon="pi pi-lock-open" class="p-mr-2 p-button-sm" @click="unblockCard"/>
                        </div>
                    </transition>
                    <Button label="Печать талона" icon="pi pi-print" class="p-mr-2 p-button-sm" @click="printTalon"/>

                </template>
                <template #right>
                    <div class="p-inputgroup">
                        <InputText class="p-inputtext" placeholder="ФИО, СНИЛС или номер полиса" style="width: 300px;" v-on:keypress.enter="getCards" v-model="searchString"/>
                        <Button icon="pi pi-search" class="p-button-warning" @click="getCards"/>
                    </div>
                </template>
            </Toolbar>
        </div>
        <div id="overlay">
            <div id="card-create-dialog">
                <Dialog v-model:visible="displayModal" :style="{width: '50vw'}" :modal="true">
                    <template #header>
                        <b>Создание карты пациента</b>
                    </template>
                    <div class="p-grid">
                        <div id="card-number-block" class="p-col-4">
                            <div class="p-mb-2">
                                <label for="card-number" class="p-text-bold">Номер карты:<i style="color:red">*</i></label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                                <InputText id="card-number" type="text" class="p-inputtext-sm" placeholder="Введите номер карты" v-model="cardCreateDTO.CardNumber"/>
                            </div>
                        </div>
                        <div id="empty" class="p-col-8"></div>
                        <div id="surname-block" class="p-col-4">
                            <div class="p-mb-2">
                                <label for="surname" class="p-text-bold">Фамилия:<i style="color:red">*</i></label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                                <InputText id="surname" type="text" class="p-inputtext-sm" placeholder="Введите фамилию" v-model="cardCreateDTO.Surname"/>
                            </div>
                        </div>
                        <div id="first-name-block" class="p-col-4">
                            <div class="p-mb-2">
                                <label for="first-name" class="p-text-bold">Имя:<i style="color:red">*</i></label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                                <InputText id="first-name" type="text" class="p-inputtext-sm" placeholder="Введите имя" v-model="cardCreateDTO.FirstName"/>
                            </div>
                        </div>
                        <div id="second-name-block" class="p-col-4">
                            <div class="p-mb-2">
                                <label for="second-name" class="p-text-bold">Отчество:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                                <InputText id="second-name" type="text" class="p-inputtext-sm" placeholder="Введите отчество" v-model="cardCreateDTO.SecondName"/>
                            </div>
                        </div>
                        <div id="date-birth-block" class="p-col-6">
                            <div class="p-mb-2">
                                <label for="date-birth" class="p-text-bold">Дата рождения:<i style="color:red">*</i></label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                                <InputText id="date-birth" type="date" class="p-inputtext-sm" v-model="cardCreateDTO.DateBirth"/>
                            </div>
                        </div>
                        <div id="gender-block" class="p-col-6">
                            <label class="p-text-bold">Пол<i style="color:red">*</i></label>
                            <div class="p-inputgroup p-mt-2">
                                <RadioButton id="male" class="p-mr-1" name="male" :value="genders.male" v-model="cardCreateDTO.Gender"/>
                                <label for="male" class="p-mr-3">мужской</label>
                                <RadioButton id="female" class="p-mr-1" name="female" :value="genders.female" v-model="cardCreateDTO.Gender"/>
                                <label for="female">женский</label>
                            </div>
                        </div>

                        <div id="policy-block" class="p-col-6">
                            <div class="p-mb-2">
                                <label for="policyNumber" class="p-text-bold">Номер полиса:<i style="color:red">*</i></label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                                <InputMask id="policyNumber" mask="9999-9999-9999-9999" v-model="cardCreateDTO.PolicyNumber"/>
                            </div>
                        </div>
                        <div id="insurance-certificate-block" class="p-col-6">
                            <div class="p-mb-2">
                                <label for="insurance-certificate" class="p-text-bold">СНИЛС:<i style="color:red">*</i></label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                                <InputMask id="insurance-certificate" mask="999-999-999 99" v-model="cardCreateDTO.InsuranceCertificate"/>
                            </div>
                        </div>

                    </div>
                    <template #footer>
                        <Button label="Создать карту" @click="createCard" class="p-button-sm"/>
                    </template>
                </Dialog>
            </div>
           <div id="loader">
               <SpinPreloader v-show="isLoading"></SpinPreloader>
           </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/components/button/Button'
import Toolbar from 'primevue/components/toolbar/Toolbar'
import Dialog from 'primevue/components/dialog/Dialog'
import InputMask from 'primevue/components/inputmask/InputMask'
import SpinPreloader from '../../Core/Preloaders/SpinPreloader'
export default {
  name: 'CardControlButtons',
  components: { SpinPreloader, Button, InputMask, Dialog, Toolbar },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const searchString = ref('')
    const page = ref(1)
    const offset = ref(10)
    const displayModal = ref(false)
    const isLoading = ref(false)
    const card = computed(() => store.state.card.patientCard)
    const isBlocked = computed(() => {
      if (card.value.Owner === '') {
        return false
      } else {
        const accountId = sessionStorage.getItem('AccountId')
        return card.value.Owner === accountId
      }
    })
    const getCards = async () => {
      await store.dispatch('card/getCardsAction', { searchString: searchString.value, page: page.value, offset: offset.value })
      if (route.name === 'get.card') {
        router.push({ name: 'get.cards' })
      }
    }
    const showCardCreationForm = () => {
      displayModal.value = !displayModal.value
    }
    const unblockCard = () => {
      store.dispatch('card/unblockCardAction', card.value.CardId)
    }
    const printTalon = async () => {
      const talon = 'ambulatory'
      isLoading.value = true
      await store.dispatch('card/getTalonAction', { talon: talon, id: route.params.id })
      isLoading.value = false
    }
    /**
       * Создание карты
       */
    const cardCreateDTO = reactive({
      CardNumber: null,
      Surname: null,
      FirstName: null,
      SecondName: null,
      DateBirth: null,
      Gender: 1,
      PolicyNumber: null,
      InsuranceCertificate: null
    })

    const genders = { male: 1, female: 2 }
    const createCard = async () => {
      displayModal.value = false
      isLoading.value = true
      const result = await store.dispatch('card/createCardAction', { cardCreateDTO: cardCreateDTO })
      isLoading.value = false
      router.push({name: 'get.card', params: {id: result.data.id}})
    }
    return {
      searchString,
      displayModal,
      isBlocked,
      isLoading,
      genders,
      cardCreateDTO,
      getCards,
      showCardCreationForm,
      unblockCard,
      printTalon,
      createCard
    }
  }
}
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .8s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
