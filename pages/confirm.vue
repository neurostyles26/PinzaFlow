<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-6">
    <div class="w-full max-w-md text-center space-y-8">
      <!-- Logo and Animation -->
      <div class="relative mx-auto w-24 h-24 mb-8">
        <div class="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
        <div class="relative flex items-center justify-center w-full h-full bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
          <img v-if="!confirmed" src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-12 h-12 rounded-xl" />
          <Check v-else class="w-12 h-12 text-green-400 animate-bounce" />
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-4">
        <h1 class="text-3xl font-black text-white tracking-tight">
          {{ confirmed ? '¡Autenticación Correcta!' : 'Confirmando tu cuenta...' }}
        </h1>
        <p class="text-text-secondary max-w-xs mx-auto">
          {{ confirmed 
            ? 'Tu cuenta ha sido verificada con éxito. Redirigiéndote al panel de control...' 
            : 'Estamos validando tus datos de acceso de forma segura. Por favor, no cierres esta ventana.' 
          }}
        </p>
      </div>

      <!-- Status Indicator -->
      <div v-if="!confirmed" class="flex justify-center gap-2">
        <div class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 0ms"></div>
        <div class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 150ms"></div>
        <div class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 300ms"></div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium animate-shake">
        {{ error }}
        <div class="mt-4">
          <NuxtLink to="/login" class="text-primary hover:underline font-bold">Volver al inicio de sesión</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Check } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const route = useRoute()
const confirmed = ref(false)
const error = ref(null)

onMounted(async () => {
  // 1. If already logged in, just wait a bit and redirect
  if (user.value) {
    confirmed.value = true
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 2000)
    return
  }

  // 2. Extract token from URL
  const { token_hash, type } = route.query

  if (token_hash && type) {
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        hash: token_hash,
        type: type
      })

      if (verifyError) {
        error.value = 'El enlace de confirmación ha expirado o no es válido.'
        console.error('Verify error:', verifyError)
      } else {
        confirmed.value = true
        setTimeout(() => {
          navigateTo('/dashboard')
        }, 2000)
      }
    } catch (err) {
      error.value = 'Ocurrió un error inesperado durante la confirmación.'
      console.error('System error:', err)
    }
  } else {
    // No token in URL, check if session was established anyway (PKCE)
    // Sometimes Supabase handles this automatically via the callback
    setTimeout(() => {
      if (user.value) {
        confirmed.value = true
        setTimeout(() => navigateTo('/dashboard'), 1500)
      } else {
        error.value = 'Enlace de confirmación no válido o mal formado.'
      }
    }, 1000)
  }
})
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
