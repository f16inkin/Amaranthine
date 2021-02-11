<template>
    <div id="controls" class="p-col-12">
        <Toolbar class="p-p-1">
            <template #left>
                <Button label="Добавить" icon="pi pi-plus" class="p-button-success p-mr-2 p-button-sm" @click="showVaccinationCreationForm"/>
            </template>
        </Toolbar>
    </div>
    <div id="data">
        <DataTable ref="dt" :value="vaccinations" dataKey="id"
                   :paginator="true" :rows="5" :filters="filters"
                   paginatorTemplate="PrevPageLink PageLinks NextPageLink">
            <template #header>
                <div>Результаты исследований</div>
            </template>
            <Column field="VaccinationDate" header="Дата" :sortable="true" headerStyle="width:10%; text-align:center;"  bodyStyle="text-align: center"/>
            <Column field="VaccinationTypeName" header="Тип" headerStyle="width:25%; text-align:center;" bodyStyle="text-align: center"/>
            <Column field="VaccinationDoseName" header="Доза" headerStyle="width:10%; text-align:center;" bodyStyle="text-align: center"/>
            <Column field="VaccinationSerial" header="Серия" headerStyle="width:10%; text-align:center;" bodyStyle="text-align: center"/>
            <Column field="VaccinationInjectionName" header="Инъекция" headerStyle="width:10%; text-align:center;" bodyStyle="text-align: center"/>
            <Column field="VaccinationDivertName" header="Отвод" headerStyle="width:10%; text-align:center;" bodyStyle="text-align: center"/>
            <Column field="VaccinationNotation" header="Примечание" headerStyle="width:15%; text-align:center;" bodyStyle="text-align: center"/>
            <Column header="Управление" headerStyle="width:10%; text-align:center;"  bodyStyle="text-align: center">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="showVaccinationEditForm(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteRecord(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <div id="overlay">
        <div id="vaccination-create-dialog">
            <Dialog v-model:visible="showCreationForm" :style="{width: '950px'}" :modal="true">
                <template #header>
                    <b>Создание новой записи</b>
                </template>
                <div class="p-grid">
                    <div class="p-col-3">
                        <div class="p-mb-2">
                            <label for="vaccination-date" class="p-text-bold">Дата:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.VaccinationDate" id="vaccination-date" type="date" class="p-inputtext-sm"/>
                        </div>
                    </div>
                    <div class="p-col-6">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Тип:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.VaccinationType" :options="vaccinationOptions.types" optionLabel="typeName" scrollHeight="300px" placeholder="Выберите тип"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-3">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Доза:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.VaccinationDose" :options="vaccinationOptions.doses" optionLabel="doseName" scrollHeight="300px" placeholder="Выберите дозу"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-4">
                        <div class="p-mb-2">
                            <label for="vaccination-serial" class="p-text-bold">Серия:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.VaccinationSerial" id="vaccination-serial" type="text" class="p-inputtext-sm"/>
                        </div>
                    </div>
                    <div class="p-col-4">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Инъекция:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.VaccinationInjection" :options="vaccinationOptions.injections" optionLabel="injectionName" scrollHeight="300px" placeholder="Выберите тип инъекции"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-4">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Отвод:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.VaccinationDivert" :options="vaccinationOptions.diverts" optionLabel="divertName" scrollHeight="300px" placeholder="Выберите отвод"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-12">
                        <div class="p-mb-2">
                            <label for="vaccination-snapshot" class="p-text-bold">Примечание:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Textarea v-model="DTO.VaccinationNotation" id="vaccination-notation" placeholder="Введите примечание"/>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Создать" @click="createRecord" class="p-button-sm"/>
                </template>
            </Dialog>
        </div>
        <div id="vaccination-edit-dialog">
            <Dialog v-model:visible="showEditForm" :style="{width: '950px'}" :modal="true">
                <template #header>
                    <b>Редактирование записи</b>
                </template>
                <div class="p-grid">
                    <div class="p-col-3">
                        <div class="p-mb-2">
                            <label for="vaccination-date" class="p-text-bold">Дата:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.VaccinationDate" id="vaccination-date" type="date" class="p-inputtext-sm"/>
                        </div>
                    </div>
                    <div class="p-col-6">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Тип:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.VaccinationType" :options="vaccinationOptions.types" optionLabel="typeName" scrollHeight="300px" placeholder="Выберите тип"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-3">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Доза:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.VaccinationDose" :options="vaccinationOptions.doses" optionLabel="doseName" scrollHeight="300px" placeholder="Выберите дозу"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-4">
                        <div class="p-mb-2">
                            <label for="vaccination-serial" class="p-text-bold">Серия:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.VaccinationSerial" id="vaccination-serial" type="text" class="p-inputtext-sm"/>
                        </div>
                    </div>
                    <div class="p-col-4">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Инъекция:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.VaccinationInjection" :options="vaccinationOptions.injections" optionLabel="injectionName" scrollHeight="300px" placeholder="Выберите тип инъекции"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-4">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Отвод:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.VaccinationDivert" :options="vaccinationOptions.diverts" optionLabel="divertName" scrollHeight="300px" placeholder="Выберите отвод"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-12">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Примечание:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Textarea v-model="DTO.VaccinationNotation"  placeholder="Введите примечание"/>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Сохранить" @click="saveRecord" class="p-button-sm"/>
                </template>
            </Dialog>
        </div>
        <div id="loader">
            <SpinPreloader v-show="isLoading"></SpinPreloader>
        </div>
    </div>
</template>

<script>
    import { computed, ref, reactive } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute } from 'vue-router'
import Toolbar from 'primevue/components/toolbar/Toolbar'
import Button from "primevue/components/button/Button";
import SpinPreloader from "../../Core/Preloaders/SpinPreloader";
import Dialog from "primevue/components/dialog/Dialog";
    import DataTable from "primevue/components/datatable/DataTable";
    import Column from "primevue/components/column/Column";
    import Dropdown from "primevue/components/dropdown/Dropdown";
    import Textarea from "primevue/components/textarea/Textarea";
export default {
  name: 'CardVaccinations',
    components: { Textarea, Dropdown, Column, DataTable, Dialog, SpinPreloader, Button, Toolbar },
    setup (){
        const store = useStore()
        const route = useRoute()
        store.dispatch('card/getVaccinationsAction', route.params.id)
        store.dispatch('card/getVaccinationOptionsAction')
        const vaccinations = computed(() => store.state.card.vaccinations)
        const card = computed(() => store.state.card.patientCard)
        const vaccinationOptions = computed(() => store.state.card.vaccinationOptions)
        const showCreationForm = ref(false)
        const showEditForm = ref(false)
        const isLoading = ref(false)
        const filters = {}
        const DTO = reactive({
            PatientCardId: card.value.CardId,
            VaccinationId: null,
            VaccinationDate: null,
            VaccinationDose: null,
            VaccinationDivert: null,
            VaccinationInjection: null,
            VaccinationSerial: null,
            VaccinationType: null,
            VaccinationNotation: null
        })
        const clearDTO = () => {
            DTO.PatientCardId = card.value.CardId,
            DTO.VaccinationId = null,
            DTO.VaccinationDate = null,
            DTO.VaccinationDose = null,
            DTO.VaccinationDivert = null,
            DTO.VaccinationInjection = null,
            DTO.VaccinationSerial = null,
            DTO.VaccinationType = null,
            DTO.VaccinationNotation = null
        }
        const formatDate = (date) => {
            return date.split(".").reverse().join("-");
        }
        const showVaccinationCreationForm = () => {
            clearDTO()
            showCreationForm.value = !showCreationForm.value
            console.log(vaccinationOptions)
        }
        const createRecord = async() => {
            showCreationForm.value = false
            isLoading.value = true
            const result = await store.dispatch('card/createVaccinationAction', DTO)
            if (result.status === 201){
                await store.dispatch('card/getVaccinationsAction',  route.params.id)
                clearDTO()
                setTimeout(() => {isLoading.value = false}, 500)
            }else{
                showCreationForm.value = true
            }
        }
        const showVaccinationEditForm = (data) => {
            showEditForm.value = !showEditForm.value
            DTO.PatientCardId = data.PatientCardId
            DTO.VaccinationId = data.VaccinationId
            DTO.VaccinationDate = formatDate(data.VaccinationDate)
            DTO.VaccinationDose = {doseId: data.VaccinationDoseId, doseName: data.VaccinationDoseName}
            DTO.VaccinationDivert = {divertId: data.VaccinationDivertId, divertName: data.VaccinationDivertName}
            DTO.VaccinationInjection = {injectionId: data.VaccinationInjectionId, injectionName: data.VaccinationInjectionName}
            DTO.VaccinationType = {typeId: data.VaccinationTypeId, typeName: data.VaccinationTypeName}
            DTO.VaccinationSerial = data.VaccinationSerial
            DTO.VaccinationNotation = data.VaccinationNotation
        }
        const saveRecord = async()=> {
            showEditForm.value = false
            isLoading.value = true
            const result = await store.dispatch('card/updateVaccinationAction', DTO)
            if (result.status === 200){
                await store.dispatch('card/getVaccinationsAction',  route.params.id)
                clearDTO()
                setTimeout(() => {isLoading.value = false}, 500)
            }else{
                showCreationForm.value = true
            }
        }
        const deleteRecord = async (data) => {
            isLoading.value = true
            const result = await store.dispatch('card/deleteVaccinationAction',  [data.VaccinationId])
            if (result.status === 204){
                await store.dispatch('card/getVaccinationsAction',  route.params.id)
                setTimeout(() => {isLoading.value = false}, 500)
            }else{
                console.log('Vaccination hasn\'t deleted')
            }
        }
        return {
            filters,
            vaccinations,
            vaccinationOptions,
            showCreationForm,
            showEditForm,
            isLoading,
            DTO,
            showVaccinationCreationForm,
            createRecord,
            showVaccinationEditForm,
            saveRecord,
            deleteRecord
        }
    }
}
</script>

<style scoped>

</style>
