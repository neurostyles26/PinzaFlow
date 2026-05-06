<template>
  <div class="space-y-8 max-w-3xl">
    <div>
      <h1 class="text-2xl font-bold">Settings</h1>
      <p class="text-text-secondary mt-1">Manage your account and preferences.</p>
    </div>

    <!-- Profile Section -->
    <div class="card space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg">Profile</h3>
        <div v-if="saved" class="flex items-center gap-1.5 text-primary text-sm font-medium animate-pulse">
          <CheckCircle class="w-4 h-4" />
          Saved!
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
          {{ profileInitial }}
        </div>
        <div>
          <p class="font-semibold">{{ user?.email }}</p>
          <p class="text-sm text-text-secondary mt-0.5">Member since {{ memberSince }}</p>
        </div>
      </div>

      <form @submit.prevent="saveProfile" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
            <input v-model="form.full_name" type="text" class="input-field w-full" placeholder="Your name" />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1.5">Company Name</label>
            <input v-model="form.company_name" type="text" class="input-field w-full" placeholder="Your company" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
          <input :value="user?.email" type="email" disabled class="input-field w-full opacity-50 cursor-not-allowed" />
          <p class="text-xs text-text-secondary mt-1">Email cannot be changed here.</p>
        </div>

        <div v-if="error" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {{ error }}
        </div>

        <button type="submit" :disabled="saving" class="btn-primary flex items-center gap-2">
          <span v-if="saving" class="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full"></span>
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
      </form>
    </div>

    <!-- Notifications Section -->
    <div class="card space-y-5">
      <h3 class="font-bold text-lg">Notifications</h3>

      <div class="space-y-4">
        <div v-for="notif in notifications" :key="notif.id" class="flex items-center justify-between py-2">
          <div>
            <p class="text-sm font-medium">{{ notif.label }}</p>
            <p class="text-xs text-text-secondary mt-0.5">{{ notif.description }}</p>
          </div>
          <button 
            @click="notif.enabled = !notif.enabled"
            class="relative w-11 h-6 rounded-full transition-all duration-300"
            :class="notif.enabled ? 'bg-primary' : 'bg-white/10'"
          >
            <div 
              class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300"
              :class="notif.enabled ? 'left-[22px]' : 'left-0.5'"
            ></div>
          </button>
        </div>
      </div>
    </div>

    <!-- WhatsApp Integration -->
    <div class="card space-y-5">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg">WhatsApp Integration</h3>
        <span class="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold">Coming Soon</span>
      </div>
      <p class="text-sm text-text-secondary">Connect your WhatsApp Business API to send and receive messages directly from PinzaFlow.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-text-secondary mb-1.5">Phone Number ID</label>
          <input type="text" disabled class="input-field w-full opacity-50 cursor-not-allowed" placeholder="Configure in .env" />
        </div>
        <div>
          <label class="block text-sm font-medium text-text-secondary mb-1.5">Access Token</label>
          <input type="password" disabled class="input-field w-full opacity-50 cursor-not-allowed" placeholder="Configure in .env" />
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="card border-red-500/20 space-y-5">
      <h3 class="font-bold text-lg text-red-400">Danger Zone</h3>
      
      <div class="flex items-center justify-between py-2">
        <div>
          <p class="text-sm font-medium">Sign Out</p>
          <p class="text-xs text-text-secondary mt-0.5">Sign out of your PinzaFlow account.</p>
        </div>
        <button @click="handleLogout" class="px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-sm font-medium">
          Sign Out
        </button>
      </div>

      <div class="border-t border-white/5 pt-4 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-red-400">Delete Account</p>
          <p class="text-xs text-text-secondary mt-0.5">Permanently delete your account and all data. This cannot be undone.</p>
        </div>
        <button @click="showDeleteConfirm = true" class="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all text-sm font-medium">
          Delete Account
        </button>
      </div>
    </div>

    <!-- Delete Account Confirm -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDeleteConfirm = false"></div>
        <div class="relative w-full max-w-sm bg-surface border border-white/10 rounded-2xl shadow-2xl p-6 space-y-5 z-10">
          <div class="text-center">
            <div class="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle class="w-6 h-6 text-red-400" />
            </div>
            <h3 class="text-lg font-bold">Delete Account</h3>
            <p class="text-sm text-text-secondary mt-2">This will permanently delete all your data including clients, conversations, and messages. This action cannot be undone.</p>
          </div>
          <div class="flex gap-3">
            <button @click="showDeleteConfirm = false" class="flex-1 px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-medium">
              Cancel
            </button>
            <button @click="deleteAccount" class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all font-medium">
              Delete Forever
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { CheckCircle, AlertTriangle } from 'lucide-vue-next'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { profile, fetchProfile, updateProfile, error } = usePinza()

const saving = ref(false)
const saved = ref(false)
const showDeleteConfirm = ref(false)

const form = reactive({
  full_name: '',
  company_name: ''
})

const profileInitial = computed(() => {
  return (form.full_name || user.value?.email || 'U').charAt(0).toUpperCase()
})

const memberSince = computed(() => {
  if (!user.value?.created_at) return '—'
  return new Date(user.value.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const notifications = ref([
  { id: 1, label: 'New Message Alerts', description: 'Get notified when a client sends you a message.', enabled: true },
  { id: 2, label: 'Lead Notifications', description: 'Receive alerts when new leads are captured.', enabled: true },
  { id: 3, label: 'Automation Reports', description: 'Weekly summary of your automation performance.', enabled: false },
  { id: 4, label: 'Product Updates', description: 'Stay informed about new PinzaFlow features.', enabled: true },
])

const saveProfile = async () => {
  saving.value = true
  saved.value = false
  
  await updateProfile({
    full_name: form.full_name,
    company_name: form.company_name
  })

  // Also update user metadata
  await supabase.auth.updateUser({
    data: { full_name: form.full_name }
  })

  saving.value = false
  if (!error.value) {
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
  }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}

const deleteAccount = async () => {
  // Delete user data (RLS will handle cascading)
  await supabase.auth.signOut()
  navigateTo('/login')
  showDeleteConfirm.value = false
}

onMounted(async () => {
  await fetchProfile()
  if (profile.value) {
    form.full_name = profile.value.full_name || user.value?.user_metadata?.full_name || ''
    form.company_name = profile.value.company_name || ''
  } else {
    form.full_name = user.value?.user_metadata?.full_name || ''
  }
})
</script>
