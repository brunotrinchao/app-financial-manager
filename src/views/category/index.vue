<template>
  <div class="Category">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <b-card title="Novo">
          <b-form inline>
            <!-- <b-form-group id="input-group-1" label="Email address:" label-for="input-1" description="We'll never share your email with anyone else."> -->
            <b-form-input id="input-1" v-model="form.name" type="text" placeholder="Nome" required></b-form-input>
            <!-- </b-form-group> -->
            <!-- <b-form-group id="input-group-1" label="Email address:" label-for="input-1" description="We'll never share your email with anyone else."> -->
            <b-dropdown text="Ícone" class="m-md-2">
              <b-dropdown-item v-for="(icon, index) in icons" :key="index">
                <b-icon :icon="icon" />
                {{ icon }}
              </b-dropdown-item>
            </b-dropdown>

            <!-- </b-form-group> -->
            <b-button variant="primary">Salvar</b-button>
          </b-form>
        </b-card>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="card">
          <div class="card-body">
            <Table :items="tableData" :fields="tableFields" :per-page="10" @row-click="handleRowClick" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./category.js" />

<style scoped lang="scss" src="./category.scss" />
