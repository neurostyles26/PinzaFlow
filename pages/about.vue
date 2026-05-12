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
          <NuxtLink to="/#pricing" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Precios</NuxtLink>
          <NuxtLink to="/about" class="text-sm font-medium text-primary">Sobre Nosotros</NuxtLink>
          <NuxtLink to="/login" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Iniciar Sesión</NuxtLink>
          <NuxtLink to="/signup" class="btn-primary py-2 px-6 text-sm font-bold">Empezar Ahora</NuxtLink>
        </div>
      </div>
    </nav>

    <main class="pt-40 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="relative">
            <div class="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
            <div class="relative rounded-[4rem] overflow-hidden border-4 border-white/5 shadow-2xl aspect-[4/5] bg-surface group">
              <div class="absolute inset-0 flex items-center justify-center text-text-secondary p-12 text-center">
                <div class="space-y-4">
                  <UserCircle class="w-20 h-20 mx-auto opacity-20" />
                  <p class="font-bold opacity-50">Espacio para la foto de Edisson Pinza</p>
                </div>
              </div>
              <img 
                v-if="creatorPhoto" 
                :src="creatorPhoto" 
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Edisson Pinza - Creador" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
              <div class="absolute bottom-12 left-12 right-12">
                <h4 class="text-4xl font-black text-white tracking-tighter">Edisson Pinza</h4>
                <p class="text-primary font-bold uppercase tracking-widest text-sm">Fundador & Visionario</p>
              </div>
            </div>
          </div>
          <div class="space-y-8">
            <h2 class="text-sm font-black text-primary uppercase tracking-[0.3em]">Nuestra Historia</h2>
            <h3 class="text-4xl md:text-6xl font-black text-white tracking-tighter">Pasión por el <span class="text-primary">éxito</span> de tu negocio</h3>
            <p class="text-xl text-text-secondary leading-relaxed font-medium">
              PinFlowser nació con una misión clara: democratizar el acceso a la Inteligencia Artificial para las pequeñas y medianas empresas de Latinoamérica.
            </p>
            <p class="text-lg text-text-secondary leading-relaxed">
              Sabemos que WhatsApp es el corazón de las ventas en nuestra región. Por eso, hemos creado una herramienta que no solo organiza tus contactos, sino que se convierte en un socio de ventas incansable que entiende tu negocio tan bien como tú.
            </p>
            <div class="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p class="text-4xl font-black text-white">100%</p>
                <p class="text-xs text-text-secondary uppercase tracking-widest font-bold mt-1">Latinoamericano</p>
              </div>
              <div>
                <p class="text-4xl font-black text-white">24/7</p>
                <p class="text-xs text-text-secondary uppercase tracking-widest font-bold mt-1">Soporte Humano</p>
              </div>
            </div>
            <div class="pt-8 flex items-center gap-6">
              <a href="https://wa.me/573015997188" target="_blank" class="flex items-center gap-4 group">
                <div class="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                  <MessageCircle class="w-6 h-6" />
                </div>
                <div>
                  <p class="text-sm font-black text-white">Hablemos directamente</p>
                  <p class="text-xs text-text-secondary group-hover:text-primary transition-colors">WhatsApp Personal</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="py-12 border-t border-white/5 text-center text-sm text-text-secondary">
      <p>&copy; 2026 PinFlowser. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { MessageCircle, UserCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const creatorPhoto = ref(null)
</script>

<style scoped>
.glass {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>
