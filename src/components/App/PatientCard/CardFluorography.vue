<template>
    <div id="controls" class="p-col-12">
        <Toolbar class="p-p-1">
            <template #left>
                <Button label="Добавить" icon="pi pi-plus" class="p-button-success p-mr-2 p-button-sm" @click="showFluorographyCreationForm"/>
            </template>
        </Toolbar>
    </div>
    <div id="data">
        <DataTable ref="dt" :value="fluorographies" dataKey="id"
                   :paginator="true" :rows="5" :filters="filters"
                   paginatorTemplate="PrevPageLink PageLinks NextPageLink">
            <template #header>
                <div>Результаты исследований</div>
            </template>
            <Column field="FluorographyDate" header="Дата" :sortable="true" headerStyle="width:10%; text-align:center;"  bodyStyle="text-align: center"/>
            <Column field="FluorographyTypeName" header="Тип" headerStyle="width:15%; text-align:center;" bodyStyle="text-align: center"/>
            <Column field="FluorographyResultName" header="Результат" headerStyle="width:15%; text-align:center;"  bodyStyle="text-align: center"></Column>
            <Column field="FluorographySenderName" header="Направил" headerStyle="width:7%; text-align:center;"  bodyStyle="text-align: center"></Column>
            <Column field="FluorographyNumber" header="Номер" headerStyle="width:7%; text-align:center;"  bodyStyle="text-align: center"/>
            <Column field="FluorographySnapshot" header="Снимок" headerStyle="width:7%; text-align:center;"  bodyStyle="text-align: center"></Column>
            <Column field="FluorographyDoseName" header="Доза" headerStyle="width:7%; text-align:center;"  bodyStyle="text-align: center"></Column>
            <Column field="FluorographyNotation" header="Примечание" headerStyle="width:20%; text-align:center;"  bodyStyle="text-align: center"/>
            <Column header="Управление" headerStyle="width:9%; text-align:center;"  bodyStyle="text-align: center">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="showFluorographyEditForm(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteRecord(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <div id="overlay">
        <div id="fluorography-create-dialog">
            <Dialog v-model:visible="showCreationForm" :style="{width: '950px'}" :modal="true">
                <template #header>
                    <b>Создание новой записи</b>
                </template>
                <div class="p-grid">
                    <div id="fluorography-date-block" class="p-col-3">
                        <div class="p-mb-2">
                            <label for="fluorography-date" class="p-text-bold">Дата:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.FluorographyDate" id="fluorography-date" type="date" class="p-inputtext-sm"/>
                        </div>
                    </div>
                    <div id="fluorography-type-block" class="p-col-4">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Тип исследования:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.FluorographyType" :options="fluorographyOptions.types" optionLabel="typeName" scrollHeight="300px" placeholder="Выберите тип"></Dropdown>
                        </div>
                    </div>
                    <div id="fluorography-result-block" class="p-col-5">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Результат:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.FluorographyResult" :options="fluorographyOptions.results" optionLabel="resultName" scrollHeight="300px" placeholder="Выбирите результат"></Dropdown>
                        </div>
                    </div>
                    <div id="fluorography-number-block" class="p-col-2">
                        <div class="p-mb-2">
                            <label for="fluorography-number" class="p-text-bold">Номер:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.FluorographyNumber" id="fluorography-number" type="text" class="p-inputtext-sm" placeholder="Номер"/>
                        </div>
                    </div>
                    <div id="fluorography-snapshot-block" class="p-col-2">
                        <div class="p-mb-2">
                            <label for="fluorography-snapshot" class="p-text-bold">Снимок:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.FluorographySnapshot" id="fluorography-snapshot" type="text" class="p-inputtext-sm" placeholder="Снимок"/>
                        </div>
                    </div>
                    <div id="fluorography-dose-block" class="p-col-3">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Доза:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.FluorographyDose" :options="fluorographyOptions.doses" optionLabel="doseName"  scrollHeight="300px" placeholder="Выбирите дозу"></Dropdown>
                        </div>
                    </div>
                    <div id="fluorography-sender-block" class="p-col">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Отделение направившее:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.FluorographySender" :options="fluorographyOptions.senders" optionLabel="senderName"  scrollHeight="300px" placeholder="Направившее отделение"></Dropdown>
                        </div>
                    </div>
                    <div id="fluorography-notation-block" class="p-col-12">
                        <div class="p-mb-2">
                            <label for="fluorography-snapshot" class="p-text-bold">Примечание:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Textarea v-model="DTO.FluorographyNotation" id="fluorography-notation" placeholder="Введите примечание"/>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Создать" @click="createRecord" class="p-button-sm"/>
                </template>
            </Dialog>
        </div>
        <div id="fluorography-edit-dialog">
            <Dialog v-model:visible="showEditForm" :style="{width: '950px'}" :modal="true">
                <template #header>
                    <b>Редактирование записи</b>
                </template>
                <div class="p-grid">
                    <div class="p-col-3">
                        <div class="p-mb-2">
                            <label for="fluorography-date" class="p-text-bold">Дата:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.FluorographyDate" type="date" class="p-inputtext-sm"/>
                        </div>
                    </div>
                    <div class="p-col-4">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Тип исследования:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.FluorographyType" :options="fluorographyOptions.types" optionLabel="typeName" scrollHeight="300px" placeholder="Выберите тип"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-5">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Результат:<i style="color:red">*</i></label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.FluorographyResult" :options="fluorographyOptions.results" optionLabel="resultName" scrollHeight="300px" placeholder="Выбирите результат"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-2">
                        <div class="p-mb-2">
                            <label for="fluorography-number" class="p-text-bold">Номер:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.FluorographyNumber" type="text" class="p-inputtext-sm" placeholder="Номер"/>
                        </div>
                    </div>
                    <div class="p-col-2">
                        <div class="p-mb-2">
                            <label for="fluorography-snapshot" class="p-text-bold">Снимок:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="DTO.FluorographySnapshot" type="text" class="p-inputtext-sm" placeholder="Снимок"/>
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
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.FluorographyDose" :options="fluorographyOptions.doses" optionLabel="doseName"  scrollHeight="300px" placeholder="Выбирите дозу"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Отделение направившее:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="DTO.FluorographySender" :options="fluorographyOptions.senders" optionLabel="senderName"  scrollHeight="300px" placeholder="Направившее отделение"></Dropdown>
                        </div>
                    </div>
                    <div class="p-col-12">
                        <div class="p-mb-2">
                            <label for="fluorography-snapshot" class="p-text-bold">Примечание:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Textarea v-model="DTO.FluorographyNotation" placeholder="Введите примечание"/>
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
import DataTable from 'primevue/components/datatable/DataTable'
import Column from 'primevue/components/column/Column'
import Button from 'primevue/components/button/Button'
import Dialog from 'primevue/components/dialog/Dialog'
import InputText from 'primevue/components/inputtext/InputText'
import Dropdown from 'primevue/components/dropdown/Dropdown'
import Textarea from 'primevue/components/textarea/Textarea'
import SpinPreloader from "../../Core/Preloaders/SpinPreloader";
export default {
  name: 'CardFluorography',
  components: {SpinPreloader, Textarea, Dropdown, InputText, Dialog, Button, Toolbar, DataTable, Column },
    setup (){
        const store = useStore()
        const route = useRoute()
        store.dispatch('card/getFluorographiesAction', route.params.id)
        store.dispatch('card/getFluorographyOptionsAction')
        const fluorographies = computed(() => store.state.card.fluorographies)
        const card = computed(() => store.state.card.patientCard)
        const fluorographyOptions = computed(() => store.state.card.fluorographyOptions)
        const DTO = reactive({
            PatientCardId: card.value.CardId,
            FluorographyId: null,
            FluorographyDate: null,
            FluorographyNumber: null,
            FluorographyType: null,
            FluorographyResult: null,
            FluorographySender: null,
            FluorographyDose: null,
            FluorographySnapshot: null,
            FluorographyNotation: null
        })
        const clearDTO = () => {
            DTO.PatientCardId = card.value.CardId
            DTO.FluorographyId = null
            DTO.FluorographyDate = null
            DTO.FluorographyNumber = null
            DTO.FluorographyType = null
            DTO.FluorographyResult = null
            DTO.FluorographySender = null
            DTO.FluorographyDose = null
            DTO.FluorographySnapshot = null
            DTO. FluorographyNotation = null
        }
        const formatDate = (date) => {
            return date.split(".").reverse().join("-");
        }
        const showCreationForm = ref(false)
        const showEditForm = ref(false)
        const isLoading = ref(false)
        const filters = {}
        const showFluorographyCreationForm = () => {
            clearDTO()
            showCreationForm.value = !showCreationForm.value
        }
        const createRecord = async() => {
            showCreationForm.value = false
            isLoading.value = true
            const result = await store.dispatch('card/createFluorographyAction', DTO)
            if (result.status === 201){
                await store.dispatch('card/getFluorographiesAction',  route.params.id)
                clearDTO()
                setTimeout(() => {isLoading.value = false}, 500)
            }else{
                showCreationForm.value = true
            }
        }
        const showFluorographyEditForm = (data) => {
            console.log(data)
            showEditForm.value = !showEditForm.value
            DTO.PatientCardId = data.PatientCardId
            DTO.FluorographyId = data.FluorographyId
            DTO.FluorographyDate = formatDate(data.FluorographyDate)
            DTO.FluorographyNumber = data.FluorographyNumber
            DTO.FluorographyType = {typeId: data.FluorographyTypeId, typeName: data.FluorographyTypeName}
            DTO.FluorographyResult = {resultId: data.FluorographyResultId, resultName: data.FluorographyResultName}
            DTO.FluorographySender = {senderId: data.FluorographySenderId, senderName: data.FluorographySenderName}
            DTO.FluorographyDose = {doseId: data.FluorographyDoseId, doseName: data.FluorographyDoseName}
            DTO.FluorographySnapshot = data.FluorographySnapshot
            DTO.FluorographyNotation = data.FluorographyNotation
            console.log(DTO)
        }
        const saveRecord = async()=> {
            showEditForm.value = false
            isLoading.value = true
            const result = await store.dispatch('card/updateFluorographyAction', DTO)
            if (result.status === 200){
                await store.dispatch('card/getFluorographiesAction',  route.params.id)
                clearDTO()
                setTimeout(() => {isLoading.value = false}, 500)
            }else{
                showCreationForm.value = true
            }
        }
        const deleteRecord = async (data) => {
            isLoading.value = true
            const result = await store.dispatch('card/deleteFluorographyAction',  [data.FluorographyId])
            if (result.status === 204){
                await store.dispatch('card/getFluorographiesAction',  route.params.id)
                setTimeout(() => {isLoading.value = false}, 500)
            }else{
                console.log('Fluorography hasn\'t deleted')
            }
        }
        return {
            filters,
            fluorographies,
            fluorographyOptions,
            DTO,
            showCreationForm,
            showEditForm,
            isLoading,
            showFluorographyCreationForm,
            showFluorographyEditForm,
            createRecord,
            saveRecord,
            deleteRecord
        }
    }
}
</script>

<style scoped>
    #data{
        padding: 0.5rem;
    }
</style>
