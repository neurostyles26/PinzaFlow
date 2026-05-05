<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Good morning, {{ userFirstName }}!</h1>
        <p class="text-text-secondary mt-1">Here's what's happening with your PinzaFlow account today.</p>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 flex items-center gap-2">
          <Download class="w-4 h-4" />
          Export Report
        </button>
        <button class="btn-primary flex items-center gap-2">
          <Plus class="w-4 h-4" />
          New Client
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="card">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-text-secondary">{{ stat.label }}</p>
            <h3 class="text-2xl font-bold mt-1">{{ stat.value }}</h3>
          </div>
          <div :class="`p-2 rounded-lg ${stat.color} bg-opacity-10 text-opacity-100`" :style="{ color: stat.hex, backgroundColor: stat.hex + '1a' }">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
        </div>
        <div class="mt-4 flex items-center gap-1.5 text-xs">
          <TrendingUp class="w-3 h-3 text-primary" />
          <span class="text-primary font-medium">{{ stat.trend }}</span>
          <span class="text-text-secondary">from last month</span>
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
          <div v-for="chat in recentChats" :key="chat.id" class="p-4 hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
              {{ chat.name.charAt(0) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-semibold truncate">{{ chat.name }}</h4>
                <span class="text-xs text-text-secondary">{{ chat.time }}</span>
              </div>
              <p class="text-xs text-text-secondary truncate mt-0.5">{{ chat.lastMessage }}</p>
            </div>
            <div v-if="chat.unread" class="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
        <div v-if="recentChats.length === 0" class="p-12 text-center text-text-secondary">
          No active conversations yet.
        </div>
      </div>

      <!-- Quick Actions / Analytics -->
      <div class="space-y-6">
        <div class="card bg-gradient-to-br from-primary/10 to-transparent border-primary/10">
          <Zap class="w-6 h-6 text-primary mb-4" />
          <h3 class="font-bold text-lg">AI Automation</h3>
          <p class="text-sm text-text-secondary mt-2">Activate AI auto-responses to handle common customer inquiries 24/7.</p>
          <button class="btn-primary w-full mt-6 text-sm">Configure AI</button>
        </div>

        <div class="card">
          <h3 class="font-bold mb-4">Customer Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in tags" :key="tag" class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-secondary">
              {{ tag }}
            </span>
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
const userFirstName = computed(() => {
  const name = user.value?.user_metadata?.full_name || user.value?.email || 'User'
  return name.split(' ')[0]
})

const stats = [
  { label: 'Total Conversations', value: '1,284', icon: MessageSquare, trend: '+12%', hex: '#22C55E' },
  { label: 'Total Clients', value: '452', icon: Users, trend: '+8%', hex: '#3B82F6' },
  { label: 'Response Rate', value: '98.2%', icon: MousePointer2, trend: '+2%', hex: '#F59E0B' },
  { label: 'Avg. Response Time', value: '4m 32s', icon: Clock, trend: '-15%', hex: '#8B5CF6' },
]

const recentChats = [
  { id: 1, name: 'Carlos Rodriguez', lastMessage: '¿Tienen disponibilidad para mañana?', time: '2m ago', unread: true },
  { id: 2, name: 'Maria Garcia', lastMessage: 'Muchas gracias por la información.', time: '15m ago', unread: false },
  { id: 3, name: 'Juan Perez', lastMessage: '¿Cuál es el precio del servicio premium?', time: '1h ago', unread: false },
  { id: 4, name: 'Elena Gomez', lastMessage: 'Me gustaría agendar una cita.', time: '3h ago', unread: false },
]

const tags = ['VIP', 'New Customer', 'Lead', 'Support', 'Spanish', 'Wholesale']
</script>
