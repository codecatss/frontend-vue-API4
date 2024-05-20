<script setup>
// eslint-disable-next-line import/no-unresolved
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useRouter } from 'vue-router'
// eslint-disable-next-line regex/invalid
import axios from 'axios'

const router = useRouter()

const email = ref('email')
const password = ref('password')
const remember = ref()

const submitLogin = async () => {

  const formData = new FormData()

  formData.append('email', email.value)
  formData.append('password', password.value)

  try {
    const response = await axios.post('http://localhost:8080/auth', formData)

    if (response.status === 201) {

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userName', response.data.userName)
      localStorage.setItem('userRole', response.data.userRole)

      router.push('/dashboard')
      
    } else {
      console.error('Login failed', response.status)
    }

  } catch (error) {
    console.error('An error occurred during login:', error)
  }
}



const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">

          </div>
        </template>

        <!-- 
          <VCardTitle class="text-2xl font-weight-bold">
          Oracle Partner
          </VCardTitle>
        -->
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Welcome to Oracle Partner! 👋🏻
        </h5>
        <p class="mb-0">
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submitLogin">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="email"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="remember"
                  label="Remember me"
                />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
