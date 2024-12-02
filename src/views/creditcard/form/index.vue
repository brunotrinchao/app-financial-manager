<template>
  <div class="category-form-add">
    <b-form @submit="onSubmit">
      <input type="hidden" v-model="form.id" />
      <b-row>
        <b-col md="4">
          <b-form-group label="Bandeira" label-for="flag">
            <b-form-select name="flag" id="flag" v-model="issuer" :options="getFlagsList"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="8">
          <b-form-group label="Nome" label-for="name">
            <b-form-input name="name" id="name" v-model="form.name" type="text" autofocus></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Limite" label-for="limit">
            <currency-input class="form-control" v-model="form.limit" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Disponível" label-for="limit">
            <currency-input class="form-control" v-model="form.available_limit" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>
  </div>
</template>

<script src="./form.js" />
