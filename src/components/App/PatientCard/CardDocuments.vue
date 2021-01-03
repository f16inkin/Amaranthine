<template>
    <Panel>
        <template #header>
            <div>
                <i class="pi pi-id-card p-text-bold" style="color: #15cc15"></i><span class="p-text-bold"> Документы</span>
            </div>
        </template>
        <TabView>
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
                    <InputMask id="insuranceCertificate" mask="999-999-999 99" v-model="insuranceCertificate" placeholder="***-***-*** **"/>
                </div>
                <div class="p-mb-2">
                    <label for="policyNumber" class="p-text-bold">Единый номер полиса:<i style="color:red">*</i></label>
                </div>
                <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                    <InputMask id="policyNumber" mask="9999-9999-9999-9999" v-model="policyNumber" placeholder="****-****-****-****"/>
                </div>
                <div class="p-mb-2">
                    <label for="insuranceCompany" class="p-text-bold">Страховая компания:</label>
                </div>
                <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                    <InputText id="insuranceCompany" type="text" class="p-inputtext-sm" placeholder="Введите название страховой компании"/>
                </div>
            </TabPanel>
            <TabPanel>
                <template #header>
                    <span style="color: red;">Паспортные данные</span>
                </template>
                <div class="p-grid">
                    <div class="p-col-6">
                        <div class="p-mb-2">
                            <label for="passport" class="p-text-bold">Серия, номер паспорта:</label>
                        </div>
                        <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                            <InputMask id="passport" mask="9999-999999" v-model="passport" placeholder="****-******"/>
                        </div>
                    </div>
                    <div class="p-col-6">
                        <div class="p-mb-2">
                            <label for="passport-date" class="p-text-bold">Дата выдачи:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                            </span>
                            <InputText id="passport-date" type="date" class="p-inputtext-sm" placeholder="*****-******"/>
                        </div>
                    </div>
                    <div class="p-col-12">
                        <div class="p-mb-2">
                            <label  for="fms-department" class="p-text-bold">Кем выдан:</label>
                        </div>
                        <Textarea id="fms-department" v-model="fmsDepartment" :autoResize="true" rows="1" cols="30" placeholder="Отдел УФМС"/>
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
                            <label for="birth-certificate" class="p-text-bold">Серия, номер свидетельства:</label>
                        </div>
                        <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                            <InputText id="birth-certificate" type="text" class="p-inputtext-sm" placeholder="****-******"/>
                        </div>
                    </div>
                    <div class="p-col-6">
                        <div class="p-mb-2">
                            <label for="birth-certificate-date" class="p-text-bold">Дата выдачи:</label>
                        </div>
                        <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                            <InputText id="birth-certificate-date" type="date" class="p-inputtext-sm"/>
                        </div>
                    </div>
                    <div class="p-col-12">
                        <div class="p-mb-2">
                            <label  for="registry-office" class="p-text-bold">Кем выдано:</label>
                        </div>
                        <Textarea id="registry-office" v-model="registryOffice" :autoResize="true" rows="1" cols="30" placeholder="Отдел ЗАГСа"/>
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Panel>
</template>

<script>
import Panel from 'primevue/components/panel/Panel'
import TabView from 'primevue/components/tabview/TabView'
import TabPanel from 'primevue/components/tabpanel/TabPanel'
import Textarea from 'primevue/components/textarea/Textarea'
import InputMask from 'primevue/components/inputmask/InputMask'
import InputText from 'primevue/components/inputtext/InputText'
export default {
  name: 'CardDocuments',
  components: { InputText, InputMask, Textarea, TabPanel, TabView, Panel }
}
</script>

<style scoped>

</style>
