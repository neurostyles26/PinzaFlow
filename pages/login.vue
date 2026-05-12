<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-6 relative">
    <!-- Back Button -->
    <NuxtLink to="/" class="absolute top-8 left-8 flex items-center gap-2 text-text-secondary hover:text-white transition-all group">
      <div class="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
        <ArrowLeft class="w-5 h-5" />
      </div>
      <span class="font-bold text-sm">Regresar</span>
    </NuxtLink>

    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <div class="mx-auto flex justify-center mb-4">
          <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-12 h-12 rounded-xl shadow-xl shadow-primary/30" />
        </div>
        <h1 class="text-3xl font-black text-white tracking-tight">Bienvenido de nuevo</h1>
        <p class="mt-2 text-text-secondary">Inicia sesión en tu cuenta de PinFlowser</p>
      </div>

      <div class="card space-y-6">
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Correo Electrónico</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              class="input-field w-full" 
              placeholder="nombre@empresa.com"
            />
          </div>
          <div>
            <div class="flex items-center justify-between mb-1.5 ml-1">
              <label class="block text-sm font-black text-text-secondary uppercase tracking-widest">Contraseña</label>
              <NuxtLink to="/forgot-password" class="text-xs font-bold text-primary hover:text-primary-accent transition-colors">¿Olvidaste tu contraseña?</NuxtLink>
            </div>
            <input 
              v-model="password" 
              type="password" 
              required 
              class="input-field w-full" 
              placeholder="••••••••"
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
            <span class="font-bold text-lg">{{ loading ? 'Iniciando sesión...' : 'Entrar' }}</span>
          </button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/5"></div></div>
          <div class="relative flex justify-center text-xs uppercase font-bold tracking-[0.2em]"><span class="bg-surface px-2 text-text-secondary">O continúa con</span></div>
        </div>

        <button class="w-full flex items-center justify-center gap-3 px-4 py-4 border border-white/10 rounded-2xl hover:bg-white/5 transition-all font-bold">
          <img src="https://www.google.com/favicon.ico" class="w-5 h-5" alt="Google" />
          Google
        </button>
      </div>

      <p class="text-center text-sm text-text-secondary">
        ¿No tienes una cuenta? 
        <NuxtLink to="/signup" class="text-primary hover:text-primary-accent font-black transition-colors">Regístrate</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (authError) {
    error.value = authError.message
  } else {
    // Usamos window.location para forzar una recarga limpia de la sesión en el navegador
    window.location.href = '/dashboard'
  }
  
  loading.value = false
}
</script>
