<template>
  <div class="category-form-add">
    <b-form @submit="onSubmit" inline>
      <input type="hidden" v-model="form.id" />
      <label class="sr-only" for="name">Nome</label>
      <b-form-input name="name" id="name" v-model="form.name" type="text" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Nome" autofocus></b-form-input>
      <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>
  </div>
</template>

<script src="./form.js" />
