<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <b-card class="login-card p-4" header="Login" header-tag="h4" header-class="text-center bg-white">
      <b-form @submit.prevent="handleLogin">
        <!-- E-mail -->
        <b-form-group label-for="email">
          <b-form-input id="email" type="email" v-model="form.email" placeholder="exemplo@email.com" required />
        </b-form-group>

        <!-- Senha -->
        <b-form-group label-for="password">
          <b-form-input id="password" type="password" v-model="form.password" placeholder="Senha" required />
        </b-form-group>

        <!-- Botão de Login -->
        <b-button type="submit" variant="primary" block :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </b-button>
        <p class="mt-3 text-center">
          <router-link to="/forgot-password">Esqueci a senha</router-link>
        </p>
      </b-form>
      <b-button @click="handleLoginGoogle" variant="danger" block :disabled="loading">
        {{ loading ? 'Entrando...' : 'Entrar com Google' }}
      </b-button>
    </b-card>
  </div>
</template>

<script src="./login.js" />

<style scoped lang="scss" src="./login.scss" />
