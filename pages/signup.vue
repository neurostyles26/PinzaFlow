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
      <div v-if="!signupSuccess" class="text-center">
        <div class="mx-auto flex justify-center mb-4">
          <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-12 h-12 rounded-xl shadow-xl shadow-primary/30" />
        </div>
        <h1 class="text-3xl font-black text-white tracking-tight">Crea tu cuenta</h1>
        <p class="mt-2 text-text-secondary">Empieza a automatizar tus ventas por WhatsApp hoy</p>
      </div>

      <!-- Success State -->
      <div v-if="signupSuccess" class="card text-center space-y-6 py-12 animate-fade-in">
        <div class="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <MailCheck class="w-10 h-10 text-primary" />
        </div>
        <h2 class="text-3xl font-black text-white">¡Casi listo!</h2>
        <p class="text-text-secondary font-medium leading-relaxed px-4">
          Hemos enviado un enlace de verificación a <br/>
          <span class="text-white font-bold">{{ email }}</span>.
        </p>
        <p class="text-sm text-text-secondary italic">Por favor, revisa tu bandeja de entrada y spam.</p>
        <NuxtLink to="/login" class="btn-primary inline-flex py-3 px-8 mt-4">Ir al Inicio de Sesión</NuxtLink>
      </div>

      <div v-if="!signupSuccess" class="card space-y-6">
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

      <p v-if="!signupSuccess" class="text-center text-sm text-text-secondary">
        ¿Ya tienes una cuenta? 
        <NuxtLink to="/login" class="text-primary hover:text-primary-accent font-black transition-colors">Inicia sesión</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, MailCheck } from 'lucide-vue-next'
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
const signupSuccess = ref(false)

const handleSignup = async () => {
  loading.value = true
  error.value = null
  
  const url = useRequestURL()
  const { error: authError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: `${url.origin}/confirm`,
      data: {
        full_name: name.value
      }
    }
  })

  if (authError) {
    error.value = authError.message
    loading.value = false
  } else {
    // Éxito: Cambiamos el estado para mostrar un mensaje profesional en el template
    signupSuccess.value = true
    loading.value = false
  }
}
</script>
