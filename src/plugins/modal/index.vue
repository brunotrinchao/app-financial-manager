<template>
  <div>
    <b-modal
      v-for="modal in modals"
      :key="modal.id"
      :id="modal.id"
      :title="modal.title"
      :ok-title="modal.okTitle || 'OK'"
      :cancel-title="modal.cancelTitle || 'Cancel'"
      @ok="modal.onOk && modal.onOk()"
      @cancel="modal.onCancel && modal.onCancel()"
      @hidden="closeModal(modal.id)"
    >
      <div v-html="modal.content"></div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      title: '',
      text: ''
    };
  },
  methods: {
    hide() {
      this.visible = false;
    }
  }
};
</script>
