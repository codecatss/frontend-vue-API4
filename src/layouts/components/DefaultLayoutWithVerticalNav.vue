<!-- eslint-disable import/no-unresolved -->
<script setup>
import { useTheme } from 'vuetify'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { api } from '@/service/apiConfig.js';

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

const handleClickOutside = event => {
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

async function exportPdf(){
  const response = await api.get('/dash/export/pdf', {
    responseType: 'arraybuffer',
  })
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'arquivo.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    }).catch(error => {
      console.error('Erro ao baixar o PDF:', error)
    })
}
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

        <IconBtn class="btnHome me-2">
          <RouterLink to="/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              tag="i"
              style="font-size: 24px; height: 24px; width: 24px; color: #4D5F71;"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586l6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"
            /></svg>
          </RouterLink>
        </IconBtn>

        <IconBtn
          class="me-2"
          href="https://github.com/codecatss/API-BD4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VIcon icon="bxl-github" />
        </IconBtn>

        <div ref="componentWrapper">
          <IconBtn
            class="me-2 btnNotif"
            @click="toggleNotifBox"
          >
            <VIcon icon="bx-bell" />
            <div
              v-if="showNotifBox"
              class="notifDiv"
            >
              <NotificationBox ref="notifBoxRef" />
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
          title: 'Dados Históricos',
          icon: 'bx-error-circle',
          to: '/historical',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Exportar PDF',
          icon: 'bx-error-circle',
        }"
        @click="exportPdf"
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
          to: '/company',
        }"
      />


    
      <VerticalNavLink
        :item="{
          title: 'Usuários',
          icon: 'bx-user-plus',
          to: '/user',
        }"
      />

  
      <VerticalNavLink
        :item="{
          title: 'Tracks',
          icon: 'bx-add-to-queue',
          to: '/tracks',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Expertise',
          icon: 'bx-notepad',
          to: '/expertise',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Certification',
          icon: 'bx-brain',
          to: '/certification',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Workload',
          icon: 'bx-notepad',
          to: '/workload',
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
  .btnHome{
    margin: auto;
  }

  .meta-key{
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
