<template>
  <div class="transaction-form-add">
    <b-form @submit="onSubmit">
      <input type="hidden" v-model="form.id" />
      <b-row>
        <!-- Type -->
        <b-col md="6">
          <b-form-group label="Tipo de transação" label-for="type">
            <b-form-select name="type" id="type" v-model="form.type" :options="getTypes" @change="handleTypeChange"></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Categoria" label-for="category-id">
            <b-form-select name="category" id="category" v-model="form.category_id" :options="getCategories" :disabled="!form.type"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Componente dinâmico -->
      <div v-if="form.type">
        <component
          ref="formType"
          :is="getComponent(form.type)"
          :form="form"
          :getSources="getSources"
          :getMethods="getMethods"
          :getCategories="getCategories"
          :getFrequency="getFrequency"
          :getSourcesAccount="getSourcesAccount"
        />

        <b-row>
          <b-col sm="12">
            <b-form-group label="Descrição" label-for="description">
              <b-form-textarea name="description" id="description" v-model="form.description" type="text"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <!-- Botões -->
      <b-row>
        <b-col sm="12" class="text-right">
          <b-button type="submit" variant="primary">Salvar</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script src="./form.js" />
