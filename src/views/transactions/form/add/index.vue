<template>
  <div class="transaction-form-add">
    <b-form @submit="onSubmit">
      <b-row>
        <!-- Type -->
        <b-col md="6">
          <b-form-group label="Tipo de transação" label-for="type">
            <b-form-select name="type" id="type" v-model="form.type" :options="getTypes"></b-form-select>
          </b-form-group>
        </b-col>

        <!-- Category ID -->
        <b-col md="6">
          <b-form-group label="Categoria" label-for="category-id">
            <b-form-select name="category" id="category" v-model="form.category_id" :options="getCategories" :disabled="!form.type"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="form.type">
        <!-- Fonte (Apenas para Receita) -->
        <!-- Source Type -->
        <b-col md="6" v-if="form.type == 'income'">
          <b-form-group label="Fonte" label-for="source-type">
            <b-form-select name="source-type" id="source-type" v-model="form.source_type" :options="getSources"></b-form-select>
          </b-form-group>
        </b-col>

        <!-- Método de Recebimento/Pagamento -->
        <b-col md="6">
          <b-form-group :label="`Método de ${form.type == 'income' ? 'recebimento' : 'pagamento'}`" label-for="method">
            <b-form-select name="method" id="method" v-model="form.method" :options="getMethods"></b-form-select>
          </b-form-group>
        </b-col>

        <!-- Amount -->
        <b-col md="6">
          <b-form-group label="Valor" label-for="amount" :description="getParcelas">
            <currency-input class="form-control" v-model="form.amount" />
            <!-- <input type="number" class="form-control" v-model="amountFormated" @input="formatCurrency" /> -->
          </b-form-group>
        </b-col>

        <!-- Transaction Date -->
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

        <!-- Interval -->
        <b-col md="6" v-if="form.type == 'expense'">
          <b-form-group label="Parcelas" label-for="interval">
            <b-form-input name="interval" id="interval" v-model="form.interval" type="number" :min="1"></b-form-input>
          </b-form-group>
        </b-col>
        <!-- Frequency -->
        <b-col md="6" v-if="form.interval > 1">
          <b-form-group label="Frequência" label-for="frequency">
            <b-form-select name="frequency" id="frequency" v-model="form.frequency" :options="getFrequency" :disabled="form.interval <= 1"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" v-if="form.type">
          <!-- Description -->
          <b-form-group label="Descrição" label-for="description">
            <b-form-textarea name="description" id="description" v-model="form.description" type="text"></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col sm="12" class="text-right">
          <b-button type="submit" variant="primary">Salvar</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script src="./add.js" />

<style scoped lang="scss" src="./add.scss" />
