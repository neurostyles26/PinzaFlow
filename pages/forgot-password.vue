<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-6 relative">
    <!-- Back Button -->
    <NuxtLink to="/login" class="absolute top-8 left-8 flex items-center gap-2 text-text-secondary hover:text-white transition-all group">
      <div class="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
        <ArrowLeft class="w-5 h-5" />
      </div>
      <span class="font-bold text-sm">Volver al inicio de sesión</span>
    </NuxtLink>

    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <div class="mx-auto flex justify-center mb-4">
          <div class="p-4 rounded-3xl bg-primary/10 border border-primary/20">
            <KeyRound class="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 class="text-3xl font-black text-white tracking-tight">¿Olvidaste tu contraseña?</h1>
        <p class="mt-2 text-text-secondary">No te preocupes, te enviaremos instrucciones para restablecerla.</p>
      </div>

      <div class="card space-y-6">
        <form v-if="!submitted" @submit.prevent="handleForgotPassword" class="space-y-4">
          <div>
            <label class="block text-sm font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Correo Electrónico</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              class="input-field w-full" 
              placeholder="tu@email.com"
            />
          </div>

          <div v-if="error" class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
            {{ error }}
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="btn-primary w-full flex items-center justify-center gap-3 py-4"
          >
            <span v-if="loading" class="animate-spin w-5 h-5 border-2 border-background border-t-transparent rounded-full"></span>
            <span class="font-bold text-lg">{{ loading ? 'Enviando...' : 'Enviar instrucciones' }}</span>
          </button>
        </form>

        <div v-else class="text-center space-y-6 py-4">
          <div class="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
            <p class="font-bold">¡Correo enviado!</p>
            <p class="text-sm mt-1">Revisa tu bandeja de entrada para continuar con el proceso.</p>
          </div>
          <button @click="submitted = false" class="text-sm text-text-secondary hover:text-white transition-colors">
            ¿No recibiste el correo? Reintentar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, KeyRound } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const email = ref('')
const loading = ref(false)
const error = ref(null)
const submitted = ref(false)

const handleForgotPassword = async () => {
  loading.value = true
  error.value = null
  
  const url = useRequestURL()
  const { error: authError } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${url.origin}/reset-password`,
  })

  if (authError) {
    error.value = authError.message
  } else {
    submitted.value = true
  }
  
  loading.value = false
}
</script>
