<template>
  <div class="Header">
    <b-navbar fixed="top" toggleable="lg" variant="white" class="shadow-sm p-3 mb-5">
      <b-navbar-brand href="#">Gerencimento financeiro</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-for="(item, index) in menu" :key="index">
          <b-nav-item :to="item.link">
            <b-icon :icon="item.icon" />
            {{ item.name }}
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar :size="30" :src="getAvatar"></b-avatar>
              <em class="m-2">{{ getName }}</em>
            </template>
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item to="/logout">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script src="./header.js" />

<style scoped lang="scss" src="./header.scss" />
