<template>
    <div id="controls" class="p-col-12">
        <Toolbar class="p-p-1">
            <template #left>
                <Button label="Добавить" icon="pi pi-plus" class="p-button-success p-mr-2 p-button-sm" @click="showFluorographyCreationForm"/>
                <Button label="Удалить" icon="pi pi-trash" class="p-button-danger p-mr-2 p-button-sm"/>
            </template>
        </Toolbar>
    </div>
    <div id="data">
        <DataTable ref="dt" :value="fluorographies" dataKey="id"
                   :paginator="true" :rows="10" :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]">
            <template #header>
                <div>Результаты исследований</div>
            </template>
            <Column field="FluorographyDate" header="Дата" :sortable="true"></Column>
            <Column field="FluorographyNumber" header="Номер"></Column>
            <Column field="FluorographyTypeName" header="Тип"></Column>
            <Column field="FluorographyResultName" header="Результат" ></Column>
            <Column field="FluorographySnapshot" header="Снимок"></Column>
            <Column field="FluorographyDoseName" header="Доза"></Column>
            <Column field="FluorographyNotation" header="Примечание"></Column>
            <Column header="Управление">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editFluorography(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <div id="overlay">
        <div id="fluorography-create-dialog">
            <Dialog v-model:visible="showCreationForm" :style="{width: '850px'}" :modal="true">
                <template #header>
                    <b>Создание новой записи</b>
                </template>
                <div class="p-grid">
                    <div id="fluorography-date-block" class="p-col-4">
                        <div class="p-mb-2">
                            <label for="fluorography-date" class="p-text-bold">Дата:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="recordDTO.Date" id="fluorography-date" type="date" class="p-inputtext-sm" />
                        </div>
                    </div>
                    <div id="fluorography-number-block" class="p-col-4">
                        <div class="p-mb-2">
                            <label for="fluorography-number" class="p-text-bold">Номер:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="recordDTO.Number" id="fluorography-number" type="text" class="p-inputtext-sm" placeholder="Введите номер"/>
                        </div>
                    </div>
                    <div id="fluorography-snapshot-block" class="p-col-4">
                        <div class="p-mb-2">
                            <label for="fluorography-snapshot" class="p-text-bold">Снимок:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText v-model="recordDTO.Snapshot" id="fluorography-snapshot" type="text" class="p-inputtext-sm" placeholder="Введите снимок"/>
                        </div>
                    </div>
                    <div id="fluorography-type-block" class="p-col-4">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Тип исследования:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="recordDTO.Type" :options="fluorographyOptions.types" optionLabel="typeName" scrollHeight="300px" placeholder="Выберите тип"></Dropdown>
                        </div>
                    </div>
                    <div id="fluorography-result-block" class="p-col-8">
                        <div class="p-mb-2">
                            <label class="p-text-bold">Результат:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="recordDTO.Result" :options="fluorographyOptions.results" optionLabel="resultName" scrollHeight="300px" placeholder="Выбирите результат"></Dropdown>
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
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="recordDTO.Dose" :options="fluorographyOptions.doses" optionLabel="doseName"  scrollHeight="300px" placeholder="Выбирите дозу"></Dropdown>
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
                            <Dropdown appendTo="body" class="p-inputtext-sm" v-model="recordDTO.Sender" :options="fluorographyOptions.senders" optionLabel="senderName"  scrollHeight="300px" placeholder="Направившее отделение"></Dropdown>
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
                            <Textarea v-model="recordDTO.Notation" id="fluorography-notation" placeholder="Введите примечание"/>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Создать" @click="createRecord" class="p-button-sm"/>
                </template>
            </Dialog>
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
export default {
  name: 'CardFluorography',
  components: {Textarea, Dropdown, InputText, Dialog, Button, Toolbar, DataTable, Column },
    setup (){
        const store = useStore()
        const route = useRoute()
        store.dispatch('card/getFluorographiesAction', route.params.id)
        store.dispatch('card/getFluorographyOptionsAction')
        const fluorographies = computed(() => store.state.card.fluorographies)
        const fluorographyOptions = computed(() => store.state.card.fluorographyOptions)
        const recordDTO = reactive({
            Date: null,
            Number: null,
            Snapshot: null,
            Type: null,
            Result: null,
            Dose: null,
            Sender: null,
            Notation: null
        })
        const showCreationForm = ref(false)
        const filters = {}
        const showFluorographyCreationForm = () => {
            showCreationForm.value = !showCreationForm.value
        }
        const createRecord = () => {
            showCreationForm.value = false
            const result = store.dispatch('card/createFluorographyAction', { recordDTO: recordDTO })
        }
        const createCard = async () => {

        }
        return {
            filters,
            fluorographies,
            fluorographyOptions,
            recordDTO,
            showCreationForm,
            showFluorographyCreationForm,
            createRecord
        }
    }
}
</script>

<style scoped>
    #data{
        padding: 0.5rem;
    }
</style>
