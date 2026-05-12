<template>
  <div class="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-primary">
    <!-- Navbar Minimalista -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all">
            <img src="/PinFlowSer-PWA.png" alt="Logo" class="w-6 h-6" />
          </div>
          <span class="text-xl font-bold tracking-tighter">PinFlowser</span>
        </NuxtLink>
        <div class="flex items-center gap-6">
          <NuxtLink to="/#pricing" class="text-sm font-bold text-text-secondary hover:text-white transition-colors">Planes</NuxtLink>
          <NuxtLink to="/login" class="px-6 py-2 rounded-xl bg-white text-background text-sm font-black hover:bg-primary transition-all">
            Iniciar Sesión
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main class="pt-40 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
          <div class="space-y-10 order-2 lg:order-1">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary">
              El Cerebro detrás de PinFlowser
            </div>
            <h2 class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">Pasión por el <span class="text-gradient">éxito</span> de tu negocio</h2>
            <div class="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>Hola, soy <span class="text-white font-bold">Edisson Pinza</span>, un apasionado por la tecnología y la optimización de procesos comerciales.</p>
              <p>PinFlowser nació con una misión clara: democratizar el acceso a la Inteligencia Artificial para las pequeñas y medianas empresas de Latinoamérica.</p>
              <p>Sabemos que WhatsApp es el corazón de las ventas en nuestra región. Por eso, hemos creado una herramienta que no solo organiza tus contactos, sino que se convierte en un socio de ventas incansable que entiende tu negocio tan bien como tú.</p>
            </div>
            <div class="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p class="text-4xl font-black text-white">100%</p>
                <p class="text-xs text-text-secondary uppercase tracking-widest font-bold mt-1">Latinoamericano</p>
              </div>
              <div>
                <p class="text-4xl font-black text-white">24/7</p>
                <p class="text-xs text-text-secondary uppercase tracking-widest font-bold mt-1">Soporte Inteligente</p>
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

          <div class="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full"></div>
            <div class="relative w-full max-w-[320px] rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] aspect-[3/4] bg-surface group">
              <img 
                src="/Foto-sobre-mi.jpeg" 
                class="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000" 
                alt="Edisson Pinza" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-60"></div>
              
              <!-- Refined Badge -->
              <div class="absolute bottom-8 left-8 right-8 backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-3xl">
                <h4 class="text-xl font-black text-white tracking-tight">Edisson Pinza</h4>
                <p class="text-primary font-bold uppercase tracking-widest text-[9px] mt-1 flex items-center gap-1.5">
                  <span class="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                  Founder & CEO
                </p>
              </div>
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
import { MessageCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false
})
</script>

<style scoped>
.glass {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>
