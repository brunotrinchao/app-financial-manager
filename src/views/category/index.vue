<template>
  <div class="Category">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="card">
          <div class="card-body">
            <b-table
              id="table-categories"
              key="tableCategories"
              ref="table"
              striped
              stacked="sm"
              responsive="sm"
              :items="getItems"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              borderless
              @row-clicked="onRowSelected"
              show-empty
              empty-text="Nenhum registro encontrado."
            >
              <template #cell(name)="data">
                <b class="text-info">{{ data.item.name }}</b>
              </template>
            </b-table>
            <!-- <b-pagination size="sm" v-model="currentPage" :total-rows="totalPage" :per-page="perPage" @input="fetchCategories" align="center" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./category.js" />

<style scoped lang="scss" src="./category.scss" />
