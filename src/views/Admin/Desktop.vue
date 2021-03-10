<template>
    <div>Admin desktop123</div>
    <Button class="p-button-success" @click="toastAction()">123</Button>
    <Toast position="top-right"/>
</template>

<script>
import Toast from "primevue/components/toast/Toast";
import { useToast } from "primevue/usetoast";
import Button from "primevue/components/button/Button";
export default {
  name: 'Desktop',
    components: {Button, Toast},
    setup() {
        const toast = useToast()
        const toastAction = () => {
            //toast.add({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});
            //toast.add({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
            toast.add({severity: 'info', summary: 'Sticky Message', detail: 'Message Content', life: 3000});
        }
        return {
            toastAction
        }
    }
}
</script>

<style scoped>

</style>
