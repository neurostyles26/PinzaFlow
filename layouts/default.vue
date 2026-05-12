<template>
  <div class="min-h-screen flex bg-background text-text-primary overflow-hidden">
    <!-- Sidebar -->
    <aside 
      class="w-64 glass border-r border-white/5 flex flex-col transition-all duration-300 z-50 fixed lg:relative h-full"
      :class="{ '-translate-x-full lg:translate-x-0': !isSidebarOpen }"
    >
      <div class="p-6 flex items-center gap-3">
        <div class="p-2 bg-primary/10 rounded-xl">
          <img src="/PinFlowSer-PWA.png" alt="PinFlowser Logo" class="w-6 h-6" />
        </div>
        <h1 class="text-xl font-bold tracking-tight text-white">PinFlowser</h1>
      </div>

      <nav class="flex-1 px-4 py-4 space-y-1">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative"
          :class="$route.path === item.path ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 text-text-secondary hover:text-white'"
        >
          <div v-if="$route.path === item.path" class="absolute left-0 w-1 h-6 bg-primary rounded-r-full"></div>
          <component :is="item.icon" class="w-5 h-5 transition-colors" />
          <span class="font-medium text-sm">{{ item.name }}</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-white/5">
        <div class="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-pointer" @click="navigateTo('/settings')">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-accent flex items-center justify-center text-background font-bold shadow-lg shadow-primary/20">
            {{ userInitial }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ userName }}</p>
            <p class="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col relative overflow-hidden h-screen">
      <!-- Topbar -->
      <header class="h-20 glass border-b border-white/5 flex items-center justify-between px-8 z-40">
        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = !isSidebarOpen" class="lg:hidden p-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-white transition-all">
            <Menu class="w-6 h-6" />
          </button>
          <div class="flex flex-col">
            <h2 class="text-lg font-bold text-white tracking-tight">{{ currentPageName }}</h2>
            <p class="text-xs text-text-secondary font-medium">{{ currentPathFormatted }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden md:flex relative group">
            <Search class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar cualquier cosa..." 
              class="bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all w-72"
            />
          </div>

          <!-- Notifications -->
          <div class="relative">
            <button 
              @click="isNotifOpen = !isNotifOpen"
              class="p-2.5 rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-all relative"
            >
              <Bell class="w-5 h-5" />
              <span v-if="unreadCount > 0" class="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background animate-pulse"></span>
            </button>

            <!-- Notif Dropdown -->
            <transition name="fade-slide">
              <div v-if="isNotifOpen" class="absolute right-0 mt-4 w-80 bg-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div class="p-4 border-b border-white/5 flex items-center justify-between">
                  <h3 class="font-bold text-white">Notificaciones</h3>
                  <button @click="markAllAsRead" class="text-xs text-primary hover:underline font-bold">Marcar como leídas</button>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div v-for="notif in notifications" :key="notif.id" class="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div class="flex gap-3">
                      <div class="w-2 h-2 mt-1.5 rounded-full flex-shrink-0" :class="notif.isRead ? 'bg-white/10' : 'bg-primary'"></div>
                      <div class="flex-1">
                        <p class="text-sm font-bold" :class="notif.isRead ? 'text-text-secondary' : 'text-white'">{{ notif.title }}</p>
                        <p class="text-xs text-text-secondary mt-1 leading-relaxed">{{ notif.message }}</p>
                        <p class="text-[10px] text-text-secondary/50 mt-2">{{ formatRelativeTime(notif.timestamp) }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-if="notifications.length === 0" class="p-10 text-center">
                    <div class="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BellOff class="w-6 h-6 text-text-secondary/30" />
                    </div>
                    <p class="text-sm text-text-secondary">No hay notificaciones aún</p>
                  </div>
                </div>
                <div class="p-3 bg-white/5 text-center">
                  <button class="text-xs font-bold text-text-secondary hover:text-white transition-colors">Ver todas las alertas</button>
                </div>
              </div>
            </transition>
          </div>

          <!-- User Profile -->
          <div class="relative">
            <button 
              @click="isProfileOpen = !isProfileOpen"
              class="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
            >
              <div class="text-right hidden sm:block">
                <p class="text-xs font-bold text-white">{{ userName.split(' ')[0] }}</p>
              </div>
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-xs font-black border border-primary/20 text-white">
                {{ userInitial }}
              </div>
              <ChevronDown class="w-4 h-4 text-text-secondary transition-transform" :class="{ 'rotate-180': isProfileOpen }" />
            </button>

            <!-- Profile Dropdown -->
            <transition name="fade-slide">
              <div v-if="isProfileOpen" class="absolute right-0 mt-4 w-56 bg-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div class="p-4 border-b border-white/5">
                  <p class="text-sm font-bold truncate text-white">{{ userName }}</p>
                  <p class="text-xs text-text-secondary truncate">{{ user?.email }}</p>
                </div>
                <div class="p-2">
                  <NuxtLink to="/settings" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium transition-all group">
                    <User class="w-4 h-4 text-text-secondary group-hover:text-primary" />
                    Ajustes de Perfil
                  </NuxtLink>
                  <button @click="logout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-sm font-medium transition-all group text-red-400">
                    <LogOut class="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-8 scroll-smooth">
        <slot />
      </div>
    </main>

    <!-- Overlay for mobile sidebar -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Zap, 
  Settings, 
  Menu, 
  Search, 
  Bell,
  BellOff,
  LogOut,
  Bot,
  ChevronDown,
  User,
  Plus
} from 'lucide-vue-next'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const { notifications, unreadCount, markAllAsRead, fetchNotifications } = useNotifications()

const isSidebarOpen = ref(false)
const isNotifOpen = ref(false)
const isProfileOpen = ref(false)

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Clouser AI', path: '/clouser', icon: Bot },
  { name: 'Conversaciones', path: '/conversations', icon: MessageSquare },
  { name: 'Clientes', path: '/clients', icon: Users },
  { name: 'Entrenamiento IA', path: '/knowledge', icon: Database },
  { name: 'Automatizaciones', path: '/automations', icon: Zap },
  { name: 'Ajustes', path: '/settings', icon: Settings },
]

const currentPageName = computed(() => {
  const item = navItems.find(i => i.path === route.path)
  return item ? item.name : 'PinFlowser'
})

const currentPathFormatted = computed(() => {
  return 'Principal / ' + (currentPageName.value || 'Inicio')
})

const userName = computed(() => user.value?.user_metadata?.full_name || user.value?.email || 'User')
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}

const formatRelativeTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleDateString()
}

// Close dropdowns on click outside
const handleClickOutside = (e) => {
  if (isNotifOpen.value && !e.target.closest('.relative')) isNotifOpen.value = false
  if (isProfileOpen.value && !e.target.closest('.relative')) isProfileOpen.value = false
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  fetchNotifications()
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>

