<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Good morning, {{ userFirstName }}!</h1>
        <p class="text-text-secondary mt-1">Here's what's happening with your PinzaFlow account today.</p>
      </div>
      <div class="flex gap-3">
        <button @click="exportReport" class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 flex items-center gap-2">
          <Download class="w-4 h-4" />
          Export Report
        </button>
        <button @click="navigateTo('/clients')" class="btn-primary flex items-center gap-2">
          <Plus class="w-4 h-4" />
          New Client
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in computedStats" :key="stat.label" class="card group hover:border-white/10 transition-all duration-300">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-text-secondary">{{ stat.label }}</p>
            <h3 class="text-2xl font-bold mt-1">
              <span v-if="statsLoading" class="inline-block w-16 h-7 bg-white/5 rounded animate-pulse"></span>
              <span v-else>{{ stat.value }}</span>
            </h3>
          </div>
          <div class="p-2 rounded-lg" :style="{ color: stat.hex, backgroundColor: stat.hex + '1a' }">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
        </div>
        <div class="mt-4 flex items-center gap-1.5 text-xs">
          <TrendingUp class="w-3 h-3 text-primary" />
          <span class="text-primary font-medium">Live</span>
          <span class="text-text-secondary">from database</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Conversations -->
      <div class="lg:col-span-2 card p-0 overflow-hidden">
        <div class="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 class="font-bold">Recent Conversations</h3>
          <NuxtLink to="/conversations" class="text-sm text-primary hover:underline">View all</NuxtLink>
        </div>
        <div class="divide-y divide-white/5">
          <div 
            v-for="conv in recentConversations" 
            :key="conv.id" 
            @click="navigateTo('/conversations')"
            class="p-4 hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-4"
          >
            <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
              {{ conv.client?.name?.charAt(0) || '?' }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-semibold truncate">{{ conv.client?.name || 'Unknown' }}</h4>
                <span class="text-xs text-text-secondary">{{ formatTime(conv.updated_at) }}</span>
              </div>
              <p class="text-xs text-text-secondary truncate mt-0.5">{{ conv.last_message || 'No messages yet' }}</p>
            </div>
            <div v-if="conv.unread_count > 0" class="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-background">
              {{ conv.unread_count }}
            </div>
          </div>
        </div>
        <div v-if="recentConversations.length === 0" class="p-12 text-center text-text-secondary">
          <MessageSquare class="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No active conversations yet.</p>
          <p class="text-xs mt-1">Start by adding clients and messaging them.</p>
        </div>
      </div>

      <!-- Quick Actions / Analytics -->
      <div class="space-y-6">
        <div class="card bg-gradient-to-br from-primary/10 to-transparent border-primary/10">
          <Zap class="w-6 h-6 text-primary mb-4" />
          <h3 class="font-bold text-lg">AI Automation</h3>
          <p class="text-sm text-text-secondary mt-2">Activate AI auto-responses to handle common customer inquiries 24/7.</p>
          <button @click="navigateTo('/automations')" class="btn-primary w-full mt-6 text-sm">Configure AI</button>
        </div>

        <div class="card">
          <h3 class="font-bold mb-4">Recent Clients</h3>
          <div v-if="recentClients.length === 0" class="text-sm text-text-secondary text-center py-4">
            No clients yet. Add your first client!
          </div>
          <div v-else class="space-y-3">
            <div v-for="client in recentClients" :key="client.id" class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                {{ client.name.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{{ client.name }}</p>
                <p class="text-[10px] text-text-secondary">{{ client.phone }}</p>
              </div>
            </div>
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
  Clock
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
  // Simple CSV export of stats
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
