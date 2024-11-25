<template>
  <div class="fab-container">
    <div class="fab shadow">
      <div class="fab-content">
        <b-icon icon="plus" font-scale="2" />
      </div>
    </div>
    <div class="sub-button shadow" v-for="(item, index) in menuFieltered" :key="index">
      <small>{{ item.name }}</small>
      <b-link href="#">
        <b-icon :icon="item.icon" @click="clickHandler(item)" />
      </b-link>
      <!-- <RouterLink :to="item.link">
        
      </RouterLink> -->
    </div>

    <ModalForm :title="modalTitle" size="md" :component="selectedComponent" :data="selectedItem" />
  </div>
</template>

<script src="./fab.js" />

<style scoped lang="scss" src="./fab.scss" />
