<template>
  <div class="modal-form">
    <b-modal ref="modalForm" id="formAdd" :size="size" :title="title" v-if="component" :hide-footer="true">
      <component :is="component" :data="selectedItem" />
      <template slot="modal-footer"></template>
    </b-modal>
  </div>
</template>

<script src="./modalform.js" />

<style scoped lang="scss" src="./modalform.scss" />
