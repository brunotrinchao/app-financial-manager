<template>
  <div class="Table">
    <b-table
      striped
      stacked="sm"
      responsive="sm"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      borderless
      @row-clicked="onRowSelected"
    >
      <template #cell(icon)="data">
        <div class="d-flex align-items-center justify-content-center" style="min-width: 50px">
          <b-icon :icon="data.item.icon" v-if="data.item.icon"></b-icon>
        </div>
      </template>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="items.length" :per-page="perPage" align="center" class="mt-3" />
  </div>
</template>

<script src="./table.js" />

<style scoped lang="scss" src="./table.scss" />
