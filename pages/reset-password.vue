<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-6">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <div class="mx-auto flex justify-center mb-4">
          <div class="p-4 rounded-3xl bg-primary/10 border border-primary/20">
            <ShieldCheck class="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 class="text-3xl font-black text-white tracking-tight">Nueva contraseña</h1>
        <p class="mt-2 text-text-secondary">Ingresa tu nueva clave de acceso para asegurar tu cuenta.</p>
      </div>

      <div class="card space-y-6">
        <form @submit.prevent="handleResetPassword" class="space-y-4">
          <div>
            <label class="block text-sm font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Nueva Contraseña</label>
            <input 
              v-model="password" 
              type="password" 
              required 
              class="input-field w-full" 
              placeholder="••••••••"
              minlength="6"
            />
          </div>
          <div>
            <label class="block text-sm font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Confirmar Contraseña</label>
            <input 
              v-model="confirmPassword" 
              type="password" 
              required 
              class="input-field w-full" 
              placeholder="••••••••"
              minlength="6"
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
            <span class="font-bold text-lg">{{ loading ? 'Actualizando...' : 'Cambiar contraseña' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShieldCheck } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref(null)

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  loading.value = true
  error.value = null
  
  const { error: authError } = await supabase.auth.updateUser({
    password: password.value
  })

  if (authError) {
    error.value = authError.message
  } else {
    alert('Contraseña actualizada con éxito')
    navigateTo('/login')
  }
  
  loading.value = false
}
</script>
