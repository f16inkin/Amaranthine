<template>
    <Panel>
        <template #header>
            <div>
                <i class="pi pi-info-circle p-text-bold" style="color: #15cc15"></i><span class="p-text-bold"> Дополнительно</span>
            </div>
        </template>
        <template #icons>
            <button class="p-panel-header-icon p-link p-mr-2" @click="changeEditMode" v-show="!onEdit" v-tooltip.top="'Редактировать'">
                <span class="pi pi-pencil"></span>
            </button>
            <button class="p-panel-header-icon p-link p-mr-2" @click="changeEditMode" v-show="onEdit" v-tooltip.top="'Сохранить'">
                <span class="pi pi-save"></span>
            </button>
        </template>
        <div class="p-grid" v-show="onEdit">
            <div class="p-col-6">
                <div class="p-mb-2">
                    <label for="workplace" class="p-text-bold">Место работы:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-info-circle"></i>
                    </span>
                    <InputText id="workplace" type="text" class="p-inputtext-sm" v-model="card.Workplace" placeholder="Введите место работы"/>
                </div>
            </div>
            <div class="p-col-6">
                <div class="p-mb-2">
                    <label for="profession" class="p-text-bold">Профессия:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-info-circle"></i>
                    </span>
                    <InputText id="profession" type="text" class="p-inputtext-sm" v-model="card.Profession" placeholder="Введите профессию"/>
                </div>
            </div>
            <div class="p-col-12">
                <div class="p-mb-2">
                    <label  for="notation" class="p-text-bold">Дополнительно:</label>
                </div>
                <Textarea id="notation" :autoResize="true" rows="1" cols="30" v-model="card.Notation" placeholder="Дополнительная информация"/>
            </div>
        </div>
        <div class="p-grid" v-show="!onEdit">
            <div class="p-col-12">
                <div class="p-mb-2">
                    <label for="workplace" class="p-text-bold">Место работы:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-info-circle"></i>
                    </span>
                    <InputText type="text" class="p-inputtext-sm" v-model="workplace" disabled/>
                </div>
            </div>
            <div class="p-col-12">
                <div class="p-mb-2">
                    <label  for="notation" class="p-text-bold">Дополнительно:</label>
                </div>
                <div class="notation">{{ card.Notation }}</div>
            </div>
        </div>
    </Panel>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Panel from 'primevue/components/panel/Panel'
import Textarea from 'primevue/components/textarea/Textarea'
import InputText from 'primevue/components/inputtext/InputText'
export default {
  name: 'CardAdditionally',
  components: { InputText, Textarea, Panel },
  setup () {
    const store = useStore()
    const onEdit = ref(false)
    const card = computed(() => store.state.card.patientCard)
    const workplace = computed(() => card.value.Workplace + ', ' + card.value.Profession)
    const changeEditMode = () => {
      onEdit.value = !onEdit.value
    }
    return {
      card,
      onEdit,
      changeEditMode,
      workplace
    }
  }

}
</script>

<style scoped>
    .notation{
        border: solid 1px;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        background: #fff6de;
        border-color: #dee2e6;
        word-break: break-all;
        opacity: 0.65
    }
</style>
