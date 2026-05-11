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
        <h1 class="text-3xl font-black text-white tracking-tight">Crea tu cuenta</h1>
        <p class="mt-2 text-text-secondary">Empieza a automatizar tus ventas por WhatsApp hoy</p>
      </div>

      <div class="card space-y-6">
        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-sm font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Nombre Completo</label>
            <input 
              v-model="name" 
              type="text" 
              required 
              class="input-field w-full" 
              placeholder="Juan Pérez"
            />
          </div>
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
            <label class="block text-sm font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Contraseña</label>
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
            <span class="font-bold text-lg">{{ loading ? 'Creando cuenta...' : 'Empezar Gratis' }}</span>
          </button>
        </form>
      </div>

      <p class="text-center text-sm text-text-secondary">
        ¿Ya tienes una cuenta? 
        <NuxtLink to="/login" class="text-primary hover:text-primary-accent font-black transition-colors">Inicia sesión</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
definePageMeta({
  layout: false,
  middleware: 'guest'
})

const supabase = useSupabaseClient()
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const handleSignup = async () => {
  loading.value = true
  error.value = null
  
  const { error: authError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        full_name: name.value
      }
    }
  })

  if (authError) {
    error.value = authError.message
  } else {
    // Show success or navigate
    alert('Signup successful! Please check your email to verify.')
    navigateTo('/login')
  }
  
  loading.value = false
}
</script>
