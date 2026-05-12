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
    <section class="pt-40 pb-40 px-6 relative overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -z-10"></div>
      
      <div class="max-w-5xl mx-auto text-center space-y-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest animate-fade-in">
          <Zap class="w-4 h-4 fill-primary" />
          Tu clouser inteligente siempre activo
        </div>
        <h2 class="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-white">
          Vende más por <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">WhatsApp</span> con IA
        </h2>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
          La plataforma definitiva para automatizar tus ventas, gestionar prospectos y cerrar tratos 24/7 con inteligencia artificial entrenada para tu negocio.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <NuxtLink to="/signup" class="btn-primary py-5 px-10 text-xl w-full sm:w-auto shadow-2xl shadow-primary/40 hover:scale-105 transition-all">
            Empezar Gratis Ahora
          </NuxtLink>
          <a href="#demo" class="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xl font-bold w-full sm:w-auto flex items-center justify-center gap-3">
            <Play class="w-6 h-6 fill-white" />
            Ver Demo
          </a>
        </div>
      </div>

      <!-- Dashboard Preview -->
      <div class="max-w-6xl mx-auto mt-32 relative px-4">
        <div class="absolute -inset-1 bg-gradient-to-r from-primary to-green-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div class="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-black">
          <img 
            src="/Portada-software.png" 
            alt="PinFlowser Dashboard Preview" 
            class="w-full h-auto transform hover:scale-[1.02] transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-32 px-6 relative">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-24 space-y-4">
          <h2 class="text-sm font-black text-primary uppercase tracking-[0.3em]">Potencial Sin Límites</h2>
          <h3 class="text-4xl md:text-6xl font-black text-white tracking-tighter">Todo lo que necesitas para <span class="text-primary">dominar</span> tu mercado</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="p-10 rounded-[3rem] bg-surface border border-white/5 hover:border-primary/30 transition-all group">
            <div :class="`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg text-white` ">
              <component :is="feature.icon" class="w-8 h-8" />
            </div>
            <h4 class="text-2xl font-bold text-white mb-4">{{ feature.title }}</h4>
            <p class="text-text-secondary leading-relaxed font-medium">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Section -->
    <section id="demo" class="py-32 px-6 bg-surface/30">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8">
            <h2 class="text-sm font-black text-primary uppercase tracking-[0.3em]">Demostración en Vivo</h2>
            <h3 class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Mira cómo el <span class="text-primary">Clouser AI</span> cierra ventas por ti</h3>
            <p class="text-xl text-text-secondary leading-relaxed font-medium">
              Nuestra IA no solo responde, ella persuade. Analiza la intención del cliente, usa tu base de conocimientos y guía la conversación hacia el cierre del trato de forma natural.
            </p>
            <div class="space-y-4">
              <div v-for="step in demoSteps" :key="step.title" class="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span class="text-primary font-black">{{ step.number }}</span>
                </div>
                <div>
                  <h5 class="font-bold text-white">{{ step.title }}</h5>
                  <p class="text-sm text-text-secondary">{{ step.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50"></div>
            <div class="relative card p-4 overflow-hidden border-2 border-primary/20">
              <div class="aspect-video bg-black rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden">
                <img src="/Portada-software.png" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="Demo Video Placeholder" />
                <div class="relative z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/50 group-hover:scale-110 transition-all">
                  <Play class="w-8 h-8 fill-background text-background ml-1" />
                </div>
                <div class="absolute bottom-6 left-6 right-6 p-4 glass rounded-xl">
                  <p class="text-xs font-black uppercase tracking-widest text-primary mb-1">Video Demo</p>
                  <p class="text-sm font-bold text-white">Descubre la potencia de PinFlowser en 2 minutos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us / Creator -->
    <section id="about" class="py-32 px-6 relative">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="relative">
            <div class="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
            <div class="relative rounded-[4rem] overflow-hidden border-4 border-white/5 shadow-2xl aspect-[4/5] bg-surface group">
              <!-- El usuario reemplazará esta imagen -->
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
            <h2 class="text-sm font-black text-primary uppercase tracking-[0.3em]">Sobre Nosotros</h2>
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
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-32 px-6 relative overflow-hidden bg-background">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div class="max-w-7xl mx-auto">
        <div class="text-center space-y-4 mb-20">
          <h2 class="text-sm font-black text-primary uppercase tracking-[0.3em]">Inversión Inteligente</h2>
          <h3 class="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">Planes que <span class="text-primary">escalan</span> contigo</h3>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto font-medium">Sin contratos ocultos. Cancela cuando quieras.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <!-- Plan Emprendedor -->
          <div class="p-8 rounded-[3rem] bg-surface/40 backdrop-blur-3xl border border-white/5 hover:border-white/10 transition-all duration-500 group">
            <div class="space-y-6">
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-white">Emprendedor</h3>
                <p class="text-sm text-text-secondary font-medium">Ideal para iniciar.</p>
              </div>
              <div class="flex items-baseline gap-1">
                <span class="text-4xl font-black text-white">$50k</span>
                <span class="text-text-secondary">/mes</span>
              </div>
              <NuxtLink to="/signup" class="block w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-white/10 transition-all">Empezar Ahora</NuxtLink>
              <ul class="space-y-4 pt-4 border-t border-white/5">
                <li class="flex items-center gap-3 text-sm text-text-secondary font-medium">
                  <Check class="w-5 h-5 text-primary" /> 500 Mensajes IA / mes
                </li>
                <li class="flex items-center gap-3 text-sm text-text-secondary font-medium">
                  <Check class="w-5 h-5 text-primary" /> CRM Básico de Contactos
                </li>
                <li class="flex items-center gap-3 text-sm text-text-secondary font-medium">
                  <Check class="w-5 h-5 text-primary" /> Gestión de 1 Número
                </li>
              </ul>
            </div>
          </div>

          <!-- Plan Pro -->
          <div class="p-10 rounded-[3.5rem] bg-gradient-to-b from-primary/20 to-primary/5 backdrop-blur-3xl border-2 border-primary/30 shadow-[0_0_50px_-10px_rgba(34,197,94,0.3)] relative group transform hover:scale-105 transition-all duration-500">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-background text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
              Más Popular
            </div>
            <div class="space-y-6">
              <div class="space-y-2 text-center">
                <h3 class="text-2xl font-black text-white">Plan Pro</h3>
                <p class="text-sm text-primary font-bold uppercase tracking-widest">El favorito de las tiendas</p>
              </div>
              <div class="flex items-baseline justify-center gap-1">
                <span class="text-6xl font-black text-white">$120k</span>
                <span class="text-text-secondary font-bold">/mes</span>
              </div>
              <NuxtLink to="/signup" class="block w-full py-5 rounded-3xl bg-primary text-background font-black text-center shadow-2xl shadow-primary/30 hover:scale-105 transition-all">Obtener Pro Ahora</NuxtLink>
              <ul class="space-y-5 pt-4 border-t border-white/10">
                <li class="flex items-center gap-3 text-sm text-white font-bold">
                  <Zap class="w-6 h-6 text-primary fill-primary/20" /> Mensajes IA Ilimitados
                </li>
                <li class="flex items-center gap-3 text-sm text-white font-bold">
                  <Zap class="w-6 h-6 text-primary fill-primary/20" /> CRM + Entrenamiento IA
                </li>
                <li class="flex items-center gap-3 text-sm text-white font-bold">
                  <Zap class="w-6 h-6 text-primary fill-primary/20" /> Dashboard de Analíticas
                </li>
                <li class="flex items-center gap-3 text-sm text-white font-bold">
                  <Zap class="w-6 h-6 text-primary fill-primary/20" /> Soporte Prioritario
                </li>
              </ul>
            </div>
          </div>

          <!-- Plan Enterprise -->
          <div class="p-8 rounded-[3rem] bg-surface/40 backdrop-blur-3xl border border-white/5 hover:border-white/10 transition-all duration-500 group">
            <div class="space-y-6">
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-white">Enterprise</h3>
                <p class="text-sm text-text-secondary font-medium">Grandes equipos.</p>
              </div>
              <div class="flex items-baseline gap-1">
                <span class="text-4xl font-black text-white">$250k</span>
                <span class="text-text-secondary">/mes</span>
              </div>
              <NuxtLink to="/signup" class="block w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-white/10 transition-all">Contactar Ventas</NuxtLink>
              <ul class="space-y-4 pt-4 border-t border-white/5">
                <li class="flex items-center gap-3 text-sm text-text-secondary font-medium">
                  <Check class="w-5 h-5 text-primary" /> Hasta 5 Agentes
                </li>
                <li class="flex items-center gap-3 text-sm text-text-secondary font-medium">
                  <Check class="w-5 h-5 text-primary" /> API Personalizada
                </li>
                <li class="flex items-center gap-3 text-sm text-text-secondary font-medium">
                  <Check class="w-5 h-5 text-primary" /> Automatización a Medida
                </li>
              </ul>
            </div>
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
          <p class="text-text-secondary font-medium leading-relaxed">
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
          <h4 class="text-xs font-black uppercase tracking-[0.3em] text-white">Producto</h4>
          <ul class="space-y-4 text-text-secondary font-bold text-sm">
            <li><a href="#features" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Características</a></li>
            <li><a href="#demo" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Video Demo</a></li>
            <li><a href="#pricing" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Planes de Precios</a></li>
            <li><a href="#about" class="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Sobre Nosotros</a></li>
          </ul>
        </div>

        <!-- Support -->
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
            <li class="flex items-start gap-3">
              <Phone class="w-5 h-5 text-primary shrink-0" />
              <div class="space-y-1">
                <span class="block text-[10px] text-text-secondary/50 uppercase tracking-widest">WhatsApp Directo</span>
                <a href="tel:+573015997188" class="hover:text-white transition-colors">+57 301 599 7188</a>
              </div>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="space-y-8">
          <h4 class="text-xs font-black uppercase tracking-[0.3em] text-white">Legal</h4>
          <ul class="space-y-4 text-text-secondary font-bold text-sm">
            <li><NuxtLink to="/terms" class="hover:text-primary transition-colors flex items-center gap-2 group">Términos de Servicio</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-primary transition-colors flex items-center gap-2 group">Política de Privacidad</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Copyright Area -->
      <div class="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <p class="text-text-secondary font-medium italic">
          "Transformando conversaciones en activos."
        </p>
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
  ArrowRight,
  Check,
  Bot,
  Users,
  Database,
  ShieldCheck,
  Rocket,
  UserCircle
} from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const creatorPhoto = ref(null) // El usuario puede asignar una URL aquí después

const features = [
  { 
    title: 'Clouser AI 24/7', 
    description: 'Nuestra IA persuade y cierra ventas incluso mientras duermes, entrenada específicamente para tus productos.',
    icon: Bot,
    bg: 'bg-primary/20'
  },
  { 
    title: 'CRM Multi-Agente', 
    description: 'Gestiona todos tus prospectos de WhatsApp en un solo lugar con etiquetas y seguimiento avanzado.',
    icon: Users,
    bg: 'bg-blue-500/20'
  },
  { 
    title: 'Entrenamiento IA', 
    description: 'Sube tus catálogos y documentos. Tu IA aprenderá cada detalle de tu negocio en segundos.',
    icon: Database,
    bg: 'bg-purple-500/20'
  },
  { 
    title: 'Seguridad Total', 
    description: 'Tus datos y los de tus clientes están protegidos con cifrado de grado militar en la nube.',
    icon: ShieldCheck,
    bg: 'bg-green-500/20'
  },
  { 
    title: 'Integración Directa', 
    description: 'Conexión oficial con WhatsApp Cloud API para una estabilidad y velocidad profesional.',
    icon: Zap,
    bg: 'bg-yellow-500/20'
  },
  { 
    title: 'Escalabilidad LatAm', 
    description: 'Diseñado específicamente para el mercado latino, entendiendo modismos y comportamientos locales.',
    icon: Rocket,
    bg: 'bg-red-500/20'
  }
]

const demoSteps = [
  { number: '01', title: 'Entrenamiento', desc: 'Sube la información de tus productos.' },
  { number: '02', title: 'Conexión', desc: 'Vincula tu WhatsApp en 1 minuto.' },
  { number: '03', title: 'Automatización', desc: 'La IA empieza a cerrar ventas por ti.' }
]
</script>

<style scoped>
.glass {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 3rem;
  transition: all 0.3s ease;
}
</style>

