<template>
  <div class="category-form-add">
    <b-form @submit="onSubmit">
      <input type="hidden" v-model="form.id" />
      <b-row>
        <b-col md="6">
          <b-form-group label="Nome" label-for="name">
            <b-form-input name="name" id="name" v-model="form.name" type="text" autofocus></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Limite"
            label-for="limit"
            :description="`Limite disponível ${form.available_limit.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`"
          >
            <currency-input class="form-control" v-model="form.limit" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>
  </div>
</template>

<script src="./form.js" />
