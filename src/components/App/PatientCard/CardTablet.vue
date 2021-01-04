<template>
    <div class="tablet">
        <div class="p-grid p-mb-1 p-mt-1 ">
            <div class="p-col" style=" text-align: center;">
                <span class="p-text-bold" style="font-size: 20px;">Карта № 2132122 - Редактируется пользователем: Купчинская Л.В.</span>
            </div>
        </div>
        <div class="p-grid p-mb-1 p-mt-1">
            <div class="p-col-6">
                <Avatar label="V" class="p-d-flex p-mx-auto" size="xlarge" style="background-color:#2196F3; color: #ffffff" shape="circle"/>
            </div>
            <div class="p-col-6">
                <i class="pi pi-lock p-text-bold p-mb-1 p-mt-1" style="color: green"> Поликлиника</i>
                <i class="pi pi-lock-open  p-text-bold p-mb-1 p-mt-1" style="color: red"> Стоматология</i>
                <i class="pi pi-lock-open  p-text-bold p-mb-1 p-mt-1" style="color: red"> Женская консультация</i>
            </div>
        </div>
        <div class="p-grid p-mb-1 p-mt-1">
            <div class="p-col-12">
                <span class="p-text-bold tablet-name">{{ fullName }}</span>
            </div>
        </div>
        <div id="card-data" class="p-grid p-mb-1 p-mt-1 tablet-segment">
            <div class="p-col-6">
                <span class="p-text-bold pi pi-chevron-circle-right"> Дата рождения:</span>
            </div>
            <div class="p-col-6">{{ dateBirth }} {{ yo}}</div>
            <div class="p-col-6">
                <span class="p-text-bold pi pi-chevron-circle-right"> Пол:</span>
            </div>
            <div class="p-col-6">Женский</div>
            <div class="p-col-6">
                <span class="p-text-bold pi pi-chevron-circle-right"> СНИЛС:</span>
            </div>
            <div class="p-col-6">{{ card.InsuranceCertificate }}</div>
            <div class="p-col-6">
                <span class="p-text-bold pi pi-chevron-circle-right"> ЕНП:</span>
            </div>
            <div class="p-col-6">{{ card.PolicyNumber }}</div>
        </div>
        <div id="passport-data" class="p-grid p-mb-1 p-mt-1 tablet-segment" v-show="passportVisible">
            <div class="p-col-6">
                <span class="p-text-bold pi pi-chevron-circle-right"> Паспорт:</span>
            </div>
            <div class="p-col-6">{{ fullPassport}}</div>
            <div class="p-col-6">
                <span class="p-text-bold pi pi-chevron-circle-right"> Выдан:</span>
            </div>
            <div class="p-col-6">{{ card.FmsDepartment }}</div>
        </div>
        <div id="insurance-data" class="p-grid p-mb-1 p-mt-1 tablet-segment" v-show="insuranceVisible">
            <div class="p-col-6">
                <span class="p-text-bold pi pi-chevron-circle-right"> Свидетельство:</span>
            </div>
            <div class="p-col-6">II-АГ 262314</div>
            <div class="p-col-6">
                <span class="p-text-bold pi pi-chevron-circle-right"> Выдан:</span>
            </div>
            <div class="p-col-6">Отделом ЗАГС Приморского края в Чугуевском районе</div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Avatar from 'primevue/components/avatar/Avatar'
export default {
  name: 'CardTablet',
  components: { Avatar },
  setup () {
    const store = useStore()
    const passportVisible = ref(true)
    const card = computed(() => store.state.card.patientCard)
    const fullName = computed(() => (card.value.Surname + ' ' + card.value.FirstName + ' ' + card.value.SecondName))
    const fullPassport = computed(() => (card.value.PassportSerial + ' ' + card.value.PassportNumber))
    const dateBirth = new Date()// Date(card.value.DateBirth).toDateString()
    // const currentDate = new Date()
    // const _MS_PER_DAY = 1000 * 60 * 60 * 24
    // const dateDiffInDays = (a, b) => {
    // Discard the time and time-zone information.
    // const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDay())
    // const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
    // return Math.floor((utc2 - utc1) / _MS_PER_DAY)
    // }
    const yo = 1// dateDiffInDays(currentDate, dateBirth)
    return {
      passportVisible,
      card,
      fullName,
      fullPassport,
      dateBirth,
      yo
    }
  }
}
</script>

<style scoped>
    .tablet{
        width: inherit;
        height: inherit;
        background-color: #dee2e6;
        padding: 1rem;
    }
    .tablet-segment{
        border: solid 1px;
        border-radius: 5px;
        border-color: #c1c1c1;
    }
    .tablet-name{
        color: #0069d9;
    }
</style>
