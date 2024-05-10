<script setup>
import { useRoute } from 'vue-router'
import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue'
import AccountSettingsNotification from '@/views/pages/account-settings/AccountSettingsNotification.vue'
import AccountSettingsSecurity from '@/views/pages/account-settings/AccountSettingsSecurity.vue'
import CRUDCompanyInput from '@/views/pages/CompanyCrud/CRUDCompanyInput.vue';
import CRUDTableCompany from '@/views/pages/CompanyCrud/CRUDTableCompany.vue';

const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  {
    title: 'Criar Company',
    icon: 'bx-user',
    tab: 'account',
  },
  {
    title: 'Tabela de Parceiros',
    icon: 'mdi-store',
    tab: 'security',
  },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- Account -->
      <VWindowItem value="account">
        <CRUDCompanyInput />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <CRUDTableCompany />
      </VWindowItem>

      
    </VWindow>
  </div>
</template>
