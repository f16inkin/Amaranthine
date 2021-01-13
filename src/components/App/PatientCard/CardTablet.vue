<template>
    <div class="tablet p-shadow-7">
        <div class="p-grid p-mb-1 p-mt-1 ">
            <div class="p-col" style=" text-align: center;">
                <span class="p-text-bold" style="font-size: 20px;">Карта № {{ card.CardNumber }} <!-- Редактируется пользователем: Купчинская Л.В.--></span>
            </div>
        </div>
        <div class="p-grid p-mb-1 p-mt-1">
            <div class="p-col-6">
                <div class="tablet-gender-avatar">
                    <img :src="genderImage">
                </div>
            </div>
            <div class="p-col-6">
                <i class="pi pi-lock p-text-bold p-mb-1 p-mt-1" style="color: green"> Поликлиника [Coming soon..]</i>
                <i class="pi pi-lock-open  p-text-bold p-mb-1 p-mt-1" style="color: red"> Стоматология [Coming soon..]</i>
                <i class="pi pi-lock-open  p-text-bold p-mb-1 p-mt-1" style="color: red"> Женская консультация [Coming soon..]</i>
            </div>
        </div>
        <div class="p-grid p-mb-1 p-mt-1">
            <div class="p-col">
                <span class="p-text-bold tablet-name">{{ fullName }}</span>
            </div>
        </div>
        <div id="card-data" class="p-grid p-mb-1 p-mt-1 tablet-segment">
            <div id="date-birth" class="tablet-row" v-if="card.DateBirth">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> Дата рождения:</span>
                </div>
                <div class="p-col-6">{{ dateBirth }} <span v-if="!card.DateDeath">{{ yearsOld }}</span></div>
            </div>
            <div id="date-death" class="tablet-row" v-if="card.DateDeath">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> Дата смерти:</span>
                </div>
                <div class="p-col-6">{{ dateDeath }} {{ yearsOldBeforeDeath }}</div>
            </div>
            <div id="gender" class="tablet-row">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> Пол:</span>
                </div>
                <div class="p-col-6">{{ gender }}</div>
            </div>
            <div id="insurance-certificate" class="tablet-row" v-if="card.InsuranceCertificate">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> СНИЛС:</span>
                </div>
                <div class="p-col-6">{{ card.InsuranceCertificate }}</div>
            </div>
            <div id="policy" class="tablet-row" v-if="card.PolicyNumber">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> ЕНП:</span>
                </div>
                <div class="p-col-6">{{ card.PolicyNumber }}</div>
            </div>
        </div>
        <div id="passport-data" class="p-grid p-mb-1 p-mt-1 tablet-segment" v-if="card.PassportSerial">
            <div id="full-passport" class="tablet-row">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> Паспорт:</span>
                </div>
                <div class="p-col-6">{{ fullPassport }}</div>
            </div>
            <div id="passport-date-of-issue" class="tablet-row" v-if="card.PassportDateOfIssue">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> Дата выдачи:</span>
                </div>
                <div class="p-col-6">{{ passportDateOfIssue }}</div>
            </div>
            <div id="fms-department" class="tablet-row" v-if="card.FmsDepartment">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> Выдан:</span>
                </div>
                <div class="p-col-6">{{ card.FmsDepartment }}</div>
            </div>
        </div>
        <div id="insurance-data" class="p-grid p-mb-1 p-mt-1 tablet-segment" v-if="card.BirthCertificateSerial">
            <div id="full-birth-certificate" class="tablet-row">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> Свидетельство:</span>
                </div>
                <div class="p-col-6">{{ fullBirthCertificate }}</div>
            </div>
            <div id="birth-certificate-date-of-issue" class="tablet-row" v-if="card.BirthCertificateDateOfIssue">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> Дата выдачи:</span>
                </div>
                <div class="p-col-6">{{ birthCertificateDateOfIssue }}</div>
            </div>
            <div id="registry-office" class="tablet-row">
                <div class="p-col-6">
                    <span class="p-text-bold pi pi-chevron-circle-right"> Выдан:</span>
                </div>
                <div class="p-col-6">{{ card.RegistryOffice }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'CardTablet',
  setup () {
    // СИСТЕМНОЕ ОКРУЖЕНИЕ
    const store = useStore()
    const card = computed(() => store.state.card.patientCard)
    const fullName = computed(() => (card.value.Surname + ' ' + card.value.FirstName + ' ' + card.value.SecondName))
    // ПАСПОРТ
    const fullPassport = computed(() => (card.value.PassportSerial + ' ' + card.value.PassportNumber))
    const passportDateOfIssue = computed(() => new Date(card.value.PassportDateOfIssue).toLocaleDateString())
    // СВИДЕТЕЛЬСВО О РОЖДЕНИИ
    const fullBirthCertificate = computed(() => (card.value.BirthCertificateSerial + ' ' + card.value.BirthCertificateNumber))
    const birthCertificateDateOfIssue = computed(() => new Date(card.value.BirthCertificateDateOfIssue).toLocaleDateString())
    // ВЫЧИЛЕНИЕ ЛЕТ ЖИЗНИ, СМЕРТИ
    const dateBirth = computed(() => new Date(card.value.DateBirth).toLocaleDateString())
    const dateDeath = computed(() => new Date(card.value.DateDeath).toLocaleDateString())
    const yearsOld = computed(() => {
      const date1 = new Date(new Date(card.value.DateBirth))
      const date2 = new Date(new Date())
      const years = date2.getFullYear() - date1.getFullYear()
      return '(' + years + ' лет)'
    })
    const yearsOldBeforeDeath = computed(() => {
      const date1 = new Date(new Date(card.value.DateBirth))
      const date2 = new Date(new Date(card.value.DateDeath))
      const years = date2.getFullYear() - date1.getFullYear()
      return '(' + years + ' лет)'
    })
    // ПОЛ
    const gender = computed(() => {
      if (card.value.Gender === 1) return 'Мужской'
      else return 'Женский'
    })
    const genderImage = computed(() => {
      if (card.value.Gender === 1) return require('@/assets/patient-card/male-icon.png')
      else return require('@/assets/patient-card/female-icon.png')
    })
    return {
      fullPassport,
      passportDateOfIssue,
      fullBirthCertificate,
      birthCertificateDateOfIssue,
      card,
      fullName,
      dateBirth,
      dateDeath,
      yearsOld,
      yearsOldBeforeDeath,
      gender,
      genderImage
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
    .tablet-row{
        display: contents;
    }
    .tablet-gender-avatar{
        width: 4.5rem;
        height: 4.25rem;
        margin-left: auto !important;
        margin-right: auto !important;
        display: flex !important;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 0.25rem;
        border: solid 1px;
    }
</style>
