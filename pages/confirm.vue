<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-6">
    <div class="w-full max-w-md text-center space-y-8 animate-fade-in">
      <!-- Success Icon Animation -->
      <div class="relative mx-auto w-24 h-24">
        <div class="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
        <div class="relative flex items-center justify-center w-24 h-24 bg-primary rounded-full shadow-2xl shadow-primary/40">
          <CheckCircle2 class="w-12 h-12 text-background" />
        </div>
      </div>

      <div class="space-y-4">
        <h1 class="text-4xl font-black text-white tracking-tighter">¡Cuenta Verificada!</h1>
        <p class="text-text-secondary text-lg font-medium leading-relaxed">
          Tu correo ha sido confirmado con éxito. Ya tienes acceso total a la plataforma de PinFlowser.
        </p>
      </div>

      <div class="card p-8 space-y-6 bg-surface/50 backdrop-blur-xl border border-white/5">
        <div class="flex items-center gap-4 text-left p-4 rounded-2xl bg-white/5 border border-white/5">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Zap class="w-5 h-5 text-primary" />
          </div>
          <div>
            <p class="text-xs text-text-secondary uppercase tracking-widest font-black">Estado del Perfil</p>
            <p class="text-white font-bold">Activo y Listo</p>
          </div>
        </div>

        <button 
          @click="goToDashboard" 
          class="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
        >
          <span class="font-black">Ir al Dashboard</span>
          <ArrowRight class="w-5 h-5" />
        </button>
      </div>

      <p class="text-sm text-text-secondary animate-pulse">
        Redirigiendo automáticamente en unos segundos...
      </p>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle2, ArrowRight, Zap } from 'lucide-vue-next'

definePageMeta({
  layout: false,
  public: true
})

const user = useSupabaseUser()

const goToDashboard = () => {
  navigateTo('/dashboard')
}

// Redirección automática después de 5 segundos
onMounted(() => {
  setTimeout(() => {
    if (user.value) {
      navigateTo('/dashboard')
    }
  }, 5000)
})

// Vigilamos si el usuario se loguea (Supabase procesa el token en la URL)
watch(user, (newUser) => {
  if (newUser) {
    setTimeout(() => navigateTo('/dashboard'), 2000)
  }
}, { immediate: true })
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
