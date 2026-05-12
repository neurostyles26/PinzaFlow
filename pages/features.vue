<template>
  <div class="min-h-screen bg-background text-white selection:bg-primary/30">
    <nav class="fixed w-full z-50 glass border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-10 h-10 rounded-xl shadow-xl shadow-primary/30" />
          <h1 class="text-2xl font-bold tracking-tight text-white">PinFlowser</h1>
        </NuxtLink>
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink to="/features" class="text-sm font-medium text-primary">Características</NuxtLink>
          <NuxtLink to="/#pricing" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Precios</NuxtLink>
          <NuxtLink to="/about" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Sobre Nosotros</NuxtLink>
          <NuxtLink to="/login" class="text-sm font-medium text-text-secondary hover:text-white transition-colors">Iniciar Sesión</NuxtLink>
          <NuxtLink to="/signup" class="btn-primary py-2 px-6 text-sm font-bold">Empezar Ahora</NuxtLink>
        </div>
      </div>
    </nav>

    <main class="pt-40 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-24 space-y-6">
          <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter">Potencia <span class="text-primary">ilimitada</span></h1>
          <p class="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Hemos diseñado cada función de PinFlowser para que el crecimiento de tu negocio sea inevitable.
          </p>
        </div>

        <!-- Detailed Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="p-10 rounded-[3rem] bg-surface border border-white/5 hover:border-primary/30 transition-all group">
            <div :class="`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg text-white`">
              <component :is="feature.icon" class="w-8 h-8" />
            </div>
            <h4 class="text-2xl font-bold text-white mb-4">{{ feature.title }}</h4>
            <p class="text-text-secondary leading-relaxed font-medium mb-6">{{ feature.description }}</p>
            <ul class="space-y-3">
              <li v-for="item in feature.items" :key="item" class="flex items-center gap-2 text-sm text-text-secondary font-medium">
                <Check class="w-4 h-4 text-primary" /> {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-32 p-12 rounded-[4rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 text-center space-y-8">
          <h3 class="text-4xl font-black text-white">¿Listo para transformar tus ventas?</h3>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink to="/signup" class="btn-primary py-4 px-10 text-lg w-full sm:w-auto">Crear cuenta gratuita</NuxtLink>
            <NuxtLink to="/demo" class="px-10 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-lg font-bold">Ver demostración</NuxtLink>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="pt-24 pb-12 border-t border-white/5 px-6 bg-surface/20 backdrop-blur-3xl">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div class="space-y-8">
          <div class="flex items-center gap-3 text-white">
            <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-12 h-12 rounded-2xl shadow-xl shadow-primary/20" />
            <span class="font-black text-2xl tracking-tighter">Pin<span class="text-primary">Flowser</span></span>
          </div>
          <p class="text-text-secondary font-medium leading-relaxed">
            Revolucionando las ventas en Latinoamérica con el poder de la IA y WhatsApp.
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="p-3 bg-white/5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <Facebook class="w-5 h-5" />
            </a>
            <a href="#" class="p-3 bg-white/5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <Instagram class="w-5 h-5" />
            </a>
            <a href="https://wa.me/573015997188" target="_blank" class="p-3 bg-white/5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <MessageCircle class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div class="space-y-8">
          <h4 class="text-xs font-black uppercase tracking-[0.3em] text-white">Producto</h4>
          <ul class="space-y-4 text-text-secondary font-bold text-sm">
            <li><NuxtLink to="/features" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Características</NuxtLink></li>
            <li><NuxtLink to="/demo" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Video Demo</NuxtLink></li>
            <li><NuxtLink to="/#pricing" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Planes de Precios</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Sobre Nosotros</NuxtLink></li>
          </ul>
        </div>

        <div class="space-y-8">
          <h4 class="text-xs font-black uppercase tracking-[0.3em] text-white">Contacto</h4>
          <ul class="space-y-5 text-text-secondary font-bold text-sm">
            <li class="flex items-start gap-3">
              <Mail class="w-5 h-5 text-primary shrink-0" />
              <div class="space-y-1">
                <span class="block text-[10px] text-text-secondary/50 uppercase tracking-widest">Email Soporte</span>
                <a href="mailto:pinzasoporte@gmail.com" class="hover:text-white transition-colors">pinzasoporte@gmail.com</a>
              </div>
            </li>
          </ul>
        </div>

        <div class="space-y-8">
          <h4 class="text-xs font-black uppercase tracking-[0.3em] text-white">Legal</h4>
          <ul class="space-y-4 text-text-secondary font-bold text-sm">
            <li><NuxtLink to="#" class="hover:text-primary transition-colors">Términos de Servicio</NuxtLink></li>
            <li><NuxtLink to="#" class="hover:text-primary transition-colors">Privacidad</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <p class="text-text-secondary font-medium italic">&copy; 2026 PinFlowser. Todos los derechos reservados.</p>
        <div class="flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 group">
          <span class="text-text-secondary text-xs font-bold">Un producto de</span>
          <span class="text-white font-black tracking-tight uppercase">Edisson Pinza</span>
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse ml-1"></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { 
  Bot, 
  Users, 
  Database, 
  ShieldCheck, 
  Zap, 
  Rocket, 
  Check,
  MessageSquare,
  BarChart3,
  Globe,
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  ChevronRight
} from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const features = [
  { 
    title: 'Clouser AI 24/7', 
    description: 'Nuestra IA no solo responde, ella persuade y guía al cliente hacia el cierre de la venta de forma natural.',
    icon: Bot,
    bg: 'bg-primary/20',
    items: ['Respuesta inmediata', 'Tono humano y persuasivo', 'Gestión de objeciones']
  },
  { 
    title: 'CRM Inteligente', 
    description: 'Un panel centralizado para gestionar miles de contactos sin perder el control de tus prospectos.',
    icon: Users,
    bg: 'bg-blue-500/20',
    items: ['Etiquetas personalizadas', 'Historial completo', 'Filtros avanzados']
  },
  { 
    title: 'Entrenamiento Local', 
    description: 'Alimenta a tu IA con catálogos, PDF y textos. Tu Clouser sabrá todo sobre tus productos.',
    icon: Database,
    bg: 'bg-purple-500/20',
    items: ['Carga de documentos', 'Aprendizaje instantáneo', 'Base de conocimientos']
  },
  { 
    title: 'Analíticas de Venta', 
    description: 'Mide el rendimiento de tus automatizaciones y visualiza el crecimiento de tus ingresos.',
    icon: BarChart3,
    bg: 'bg-green-500/20',
    items: ['Tasa de conversión', 'Mensajes procesados', 'Reportes exportables']
  },
  { 
    title: 'WhatsApp Oficial', 
    description: 'Conectividad premium mediante Cloud API para evitar bloqueos y asegurar estabilidad total.',
    icon: MessageSquare,
    bg: 'bg-yellow-500/20',
    items: ['Conexión estable', 'Sin riesgo de baneo', 'Múltiples números']
  },
  { 
    title: 'Escalabilidad LatAm', 
    description: 'Diseñado pensando en los retos y modismos del mercado latinoamericano.',
    icon: Globe,
    bg: 'bg-red-500/20',
    items: ['Entiende modismos', 'Monedas locales', 'Soporte en español']
  }
]
</script>

<style scoped>
.glass {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>
