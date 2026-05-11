<template>
  <div class="min-h-screen bg-background text-white selection:bg-primary/30">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 glass border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-10 h-10 rounded-xl shadow-xl shadow-primary/30" />
          <h1 class="text-2xl font-bold tracking-tight">PinFlowser</h1>
        </div>
        
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Características</a>
          <a href="#pricing" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Precios</a>
          <NuxtLink to="/login" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Iniciar Sesión</NuxtLink>
          <NuxtLink to="/signup" class="btn-primary py-2 px-6 text-sm">Empezar Ahora</NuxtLink>
        </div>

        <button class="md:hidden text-text-secondary">
          <Menu class="w-6 h-6" />
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <section class="pt-40 pb-40 px-6 relative">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
          <Zap class="w-3 h-3" />
          Tu clouser inteligente siempre activo
        </div>
        <h2 class="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Automatiza tus ventas por <span class="text-primary">WhatsApp</span>
        </h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          La plataforma todo-en-uno para pequeñas empresas en Latinoamérica. Gestiona conversaciones, rastrea clientes y aumenta tus ventas con IA.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <NuxtLink to="/signup" class="btn-primary py-4 px-8 text-lg w-full sm:w-auto">Empieza Gratis</NuxtLink>
          <a href="#demo" class="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2">
            <Play class="w-5 h-5" />
            Ver Demo
          </a>
        </div>
      </div>

      <!-- Dashboard Preview -->
      <div class="max-w-screen-2xl mx-auto mt-24 relative px-4">
        <!-- Ambient Glow -->
        <div class="absolute inset-0 bg-primary/5 blur-[120px] rounded-full opacity-50"></div>
        
        <div class="relative group">
          <!-- Floating effect -->
          <div class="relative transition-all duration-1000 group-hover:-translate-y-4">
            <img 
              src="/Portada-software.png" 
              alt="PinFlowser Dashboard Preview" 
              class="w-full h-auto rounded-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5"
            />
            <!-- Shine effect -->
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="pt-24 pb-12 border-t border-white/5 px-6 bg-surface/20 backdrop-blur-3xl">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <!-- Brand & Socials -->
        <div class="space-y-8">
          <div class="flex items-center gap-3 text-white">
            <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-12 h-12 rounded-2xl shadow-xl shadow-primary/20" />
            <span class="font-black text-2xl tracking-tighter">Pin<span class="text-primary">Flowser</span></span>
          </div>
          <p class="text-text-secondary leading-relaxed">
            Revolucionando las ventas en Latinoamérica con el poder de la IA y WhatsApp. Cierra más tratos, más rápido.
          </p>
          <div class="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" class="p-3 bg-white/5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <Facebook class="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" class="p-3 bg-white/5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <Instagram class="w-5 h-5" />
            </a>
            <a href="https://wa.me/573015997188" target="_blank" class="p-3 bg-white/5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <MessageCircle class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-8">
          <h4 class="text-sm font-black uppercase tracking-[0.2em] text-white">Producto</h4>
          <ul class="space-y-4 text-text-secondary font-medium">
            <li><NuxtLink to="/dashboard" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Dashboard</NuxtLink></li>
            <li><NuxtLink to="/clouser" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Cierre de Ventas IA</NuxtLink></li>
            <li><NuxtLink to="/clients" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Gestión de CRM</NuxtLink></li>
            <li><a href="#pricing" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Planes de Precios</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="space-y-8">
          <h4 class="text-sm font-black uppercase tracking-[0.2em] text-white">Contacto y Soporte</h4>
          <ul class="space-y-5 text-text-secondary font-medium">
            <li class="flex items-start gap-3">
              <Mail class="w-5 h-5 text-primary shrink-0" />
              <div class="space-y-1">
                <span class="block text-xs text-text-secondary/50 uppercase">Soporte por Email</span>
                <a href="mailto:pinzasoporte@gmail.com" class="hover:text-white transition-colors">pinzasoporte@gmail.com</a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <Phone class="w-5 h-5 text-primary shrink-0" />
              <div class="space-y-1">
                <span class="block text-xs text-text-secondary/50 uppercase">Contacto WhatsApp</span>
                <a href="tel:+573015997188" class="hover:text-white transition-colors">+57 301 599 7188</a>
              </div>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="space-y-8">
          <h4 class="text-sm font-black uppercase tracking-[0.2em] text-white">Legal y Privacidad</h4>
          <ul class="space-y-4 text-text-secondary font-medium">
            <li><NuxtLink to="/terms" class="hover:text-primary transition-colors flex items-center gap-2 group"><ExternalLink class="w-4 h-4" /> Términos de Servicio</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-primary transition-colors flex items-center gap-2 group"><ExternalLink class="w-4 h-4" /> Política de Privacidad</NuxtLink></li>
            <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2 group"><ExternalLink class="w-4 h-4" /> Política de Cookies</a></li>
          </ul>
        </div>
      </div>

      <!-- Copyright Area -->
      <div class="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <p class="text-text-secondary font-medium">
          &copy; 2026 <span class="text-white font-bold">PinFlowser</span>. Todos los derechos reservados.
        </p>
        <div class="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 group">
          <span class="text-text-secondary">Propiedad de</span>
          <span class="text-white font-bold tracking-tight">Edisson Pinza</span>
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse ml-1"></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { 
  Menu, 
  Zap, 
  Play, 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Mail, 
  Phone, 
  ExternalLink, 
  ChevronRight,
  ArrowRight 
} from 'lucide-vue-next'

definePageMeta({
  layout: false
})
</script>
