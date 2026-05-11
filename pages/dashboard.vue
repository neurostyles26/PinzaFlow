<template>
  <div class="space-y-10 pb-12">
    <!-- Header / Hero Section -->
    <div class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-surface to-background border border-white/5 p-8 md:p-12 shadow-2xl">
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px]"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div class="space-y-2">
          <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight">
            Good morning, <span class="text-gradient">{{ userFirstName }}</span>!
          </h1>
          <p class="text-text-secondary text-lg max-w-xl">
            Your AI Sales Clouser has been busy. You have <span class="text-primary font-semibold">{{ dashboardStats.activeConversations }} active conversations</span> waiting for your input.
          </p>
        </div>
        
        <div class="flex flex-wrap gap-4">
          <button @click="exportReport" class="btn-secondary group flex items-center gap-3">
            <div class="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
              <Download class="w-5 h-5 text-text-secondary" />
            </div>
            <span>Export Report</span>
          </button>
          <button @click="navigateTo('/clients')" class="btn-primary group flex items-center gap-3">
            <div class="p-2 bg-background/20 rounded-lg group-hover:bg-background/30 transition-colors">
              <Plus class="w-5 h-5" />
            </div>
            <span>New Client</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="(stat, index) in computedStats" 
        :key="stat.label" 
        class="card group hover:-translate-y-1 transition-all duration-500 overflow-hidden"
        :style="{ '--delay': index * 100 + 'ms' }"
      >
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <component :is="stat.icon" class="w-16 h-16" />
        </div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2.5 rounded-2xl" :style="{ color: stat.hex, backgroundColor: stat.hex + '1a' }">
              <component :is="stat.icon" class="w-6 h-6" />
            </div>
            <p class="text-sm font-semibold text-text-secondary uppercase tracking-wider">{{ stat.label }}</p>
          </div>
          
          <div class="flex items-end justify-between">
            <h3 class="text-4xl font-black">
              <span v-if="statsLoading" class="inline-block w-20 h-10 bg-white/5 rounded-lg animate-pulse"></span>
              <span v-else>{{ stat.value }}</span>
            </h3>
            <div class="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              <TrendingUp class="w-3 h-3" />
              <span>LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Recent Conversations -->
      <div class="lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between px-2">
          <h3 class="text-xl font-bold flex items-center gap-3">
            <MessageSquare class="w-6 h-6 text-primary" />
            Recent Conversations
          </h3>
          <NuxtLink to="/conversations" class="text-sm font-semibold text-primary hover:text-primary-accent transition-colors flex items-center gap-1">
            View all
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="space-y-4">
          <div 
            v-for="conv in recentConversations" 
            :key="conv.id" 
            @click="navigateTo('/conversations')"
            class="group p-5 bg-surface/30 hover:bg-surface/60 border border-white/5 hover:border-white/20 rounded-[1.5rem] cursor-pointer transition-all duration-300 flex items-center gap-5 shadow-sm hover:shadow-xl"
          >
            <div class="relative">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center font-bold text-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {{ conv.client?.name?.charAt(0) || '?' }}
              </div>
              <div v-if="conv.unread_count > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-black text-background border-2 border-background ring-2 ring-primary/20">
                {{ conv.unread_count }}
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <h4 class="text-base font-bold truncate group-hover:text-primary transition-colors">{{ conv.client?.name || 'Unknown' }}</h4>
                <span class="text-xs font-medium text-text-secondary bg-white/5 px-2 py-1 rounded-md">{{ formatTime(conv.updated_at) }}</span>
              </div>
              <p class="text-sm text-text-secondary truncate leading-relaxed">{{ conv.last_message || 'Waiting for the first message...' }}</p>
            </div>
            
            <div class="p-2 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
              <ChevronRight class="w-5 h-5 text-primary" />
            </div>
          </div>

          <div v-if="recentConversations.length === 0" class="p-16 text-center card border-dashed border-white/10 bg-transparent shadow-none">
            <div class="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare class="w-10 h-10 text-text-secondary opacity-30" />
            </div>
            <h4 class="text-lg font-bold mb-2">No active conversations yet</h4>
            <p class="text-text-secondary text-sm max-w-xs mx-auto mb-8">Ready to grow? Add your first client and start a conversation with AI assistance.</p>
            <button @click="navigateTo('/clients')" class="btn-primary">Add First Client</button>
          </div>
        </div>
      </div>

      <!-- Sidebar / AI Insights -->
      <div class="space-y-8">
        <!-- AI Promotion Card -->
        <div class="card bg-gradient-to-br from-primary/20 via-surface/40 to-surface/40 border-primary/20 overflow-hidden group">
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
          <Zap class="w-10 h-10 text-primary mb-6 animate-float" />
          <h3 class="text-2xl font-black mb-3 leading-tight">Elevate with AI Automations</h3>
          <p class="text-sm text-text-secondary leading-relaxed mb-8">Let PinFlowser handle the routine while you focus on closing big deals. 24/7 smart responses ready to go.</p>
          <button @click="navigateTo('/automations')" class="btn-primary w-full group">
            Configure AI
            <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <!-- Recent Activity / Clients -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold px-2 flex items-center gap-2">
            <Users class="w-5 h-5 text-blue-400" />
            Recent Clients
          </h3>
          <div class="card p-5 space-y-4">
            <div v-if="recentClients.length === 0" class="text-sm text-text-secondary text-center py-8 bg-white/5 rounded-2xl border border-dashed border-white/10">
              No clients found.
            </div>
            <div v-else class="space-y-4">
              <div v-for="client in recentClients" :key="client.id" class="flex items-center gap-4 group cursor-pointer">
                <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm font-bold border border-white/5 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  {{ client.name.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold truncate group-hover:text-primary transition-colors">{{ client.name }}</p>
                  <p class="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">{{ client.phone }}</p>
                </div>
                <div class="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
              </div>
            </div>
            <button @click="navigateTo('/clients')" class="w-full py-3 text-xs font-bold text-text-secondary hover:text-text-primary bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
              VIEW ALL CLIENTS
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Download, 
  Plus, 
  Zap,
  MousePointer2,
  Clock,
  ArrowRight,
  ChevronRight
} from 'lucide-vue-next'

const user = useSupabaseUser()
const { 
  dashboardStats, 
  fetchDashboardStats, 
  clients, 
  fetchClients, 
  conversations, 
  fetchConversations 
} = usePinza()

const statsLoading = ref(true)

const userFirstName = computed(() => {
  const name = user.value?.user_metadata?.full_name || user.value?.email || 'User'
  return name.split(' ')[0]
})

const computedStats = computed(() => [
  { label: 'Leads Closed', value: '142', icon: TrendingUp, hex: '#22C55E' },
  { label: 'AI Response Rate', value: '98%', icon: Zap, hex: '#3B82F6' },
  { label: 'Sales Conversion', value: '15.4%', icon: Users, hex: '#F59E0B' },
  { label: 'Active Automations', value: '12', icon: Clock, hex: '#8B5CF6' },
])

const recentConversations = computed(() => conversations.value.slice(0, 5))
const recentClients = computed(() => clients.value.slice(0, 5))

const formatTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const exportReport = () => {
  const csv = `PinFlowser Report\n\nTotal Clients,${dashboardStats.value.totalClients}\nTotal Conversations,${dashboardStats.value.totalConversations}\nActive Conversations,${dashboardStats.value.activeConversations}\nTotal Messages,${dashboardStats.value.totalMessages}`
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
    fetchConversations()
  ])
  statsLoading.value = false
})
</script>
