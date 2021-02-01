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
        <DataTable ref="dt" :value="fluorographies" v-model:selection="selectedProducts" dataKey="id"
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
                    <div id="fluorography-number-block" class="p-col-3">
                        <div class="p-mb-2">
                            <label for="fluorography-number" class="p-text-bold">Номер:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <InputText id="fluorography-number" type="text" class="p-inputtext-sm" placeholder="Введите номер"/>
                        </div>
                    </div>
                    <div id="fluorography-type-block" class="p-col-3">
                        <div class="p-mb-2">
                            <label for="fluorography-type" class="p-text-bold">Тип исследования:</label>
                        </div>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                            </span>
                            <Dropdown></Dropdown>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Создать" @click="" class="p-button-sm"/>
                </template>
            </Dialog>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Toolbar from 'primevue/components/toolbar/Toolbar'
import DataTable from 'primevue/components/datatable/DataTable'
import Column from 'primevue/components/column/Column'
import Button from 'primevue/components/button/Button'
import Dialog from 'primevue/components/dialog/Dialog'
import InputText from "primevue/components/inputtext/InputText";
import Dropdown from "primevue/components/dropdown/Dropdown";
export default {
  name: 'CardFluorography',
  components: {Dropdown, InputText, Dialog, Button, Toolbar, DataTable, Column },
    setup (){
        const store = useStore()
        const route = useRoute()
        const fluorographies = computed(() => store.state.card.fluorographies)
        const showCreationForm = ref(false)
        const selectedProducts = null
        const filters = {}
        store.dispatch('card/getFluorographiesAction', route.params.id)
        const showFluorographyCreationForm = () => {
            showCreationForm.value = !showCreationForm.value
        }
        const editFluorography = (data) => {

        }
        const confirmDeleteProduct = (data) => {
            console.log({...data})
            console.log(data)
        }
        return {
            selectedProducts,
            filters,
            fluorographies,
            showCreationForm,
            showFluorographyCreationForm,
            confirmDeleteProduct
        }
    }
}
</script>

<style scoped>
    #data{
        padding: 0.5rem;
    }
</style>
