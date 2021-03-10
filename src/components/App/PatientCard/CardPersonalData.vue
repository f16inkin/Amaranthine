<template>
    <div id="data">
        <Panel>
            <template #header>
                <i class="pi pi-user p-text-bold" style="color: #15cc15"><span class="p-text-bold" style="color: black"> Персональные данные</span></i>
            </template>
            <template #icons>
                <button class="p-panel-header-icon p-link p-mr-2" @click="editCard" v-show="!onEdit" v-tooltip.top="'Редактировать'" :disabled = "editButtonDisabled">
                    <span class="pi pi-pencil"></span>
                </button>
                <button class="p-panel-header-icon p-link p-mr-2" @click="saveCard" v-show="onEdit" v-tooltip.top="'Сохранить'" :disabled = "saveButtonDisabled">
                    <span class="pi pi-save"></span>
                </button>
            </template>
            <div class="p-grid" v-show="onEdit">
                <div class="p-col-3">
                    <div class="p-mb-2">
                        <label for="card-number" class="p-text-bold">№ карты:<i style="color:red">*</i></label>
                    </div>
                    <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                    </span>
                        <InputText id="card-number" type="text" class="p-inputtext-sm" v-model="card.CardNumber" placeholder="Введите номер карты"/>
                    </div>
                </div>
                <div class="p-col-9"></div>
                <div class="p-col-4">
                    <div class="p-mb-2">
                        <label for="surname" class="p-text-bold">Фамилия:<i style="color:red">*</i></label>
                    </div>
                    <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                    </span>
                        <InputText id="surname" type="text" class="p-inputtext-sm"  v-model="card.Surname" placeholder="Введите фамилию"/>
                    </div>
                </div>
                <div class="p-col-4">
                    <div class="p-mb-2">
                        <label for="first-name" class="p-text-bold">Имя:<i style="color:red">*</i></label>
                    </div>
                    <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                    </span>
                        <InputText id="first-name" type="text" class="p-inputtext-sm"  v-model="card.FirstName" placeholder="Введите имя"/>
                    </div>
                </div>
                <div class="p-col-4">
                    <div class="p-mb-2">
                        <label for="second-name" class="p-text-bold">Отчество:</label>
                    </div>
                    <div class="p-inputgroup">
                   <span class="p-inputgroup-addon">
                   <i class="pi pi-user"></i>
                    </span>
                        <InputText id="second-name" type="text" class="p-inputtext-sm" v-model="card.SecondName" placeholder="Введите отчество"/>
                    </div>
                </div>
                <div class="p-col-4">
                    <div class="p-mb-2">
                        <label for="date-birth" class="p-text-bold">Дата рождения<i style="color:red">*</i></label>
                    </div>
                    <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                        <InputText id="second-name" type="date"  v-model="card.DateBirth" class="p-inputtext-sm"/>
                    </div>
                </div>
                <div class="p-col-4">
                    <div class="p-mb-2">
                        <label class="p-text-bold">Пол<i style="color:red">*</i></label>
                        <div class="p-inputgroup p-mt-2">
                            <RadioButton id="male" class="p-mr-1" name="male" :value="genders.male" v-model="card.Gender" />
                            <label for="male" class="p-mr-3">мужской</label>
                            <RadioButton id="female" class="p-mr-1" name="female" :value="genders.female" v-model="card.Gender" />
                            <label for="female">женский</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-grid" v-show="!onEdit">
                <div class="p-col-3">
                    <div class="p-mb-2">
                        <label class="p-text-bold">№ карты:</label>
                    </div>
                    <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                    </span>
                        <InputText type="text" v-model="card.CardNumber" class="p-inputtext-sm" disabled/>
                    </div>
                </div>
                <div class="p-col-9">
                    <div class="p-mb-2">
                        <label class="p-text-bold">ФИО пациента:</label>
                    </div>
                    <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                    </span>
                        <InputText type="text" v-model="fullName" class="p-inputtext-sm" disabled/>
                    </div>
                </div>
                <div class="p-col-4">
                    <div class="p-mb-2">
                        <label class="p-text-bold">Дата рождения</label>
                    </div>
                    <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                        <InputText type="date" v-model="card.DateBirth" class="p-inputtext-sm" disabled/>
                    </div>
                </div>
                <div class="p-col-4">
                    <div class="p-mb-2">
                        <label class="p-text-bold">Пол</label>
                        <div class="p-inputgroup p-mt-2">
                            <span class="gender">{{ gender }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import InputText from "primevue/components/inputtext/InputText";
import RadioButton from "primevue/components/radiobutton/RadioButton";
import Panel from "primevue/components/panel/Panel";
import Toast from "primevue/components/toast/Toast";
export default {
  name: 'CardPersonalData',
    components: {Toast, Panel, RadioButton, InputText},
    setup () {
    const store = useStore()
    const toast = useToast()
    const onEdit = ref(false)
    const editButtonDisabled = ref(false)
    const saveButtonDisabled = ref(true)
    const card = computed(() => store.state.card.patientCard)
    const fullName = computed(() => (card.value.Surname + ' ' + card.value.FirstName + ' ' + card.value.SecondName))
    const gender = computed(() => {
      if (card.value.Gender === 1) return 'Мужской'
      else return 'Женский'
    })
    const genders = { male: 1, female: 2 }
    const editCard = async () => {
      onEdit.value = !onEdit.value
      editButtonDisabled.value = !editButtonDisabled.value
      const result = await store.dispatch('card/blockCardAction', card.value.CardId)
      if (result.status === 200){
          toast.add({severity: 'warn', summary: 'Внимание', detail: 'Карта была заблокирована вами для редактирования', life: 1000});
      }
      // Кнопка сохранения появляется тепреь только опсле блокировки карты
      saveButtonDisabled.value = !saveButtonDisabled.value
    }
    const saveCard = async () => {
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
    return {
      card,
      onEdit,
      editButtonDisabled,
      saveButtonDisabled,
      fullName,
      gender,
      genders,
      editCard,
      saveCard
    }
  }
}
</script>

<style >
    .gender {
        border: solid 1px;
        padding: 0.4rem;
        border-radius: 5px;
        opacity: 0.65;
        border-color: #bdbdbd;
        font-weight: 400;
    }
</style>
