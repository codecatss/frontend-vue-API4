<!-- eslint-disable import/no-unresolved -->
<script setup>
import { useTheme } from 'vuetify'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Componentes
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import NotificationBox from '@/components/NotificationBox.vue'
import { ref } from 'vue'

const vuetifyTheme = useTheme()

const showNotifBox = ref(false)
const notifBoxRef = ref(null)
const componentWrapper = ref(null)

const toggleNotifBox = () => {  

  showNotifBox.value = !showNotifBox.value
  console.log("TOGGLE NOTIF BOX")
}

const handleClickOutside = (event) => {
  if (
    showNotifBox.value &&
      componentWrapper.value && // Ensure componentWrapper is not null
        !componentWrapper.value.contains(event.target) && // Check if the clicked element is outside the component
          notifBoxRef.value && // Ensure notifBoxRef is not null
            !notifBoxRef.value.$el.contains(event.target)
  ) {
    showNotifBox.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 barra de navegação -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Alternância de navegação vertical no modo de sobreposição -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!-- 👉 Pesquisa -->
        <!--
          <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none;"
          >
          <IconBtn>
          <VIcon icon="bx-search" />
          </IconBtn>

          <span class="d-none d-md-flex align-center text-disabled">
          <span class="me-3">Pesquisa</span>
          <span class="meta-key">&#8984;K</span>
          </span>
          </div>
        -->
        <VSpacer />

        <IconBtn
          class="me-2"
          href="https://github.com/codecatss/API-BD4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VIcon icon="bxl-github" />
        </IconBtn>

        <div ref="componentWrapper">
          <IconBtn class="me-2 btnNotif" @click="toggleNotifBox">
            <VIcon icon="bx-bell" />
            <div class="notifDiv" v-if="showNotifBox">
              <NotificationBox ref="notifBoxRef"/>
            </div>
          </IconBtn>
        </div>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Membros',
          icon: 'bx-bar-chart-alt-2',
          to: '/membros',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Dados Inválidos',
          icon: 'bx-error-circle',
          to: '/',
        }"
      />



      <!-- 👉 Páginas -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Gerenacimento de Dados',
        }"
      />


      
      <VerticalNavLink
        :item="{
          title: 'Adicionar Parceiros ',
          icon: 'mdi-account-multiple-plus',
          to: '/',
        }"
      />


    
      <VerticalNavLink
        :item="{
          title: 'Usuários ',
          icon: 'bx-user-plus',
          to: '/',
        }"
      />

  
      <VerticalNavLink
        :item="{
          title: 'Tracks',
          icon: 'bx-add-to-queue',
          to: '/',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Expertise',
          icon: 'bx-notepad',
          to: '/',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Workload',
          icon: 'bx-brain',
          to: '/',
        }"
      />

 <!--
<VerticalNavLink
  :item="{
    title: 'Login',
    icon: 'mdi-alert',
    to: '/login',
  }"
/>
<VerticalNavLink
  :item="{
    title: 'Registrar',
    icon: 'bx-user-plus',
    to: '/register',
  }"
/>
<VerticalNavLink
  :item="{
    title: 'Erro',
    icon: 'bx-info-circle',
    to: '/no-existence',
  }"
/>
-->

      <!-- 👉 Interface do Usuário -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Configurações',
        }"
      />
     <!--
<VerticalNavLink
  :item="{
    title: 'Tipografia',
    icon: 'mdi-alpha-t-box-outline',
    to: '/typography',
  }"
/>
<VerticalNavLink
  :item="{
    title: 'Ícones',
    icon: 'bx-show',
    to: '/icons',
  }"
/>
<VerticalNavLink
  :item="{
    title: 'Cartões',
    icon: 'bx-credit-card',
    to: '/cards',
  }"
/>
<VerticalNavLink
  :item="{
    title: 'Tabelas',
    icon: 'bx-table',
    to: '/tables',
  }"
/>
<VerticalNavLink
  :item="{
    title: 'Layouts de Formulários',
    icon: 'mdi-form-select',
    to: '/form-layouts',
  }"
/>
-->

      <VerticalNavLink
        :item="{
          title: 'Configurações da conta',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
      />

      <VerticalNavLink
      :item="{
        title: 'Loggout',
        icon: 'bx-log-out',
        to: '/',
      }"
    />


    </template>

    <template #after-vertical-nav-items>
      <!-- 👉 ilustração -->
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        style="margin-left: 7px;"
      />
    </template>

    <!-- 👉 Páginas -->
    <slot />

    <!-- 👉 Rodapé -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
  .meta-key {
    border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 6px;
    block-size: 1.5625rem;
    line-height: 1.3125rem;
    padding-block: 0.125rem;
    padding-inline: 0.25rem;
  }

  .btnNotif {
    position: relative;
  }

  .notifDiv {
    display: block;
    position: absolute;
    width: 250%;
    top: 50px;
    right: 600%;
    // box-shadow: 5px 5px 15px rgba(0,0,0,0.25);
  }
</style>
