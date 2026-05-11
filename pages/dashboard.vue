<template>
  <div class="space-y-12 pb-16">
    <!-- Header / Hero Section -->
    <div class="relative overflow-hidden rounded-[3rem] bg-[#0A0A0B] border border-white/5 p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
      <div class="absolute top-0 right-0 -mt-32 -mr-32 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[120px] animate-pulse duration-[5s]"></div>
      <div class="absolute bottom-0 left-0 -mb-32 -ml-32 w-[25rem] h-[25rem] bg-blue-600/10 rounded-full blur-[100px]"></div>
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
        <div class="space-y-6 max-w-2xl">
          <div class="flex flex-wrap gap-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-primary animate-bounce">
              <Sparkles class="w-3 h-3" />
              Asistente IA Activo
            </div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
              <Zap class="w-3 h-3" />
              Plan {{ profile?.subscription_plan || 'Emprendedor' }}
            </div>
          </div>
          <h1 class="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Bienvenido,<br />
            <span class="text-gradient">{{ userFirstName }}</span>
          </h1>
          <p class="text-text-secondary text-lg md:text-xl leading-relaxed">
            Tu motor PinFlowser está funcionando a plena capacidad. Tienes <span class="text-white font-bold">{{ dashboardStats.activeConversations }} hilos activos</span> siendo gestionados por la IA hoy.
          </p>
          <div class="flex flex-wrap gap-4 pt-4">
            <button @click="navigateTo('/conversations')" class="btn-primary px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
              <MessageSquare class="w-5 h-5" />
              <span>Ir a Chats</span>
            </button>
            <button @click="exportReport" class="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold flex items-center gap-3">
              <Download class="w-5 h-5 text-text-secondary" />
              <span>Reporte</span>
            </button>
          </div>
        </div>
        
        <div class="lg:w-80 space-y-4">
          <div 
            class="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group/card transition-all"
            :class="isWhatsAppConfigured ? 'hover:border-emerald-500/30' : 'hover:border-red-500/30'"
          >
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover/card:scale-125 transition-transform duration-700">
              <MessageSquare class="w-20 h-20" :class="isWhatsAppConfigured ? 'text-emerald-500' : 'text-red-500'" />
            </div>
            <div class="flex items-center gap-2 mb-1">
              <div class="w-2 h-2 rounded-full animate-pulse" :class="isWhatsAppConfigured ? 'bg-emerald-500' : 'bg-red-500'"></div>
              <p class="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Estado WhatsApp</p>
            </div>
            <h4 class="text-xl font-black text-white">{{ isWhatsAppConfigured ? 'Conectado' : 'Desconectado' }}</h4>
            <p class="text-[10px] text-text-secondary mt-1">{{ isWhatsAppConfigured ? 'Listo para enviar mensajes' : 'Configuración requerida' }}</p>
            <button 
              v-if="!isWhatsAppConfigured" 
              @click="navigateTo('/settings')" 
              class="mt-4 text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
            >
              Configurar Ahora
            </button>
          </div>

          <div class="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group/card">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover/card:scale-125 transition-transform duration-700">
              <Zap class="w-20 h-20 text-primary" />
            </div>
            <p class="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Eficiencia Semanal</p>
            <h4 class="text-3xl font-black text-white">+24.5%</h4>
            <div class="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full w-3/4 animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="(stat, index) in computedStats" 
        :key="stat.label" 
        class="relative group p-6 rounded-[2rem] bg-surface/50 border border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden"
      >
        <div class="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110">
          <component :is="stat.icon" class="w-32 h-32" />
        </div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-3 rounded-2xl" :style="{ color: stat.hex, backgroundColor: stat.hex + '15', border: '1px solid ' + stat.hex + '20' }">
              <component :is="stat.icon" class="w-5 h-5" />
            </div>
            <p class="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{{ stat.label }}</p>
          </div>
          
          <div class="flex items-end justify-between">
            <h3 class="text-4xl font-black tracking-tight text-white">
              <span v-if="statsLoading" class="inline-block w-20 h-10 bg-white/5 rounded-lg animate-pulse"></span>
              <span v-else>{{ stat.value }}</span>
            </h3>
            <div class="flex items-center gap-1 text-[10px] font-bold text-emerald-400 mb-1">
              <ArrowUpRight class="w-3 h-3" />
              <span>+{{ Math.floor(Math.random() * 15) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Recent Conversations -->
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-center justify-between px-2">
          <h3 class="text-2xl font-black flex items-center gap-4">
            <div class="w-1.5 h-8 bg-primary rounded-full"></div>
            Conversaciones Recientes
          </h3>
          <NuxtLink to="/conversations" class="group flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-all">
            Ver Todos los Hilos
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <div class="space-y-4">
          <div 
            v-for="conv in recentConversations" 
            :key="conv.id" 
            @click="navigateTo('/conversations')"
            class="group p-6 bg-surface/40 hover:bg-surface/80 border border-white/5 hover:border-white/10 rounded-[2rem] cursor-pointer transition-all duration-300 flex items-center gap-6 shadow-sm hover:shadow-2xl hover:-translate-y-1"
          >
            <div class="relative">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center font-bold text-xl border border-white/10 group-hover:border-primary/30 transition-all duration-500">
                {{ conv.client?.name?.charAt(0) || '?' }}
              </div>
              <div v-if="conv.unread_count > 0" class="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-[10px] font-black text-background border-4 border-surface ring-4 ring-primary/10">
                {{ conv.unread_count }}
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-lg font-bold truncate group-hover:text-primary transition-colors">{{ conv.client?.name || 'Desconocido' }}</h4>
                <span class="text-[10px] font-bold text-text-secondary bg-white/5 px-2 py-1 rounded-lg uppercase tracking-widest">{{ formatTime(conv.updated_at) }}</span>
              </div>
              <p class="text-sm text-text-secondary truncate leading-relaxed">{{ conv.last_message || 'Sin mensajes aún' }}</p>
            </div>
            
            <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 border border-white/10">
              <ChevronRight class="w-5 h-5 text-primary" />
            </div>
          </div>

          <div v-if="recentConversations.length === 0" class="p-20 text-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02]">
            <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageSquare class="w-10 h-10 text-text-secondary/20" />
            </div>
            <h4 class="text-xl font-bold mb-3">Bandeja silenciosa</h4>
            <p class="text-text-secondary text-sm max-w-xs mx-auto mb-10">Empieza a hacer crecer tu negocio iniciando tu primera conversación asistida por IA.</p>
            <button @click="navigateTo('/clients')" class="btn-primary px-10">Nuevo Cliente</button>
          </div>
        </div>
      </div>

      <!-- Sidebar / Insights -->
      <div class="space-y-10">
        <!-- AI Card -->
        <div class="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-primary/5 to-surface/50 border border-primary/20 overflow-hidden group shadow-2xl shadow-primary/10">
          <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all duration-1000"></div>
          <div class="relative z-10">
            <div class="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 border border-primary/30">
              <Bot class="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 class="text-2xl font-black mb-4 leading-tight">Insights de IA</h3>
            <p class="text-sm text-text-secondary leading-relaxed mb-10">Tu velocidad de respuesta es un 40% más rápida esta semana gracias a la IA.</p>
            <button @click="navigateTo('/clouser')" class="w-full py-4 rounded-2xl bg-primary text-background font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
              Optimizar Cierre
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="space-y-6">
          <h3 class="text-lg font-bold px-2 flex items-center gap-3">
            <Users class="w-5 h-5 text-blue-400" />
            Leads Activos
          </h3>
          <div class="p-4 rounded-[2.5rem] bg-surface/30 border border-white/5 space-y-2">
            <div v-for="client in recentClients" :key="client.id" class="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/5">
              <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-sm font-black border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                {{ client.name.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold truncate group-hover:text-primary transition-colors">{{ client.name }}</p>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p class="text-[9px] text-text-secondary uppercase tracking-[0.2em] font-black">Activo Ahora</p>
                </div>
              </div>
              <ChevronRight class="w-4 h-4 text-text-secondary/30 group-hover:text-primary transition-all group-hover:translate-x-1" />
            </div>
            
            <button @click="navigateTo('/clients')" class="w-full py-4 mt-2 text-[10px] font-black text-text-secondary hover:text-white transition-all uppercase tracking-widest border-t border-white/5">
              Ver Toda la Base de Datos
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Download, 
  Plus, 
  Zap,
  Clock,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Bot,
  ArrowUpRight
} from 'lucide-vue-next'

const user = useSupabaseUser()
const { 
  dashboardStats, 
  fetchDashboardStats, 
  clients, 
  fetchClients, 
  conversations, 
  fetchConversations,
  profile,
  fetchProfile
} = usePinza()

const isWhatsAppConfigured = computed(() => {
  return !!(profile.value?.whatsapp_phone_number_id && profile.value?.whatsapp_access_token)
})

const statsLoading = ref(true)

const userFirstName = computed(() => {
  const name = user.value?.user_metadata?.full_name || user.value?.email || 'Usuario'
  return name.split(' ')[0]
})

const computedStats = computed(() => [
  { label: 'Ventas Cerradas', value: '142', icon: TrendingUp, hex: '#10B981' },
  { label: 'Éxito de IA', value: '98%', icon: Sparkles, hex: '#3B82F6' },
  { label: 'Conversión', value: '15.4%', icon: Users, hex: '#F59E0B' },
  { label: 'Automatizaciones', value: '12', icon: Bot, hex: '#8B5CF6' },
])

const recentConversations = computed(() => conversations.value.slice(0, 5))
const recentClients = computed(() => clients.value.slice(0, 5))

const formatTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Ahora'
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.floor(hours / 24)}d`
}

const exportReport = () => {
  const csv = `Reporte PinFlowser\n\nTotal Clientes,${dashboardStats.value.totalClients}\nTotal Conversaciones,${dashboardStats.value.totalConversations}\nConversaciones Activas,${dashboardStats.value.activeConversations}\nTotal Mensajes,${dashboardStats.value.totalMessages}`
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'pinflowser-report.csv'
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(async () => {
  await Promise.all([
    fetchDashboardStats(),
    fetchClients(),
    fetchConversations(),
    fetchProfile()
  ])
  statsLoading.value = false
})
</script>
