<template>
  <div class="transaction-form-add">
    <Form
      :form="form"
      :getTypes="getTypes"
      :getSources="getSources"
      :getMethods="getMethods"
      :getCategories="getCategories"
      :getFrequency="getFrequency"
    ></Form>

    <!-- <b-form @submit="onSubmit">
      <input type="hidden" v-model="form.id" />
      <b-row v-if="form.id">
        <b-col md="6">
          <b-form-group label="Status" label-for="type">
            <b-form-select name="type" id="type" v-model="form.status" :options="getStatus"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        
        <b-col md="6">
          <b-form-group label="Tipo de transação" label-for="type">
            <b-form-select name="type" id="type" v-model="form.type" :options="getTypes"></b-form-select>
          </b-form-group>
        </b-col>

        
        <b-col md="6">
          <b-form-group label="Categoria" label-for="category-id">
            <b-form-select name="category" id="category" v-model="form.category_id" :options="getCategories" :disabled="!form.type"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="form.type">
        
        
        <b-col md="6" v-if="form.type == 'income'">
          <b-form-group label="Fonte" label-for="source-type">
            <b-form-select name="source-type" id="source-type" v-model="source">
              <b-form-select-option value="">Selecione</b-form-select-option>
              <b-form-select-option-group :label="translate(keyIndex)" v-for="(item, keyIndex) in getSources" :key="keyIndex">
                <b-form-select-option :value="{ id: subItem.id, type: keyIndex }" v-for="(subItem, index) in item" :key="index">
                  {{ subItem.name }}
                </b-form-select-option>
              </b-form-select-option-group>
            </b-form-select>
          </b-form-group>
        </b-col>

        
        <b-col md="6">
          <b-form-group :label="`Método de ${form.type == 'income' ? 'recebimento' : 'pagamento'}`" label-for="method">
            <b-form-select name="method" id="method" v-model="form.method" :options="getMethods"></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6" v-if="form.type == 'expense'">
          <b-form-group label="Fonte" label-for="source-type">
            <b-form-select name="source-type" id="source-type" v-model="source" :disabled="!form.method">
              <b-form-select-option :value="{ id: item.value, type: item.souce_type }" v-for="(item, index) in getSourcesAccount" :key="index">
                {{ item.type }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>

        
        <b-col md="6">
          <b-form-group label="Valor" label-for="amount" :description="getParcelas">
            <currency-input class="form-control" v-model="form.amount" />
            
          </b-form-group>
        </b-col>

        <b-col md="6" v-if="form.type == 'transfer'">
          <b-form-group label="Da conta" label-for="source-type">
            <b-form-select name="source-type" id="source-type" v-model="source" :disabled="!form.method">
              <b-form-select-option :value="{ id: item.value, type: item.souce_type }" v-for="(item, index) in getSourcesAccount" :key="index">
                {{ item.type }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6" v-if="form.type == 'transfer'">
          <b-form-group label="Para conta" label-for="source-type">
            <b-form-select name="source-type" id="source-type" v-model="source" :disabled="!form.method">
              <b-form-select-option :value="{ id: item.value, type: item.souce_type }" v-for="(item, index) in getSourcesAccount" :key="index">
                {{ item.type }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>

        
        <b-col md="6">
          <b-form-group label="Data da transação" label-for="transaction-date">
            <b-form-datepicker
              id="transaction_date"
              name="transaction_date"
              v-model="form.transaction_date"
              :locale="locale"
              :date-format-options="dateFormatOptions"
              hide-header
              :label-next-month="label.NextMonth"
              :label-next-year="label.NextYear"
              :label-no-date-selected="label.NoDateSelected"
              :label-prev-month="label.PrevMonth"
              :label-prev-year="label.PrevYear"
              :label-selected="label.Selected"
              :label-today="label.Today"
              :label-current-month="label.CurrentMonth"
              :label-help="label.Help"
              :min="form.transactionDate"
            />
          </b-form-group>
        </b-col>


        <b-col md="6" v-if="form.type == 'expense'">
          <b-form-group label="Parcelas" label-for="interval">
            <b-form-input name="interval" id="interval" v-model="form.interval" type="number" :min="1"></b-form-input>
          </b-form-group>
        </b-col>
        
        <b-col md="6" v-if="form.interval > 1">
          <b-form-group label="Frequência" label-for="frequency">
            <b-form-select name="frequency" id="frequency" v-model="form.frequency" :options="getFrequency" :disabled="form.interval <= 1"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" v-if="form.type">
          <b-form-group label="Descrição" label-for="description">
            <b-form-textarea name="description" id="description" v-model="form.description" type="text"></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col sm="12" class="text-right">
          <b-button type="submit" variant="primary">Salvar</b-button>
        </b-col>
      </b-row>
    </b-form> -->
  </div>
</template>

<script src="./add.js" />

<style scoped lang="scss" src="./add.scss" />
