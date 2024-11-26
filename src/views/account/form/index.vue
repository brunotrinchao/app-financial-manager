<template>
  <div class="category-form-add">
    <b-form @submit="onSubmit">
      <input type="hidden" v-model="form.id" />
      <b-row>
        <b-col sm="12">
          <b-form-group label="Nome" label-for="name">
            <b-form-input name="name" id="name" v-model="form.name" type="text" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Nome" autofocus></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Banco" label-for="bank">
            <b-form-select name="bank" id="bank" v-model="bank" :options="getBanks"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Saldo" label-for="balance">
            <currency-input class="form-control" v-model="form.balance" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>
  </div>
</template>

<script src="./form.js" />
