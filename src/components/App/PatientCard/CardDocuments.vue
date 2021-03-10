<template>
    <div id="data">
        <Panel>
            <template #header>
                <div>
                    <i class="pi pi-id-card p-text-bold" style="color: #15cc15"></i><span class="p-text-bold"> Документы</span>
                </div>
            </template>
            <template #icons>
                <button class="p-panel-header-icon p-link p-mr-2" @click="editCard" v-show="!onEdit" v-tooltip.top="'Редактировать'" :disabled = "editButtonDisabled">
                    <span class="pi pi-pencil"></span>
                </button>
                <button class="p-panel-header-icon p-link p-mr-2" @click="saveCard" v-show="onEdit" v-tooltip.top="'Сохранить'" :disabled = "saveButtonDisabled">
                    <span class="pi pi-save"></span>
                </button>
            </template>
            <TabView v-show="!onEdit">
                <TabPanel>
                    <template #header>
                        <span style="color: blue;">СНИЛС, ЕНП</span>
                    </template>
                    <div class="p-mb-2">
                        <label class="p-text-bold">СНИЛС:</label>
                    </div>
                    <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                        <InputText v-model="card.InsuranceCertificate" disabled/>
                    </div>
                    <div class="p-grid">
                        <div class="p-col-6">
                            <div class="p-mb-2">
                                <label class="p-text-bold">Единый номер полиса:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                                <InputText v-model="card.PolicyNumber" disabled/>
                            </div>
                        </div>
                        <div class="p-col-6">
                            <div class="p-mb-2">
                                <label class="p-text-bold">Временный полис:</label>
                            </div>
                            <div class="p-inputgroup">
                                <span class="p-inputgroup-addon">
                                <i class="pi pi-id-card"></i>
                                </span>
                                <InputText v-model="card.TemporaryPolicyNumber" disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="p-mb-2">
                        <label class="p-text-bold">Страховая компания:</label>
                    </div>
                    <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                        <InputText type="text" class="p-inputtext-sm" v-model="card.InsuranceCompanyName" disabled/>
                    </div>
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <span style="color: red;">Паспортные данные</span>
                    </template>
                    <div class="p-grid">
                        <div class="p-col-6">
                            <div class="p-mb-2">
                                <label class="p-text-bold">Серия, номер паспорта:</label>
                            </div>
                            <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                                <InputText type="text" class="p-inputtext-sm" v-model="fullPassport" disabled/>
                            </div>
                        </div>
                        <div class="p-col-6">
                            <div class="p-mb-2">
                                <label class="p-text-bold">Дата выдачи:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                                <InputText type="date" class="p-inputtext-sm" v-model="card.PassportDateOfIssue" disabled/>
                            </div>
                        </div>
                        <div class="p-col-12">
                            <div class="p-mb-2">
                                <label class="p-text-bold">Кем выдан:</label>
                            </div>
                            <Textarea  v-model="card.FmsDepartment" class="p-inputtext-sm" :autoResize="true" rows="1" cols="30" disabled/>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <span style="color: orange;">Свидетельство о рождении</span>
                    </template>
                    <div class="p-grid">
                        <div class="p-col-6">
                            <div class="p-mb-2">
                                <label class="p-text-bold">Серия, номер свидетельства:</label>
                            </div>
                            <div class="p-inputgroup">
                                <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                                <InputText type="text" class="p-inputtext-sm" v-model="fullBirthCertificate" disabled/>
                            </div>
                        </div>
                        <div class="p-col-6">
                            <div class="p-mb-2">
                                <label class="p-text-bold">Дата выдачи:</label>
                            </div>
                            <div class="p-inputgroup">
                                <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                                <InputText type="date" class="p-inputtext-sm" v-model="card.BirthCertificateDateOfIssue" disabled/>
                            </div>
                        </div>
                        <div class="p-col-12">
                            <div class="p-mb-2">
                                <label class="p-text-bold">Кем выдано:</label>
                            </div>
                            <Textarea v-model="card.RegistryOffice" class="p-inputtext-sm" :autoResize="true" rows="1" cols="30" disabled/>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <TabView v-show="onEdit">
                <TabPanel>
                    <template #header>
                        <span style="color: blue;">СНИЛС, ЕНП</span>
                    </template>
                    <div class="p-mb-2">
                        <label for="insuranceCertificate" class="p-text-bold">СНИЛС:<i style="color:red">*</i></label>
                    </div>
                    <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                        <InputMask id="insuranceCertificate" mask="999-999-999 99" v-model="card.InsuranceCertificate" placeholder="***-***-*** **"/>
                    </div>
                    <div class="p-grid">
                        <div class="p-col-6">
                            <div class="p-mb-2">
                                <label for="policyNumber" class="p-text-bold">Единый номер полиса:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                                <InputMask id="policyNumber" mask="9999-9999-9999-9999" v-model="card.PolicyNumber" placeholder="****-****-****-****"/>
                            </div>
                        </div>
                        <div class="p-col-6">
                            <div class="p-mb-2">
                                <label for="temporaryPolicyNumber" class="p-text-bold">Временный полис:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                                <InputMask id="temporaryPolicyNumber" mask="999-999-999" v-model="card.TemporaryPolicyNumber" placeholder="***-***-***"/>
                            </div>
                        </div>
                    </div>
                    <div class="p-mb-2">
                        <label for="insuranceCompany" class="p-text-bold">Страховая компания:</label>
                    </div>
                    <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                        <InputText id="insuranceCompany" type="text" class="p-inputtext-sm" v-model="card.InsuranceCompanyName" @keyup="getInsuranceCompanies(card.InsuranceCompanyName)" placeholder="Введите название страховой компании"/>
                    </div>
                    <div class="search-result-area" v-if="insuranceCompanies.length">
                        <div class="search-result-container">
                            <div  v-for="company in insuranceCompanies" :key="company.id" class="patient-card-search-result-line" @click="setInsuranceCompany(company)">
                                <div hidden>{{company.InsuranceCompanyId}}</div>
                                <div class="search-result">{{company.InsuranceCompanyName}}</div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <span style="color: red;">Паспортные данные</span>
                    </template>
                    <div class="p-grid">
                        <div class="p-col-4">
                            <div class="p-mb-2">
                                <label for="passport-serial" class="p-text-bold">Серия паспорта:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                                <InputMask id="passport-serial" mask="9999" v-model="card.PassportSerial" placeholder="****"/>
                            </div>
                        </div>
                        <div class="p-col-4">
                            <div class="p-mb-2">
                                <label for="passport-number" class="p-text-bold">Номер паспорта:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                                <InputMask id="passport-number" mask="999999" v-model="card.PassportNumber" placeholder="******"/>
                            </div>
                        </div>
                        <div class="p-col-4">
                            <div class="p-mb-2">
                                <label for="passport-date" class="p-text-bold">Дата выдачи:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                                <InputText id="passport-date" type="date" class="p-inputtext-sm" v-model="card.PassportDateOfIssue"/>
                            </div>
                        </div>
                        <div class="p-col-12">
                            <div class="p-mb-2">
                                <label  for="fms-department" class="p-text-bold">Кем выдан:</label>
                            </div>
                            <Textarea id="fms-department" v-model="card.FmsDepartment" :autoResize="true" rows="1" cols="30" placeholder="Отдел УФМС"/>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <span style="color: orange;">Свидетельство о рождении</span>
                    </template>
                    <div class="p-grid">
                        <div class="p-col-4">
                            <div class="p-mb-2">
                                <label for="birth-certificate-serial" class="p-text-bold">Серия свидетельства:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                                <InputText id="birth-certificate-serial" type="text" class="p-inputtext-sm" v-model="card.BirthCertificateSerial" placeholder="*****"/>
                            </div>
                        </div>
                        <div class="p-col-4">
                            <div class="p-mb-2">
                                <label for="birth-certificate-number" class="p-text-bold">Номер свидетельства:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                                <InputText id="birth-certificate-number" type="text" class="p-inputtext-sm" v-model="card.BirthCertificateNumber" placeholder="*****"/>
                            </div>
                        </div>
                        <div class="p-col-4">
                            <div class="p-mb-2">
                                <label for="birth-certificate-date" class="p-text-bold">Дата выдачи:</label>
                            </div>
                            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                                <InputText id="birth-certificate-date" type="date" class="p-inputtext-sm" v-model="card.BirthCertificateDateOfIssue"/>
                            </div>
                        </div>
                        <div class="p-col-12">
                            <div class="p-mb-2">
                                <label  for="registry-office" class="p-text-bold">Кем выдано:</label>
                            </div>
                            <Textarea id="registry-office" v-model="card.RegistryOffice" :autoResize="true" rows="1" cols="30" placeholder="Отдел ЗАГСа"/>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </Panel>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import Panel from 'primevue/components/panel/Panel'
import TabView from 'primevue/components/tabview/TabView'
import TabPanel from 'primevue/components/tabpanel/TabPanel'
import Textarea from 'primevue/components/textarea/Textarea'
import InputMask from 'primevue/components/inputmask/InputMask'
import InputText from 'primevue/components/inputtext/InputText'
export default {
  name: 'CardDocuments',
  components: { InputText, InputMask, Textarea, TabPanel, TabView, Panel },
  setup () {
    const store = useStore()
    const toast = useToast()
    const onEdit = ref(false)
    const editButtonDisabled = ref(false)
    const saveButtonDisabled = ref(true)
    let typingTimer = 0
    const card = computed(() => store.state.card.patientCard)
    const insuranceCompanies = computed(() => store.state.card.insuranceCompanies)
    const fullPassport = computed(() => card.value.PassportSerial + ' ' + card.value.PassportNumber)
    const fullBirthCertificate = computed(() => card.value.BirthCertificateSerial + ' ' + card.value.BirthCertificateNumber)
    const editCard = async() => {
        onEdit.value = !onEdit.value
        editButtonDisabled.value = !editButtonDisabled.value
        const result = await store.dispatch('card/blockCardAction', card.value.CardId)
        if (result.status === 200){
            toast.add({severity: 'warn', summary: 'Внимание', detail: 'Карта была заблокирована вами для редактирования', life: 1000});
        }
        // Кнопка сохранения появляется тепреь только опсле блокировки карты
        saveButtonDisabled.value = !saveButtonDisabled.value
    }
    const saveCard = async() => {
        onEdit.value = !onEdit.value
        saveButtonDisabled.value = !saveButtonDisabled.value
        const result = await store.dispatch('card/updateCardAction', card.value.CardId)
        if (result.status === 200){
            editButtonDisabled.value = !editButtonDisabled.value
            toast.add({severity: 'success', summary: 'Сохранено', detail: 'Персональные данные сохранены', life: 1000});
            toast.add({severity: 'warn', summary: 'Внимание', detail: 'Карта была разблокирована', life: 1000});
        }else {
            toast.add({severity: 'error', summary: 'Ошибка', detail: 'Ошибка сервера', life: 2000});
        }
    }
    const getInsuranceCompanies = (searchString) => {
      if (searchString.length > 3) {
        if (typingTimer !== null) {
          clearTimeout(typingTimer)
        }
        typingTimer = setTimeout(() => {
          store.dispatch('card/getInsuranceCompaniesAction', { searchString: searchString, limit: 5 })
        }, 500)
      }
    }
    const setInsuranceCompany = (payload) => {
      store.dispatch('card/setInsuranceCompanyAction', payload)
    }
    return {
      card,
      insuranceCompanies,
      onEdit,
      editButtonDisabled,
      saveButtonDisabled,
      fullPassport,
      fullBirthCertificate,
      editCard,
      saveCard,
      getInsuranceCompanies,
      setInsuranceCompany
    }
  }
}
</script>

<style scoped>

</style>
