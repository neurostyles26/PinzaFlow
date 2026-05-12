<template>
  <div class="min-h-screen bg-background text-white selection:bg-primary/30">
    <nav class="fixed w-full z-50 glass border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-10 h-10 rounded-xl shadow-xl shadow-primary/30" />
          <h1 class="text-2xl font-bold tracking-tight text-white">PinFlowser</h1>
        </NuxtLink>
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink to="/features" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Características</NuxtLink>
          <NuxtLink to="/demo" class="text-sm font-medium text-primary">Ver Demo</NuxtLink>
          <NuxtLink to="/login" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Iniciar Sesión</NuxtLink>
          <NuxtLink to="/signup" class="btn-primary py-2 px-6 text-sm font-bold">Empezar Ahora</NuxtLink>
        </div>
      </div>
    </nav>

    <main class="pt-40 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16 space-y-4">
          <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter">PinFlowser en <span class="text-primary">Acción</span></h1>
          <p class="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Descubre cómo nuestra IA transforma conversaciones casuales en clientes recurrentes en menos de 2 minutos.
          </p>
        </div>

        <!-- Video Player Section -->
        <div class="max-w-5xl mx-auto mb-32 relative">
          <div class="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30"></div>
          <div class="relative card p-4 overflow-hidden border-2 border-primary/20 bg-surface">
            <div class="aspect-video bg-black rounded-[2.5rem] flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-2xl">
              <img src="/Portada-software.png" class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" alt="Demo Video Preview" />
              <div class="relative z-10 w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-all">
                <Play class="w-10 h-10 fill-background text-background ml-1" />
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
          <p class="text-center mt-8 text-text-secondary font-medium">Click para reproducir la demostración interactiva</p>
        </div>

        <!-- Process Steps -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div v-for="step in demoSteps" :key="step.number" class="relative p-8 rounded-[3rem] bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
            <div class="absolute -top-6 left-8 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-background font-black text-xl shadow-lg shadow-primary/20">
              {{ step.number }}
            </div>
            <div class="mt-4 space-y-4">
              <h3 class="text-2xl font-bold text-white">{{ step.title }}</h3>
              <p class="text-text-secondary leading-relaxed font-medium">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Final CTA -->
        <div class="mt-32 text-center space-y-8">
          <h2 class="text-3xl font-black text-white">¿Impresionado? Empieza tu prueba gratuita hoy.</h2>
          <NuxtLink to="/signup" class="btn-primary py-5 px-12 text-xl inline-flex items-center gap-3">
            <Zap class="w-6 h-6 fill-background" />
            <span class="font-black">Crear mi cuenta ahora</span>
          </NuxtLink>
        </div>
      </div>
    </main>

    <footer class="py-12 border-t border-white/5 text-center text-sm text-text-secondary">
      <p>&copy; 2026 PinFlowser. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { Play, Zap } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const demoSteps = [
  { number: '01', title: 'Entrenamiento', desc: 'Sube tus documentos, PDFs o catálogos directamente al sistema. La IA procesa y aprende todo sobre tu negocio al instante.' },
  { number: '02', title: 'Conexión Directa', desc: 'Escanea el código QR o vincula tu número mediante la API oficial de WhatsApp en menos de 60 segundos.' },
  { number: '03', title: 'Ventas en Piloto', desc: 'Relájate mientras tu Clouser IA gestiona prospectos, resuelve dudas y cierra ventas de forma automática 24/7.' }
]
</script>

<style scoped>
.glass {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.card {
  border-radius: 3rem;
}
</style>
