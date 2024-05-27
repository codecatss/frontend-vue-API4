<script setup>
// eslint-disable-next-line import/no-unresolved
import avatar1 from '@images/avatars/avatar-1.jpeg'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const userLabel = ref()
const userRole = ref()

const router = useRouter()

onMounted(() => {
  userLabel.value = localStorage.getItem('userName')
  userRole.value = localStorage.getItem('userRole')
})

const logOut = async () => {
  localStorage.clear()
  router.push('/auth' )
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SEÇÃO Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 Avatar e Nome do Usuário -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle
              v-model="userLabel"
              class="font-weight-semibold"
            >
              {{ userLabel }}
            </VListItemTitle>
            <VListItemSubtitle v-model="userRole">
              {{ userRole }}
            </VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Perfil -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-user"
                size="22"
              />
            </template>

            <VListItemTitle>Perfil</VListItemTitle>
          </VListItem>

          <!-- 👉 Configurações -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-cog"
                size="22"
              />
            </template>

            <VListItemTitle>Configurações</VListItemTitle>
          </VListItem>

          <!--
            👉 Preços 
            <VListItem link>
            <template #prepend>
            <VIcon
            class="me-2"
            icon="bx-dollar"
            size="22"
            />
            </template>

            <VListItemTitle></VListItemTitle>
            </VListItem>
          -->

          <!-- 👉 Perguntas Frequentes -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-help-circle"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Separador -->
          <VDivider class="my-2" />

          <!-- 👉 Sair -->
          <VListItem @click="logOut">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-log-out"
                size="22"
              />
            </template>

            <VListItemTitle>Sair</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SEÇÃO -->
    </VAvatar>
  </VBadge>
</template>
