<template>
  <div class="min-h-screen flex bg-background text-text-primary overflow-hidden">
    <!-- Sidebar -->
    <aside 
      class="w-64 glass border-r border-white/5 flex flex-col transition-all duration-300 z-50"
      :class="{ '-translate-x-full lg:translate-x-0': !isSidebarOpen }"
    >
      <div class="p-6 flex items-center gap-3">
        <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-8 h-8 rounded-lg shadow-lg shadow-primary/30" />
        <h1 class="text-xl font-bold tracking-tight text-white">PinFlowser</h1>
      </div>

      <nav class="flex-1 px-4 py-4 space-y-2">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-white/5"
          active-class="bg-white/10 text-primary"
        >
          <component :is="item.icon" class="w-5 h-5 transition-colors" :class="{ 'text-primary': $route.path === item.path }" />
          <span class="font-medium">{{ item.name }}</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-white/5">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-white/5">
          <div class="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-sm font-bold">
            {{ userInitial }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{{ userName }}</p>
            <button @click="logout" class="text-xs text-text-secondary hover:text-primary transition-colors">Sign out</button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col relative overflow-hidden h-screen">
      <!-- Topbar -->
      <header class="h-16 glass border-b border-white/5 flex items-center justify-between px-6 z-40">
        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = !isSidebarOpen" class="lg:hidden text-text-secondary hover:text-white">
            <Menu class="w-6 h-6" />
          </button>
          <h2 class="text-lg font-semibold">{{ currentPageName }}</h2>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden sm:flex relative">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search..." 
              class="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-primary outline-none transition-all w-64"
            />
          </div>
          <button class="relative p-2 text-text-secondary hover:text-white transition-colors">
            <Bell class="w-5 h-5" />
            <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-6 scroll-smooth">
        <slot />
      </div>
    </main>

    <!-- Overlay for mobile sidebar -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Zap, 
  Settings, 
  Menu, 
  Search, 
  Bell,
  LogOut,
  Bot
} from 'lucide-vue-next'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

const isSidebarOpen = ref(false)

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Clouser AI', path: '/clouser', icon: Bot },
  { name: 'Conversations', path: '/conversations', icon: MessageSquare },
  { name: 'Clients', path: '/clients', icon: Users },
  { name: 'Automations', path: '/automations', icon: Zap },
  { name: 'Settings', path: '/settings', icon: Settings },
]

const currentPageName = computed(() => {
  const item = navItems.find(i => i.path === route.path)
  return item ? item.name : 'PinFlowser'
})

const userName = computed(() => user.value?.user_metadata?.full_name || user.value?.email || 'User')
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>
